import { head, layoutCSS, sidebar, tableCSS } from "./shared";

export function getServiceLogsPage() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (x: Date) => `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`;
  const maxD = fmt(now), minD = fmt(new Date(now.getTime() - 7 * 86400000));
  return head("Service Logs — Log Admin", layoutCSS() + tableCSS() + extraCSS()) + `<body><div class="shell">${sidebar("service-logs")}<main class="main">
<h1>Service Logs</h1>
<p class="desc">Server-side search · debounced · cursor-paginated · virtualized — logs retained 7 days (${minD} → ${maxD})</p>
<div class="toolbar">
  <select id="svc" onchange="reset()"><option value="api-gateway">api-gateway</option></select>
  <select id="lvl" onchange="reset()"><option value="all">All Levels</option><option value="error">Error</option><option value="warn">Warn</option><option value="info">Info</option><option value="http">HTTP</option><option value="debug">Debug</option></select>
  <input type="date" id="date" min="${minD}" max="${maxD}" title="Logs retained for 7 days only" onchange="reset()">
  <input type="text" id="reqid" placeholder="Correlation / Request ID" oninput="debounced()">
  <input type="text" id="search" placeholder="Search message / metadata…" oninput="debounced()" style="min-width:240px">
  <span class="count" id="count"></span>
</div>
<div class="tbl-wrap"><div class="tbl-scroll" id="scroll"><table><thead><tr><th style="width:180px">Timestamp</th><th style="width:80px">Level</th><th style="width:90px">Service</th><th>Message</th><th style="width:240px">Request ID</th><th style="width:300px">Metadata</th></tr></thead><tbody id="body"></tbody></table><div id="sentinel" style="height:1px"></div><div id="status" class="loadmore"></div></div></div>
</main></div>
<script>
let svc='api-gateway',cursor=0,total=0,loading=false,done=false,seq=0;
const ROW_BUFFER=[];
function reset(){
  svc=document.getElementById('svc').value;
  cursor=0;total=0;done=false;document.getElementById('body').innerHTML='';
  load();
}
let dt=null;
function debounced(){clearTimeout(dt);dt=setTimeout(reset,300);} // 300ms debounce → no per-keystroke scans
function params(extra){
  const p=new URLSearchParams({limit:'60',cursor:String(cursor),
    level:document.getElementById('lvl').value,
    date:document.getElementById('date').value,
    requestId:document.getElementById('reqid').value.trim(),
    search:document.getElementById('search').value.trim(),...extra});
  return p;
}
async function load(){
  if(loading||done)return;loading=true;
  const mySeq=++seq;
  document.getElementById('status').textContent='Loading…';
  const d=await (await fetch('/api/logs/'+svc+'?'+params())).json();
  if(mySeq!==seq){loading=false;return;} // stale response guard (debounce race)
  total=d.total;
  document.getElementById('count').textContent=total.toLocaleString()+' logs';
  appendRows(d.logs);
  if(d.nextCursor===null){done=true;document.getElementById('status').textContent=total?'— end —':'No logs found';}
  else{cursor=d.nextCursor;document.getElementById('status').textContent='';}
  loading=false;
}
function appendRows(logs){
  const body=document.getElementById('body');
  const frag=document.createDocumentFragment();
  for(const l of logs){
    const tr=document.createElement('tr');tr.className='row-'+(l.level||'');
    tr.innerHTML='<td class="ts">'+(l.timestamp||'')+'</td><td><span class="badge b-'+(l.level||'')+'">'+(l.level||'')+'</span></td><td>'+(l.service||'')+'</td><td>'+esc(l.message||'')+'</td><td class="ts">'+(l.requestId||'—')+'</td><td class="meta">'+meta(l)+'</td>';
    frag.appendChild(tr);
  }
  body.appendChild(frag);
  trim();
}
// Virtualization: cap DOM to last ~600 rows (drop from top) to keep scrolling smooth on huge datasets.
function trim(){const body=document.getElementById('body');const MAX=600;while(body.children.length>MAX)body.removeChild(body.firstChild);}
function meta(l){const skip=['timestamp','level','message','service','requestId'];const o={};Object.keys(l).forEach(k=>{if(!skip.includes(k))o[k]=l[k];});const s=JSON.stringify(o);return s.length>2?esc(s.slice(0,180)):'—';}
function esc(t){return(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
// IntersectionObserver infinite scroll (loads next cursor page when sentinel visible)
const io=new IntersectionObserver((e)=>{if(e[0].isIntersecting)load();},{root:document.getElementById('scroll'),rootMargin:'200px'});
io.observe(document.getElementById('sentinel'));
fetch('/api/services').then(r=>r.json()).then(s=>{const el=document.getElementById('svc');s.forEach(x=>{if(x.available&&x.name!=='api-gateway'){const o=document.createElement('option');o.value=x.name;o.text=x.name;el.add(o);}});load();});
</script></body></html>`;
}

function extraCSS() {
  return `.count{margin-left:auto;font-size:12px;color:#64748b;font-family:'JetBrains Mono',monospace;}
  .loadmore{text-align:center;padding:16px;color:#475569;font-size:12px;font-family:'JetBrains Mono',monospace;}`;
}
