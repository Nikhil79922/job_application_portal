import { head, layoutCSS, sidebar, infraCSS, metricsCSS, chartClientJS, toastCSS, toastJS, rangeGuardJS, tableCSS } from "./shared";
import { erCSS, flowCSS, erDynamicJS } from "./erDiagram";
import { devReferenceHTML, devCSS } from "./devReference";
import { LOG_DIRS } from "../config";

function tabsCSS() {
  return `.tabs{display:flex;gap:6px;margin-bottom:22px;border-bottom:1px solid rgba(148,163,184,.1);}
  .tab-btn{padding:11px 20px;background:transparent;border:none;border-bottom:2px solid transparent;color:#64748b;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;font-family:inherit;display:flex;align-items:center;gap:7px;margin-bottom:-1px;}
  .tab-btn:hover{color:#cbd5e1;}
  .tab-btn.on{color:#a78bfa;border-bottom-color:#7c3aed;}
  .tabp{display:none;}.tabp.show{display:block;animation:fade .25s ease;}
  @keyframes fade{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:none;}}
  .er-tools{display:flex;gap:6px;margin-left:auto;}
  .er-tools button{width:30px;height:30px;border-radius:8px;background:rgba(148,163,184,.06);border:1px solid rgba(148,163,184,.12);color:#94a3b8;cursor:pointer;font-size:14px;line-height:1;transition:all .15s;}
  .er-tools button:hover{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.4);color:#a78bfa;}
  .svc-info{background:rgba(13,13,20,.7);border:1px solid rgba(148,163,184,.08);border-radius:14px;padding:18px 22px;margin-bottom:20px;}
  .svc-info h4{font-size:15px;font-weight:700;color:#f1f5f9;margin-bottom:6px;display:flex;align-items:center;gap:8px;}
  .svc-info p{font-size:12.5px;color:#94a3b8;line-height:1.5;}
  .chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}
  .chip{font-size:11px;color:#a78bfa;background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.22);padding:4px 11px;border-radius:20px;font-family:'JetBrains Mono',monospace;}
  .db-tuples{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;margin-bottom:20px;}
  .db-tuples .tp{background:rgba(10,10,15,.7);border:1px solid rgba(148,163,184,.06);border-radius:10px;padding:12px 14px;text-align:center;}
  .db-tuples .tp .tv{font-size:18px;font-weight:800;color:#e2e8f0;letter-spacing:-.02em;}
  .db-tuples .tp .tl{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:#64748b;margin-top:4px;}`;
}

function filterBarCSS() {
  return `.filter-bar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;background:rgba(8,8,14,.92);border:1px solid rgba(148,163,184,.08);border-radius:16px;padding:12px 14px;margin-bottom:24px;position:sticky;top:0;z-index:20;backdrop-filter:blur(16px);box-shadow:0 4px 24px -4px rgba(0,0,0,.4);}
  .fb-group{display:flex;align-items:center;gap:8px;padding:4px 6px;}
  .fb-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#475569;white-space:nowrap;}
  .fb-select{appearance:none;-webkit-appearance:none;padding:8px 30px 8px 12px;background:rgba(15,15,23,.95);border:1px solid rgba(148,163,184,.1);border-radius:10px;color:#e2e8f0;font-size:12px;font-weight:500;font-family:'Inter',sans-serif;outline:none;cursor:pointer;transition:all .18s;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;min-width:0;}
  .fb-select:hover{border-color:rgba(124,58,237,.4);background-color:rgba(20,20,30,.95);}
  .fb-select:focus{border-color:rgba(124,58,237,.6);box-shadow:0 0 0 3px rgba(124,58,237,.12);}
  .fb-input{padding:8px 12px;background:rgba(15,15,23,.95);border:1px solid rgba(148,163,184,.1);border-radius:10px;color:#e2e8f0;font-size:12px;font-family:'JetBrains Mono',monospace;outline:none;transition:all .18s;width:168px;min-width:0;}
  .fb-input:hover{border-color:rgba(148,163,184,.2);}
  .fb-input:focus{border-color:rgba(124,58,237,.6);box-shadow:0 0 0 3px rgba(124,58,237,.12);}
  .fb-btn{padding:9px 20px;background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;letter-spacing:.3px;white-space:nowrap;min-width:80px;text-align:center;}
  .fb-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px -6px rgba(124,58,237,.5);}
  .fb-btn:active{transform:translateY(0);box-shadow:none;}
  .fb-quick{display:flex;gap:3px;}
  .fb-quick button{padding:7px 13px;background:rgba(148,163,184,.04);border:1px solid rgba(148,163,184,.08);border-radius:8px;color:#94a3b8;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:inherit;}
  .fb-quick button:hover{background:rgba(124,58,237,.08);border-color:rgba(124,58,237,.25);color:#cbd5e1;}
  .fb-quick button.on{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.45);color:#a78bfa;box-shadow:0 0 12px -4px rgba(124,58,237,.4);}
  .fb-live{display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:10px;font-size:11px;font-weight:600;color:#64748b;cursor:pointer;user-select:none;transition:all .18s;border:1px solid transparent;}
  .fb-live:hover{color:#94a3b8;background:rgba(52,211,153,.05);}
  .fb-live .pulse{width:8px;height:8px;border-radius:50%;background:#475569;transition:all .3s;}
  .fb-live.on{color:#34d399;border-color:rgba(52,211,153,.2);background:rgba(52,211,153,.06);}
  .fb-live.on .pulse{background:#34d399;box-shadow:0 0 10px rgba(52,211,153,.7);animation:livePulse 1.8s infinite;}
  @keyframes livePulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.8);}}
  @media(max-width:1200px){.fb-input{width:150px;}}
  @media(max-width:900px){.filter-bar{padding:10px 12px;gap:8px;}.fb-group{padding:3px 4px;gap:6px;}.fb-label{display:none;}.fb-input{width:140px;}.fb-quick button{padding:6px 10px;font-size:10px;}}
  @media(max-width:680px){.filter-bar{border-radius:12px;padding:10px;}.fb-group{flex:1 1 calc(50% - 8px);}.fb-input{width:100%;}.fb-select{width:100%;}.fb-quick{flex-wrap:wrap;}.fb-btn{width:100%;text-align:center;}}
  @media(max-width:480px){.fb-group{flex:1 1 100%;}.fb-quick button{padding:6px 8px;font-size:9px;}}`;
}

export function getInfraPage() {
  const css = layoutCSS() + infraCSS() + metricsCSS() + erCSS() + flowCSS() + devCSS() + toastCSS() + tabsCSS() + tableCSS() + filterBarCSS();
  return head("Infrastructure — Log Admin", css, true) + `<body><div class="shell">${sidebar("infrastructure")}<main class="main">
<h1>Infrastructure & Database</h1>
<p class="desc">ER schema · architecture · cluster metrics — logs retained 7 days · hover charts for exact values</p>

<div class="grid3">
<div class="panel"><div class="metric"><div class="val">6</div><div class="lbl">Microservices</div></div></div>
<div class="panel"><div class="metric"><div class="val">7</div><div class="lbl">DB Tables (1 shared DB)</div></div></div>
<div class="panel"><div class="metric"><div class="val">99.9%</div><div class="lbl">Uptime (7d)</div></div></div>
</div>

<div class="filter-bar">
  <div class="fb-group">
    <span class="fb-label">Service</span>
    <select class="fb-select" id="sysSvc" onchange="reload()"><option value="all">All Services</option>${Object.keys(LOG_DIRS).map((s) => `<option value="${s}">${s}</option>`).join("")}</select>
  </div>
  <div class="fb-group">
    <span class="fb-label">From</span>
    <input type="datetime-local" class="fb-input" id="from" step="1">
  </div>
  <div class="fb-group">
    <span class="fb-label">To</span>
    <input type="datetime-local" class="fb-input" id="to" step="1">
  </div>
  <div class="fb-group">
    <span class="fb-label">Resolution</span>
    <select class="fb-select" id="res"><option value="10sec">10s</option><option value="min">1m</option><option value="5min" selected>5m</option><option value="15min">15m</option><option value="hour">1h</option></select>
  </div>
  <div class="fb-group">
    <button class="fb-btn" onclick="reload()">Apply</button>
  </div>
  <div class="fb-group">
    <div class="fb-quick" id="quick"><button data-r="6h">6h</button><button data-r="24h" class="on">24h</button><button data-r="3d">3d</button><button data-r="7d">7d</button></div>
  </div>
  <div class="fb-group">
    <div class="fb-live" id="live" onclick="toggleLive()"><span class="pulse"></span> Live</div>
  </div>
</div>

<div class="tabs">
  <button class="tab-btn on" data-t="db" onclick="showTab('db',this)">🗄️ Databases</button>
  <button class="tab-btn" data-t="kafka" onclick="showTab('kafka',this)">📨 Kafka</button>
  <button class="tab-btn" data-t="redis" onclick="showTab('redis',this)">⚡ Redis</button>
</div>

<!-- DATABASES TAB (fully dynamic — introspected from DATABASE_URL) -->
<div class="tabp show" data-t="db">
<div class="grid3" id="db-kpis"></div>
<div class="panel" style="margin-bottom:24px;">
<h3 style="align-items:center;"><span class="dot"></span>Database ER Diagram <span style="font-weight:400;text-transform:none;color:#475569;font-size:11px;margin-left:8px;" id="er-sub">introspected live</span>
  <span class="er-tools"><button onclick="erZoom(1.25)" title="Zoom in">＋</button><button onclick="erZoom(0.8)" title="Zoom out">－</button><button onclick="erReset()" title="Reset">⟲</button></span>
</h3>
<div id="er-host" class="er-wrap" style="display:flex;align-items:center;justify-content:center;color:#475569">Loading schema…</div>
<div class="er-legend"><span id="er-legend-tables" style="color:#94a3b8;margin-right:8px;"></span><span style="margin-left:12px;color:#fbbf24;">PK</span> Primary<span style="color:#60a5fa;">FK</span> Foreign<span style="color:#34d399;">UQ</span> Unique</div>
</div>

<div class="subhead"><span class="ic" style="background:rgba(51,103,145,.18)">🐘</span> Live Database Metrics <span class="tag" id="db-conn-tag">sampled every 5s from connection</span></div>
<div class="mgrid">
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#34d399"></span>Connection Pool</div><div class="ch-stat" id="dbconn-stat"></div></div><div class="ch-box"><canvas id="dbConnC"></canvas></div><div class="ch-hint">total connections used out of max_connections limit · pg_stat_activity</div></div>
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#60a5fa"></span>Transactions / sec</div><div class="ch-stat" id="dbtps-stat"></div></div><div class="ch-box"><canvas id="dbTpsC"></canvas></div><div class="ch-hint">rate of commits + rollbacks per second · pg_stat_database</div></div>
</div>
<div class="mgrid">
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#a78bfa"></span>Cache Hit Ratio</div><div class="ch-stat" id="dbhit-stat"></div></div><div class="ch-box"><canvas id="dbHitC"></canvas></div><div class="ch-hint">% of data reads served from memory (higher = better) · target > 99%</div></div>
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#f59e0b"></span>Active vs Idle Connections</div><div class="ch-stat" id="dbact-stat"></div></div><div class="ch-box"><canvas id="dbActC"></canvas></div><div class="ch-hint">active = running queries · idle = waiting for work · pg_stat_activity</div></div>
</div>

<div class="panel" style="margin-bottom:24px;">
  <h3><span class="dot" style="background:#f59e0b"></span>Top Queries by Total Execution Time <span style="font-weight:400;text-transform:none;color:#475569;font-size:11px;" id="qtable-src">live · pg_stat_statements</span></h3>
  <div class="tbl-wrap"><table><thead><tr><th>Query</th><th>Calls</th><th>Mean ms</th><th>Total ms</th><th>Rows</th></tr></thead><tbody id="qtable"></tbody></table></div>
</div>
<div class="panel" style="margin-bottom:24px;">
  <h3><span class="dot" style="background:#60a5fa"></span>Indexes <span style="font-weight:400;text-transform:none;color:#475569;font-size:11px;">from pg_indexes</span></h3>
  <ul class="note-list" id="idx-list"></ul>
</div>
<div class="subhead"><span class="ic" style="background:rgba(245,158,11,.15)">📈</span> Tuple Activity <span class="tag" id="tuple-tag">cumulative since last stats reset</span></div>
<div class="db-tuples" id="db-tuples"></div>
</div>

<!-- KAFKA TAB -->
<div class="tabp" data-t="kafka">
<div class="subhead"><span class="ic" style="background:rgba(236,72,153,.15)">📨</span> Kafka — Event Streaming <span class="tag">kafkajs · broker :9092</span></div>
<div class="mgrid">
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#ec4899"></span>Message Throughput</div><div class="ch-stat" id="kf-stat"></div></div><div class="ch-box"><canvas id="kfC"></canvas></div><div class="ch-hint">messages published / bucket · producers: auth · user · job · payment</div></div>
  <div class="panel">
    <h3><span class="dot" style="background:#ec4899"></span>Topics & Consumers</h3>
    <ul class="note-list">
      <li><b>send-mail</b> — 1 partition · group <code>mail-service-group</code> · payload <code>{to,subject,html}</code></li>
      <li><b>upload-content</b> — 2 partitions · payload <code>{entityId,uploadType,file,...}</code></li>
      <li><b>Producers</b> — auth, user, job, payment · LegacyPartitioner · auto-connect</li>
      <li><b>Consumers</b> — Utils only · <code>fromBeginning:false</code></li>
    </ul>
  </div>
</div>
</div>

<!-- REDIS TAB -->
<div class="tabp" data-t="redis">
<div class="subhead"><span class="ic" style="background:rgba(220,38,38,.15)">⚡</span> Redis — Cache & Rate Limiting <span class="tag">ioredis + node-redis · Upstash :6379</span></div>
<div class="mgrid">
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#dc2626"></span>Operations <span style="font-weight:400;color:#475569;font-size:10px;">(est.)</span></div><div class="ch-stat" id="rd-stat"></div></div><div class="ch-box"><canvas id="rdOpsC"></canvas></div><div class="ch-hint">≈ 1 rate-limit op / request + AI-quota + cache · from request logs</div></div>
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#f59e0b"></span>Operation Breakdown</div><div class="ch-stat" id="rdbreak-stat"></div></div><div class="ch-box"><canvas id="rdBreakC"></canvas></div><div class="ch-hint">rate-limit (gateway reqs) · AI-quota (×4) · cache (service ops)</div></div>
</div>
</div>


${devReferenceHTML()}

</main></div>
<script>${chartClientJS()}${toastJS()}${rangeGuardJS()}
let charts={},liveMode=false,liveTimer=null;
function pad(n){return String(n).padStart(2,'0');}
function toLocal(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());}
function setRange(r){const to=new Date();const map={'6h':21600,'24h':86400,'3d':259200,'7d':604800};const from=new Date(to.getTime()-map[r]*1000);document.getElementById('from').value=toLocal(from);document.getElementById('to').value=toLocal(to);document.getElementById('res').value={'6h':'min','24h':'5min','3d':'15min','7d':'hour'}[r];}
document.querySelectorAll('#quick button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#quick button').forEach(x=>x.classList.remove('on'));b.classList.add('on');setRange(b.dataset.r);reload();});
function toggleLive(){liveMode=!liveMode;document.getElementById('live').classList.toggle('on',liveMode);if(liveMode){liveTimer=setInterval(()=>{const on=document.querySelector('#quick button.on');if(on)setRange(on.dataset.r);reload();},5000);toast('Live refresh enabled','ok');}else{clearInterval(liveTimer);liveTimer=null;toast('Live refresh paused','info');}}
function showTab(t,btn){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('on'));btn.classList.add('on');document.querySelectorAll('.tabp').forEach(p=>p.classList.toggle('show',p.dataset.t===t));
  document.querySelectorAll('.tabp[data-t="'+t+'"] canvas').forEach(c=>{const ch=Chart.getChart(c);if(ch)setTimeout(()=>ch.resize(),60);});}
async function reload(){
  const btn=document.querySelector('.fb-btn');if(btn){btn.textContent='Loading…';btn.style.opacity='.7';btn.style.pointerEvents='none';}
  const fromEl=document.getElementById('from'),toEl=document.getElementById('to'),res=document.getElementById('res').value;
  const svc=document.getElementById('sysSvc').value;
  const g=rangeGuard(fromEl.value,toEl.value);if(!g){if(btn){btn.textContent='Apply';btn.style.opacity='1';btn.style.pointerEvents='auto';}return;}
  if(g.clamped){fromEl.value=toLocal(g.from);toEl.value=toLocal(g.to);}
  const q=new URLSearchParams({from:g.from.toISOString(),to:g.to.toISOString(),resolution:res});
  const d=await (await fetch('/api/metrics/'+svc+'?'+q)).json();const s=d.series;
  if(btn){btn.textContent='✓ Applied';btn.style.opacity='1';btn.style.pointerEvents='auto';setTimeout(()=>{btn.textContent='Apply';},1200);}
  document.getElementById('kf-stat').innerHTML='total: <b>'+d.totals.kafka+'</b>  peak: <b>'+d.peakKafka+'</b>/bkt';
  document.getElementById('rd-stat').innerHTML='total: <b>'+d.totals.redis+'</b>  peak: <b>'+d.peakRedis+'</b>/bkt';
  document.getElementById('rdbreak-stat').innerHTML='RL: <b>'+d.totals.rlOps+'</b>  AI: <b>'+d.totals.aiOps+'</b>  cache: <b>'+d.totals.cacheOps+'</b>';
  drawLine('kfC','kafka',s,'#ec4899','');drawLine('rdOpsC','redis',s,'#dc2626','');
  charts['rdBreakC']&&charts['rdBreakC'].destroy();charts['rdBreakC']=cleanLineChart('rdBreakC',[mline('Rate-limit','#dc2626',s,'rlOps',true),mline('AI-quota','#f59e0b',s,'aiOps',false),mline('Cache','#34d399',s,'cacheOps',false)],'');
}
// ── DYNAMIC DB SECTION — everything below is introspected live from DATABASE_URL ──
function esc(t){return(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function destroy(id){if(charts[id]){charts[id].destroy();delete charts[id];}}
function drawLine(id,key,data,color,unit,max){destroy(id);charts[id]=cleanLineChart(id,[lineDS(key.toUpperCase(),color,data,key)],unit,max);}
function drawVol(id,data){destroy(id);charts[id]=cleanLineChart(id,[mline('Requests','#3b82f6',data,'requests',true),mline('Warnings','#f59e0b',data,'warnings',false),mline('Errors','#ef4444',data,'errors',false)],'');}
${erDynamicJS()}
function fmtBytes(b){if(!b)return '0 B';const u=['B','KB','MB','GB','TB'];const i=Math.floor(Math.log(b)/Math.log(1024));return (b/Math.pow(1024,i)).toFixed(1)+' '+u[i];}
async function loadSchema(){
  try{
    const r=await fetch('/api/db/schema');
    if(!r.ok){document.getElementById('er-host').innerHTML='<span>Set DATABASE_URL to introspect the schema</span>';return;}
    const sc=await r.json();
    document.getElementById('er-host').innerHTML=erBuild(sc);erInit();
    document.getElementById('er-sub').textContent=sc.tables.length+' tables · '+sc.relations.length+' FK relations · introspected live';
    document.getElementById('er-legend-tables').innerHTML='<b>'+sc.tables.length+'</b> tables · <b>'+sc.relations.length+'</b> foreign keys · <b>'+sc.indexes.length+'</b> indexes';
    document.getElementById('idx-list').innerHTML=sc.indexes.length?sc.indexes.map(i=>'<li><b>'+i.table+'</b> · <code>'+esc(i.name)+'</code> '+esc(i.def)+'</li>').join(''):'<li style="color:#475569">No secondary indexes</li>';
  }catch(e){document.getElementById('er-host').innerHTML='<span>Schema unavailable: '+esc(e.message)+'</span>';}
}
let dbPrev=null,connHist=[],tpsHist=[],hitHist=[],actHist=[],idleHist=[];
function pushH(arr,t,y){arr.push({t,y});if(arr.length>60)arr.shift();}
function liveChart(id,arr,color,unit,max,label){destroy(id);charts[id]=cleanLineChart(id,[{label,data:arr.map(p=>({x:p.t,y:p.y})),borderColor:color,backgroundColor:(c)=>area(c.chart.ctx,color),borderWidth:2,fill:true,tension:.35,pointRadius:0,pointHoverRadius:4}],unit,max);}
async function pollDb(){
  try{
    const r=await fetch('/api/db/stats');if(!r.ok)return;
    const d=await r.json();const now=Date.now();
    document.getElementById('db-conn-tag').textContent=d.database+' · PostgreSQL '+d.version+' · sampled 5s';
    document.getElementById('db-kpis').innerHTML=[
      ['Connections',d.connections.total+' / '+d.connections.max,'#34d399'],
      ['Cache Hit',d.cacheHitRatio+'%','#a78bfa'],
      ['DB Size',fmtBytes(d.sizeBytes),'#60a5fa'],
      ['Active / Idle',d.connections.active+' / '+d.connections.idle,'#f59e0b'],
      ['Commits',Number(d.commits).toLocaleString(),'#34d399'],
      ['Rollbacks',Number(d.rollbacks).toLocaleString(),d.rollbacks>0?'#f87171':'#64748b'],
    ].map(([l,v,c])=>'<div class="panel"><div class="metric"><div class="val" style="color:'+c+';font-size:22px">'+v+'</div><div class="lbl">'+l+'</div></div></div>').join('');
    if(d.tuples){document.getElementById('db-tuples').innerHTML=[
      ['Returned',d.tuples.returned,'#60a5fa'],['Fetched',d.tuples.fetched,'#3b82f6'],
      ['Inserted',d.tuples.inserted,'#34d399'],['Updated',d.tuples.updated,'#f59e0b'],['Deleted',d.tuples.deleted,'#f87171'],
    ].map(([l,v,c])=>'<div class="tp"><div class="tv" style="color:'+c+'">'+Number(v).toLocaleString()+'</div><div class="tl">'+l+'</div></div>').join('');}
    pushH(connHist,now,d.connections.total);pushH(hitHist,now,d.cacheHitRatio);
    pushH(actHist,now,d.connections.active);pushH(idleHist,now,d.connections.idle);
    if(dbPrev){const dt=(now-dbPrev.t)/1000;const tps=Math.max(0,((d.commits+d.rollbacks)-(dbPrev.commits+dbPrev.rollbacks))/dt);pushH(tpsHist,now,+tps.toFixed(2));}
    dbPrev={t:now,commits:d.commits,rollbacks:d.rollbacks};
    document.getElementById('dbconn-stat').innerHTML='<b>'+d.connections.total+'</b> / '+d.connections.max+' used';
    document.getElementById('dbtps-stat').innerHTML=tpsHist.length?'<b>'+tpsHist[tpsHist.length-1].y+'</b> tx/s':'sampling…';
    document.getElementById('dbhit-stat').innerHTML='<b>'+d.cacheHitRatio+'%</b>'+(d.cacheHitRatio>=99?' ✓ healthy':d.cacheHitRatio>=95?' ⚠ ok':' ✕ low');
    document.getElementById('dbact-stat').innerHTML='active: <b>'+d.connections.active+'</b>  idle: <b>'+d.connections.idle+'</b>';
    liveChart('dbConnC',connHist,'#34d399','',d.connections.max,'Connections');
    liveChart('dbTpsC',tpsHist,'#60a5fa','',undefined,'TPS');
    liveChart('dbHitC',hitHist,'#a78bfa','%',100,'Cache Hit %');
    destroy('dbActC');charts['dbActC']=cleanLineChart('dbActC',[{label:'Active',data:actHist.map(p=>({x:p.t,y:p.y})),borderColor:'#f59e0b',backgroundColor:(c)=>area(c.chart.ctx,'#f59e0b'),borderWidth:2,fill:true,tension:.35,pointRadius:0,pointHoverRadius:4},{label:'Idle',data:idleHist.map(p=>({x:p.t,y:p.y})),borderColor:'#64748b',backgroundColor:'transparent',borderWidth:1.5,fill:false,tension:.35,pointRadius:0,pointHoverRadius:3,borderDash:[4,4]}],'');
    const qt=document.getElementById('qtable'),src=document.getElementById('qtable-src');
    if(d.topQueries&&d.topQueries.length){src.textContent=d.pgStatStatements?'live · pg_stat_statements':'live · pg_stat_activity';
      qt.innerHTML=d.topQueries.map(q=>'<tr><td style="font-family:JetBrains Mono;font-size:10.5px;max-width:420px;color:#cbd5e1" title="'+esc(q.query)+'">'+esc(q.query.length>110?q.query.slice(0,110)+'…':q.query)+'</td><td>'+q.calls.toLocaleString()+'</td><td>'+q.meanMs+'</td><td>'+q.totalMs.toLocaleString()+'</td><td>'+q.rows.toLocaleString()+'</td></tr>').join('');
    }else{src.textContent='no query data available';qt.innerHTML='<tr><td colspan="5" style="color:#64748b;padding:18px">No active queries detected. Queries will appear here when the database is under load.</td></tr>';}
  }catch(e){}
}
setRange('24h');reload();
loadSchema();pollDb();setInterval(pollDb,5000);
</script></body></html>`;
}
