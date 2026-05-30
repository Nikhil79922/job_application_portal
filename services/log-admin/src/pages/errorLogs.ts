import { head, layoutCSS, sidebar, tableCSS } from "./shared";
import { LOG_DIRS } from "../config";

export function getErrorLogsPage() {
  const svcList = JSON.stringify(Object.keys(LOG_DIRS));
  return head("Error Logs — Log Admin", layoutCSS() + tableCSS() + errorCSS()) + `<body><div class="shell">${sidebar("error-logs")}<main class="main"><h1>Error Logs</h1><p class="desc">Aggregated errors across all services — click a row to expand details</p>
<div class="toolbar">
<select id="svc"><option value="">All Services</option></select>
<input type="date" id="dt">
<input type="text" id="q" placeholder="Search errors...">
<button class="btn-search" onclick="go()">Search</button>
</div>
<div class="tbl-wrap"><div class="tbl-scroll" id="tbl"><div class="empty">Loading...</div></div></div>
<div class="pager" id="pgr"></div>
</main></div><script>
const ALL_SVCS=${svcList};let pg=1;
async function init(){const r=await fetch('/api/services');const s=await r.json();const el=document.getElementById('svc');s.forEach(x=>{if(x.available){const o=document.createElement('option');o.value=x.name;o.text=x.name;el.add(o)}});go()}
async function go(p=1){pg=p;const svc=document.getElementById('svc').value,dt=document.getElementById('dt').value,q=document.getElementById('q').value;
const svcs=svc?[svc]:ALL_SVCS;let all=[];
for(const s of svcs){const r=await fetch('/api/logs/'+s+'?'+new URLSearchParams({page:'1',limit:'500',level:'error',date:dt,search:q}));const d=await r.json();all=all.concat(d.logs.map(l=>({...l,service:l.service||s})))}
all.sort((a,b)=>new Date(b.timestamp).getTime()-new Date(a.timestamp).getTime());
const total=all.length,lim=50,start=(p-1)*lim;render({logs:all.slice(start,start+lim),total,page:p,totalPages:Math.ceil(total/lim)})}
function render(d){const el=document.getElementById('tbl');if(!d.logs.length){el.innerHTML='<div class="empty">No errors found 🎉</div>';document.getElementById('pgr').innerHTML='';return}
el.innerHTML='<table><thead><tr><th style="width:34px"></th><th style="width:170px">Timestamp</th><th style="width:70px">Level</th><th style="width:96px">Service</th><th>Message</th><th style="width:220px">Request ID</th></tr></thead><tbody>'+d.logs.map((l,i)=>
'<tr class="row-error err-main" onclick="tog('+i+')"><td class="chev" id="cv'+i+'">▶</td><td class="ts">'+(l.timestamp||'')+'</td><td><span class="badge b-error">ERROR</span></td><td>'+(l.service||'')+'</td><td class="err-msg">'+esc(l.message||'')+'</td><td class="ts">'+(l.requestId||l.request_id||'—')+'</td></tr>'+
'<tr class="err-detail" id="dt'+i+'"><td></td><td colspan="5">'+detail(l)+'</td></tr>'
).join('')+'</tbody></table>';
const pg2=document.getElementById('pgr');let h='';if(d.page>1)h+='<button onclick="go('+(d.page-1)+')">← Previous</button>';h+='<span>Page '+d.page+' of '+d.totalPages+' ('+d.total+' errors)</span>';if(d.page<d.totalPages)h+='<button onclick="go('+(d.page+1)+')">Next →</button>';pg2.innerHTML=h}
function tog(i){const d=document.getElementById('dt'+i),c=document.getElementById('cv'+i),open=!d.classList.contains('open');d.classList.toggle('open',open);c.classList.toggle('open',open)}
function detail(l){const url=l.url||l.path;let h='';
if(url)h+='<div class="dk"><span class="dl">URL</span><span class="dv">'+esc(url)+'</span></div>';
if(l.stack)h+='<div class="dk"><span class="dl">Stack Trace</span><pre class="err-pre">'+esc(l.stack)+'</pre></div>';
const skip=['timestamp','level','message','service','requestId','request_id','url','path','stack'];const o={};Object.keys(l).forEach(k=>{if(!skip.includes(k))o[k]=l[k]});
if(Object.keys(o).length)h+='<div class="dk"><span class="dl">Metadata</span><pre class="err-pre">'+esc(JSON.stringify(o,null,2))+'</pre></div>';
return h||'<div class="dempty">No additional details</div>'}
function esc(t){return(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
init();</script></body></html>`;
}

function errorCSS() {
  return `.err-main{cursor:pointer;}
  .err-main:hover td{background:rgba(248,113,113,.04);}
  .chev{color:#64748b;font-size:9px;text-align:center;transition:transform .15s;user-select:none;}
  .chev.open{transform:rotate(90deg);color:#f87171;}
  .err-msg{color:#fca5a5;font-weight:500;max-width:560px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .err-detail{display:none;}
  .err-detail.open{display:table-row;}
  .err-detail>td{background:rgba(248,113,113,.03);padding:18px 22px;border-bottom:1px solid rgba(148,163,184,.06);}
  .dk{margin-bottom:14px;}
  .dk:last-child{margin-bottom:0;}
  .dl{display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#64748b;margin-bottom:6px;}
  .dv{font-family:'JetBrains Mono',monospace;font-size:12px;color:#e2e8f0;word-break:break-all;}
  .err-pre{font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.6;color:#fca5a5;background:rgba(15,15,23,.7);border:1px solid rgba(248,113,113,.12);border-radius:8px;padding:12px 14px;max-height:260px;overflow:auto;white-space:pre-wrap;word-break:break-word;}
  .dempty{color:#475569;font-size:12px;}`;
}
