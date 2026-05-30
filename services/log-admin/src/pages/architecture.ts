import { head, layoutCSS, sidebar, infraCSS } from "./shared";
import { flowCSS } from "./erDiagram";

function archCSS() {
  return `.arch-section{margin-bottom:32px;}
  .arch-section h2{font-size:16px;font-weight:800;color:#f1f5f9;margin-bottom:16px;display:flex;align-items:center;gap:10px;letter-spacing:-.02em;}
  .arch-section h2 .aic{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
  .arch-desc{font-size:12.5px;color:#94a3b8;line-height:1.6;margin-bottom:16px;}
  .flow-box{background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.06);border-radius:18px;padding:28px 24px;overflow-x:auto;}
  .svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:24px;}
  .svc-card{background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.08);border-radius:14px;padding:18px 20px;transition:all .18s;}
  .svc-card:hover{border-color:rgba(124,58,237,.3);transform:translateY(-2px);box-shadow:0 8px 24px -8px rgba(124,58,237,.2);}
  .svc-card .sc-head{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .svc-card .sc-ico{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;}
  .svc-card .sc-name{font-size:14px;font-weight:700;color:#f1f5f9;}
  .svc-card .sc-port{font-size:10px;font-family:'JetBrains Mono',monospace;color:#64748b;margin-left:auto;}
  .svc-card .sc-desc{font-size:11.5px;color:#94a3b8;line-height:1.5;margin-bottom:10px;}
  .svc-card .sc-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .svc-card .sc-tag{font-size:9.5px;font-weight:600;padding:3px 8px;border-radius:6px;font-family:'JetBrains Mono',monospace;}
  .sc-tag.db{background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.2);}
  .sc-tag.kafka{background:rgba(236,72,153,.1);color:#ec4899;border:1px solid rgba(236,72,153,.2);}
  .sc-tag.redis{background:rgba(220,38,38,.1);color:#f87171;border:1px solid rgba(220,38,38,.2);}
  .sc-tag.ai{background:rgba(124,58,237,.1);color:#a78bfa;border:1px solid rgba(124,58,237,.2);}
  .sc-tag.pay{background:rgba(245,158,11,.1);color:#fbbf24;border:1px solid rgba(245,158,11,.2);}
  .sc-tag.auth{background:rgba(96,165,250,.1);color:#60a5fa;border:1px solid rgba(96,165,250,.2);}
  .flow-legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(148,163,184,.06);}
  .flow-legend span{font-size:10px;color:#64748b;display:flex;align-items:center;gap:6px;}
  .flow-legend span::before{content:'';width:10px;height:3px;border-radius:2px;}
  .fl-req::before{background:#60a5fa;}.fl-kafka::before{background:#ec4899;}.fl-redis::before{background:#f87171;}.fl-ai::before{background:#a78bfa;}.fl-pay::before{background:#fbbf24;}
  .req-flow{margin-top:20px;}
  .req-flow h3{font-size:13px;font-weight:700;color:#cbd5e1;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;}
  .rf-steps{display:flex;flex-direction:column;gap:0;}
  .rf-step{display:flex;align-items:flex-start;gap:14px;padding:12px 0;position:relative;}
  .rf-step:not(:last-child)::after{content:'';position:absolute;left:15px;top:36px;bottom:0;width:2px;background:linear-gradient(to bottom,rgba(124,58,237,.4),rgba(124,58,237,.1));}
  .rf-num{width:30px;height:30px;border-radius:50%;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#a78bfa;flex-shrink:0;position:relative;z-index:1;}
  .rf-body{flex:1;min-width:0;}
  .rf-title{font-size:12.5px;font-weight:700;color:#e2e8f0;}
  .rf-detail{font-size:11px;color:#64748b;margin-top:2px;font-family:'JetBrains Mono',monospace;}
  @media(max-width:768px){.svc-grid{grid-template-columns:1fr;}.flow-box{padding:18px 14px;}}`;
}

export function getArchitecturePage() {
  const css = layoutCSS() + infraCSS() + flowCSS() + archCSS();
  return head("Architecture — Log Admin", css) + `<body><div class="shell">${sidebar("architecture")}<main class="main">
<h1>System Architecture</h1>
<p class="desc">Complete project wire flow — every service, connection, and data path documented</p>

<!-- SYSTEM WIRE FLOW -->
<div class="arch-section">
<h2><span class="aic" style="background:rgba(124,58,237,.15)">🧭</span> System Wire Flow</h2>
<p class="arch-desc">End-to-end request lifecycle from browser to infrastructure. Every arrow represents a real connection verified from code.</p>
<div class="flow-box">
<div class="wire">
  <div class="wrow"><div class="wnode front">🖥️ <b>Frontend</b><span>Next.js 15 · App Router · :3000</span><div class="pills"><i>Zustand</i><i>TanStack Query</i><i>Axios</i><i>ShadCN</i></div></div></div>
  <div class="wpipe"></div>
  <div class="wrow"><div class="wnode gw">🚪 <b>API Gateway</b><span>Fastify · :8080 · single entry point</span><div class="pills"><i>JWT Verify</i><i>Circuit Breaker</i><i>Rate Limit (200/min)</i><i>Reverse Proxy</i><i>Winston Logs</i></div></div></div>
  <div class="wfan"><span></span><span></span><span></span><span></span><span></span></div>
  <div class="wrow svcs">
    <div class="wnode svc auth">🔐 Auth<span>Express · :4000</span></div>
    <div class="wnode svc user">👤 User<span>Express · :5003</span></div>
    <div class="wnode svc job">💼 Job<span>Express · :5004</span></div>
    <div class="wnode svc pay">💳 Payment<span>Express · :5005</span></div>
    <div class="wnode svc utils">🤖 Utils<span>Express · :5002</span></div>
  </div>
  <div class="wpipe tall"></div>
  <div class="wrow infra">
    <div class="wnode db">🐘 <b>PostgreSQL</b><span>Neon · 1 shared DB · raw SQL</span></div>
    <div class="wnode rd">⚡ <b>Redis</b><span>Upstash · rate-limit + cache</span></div>
    <div class="wnode kf">📨 <b>Kafka</b><span>:9092 · send-mail · upload-content</span></div>
    <div class="wnode ai">🤖 <b>Groq AI</b><span>Resume analysis · Career guidance</span></div>
    <div class="wnode rz">💳 <b>Razorpay</b><span>Orders · HMAC verify · Webhooks</span></div>
  </div>
</div>
<div class="flow-legend">
  <span class="fl-req">HTTP request</span>
  <span class="fl-kafka">Kafka event</span>
  <span class="fl-redis">Redis op</span>
  <span class="fl-ai">AI call</span>
  <span class="fl-pay">Payment</span>
</div>
</div>
</div>

<!-- MICROSERVICES DETAIL -->
<div class="arch-section">
<h2><span class="aic" style="background:rgba(52,211,153,.15)">⚡</span> Microservices Detail</h2>
<div class="svc-grid">

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(124,58,237,.15)">🚪</div><div class="sc-name">API Gateway</div><div class="sc-port">:8080</div></div>
    <div class="sc-desc">Fastify-based reverse proxy. All frontend requests enter here. Validates JWT, applies Redis rate-limiting (200 req/min per IP), routes to downstream services via opossum circuit breakers.</div>
    <div class="sc-tags"><span class="sc-tag redis">Redis rate-limit</span><span class="sc-tag auth">JWT verify</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(96,165,250,.15)">🔐</div><div class="sc-name">Auth Service</div><div class="sc-port">:4000</div></div>
    <div class="sc-desc">Handles registration, login, refresh-token rotation, forgot/reset password, device tracking, secure logout. Produces Kafka events for welcome emails.</div>
    <div class="sc-tags"><span class="sc-tag db">users · refresh_tokens</span><span class="sc-tag kafka">produces: send-mail</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(59,130,246,.15)">👤</div><div class="sc-name">User Service</div><div class="sc-port">:5003</div></div>
    <div class="sc-desc">Profile management, resume & profile-pic upload, skills CRUD, job applications, application history, resume polling, subscription status check.</div>
    <div class="sc-tags"><span class="sc-tag db">users · skills · user_skills</span><span class="sc-tag kafka">produces: upload-content</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(52,211,153,.15)">💼</div><div class="sc-name">Job Service</div><div class="sc-port">:5004</div></div>
    <div class="sc-desc">Company management (CRUD + logo upload), job creation/update, active listings, recruiter dashboard, applicant tracking, candidate workflow management.</div>
    <div class="sc-tags"><span class="sc-tag db">companies · jobs · applications</span><span class="sc-tag kafka">produces: send-mail · upload-content</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(245,158,11,.15)">💳</div><div class="sc-name">Payment Service</div><div class="sc-port">:5005</div></div>
    <div class="sc-desc">Razorpay order creation, HMAC signature verification, subscription activation, webhook handling, payment audit logs, failure recovery. Writes subscription expiry to users table.</div>
    <div class="sc-tags"><span class="sc-tag pay">Razorpay API</span><span class="sc-tag db">writes: users.subscription</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(236,72,153,.15)">🤖</div><div class="sc-name">Utils Service</div><div class="sc-port">:5002</div></div>
    <div class="sc-desc">Kafka consumers for email dispatch and file upload processing. Groq AI integration for resume analysis, skills extraction, career guidance generation. Background workers.</div>
    <div class="sc-tags"><span class="sc-tag kafka">consumes: send-mail · upload-content</span><span class="sc-tag ai">Groq AI</span></div>
  </div>

</div>
</div>

<!-- REQUEST FLOWS -->
<div class="arch-section">
<h2><span class="aic" style="background:rgba(96,165,250,.15)">🔄</span> Request Flows</h2>

<div class="flow-box">
<div class="req-flow">
<h3>🔐 User Login Flow</h3>
<div class="rf-steps">
  <div class="rf-step"><div class="rf-num">1</div><div class="rf-body"><div class="rf-title">Frontend → POST /api/auth/login</div><div class="rf-detail">Axios sends email + password to gateway</div></div></div>
  <div class="rf-step"><div class="rf-num">2</div><div class="rf-body"><div class="rf-title">Gateway → Rate limit check (Redis)</div><div class="rf-detail">INCR ip:{ip}:min → reject if > 200</div></div></div>
  <div class="rf-step"><div class="rf-num">3</div><div class="rf-body"><div class="rf-title">Gateway → Proxy to Auth :4000</div><div class="rf-detail">opossum circuit breaker wraps the call</div></div></div>
  <div class="rf-step"><div class="rf-num">4</div><div class="rf-body"><div class="rf-title">Auth → Validate credentials (PostgreSQL)</div><div class="rf-detail">SELECT * FROM users WHERE email = $1 → bcrypt.compare</div></div></div>
  <div class="rf-step"><div class="rf-num">5</div><div class="rf-body"><div class="rf-title">Auth → Generate tokens</div><div class="rf-detail">JWT access (15m) + refresh token → INSERT refresh_tokens</div></div></div>
  <div class="rf-step"><div class="rf-num">6</div><div class="rf-body"><div class="rf-title">Response → Set cookies + return user</div><div class="rf-detail">httpOnly cookie (refresh) + JSON body (access + user data)</div></div></div>
</div>
</div>
</div>

<div class="flow-box" style="margin-top:16px;">
<div class="req-flow">
<h3>📄 Resume Upload Flow</h3>
<div class="rf-steps">
  <div class="rf-step"><div class="rf-num">1</div><div class="rf-body"><div class="rf-title">Frontend → POST /api/user/resume (multipart)</div><div class="rf-detail">FormData with file → gateway verifies JWT</div></div></div>
  <div class="rf-step"><div class="rf-num">2</div><div class="rf-body"><div class="rf-title">User Service → Produce Kafka event</div><div class="rf-detail">topic: upload-content → { entityId, uploadType: "resume", file: base64 }</div></div></div>
  <div class="rf-step"><div class="rf-num">3</div><div class="rf-body"><div class="rf-title">User Service → Set status "pending"</div><div class="rf-detail">UPDATE users SET resume_upload_status = 'pending'</div></div></div>
  <div class="rf-step"><div class="rf-num">4</div><div class="rf-body"><div class="rf-title">Utils Consumer → Process upload</div><div class="rf-detail">upload.consumer.ts picks from Kafka → uploads to cloud storage</div></div></div>
  <div class="rf-step"><div class="rf-num">5</div><div class="rf-body"><div class="rf-title">Utils → AI Resume Analysis (Groq)</div><div class="rf-detail">Extract skills, experience, suggestions via structured prompts</div></div></div>
  <div class="rf-step"><div class="rf-num">6</div><div class="rf-body"><div class="rf-title">Utils → Update DB status "success"</div><div class="rf-detail">UPDATE users SET resume_upload_status = 'success', resume = url</div></div></div>
  <div class="rf-step"><div class="rf-num">7</div><div class="rf-body"><div class="rf-title">Frontend → Polling detects completion</div><div class="rf-detail">GET /api/user/resume/status every 3s until status ≠ pending</div></div></div>
</div>
</div>

<div class="flow-box" style="margin-top:16px;">
<div class="req-flow">
<h3>💳 Payment / Subscription Flow</h3>
<div class="rf-steps">
  <div class="rf-step"><div class="rf-num">1</div><div class="rf-body"><div class="rf-title">Frontend → POST /api/payment/create-order</div><div class="rf-detail">Payment service calls Razorpay API → creates order (₹119)</div></div></div>
  <div class="rf-step"><div class="rf-num">2</div><div class="rf-body"><div class="rf-title">Frontend → Opens Razorpay Checkout</div><div class="rf-detail">razorpay.open({ order_id, amount, prefill })</div></div></div>
  <div class="rf-step"><div class="rf-num">3</div><div class="rf-body"><div class="rf-title">User completes payment on Razorpay</div><div class="rf-detail">Card/UPI/Netbanking → Razorpay returns signature</div></div></div>
  <div class="rf-step"><div class="rf-num">4</div><div class="rf-body"><div class="rf-title">Frontend → POST /api/payment/verify</div><div class="rf-detail">{ razorpay_order_id, razorpay_payment_id, razorpay_signature }</div></div></div>
  <div class="rf-step"><div class="rf-num">5</div><div class="rf-body"><div class="rf-title">Payment Service → HMAC verification</div><div class="rf-detail">crypto.createHmac('sha256', secret).update(order|payment).digest('hex')</div></div></div>
  <div class="rf-step"><div class="rf-num">6</div><div class="rf-body"><div class="rf-title">Payment Service → Activate subscription</div><div class="rf-detail">UPDATE users SET subscription = NOW() + 30 days WHERE id = $1</div></div></div>
</div>
</div>
</div>

<div class="flow-box" style="margin-top:16px;">
<div class="req-flow">
<h3>🤖 AI Career Guidance Flow</h3>
<div class="rf-steps">
  <div class="rf-step"><div class="rf-num">1</div><div class="rf-body"><div class="rf-title">Frontend → POST /api/user/ai/career-guidance</div><div class="rf-detail">Sends user skills + resume data</div></div></div>
  <div class="rf-step"><div class="rf-num">2</div><div class="rf-body"><div class="rf-title">Gateway → AI quota check (Redis)</div><div class="rf-detail">GET ai:quota:{userId} → reject if > daily limit</div></div></div>
  <div class="rf-step"><div class="rf-num">3</div><div class="rf-body"><div class="rf-title">Utils Service → Groq AI API call</div><div class="rf-detail">Structured prompt → model: llama/mixtral → JSON response</div></div></div>
  <div class="rf-step"><div class="rf-num">4</div><div class="rf-body"><div class="rf-title">Utils → Parse & return guidance</div><div class="rf-detail">Learning roadmap, tech recommendations, career paths</div></div></div>
</div>
</div>
</div>
</div>

<!-- INFRASTRUCTURE CONNECTIONS -->
<div class="arch-section">
<h2><span class="aic" style="background:rgba(52,211,153,.15)">🔌</span> Infrastructure Connections</h2>
<div class="svc-grid">

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(52,211,153,.15)">🐘</div><div class="sc-name">PostgreSQL (Neon)</div></div>
    <div class="sc-desc">Single shared database across all services. Raw SQL queries (no ORM). Pool max 20 connections. SSL in production. Tables: users, refresh_tokens, skills, user_skills, companies, jobs, applications.</div>
    <div class="sc-tags"><span class="sc-tag db">pg Pool(max:20)</span><span class="sc-tag db">SSL: rejectUnauthorized=false</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(220,38,38,.15)">⚡</div><div class="sc-name">Redis (Upstash)</div></div>
    <div class="sc-desc">Gateway rate-limiting (200/min per IP via INCR + EXPIRE). AI quota tracking (daily limit per user). Token/session caching. Shared single instance across gateway.</div>
    <div class="sc-tags"><span class="sc-tag redis">ioredis</span><span class="sc-tag redis">INCR + EXPIRE pattern</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(236,72,153,.15)">📨</div><div class="sc-name">Apache Kafka</div></div>
    <div class="sc-desc">Two topics: send-mail (welcome/reset emails) and upload-content (resume/profile-pic/company-logo processing). Producers in auth/user/job/payment. Single consumer group in Utils.</div>
    <div class="sc-tags"><span class="sc-tag kafka">kafkajs</span><span class="sc-tag kafka">LegacyPartitioner</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(124,58,237,.15)">🤖</div><div class="sc-name">Groq AI</div></div>
    <div class="sc-desc">Resume intelligence: skills extraction, experience analysis, improvement suggestions. Career guidance: personalized learning roadmaps, technology recommendations. Called exclusively from Utils service.</div>
    <div class="sc-tags"><span class="sc-tag ai">llama / mixtral</span><span class="sc-tag ai">structured JSON prompts</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(245,158,11,.15)">💳</div><div class="sc-name">Razorpay</div></div>
    <div class="sc-desc">Test mode integration. Order creation → checkout → HMAC signature verification → subscription activation. Webhook endpoint for async payment confirmations. Writes to users.subscription column.</div>
    <div class="sc-tags"><span class="sc-tag pay">HMAC SHA256</span><span class="sc-tag pay">Webhooks</span></div>
  </div>

  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(148,163,184,.15)">📝</div><div class="sc-name">Winston Logging</div></div>
    <div class="sc-desc">Structured JSON logs across all 6 services. Daily rotation (7-day retention, 20MB max). Separate error streams. Request correlation via X-Request-Id. Sensitive data auto-redacted.</div>
    <div class="sc-tags"><span class="sc-tag auth">DailyRotateFile</span><span class="sc-tag auth">JSON format</span></div>
  </div>

</div>
</div>

<!-- ARCHITECTURE PATTERNS -->
<div class="arch-section">
<h2><span class="aic" style="background:rgba(245,158,11,.15)">🏗️</span> Architecture Patterns Used</h2>
<div class="svc-grid">
  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(124,58,237,.1)">📐</div><div class="sc-name">Clean Architecture</div></div>
    <div class="sc-desc">Every service follows: api/ (controllers + routes) → domain/ (services + entities) → infra/ (DB + messaging) → shared/ (middleware + utils) → composition-root/ (DI wiring)</div>
  </div>
  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(96,165,250,.1)">🔌</div><div class="sc-name">API Gateway Pattern</div></div>
    <div class="sc-desc">Single entry point. JWT verification at gateway level (not per-service). Reverse proxy via http-proxy. Circuit breakers (opossum) per downstream service. Centralized logging.</div>
  </div>
  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(236,72,153,.1)">📨</div><div class="sc-name">Event-Driven (Kafka)</div></div>
    <div class="sc-desc">Fire-and-forget producers. Decoupled consumers in Utils. Retry-safe processing. No synchronous inter-service HTTP calls between backend services.</div>
  </div>
  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(52,211,153,.1)">🗄️</div><div class="sc-name">Repository Pattern</div></div>
    <div class="sc-desc">Database access abstracted behind repository interfaces. Raw SQL queries (no ORM). Each service has its own repository layer even though they share one DB.</div>
  </div>
  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(220,38,38,.1)">🛡️</div><div class="sc-name">Circuit Breaker</div></div>
    <div class="sc-desc">opossum library in gateway. Per-service breakers. Opens after 5 failures in 30s window. Half-open after 10s timeout. Prevents cascade failures.</div>
  </div>
  <div class="svc-card">
    <div class="sc-head"><div class="sc-ico" style="background:rgba(245,158,11,.1)">🔄</div><div class="sc-name">Refresh Token Rotation</div></div>
    <div class="sc-desc">Access token (15min) + refresh token (7d). On refresh: old token invalidated, new pair issued. Stored in refresh_tokens table with device tracking.</div>
  </div>
</div>
</div>

</main></div></body></html>`;
}
