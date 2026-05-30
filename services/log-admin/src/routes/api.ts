import { Router } from "express";
import crypto from "crypto";
import fs from "fs";
import { ADMIN_PASSWORD, LOG_DIRS } from "../config";
import { sessions, authenticate } from "../middleware/auth";
import { readLogs } from "../services/logReader";
import { getStats, getAudit, getServiceStats } from "../services/statsService";
import { getMetrics } from "../services/metricsService";
import { getSchema, getStats as getDbStats, dbConfigured } from "../services/dbIntrospect";

const router = Router();

router.post("/api/login", (req, res) => {
  if ((req.body?.password || "").trim() === ADMIN_PASSWORD.trim()) {
    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(token, { expires: Date.now() + 86400000 });
    res.setHeader("Set-Cookie", `session=${token}; Path=/; HttpOnly; Max-Age=86400`);
    return res.json({ success: true });
  }
  res.status(401).json({ error: "Invalid password" });
});

router.post("/api/logout", (req, res) => {
  const token = req.headers.cookie?.split("session=")[1]?.split(";")[0];
  if (token) sessions.delete(token);
  res.setHeader("Set-Cookie", "session=; Path=/; HttpOnly; Max-Age=0");
  res.json({ success: true });
});

router.get("/api/services", authenticate, (_, res) => {
  res.json(Object.keys(LOG_DIRS).map((name) => ({ name, available: fs.existsSync(LOG_DIRS[name]) })));
});

router.get("/api/logs/:service", authenticate, (req, res) => {
  const { service } = req.params;
  const { date, level, search, requestId, from, to, cursor, page = "1", limit = "50" } = req.query;
  const result = readLogs(service, {
    date: date as string,
    level: level as string,
    search: search as string,
    requestId: requestId as string,
    from: from as string,
    to: to as string,
    cursor: cursor !== undefined ? parseInt(cursor as string) : undefined,
    page: parseInt(page as string),
    limit: parseInt(limit as string),
  });
  res.json(result);
});

router.get("/api/stats", authenticate, (_, res) => {
  res.json(getStats());
});

router.get("/api/audit", authenticate, (_, res) => {
  res.json(getAudit());
});

router.get("/api/service-stats/:service", authenticate, (req, res) => {
  res.json(getServiceStats(req.params.service));
});

router.get("/api/metrics/:service", authenticate, (req, res) => {
  const now = Date.now();
  const to = req.query.to ? new Date(req.query.to as string).getTime() : now;
  const from = req.query.from ? new Date(req.query.from as string).getTime() : now - 7 * 86400000;
  const resolution = (req.query.resolution as string) || "min";
  res.json(getMetrics(req.params.service, from, to, resolution));
});

router.get("/api/db/schema", authenticate, async (_, res) => {
  if (!dbConfigured()) return res.status(503).json({ error: "No DATABASE_URL configured" });
  try { res.json(await getSchema()); } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/api/db/stats", authenticate, async (_, res) => {
  if (!dbConfigured()) return res.status(503).json({ error: "No DATABASE_URL configured" });
  try { res.json(await getDbStats()); } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
