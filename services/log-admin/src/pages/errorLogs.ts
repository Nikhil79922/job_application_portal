import { head, layoutCSS, sidebar, tableCSS } from "./shared";
import { LOG_DIRS } from "../config";

export function getErrorLogsPage() {
  const svcList = JSON.stringify(Object.keys(LOG_DIRS));
  return head("Error Logs — Log Admin", layoutCSS() + tableCSS()) + `<body><div class="shell">${sidebar("error-logs")}<main class="main"><h1>Error Logs</h1><p class="desc">Aggregated errors across all services</p>
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
el.innerHTML='<table><thead><tr><th>Timestamp</th><th>Level</th><th>Service</th><th>Message</th><th>Request ID</th><th>URL</th><th>Stack / Details</th></tr></thead><tbody>'+d.logs.map(l=>'<tr class="row-error"><td class="ts">'+(l.timestamp||'')+'</td><td><span class="badge b-error">ERROR</span></td><td>'+(l.service||'')+'</td><td>'+esc(l.message||'')+'</td><td class="ts">'+(l.requestId||l.request_id||'—')+'</td><td>'+esc(l.url||l.path||'—')+'</td><td class="meta">'+errMeta(l)+'</td></tr>').join('')+'</tbody></table>';
const pg2=document.getElementById('pgr');let h='';if(d.page>1)h+='<button onclick="go('+(d.page-1)+')">← Previous</button>';h+='<span>Page '+d.page+' of '+d.totalPages+' ('+d.total+' errors)</span>';if(d.page<d.totalPages)h+='<button onclick="go('+(d.page+1)+')">Next →</button>';pg2.innerHTML=h}
function errMeta(l){const skip=['timestamp','level','message','service','requestId','request_id','url','path'];let parts=[];if(l.stack)parts.push(l.stack.slice(0,200));const o={};Object.keys(l).forEach(k=>{if(!skip.includes(k)&&k!=='stack')o[k]=l[k]});const s=JSON.stringify(o);if(s.length>2)parts.push(s.slice(0,150));return esc(parts.join(' | ')||'—')}
function esc(t){return(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
init();</script></body></html>`;
}
