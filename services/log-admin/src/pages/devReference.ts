// Developer reference — every value below is verified against actual code (file refs in titles).
export function devReferenceHTML() {
  const kv = (rows: [string, string][]) =>
    rows.map(([k, v]) => `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("");

  return `
<div class="panel" style="margin-bottom:24px;">
<h3><span class="dot"></span>Developer Reference <span class="src">code-verified · keep handy while developing</span></h3>
<div class="dev-grid">

  <div class="dev-card">
    <div class="dev-h">📨 Kafka <span class="src">utils/.../kafka.admin.ts · kafka.config.ts</span></div>
    ${kv([
      ["Client", "kafkajs · clientId per service (e.g. auth-service)"],
      ["Broker", "localhost:9092 (env Kakfa_Broker — note typo)"],
      ["Partitioner", "Partitioners.LegacyPartitioner"],
      ["Topic: send-mail", "1 partition · RF 1"],
      ["Topic: upload-content", "2 partitions · RF 1"],
      ["Admin", "Utils creates topics · waitForLeaders:true"],
      ["Consumer group", "mail-service-group · fromBeginning:false"],
      ["Producer", "auto-connect · key = entityId / userId"],
    ])}
    <div class="payload"><b>send-mail</b> payload<pre>{ to, subject, html }</pre></div>
    <div class="payload"><b>upload-content</b> payload<pre>{ entityId, entityType, uploadType,
  file: base64, mimeType, public_id }</pre></div>
    <div class="note">Producers: auth, user, job, payment · Consumers: Utils only</div>
  </div>

  <div class="dev-card">
    <div class="dev-h">⚡ Redis <span class="src">aiQuota.middleware.ts · redis.client.ts</span></div>
    ${kv([
      ["Gateway client", "ioredis (rate-limit + AI quota)"],
      ["Service client", "node-redis (RedisCacheService)"],
      ["URL", "rediss://…upstash.io:6379 (env Redis_url)"],
      ["AI minute key", "ai:min:&lt;sha256(auth|ip)&gt; · TTL 60s"],
      ["AI day key", "ai:day:&lt;sha256&gt;:&lt;YYYY-MM-DD&gt; · TTL 86400s"],
      ["AI limits", "3 / min · 20 / day (env)"],
      ["Rate limit", "@fastify/rate-limit · 200 / 1min"],
      ["RL key", "authorization header, else ip:user-agent"],
      ["Cache ops", "set(EX ttl) · get · del · incr(+expire)"],
    ])}
    <div class="note">Resp headers: X-AI-Minute-Remaining · X-AI-Day-Remaining · X-Request-Id</div>
  </div>

  <div class="dev-card">
    <div class="dev-h">🐘 PostgreSQL <span class="src">config/database.config.ts</span></div>
    ${kv([
      ["Driver", "pg.Pool"],
      ["Database", "Neon · neondb (1 shared, all services)"],
      ["Pool max", "20 connections"],
      ["idleTimeout", "120000 ms"],
      ["connectionTimeout", "10000 ms"],
      ["Keep-alive", "SELECT 1 every 2 min"],
      ["SSL", "prod: rejectUnauthorized:false"],
      ["Migrations", "raw SQL · migrationRunner.ts per service"],
    ])}
    <div class="note">Enums: user_role · file_upload_status · job_type · work_location · application_status</div>
  </div>

  <div class="dev-card">
    <div class="dev-h">🔐 Auth / JWT <span class="src">token.service.ts · register.service.ts</span></div>
    ${kv([
      ["Access token", "JWT payload { userId }"],
      ["Refresh token", "random raw + sha256 hash stored"],
      ["Refresh expiry", "15 days"],
      ["Secret", "env SECRET_KEY (shared across services)"],
      ["Transport", "httpOnly cookie + Authorization header"],
      ["Verify", "centralized in API Gateway hook"],
      ["Public prefixes", "/api/auth · /api/*/public · /api/utils/ai"],
    ])}
  </div>

  <div class="dev-card">
    <div class="dev-h">🚪 API Gateway <span class="src">app.ts · proxy.service.ts</span></div>
    ${kv([
      ["Framework", "Fastify"],
      ["Breakers", "opossum (per service)"],
      ["HTTP agents", "keepAlive · maxSockets 100 · maxFree 10"],
      ["Body limit", "10 MB"],
      ["Multipart", "10 MB / file · max 5 files"],
      ["Proxy", "axios · forwards auth/cookie/user-agent"],
      ["Logging", "Winston · daily rotate · 7-day retain"],
    ])}
  </div>

  <div class="dev-card">
    <div class="dev-h">🔌 Ports & Services <span class="src">api-gateway/.env</span></div>
    ${kv([
      ["API Gateway", ":8080"],
      ["Auth", ":4000  → /api/auth"],
      ["Utils", ":5002  → /api/utils"],
      ["User", ":5003  → /api/user"],
      ["Job", ":5004  → /api/job"],
      ["Payment", ":5005 → /api/payment"],
      ["Frontend", ":3000 (Next.js)"],
      ["Email", "Gmail SMTP :465 (GMAIL_USER/PASSWORD)"],
    ])}
  </div>

</div>
</div>`;
}

export function devCSS() {
  return `.src{font-weight:400;text-transform:none;color:#475569;font-size:10.5px;margin-left:8px;font-family:'JetBrains Mono',monospace;}
  .dev-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:16px;}
  .dev-card{background:rgba(13,13,20,.6);border:1px solid rgba(148,163,184,.07);border-radius:14px;padding:18px;}
  .dev-h{font-size:13px;font-weight:700;color:#cbd5e1;margin-bottom:14px;display:flex;align-items:baseline;flex-wrap:wrap;gap:4px;}
  .kv{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid rgba(148,163,184,.045);font-size:11.5px;}
  .kv .k{color:#64748b;flex-shrink:0;font-weight:500;}
  .kv .v{color:#e2e8f0;text-align:right;font-family:'JetBrains Mono',monospace;font-size:11px;}
  .payload{margin-top:12px;font-size:11px;color:#94a3b8;}
  .payload b{color:#a78bfa;font-family:'JetBrains Mono',monospace;font-size:11px;}
  .payload pre{margin-top:5px;background:rgba(124,58,237,.06);border:1px solid rgba(124,58,237,.12);border-radius:8px;padding:8px 10px;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#cbd5e1;white-space:pre-wrap;line-height:1.5;}
  .dev-card .note{margin-top:12px;font-size:10.5px;color:#64748b;line-height:1.5;border-top:1px dashed rgba(148,163,184,.1);padding-top:10px;}`;
}
