import fs from "fs";
import path from "path";
import { LOG_DIRS } from "../config";

// ── In-memory parse cache keyed by file path; invalidated by mtime+size.
// Avoids re-reading & re-parsing every log file on every request (the old full-scan cause of lag).
interface ParsedFile { mtimeMs: number; size: number; logs: any[]; }
const cache = new Map<string, ParsedFile>();

function parseFile(fp: string): any[] {
  const st = fs.statSync(fp);
  const hit = cache.get(fp);
  if (hit && hit.mtimeMs === st.mtimeMs && hit.size === st.size) return hit.logs;
  const logs: any[] = [];
  const lines = fs.readFileSync(fp, "utf-8").split("\n");
  for (const line of lines) { if (line) try { logs.push(JSON.parse(line)); } catch {} }
  // newest-first within file
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  cache.set(fp, { mtimeMs: st.mtimeMs, size: st.size, logs });
  return logs;
}

export interface LogQuery {
  date?: string; level?: string; search?: string; requestId?: string;
  from?: string; to?: string; cursor?: number; limit?: number; page?: number;
}

export function readLogs(service: string, q: LogQuery) {
  const dir = LOG_DIRS[service];
  if (!dir || !fs.existsSync(dir)) return { logs: [], total: 0, nextCursor: null, page: 1, totalPages: 0 };

  let files = fs.readdirSync(dir).filter((f) => f.endsWith(".log")).sort().reverse();
  if (q.date) files = files.filter((f) => f.includes(q.date!));

  const fromMs = q.from ? new Date(q.from).getTime() : null;
  const toMs = q.to ? new Date(q.to).getTime() : null;
  const search = q.search?.toLowerCase().trim();
  const reqId = q.requestId?.trim();
  const level = q.level && q.level !== "all" ? q.level : null;

  // Gather only matching logs (filter as we merge — no full materialization of unrelated data).
  let all: any[] = [];
  for (const file of files) {
    const logs = parseFile(path.join(dir, file));
    for (const l of logs) {
      if (level && l.level !== level) continue;
      if (reqId && l.requestId !== reqId) continue;
      if (fromMs || toMs) {
        const t = new Date(l.timestamp).getTime();
        if (fromMs && t < fromMs) continue;
        if (toMs && t > toMs) continue;
      }
      if (search && !JSON.stringify(l).toLowerCase().includes(search)) continue;
      all.push(l);
    }
  }
  all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const total = all.length;
  const limit = q.limit || 50;

  // Cursor-based slice (preferred for virtualized infinite scroll); falls back to page.
  if (q.cursor !== undefined && q.cursor !== null && !Number.isNaN(q.cursor)) {
    const start = q.cursor;
    const slice = all.slice(start, start + limit);
    const nextCursor = start + limit < total ? start + limit : null;
    return { logs: slice, total, nextCursor, page: Math.floor(start / limit) + 1, totalPages: Math.ceil(total / limit) };
  }
  const p = q.page || 1;
  const slice = all.slice((p - 1) * limit, p * limit);
  return { logs: slice, total, nextCursor: p * limit < total ? p * limit : null, page: p, totalPages: Math.ceil(total / limit) };
}
