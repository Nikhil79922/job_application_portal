import fs from "fs";
import path from "path";
import { LOG_DIRS } from "../config";

export function getStats() {
  const stats: Record<string, any> = {};
  let totalErrors = 0, totalRequests = 0;
  for (const [service, dir] of Object.entries(LOG_DIRS)) {
    if (!fs.existsSync(dir)) { stats[service] = { errors: 0, requests: 0, available: false }; continue; }
    const today = new Date().toISOString().split("T")[0];
    const files = fs.readdirSync(dir).filter((f) => f.includes(today) && f.endsWith(".log"));
    let errors = 0, requests = 0;
    for (const file of files) {
      const lines = fs.readFileSync(path.join(dir, file), "utf-8").split("\n").filter(Boolean);
      for (const line of lines) { try { const p = JSON.parse(line); requests++; if (p.level === "error") errors++; } catch {} }
    }
    stats[service] = { errors, requests, available: true };
    totalErrors += errors; totalRequests += requests;
  }
  return { stats, totalErrors, totalRequests, services: Object.keys(LOG_DIRS).length };
}

export function getAudit() {
  const days: any[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    let errors = 0, requests = 0, warnings = 0;
    for (const [, dir] of Object.entries(LOG_DIRS)) {
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter((f) => f.includes(dateStr) && f.endsWith(".log"));
      for (const file of files) {
        const lines = fs.readFileSync(path.join(dir, file), "utf-8").split("\n").filter(Boolean);
        for (const line of lines) { try { const p = JSON.parse(line); requests++; if (p.level === "error") errors++; if (p.level === "warn") warnings++; } catch {} }
      }
    }
    days.push({ date: dateStr, requests, errors, warnings });
  }
  return { days };
}

export function getServiceStats(service: string) {
  const dir = LOG_DIRS[service];
  if (!dir || !fs.existsSync(dir)) return { days: [], totals: { logs: 0, errors: 0, warnings: 0 } };
  const days: any[] = [];
  let totalLogs = 0, totalErrors = 0, totalWarnings = 0;
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    let errors = 0, requests = 0, warnings = 0;
    const files = fs.readdirSync(dir).filter((f) => f.includes(dateStr) && f.endsWith(".log"));
    for (const file of files) {
      const lines = fs.readFileSync(path.join(dir, file), "utf-8").split("\n").filter(Boolean);
      for (const line of lines) { try { const p = JSON.parse(line); requests++; if (p.level === "error") errors++; if (p.level === "warn") warnings++; } catch {} }
    }
    days.push({ date: dateStr, requests, errors, warnings });
    totalLogs += requests; totalErrors += errors; totalWarnings += warnings;
  }
  return { days, totals: { logs: totalLogs, errors: totalErrors, warnings: totalWarnings } };
}
