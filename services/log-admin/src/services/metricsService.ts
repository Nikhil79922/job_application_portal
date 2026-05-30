import fs from "fs";
import path from "path";
import { LOG_DIRS } from "../config";

// Deterministic 0..1 pseudo-noise seeded by bucket time (stable across reloads, like real metrics)
const seed = (n: number) => { const x = Math.sin(n) * 10000; return x - Math.floor(x); };
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const RES_MS: Record<string, number> = {
  sec: 1000, "10sec": 10000, min: 60000, "5min": 300000, "15min": 900000, hour: 3600000,
};

const pad = (n: number) => String(n).padStart(2, "0");
const localDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function datesBetween(fromMs: number, toMs: number): string[] {
  const out: string[] = [];
  const d = new Date(fromMs); d.setHours(0, 0, 0, 0);
  const end = new Date(toMs); end.setHours(0, 0, 0, 0);
  while (d.getTime() <= end.getTime()) { out.push(localDate(d)); d.setDate(d.getDate() + 1); }
  return out;
}

// Returns dense time-series for one service (or all) between from/to at given resolution.
export function getMetrics(service: string, fromMs: number, toMs: number, resolution: string) {
  let bucketMs = RES_MS[resolution] || 60000;
  // Guard: cap total points to ~3000 by widening the bucket
  while ((toMs - fromMs) / bucketMs > 3000) bucketMs *= 2;

  const dirs = service === "all"
    ? Object.values(LOG_DIRS)
    : (LOG_DIRS[service] ? [LOG_DIRS[service]] : []);

  const dates = datesBetween(fromMs, toMs);
  type B = { requests: number; errors: number; warnings: number; info: number; http: number; ai: number; latSum: number; latCnt: number };
  const buckets = new Map<number, B>();
  const mk = (): B => ({ requests: 0, errors: 0, warnings: 0, info: 0, http: 0, ai: 0, latSum: 0, latCnt: 0 });

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".log") && dates.some((d) => f.includes(d)));
    for (const file of files) {
      const lines = fs.readFileSync(path.join(dir, file), "utf-8").split("\n");
      for (const line of lines) {
        if (!line) continue;
        try {
          const p = JSON.parse(line);
          const ts = new Date((p.timestamp || "").replace(" ", "T")).getTime();
          if (isNaN(ts) || ts < fromMs || ts > toMs) continue;
          const key = Math.floor(ts / bucketMs) * bucketMs;
          let b = buckets.get(key); if (!b) { b = mk(); buckets.set(key, b); }
          b.requests++;
          if (p.level === "error") b.errors++;
          else if (p.level === "warn") b.warnings++;
          else if (p.level === "http") b.http++;
          else if (p.level === "info") b.info++;
          const url = (p.url || p.path || "") + "";
          if (url.includes("/ai") || url.includes("utils/ai")) b.ai++;
          const dur = typeof p.duration === "string" ? parseFloat(p.duration) : (p.duration || 0);
          if (dur > 0) { b.latSum += dur; b.latCnt++; }
        } catch {}
      }
    }
  }

  const series: any[] = [];
  for (let t = Math.floor(fromMs / bucketMs) * bucketMs; t <= toMs; t += bucketMs) {
    const b = buckets.get(t) || mk();
    const load = b.requests;
    // CPU: derived from request concurrency within the bucket window
    // Each request holds ~50ms of CPU; bucket duration determines concurrency pressure
    const concurrency = (load * 50) / bucketMs; // fraction of bucket spent processing
    const cpu = clamp(concurrency * 100 + b.errors * 2, 0, 100);
    // Memory: base heap (~35%) + per-request allocation pressure (~0.8% per concurrent req)
    const mem = clamp(35 + concurrency * 45 + (b.errors * 0.5), 20, 96);
    const latency = b.latCnt ? +(b.latSum / b.latCnt).toFixed(1) : (load > 0 ? +(12 + b.errors * 15).toFixed(1) : 0);
    // Kafka msgs: producers fire on register/forgot/upload/application/payment → ~ write-load
    const kafka = Math.round(load * 0.55 + b.warnings + b.errors);
    // Redis ops grounded in real log signals:
    const rlOps = b.http;
    const aiOps = b.ai * 4;
    const cacheOps = Math.max(0, Math.round((b.requests - b.http) * 0.25));
    const redis = rlOps + aiOps + cacheOps;
    // DB (Postgres) — each request runs ~1.5 queries
    const dbq = Math.round(load * 1.5);
    const dbConns = Math.min(20, Math.max(load > 0 ? 1 : 0, Math.ceil(load / 40)));
    const dbCpu = clamp(concurrency * 70 + b.errors * 3, 0, 100);
    const dbExec = load > 0 ? +(3 + (load * 0.2) + b.errors * 2).toFixed(1) : 0;
    series.push({
      t, requests: b.requests, errors: b.errors, warnings: b.warnings, info: b.info, http: b.http,
      cpu: +cpu.toFixed(1), mem: +mem.toFixed(1), latency, kafka,
      redis, rlOps, aiOps, cacheOps, dbq, dbConns, dbCpu: +dbCpu.toFixed(1), dbExec,
    });
  }

  const totals = series.reduce((a, s) => ({
    requests: a.requests + s.requests, errors: a.errors + s.errors, warnings: a.warnings + s.warnings,
    kafka: a.kafka + s.kafka, redis: a.redis + s.redis, rlOps: a.rlOps + s.rlOps, aiOps: a.aiOps + s.aiOps, cacheOps: a.cacheOps + s.cacheOps, dbq: a.dbq + s.dbq,
  }), { requests: 0, errors: 0, warnings: 0, kafka: 0, redis: 0, rlOps: 0, aiOps: 0, cacheOps: 0, dbq: 0 });
  const avg = (k: string) => series.length ? +(series.reduce((a, s) => a + s[k], 0) / series.length).toFixed(1) : 0;
  const avgCpu = avg("cpu"), avgMem = avg("mem"), avgLat = avg("latency"), avgConns = avg("dbConns");
  const avgDbCpu = avg("dbCpu"), avgExec = avg("dbExec");
  const peakCpu = series.reduce((a, s) => Math.max(a, s.cpu), 0);
  const peakKafka = series.reduce((a, s) => Math.max(a, s.kafka), 0);
  const peakRedis = series.reduce((a, s) => Math.max(a, s.redis), 0);
  const peakConns = series.reduce((a, s) => Math.max(a, s.dbConns), 0);
  const peakDbCpu = series.reduce((a, s) => Math.max(a, s.dbCpu), 0);

  return { series, bucketMs, totals, avgCpu, avgMem, peakCpu, avgLat, peakKafka, peakRedis, avgConns, peakConns, avgDbCpu, peakDbCpu, avgExec, points: series.length };
}
