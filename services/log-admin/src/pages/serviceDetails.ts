import { head, layoutCSS, sidebar, tableCSS, metricsCSS, chartClientJS, toastCSS, toastJS, rangeGuardJS } from "./shared";
import { LOG_DIRS } from "../config";

export function getServiceDetailsPage() {
  const services = JSON.stringify(Object.keys(LOG_DIRS));
  const css = layoutCSS() + tableCSS() + metricsCSS() + extraCSS() + toastCSS();
  return head("Service Details — Log Admin", css, true) + `<body><div class="shell">${sidebar("service-details")}<main class="main">
<h1>Service Details</h1>
<p class="desc">Per-service metrics — hover any point for exact values · drag to zoom · shift+drag to pan</p>

<div class="tr-bar">
  <label>Service</label><select id="svc" onchange="reload()"></select>
  <div class="sep"></div>
  <label>From</label><input type="datetime-local" id="from" step="1">
  <label>To</label><input type="datetime-local" id="to" step="1">
  <label>Res</label>
  <select id="res">
    <option value="sec">1 sec</option><option value="10sec">10 sec</option>
    <option value="min" selected>1 min</option><option value="5min">5 min</option>
    <option value="15min">15 min</option><option value="hour">1 hour</option>
  </select>
  <button class="apply" onclick="manual()">Apply</button>
  <div class="sep"></div>
  <div class="quick" id="quick">
    <button data-r="1h">1h</button><button data-r="6h">6h</button>
    <button data-r="24h" class="on">24h</button><button data-r="3d">3d</button><button data-r="7d">7d</button>
  </div>
  <div class="sep"></div>
  <div class="live" id="live" onclick="toggleLive()"><span class="ld"></span> Live</div>
</div>

<div class="health-bar" id="health"><span class="health-dot"></span> Loading…</div>
<div class="cards" id="cards"></div>

<div class="mgrid">
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#7c3aed"></span>CPU Utilization</div><div class="ch-stat" id="cpu-stat"></div></div><div class="ch-box"><canvas id="cpuC"></canvas></div><div class="ch-hint">% · drag to zoom · dbl-click chart to reset</div></div>
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#3b82f6"></span>Memory Utilization</div><div class="ch-stat" id="mem-stat"></div></div><div class="ch-box"><canvas id="memC"></canvas></div><div class="ch-hint">% of allocated</div></div>
</div>

<div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#60a5fa"></span>Request / Error / Warning Volume</div><div class="ch-stat" id="vol-stat"></div></div><div class="ch-box"><canvas id="volC"></canvas></div><div class="ch-hint">count per bucket · hover for breakdown</div></div>

<div class="mgrid">
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#f59e0b"></span>Latency (avg response)</div><div class="ch-stat" id="lat-stat"></div></div><div class="ch-box sm"><canvas id="latC"></canvas></div><div class="ch-hint">ms</div></div>
  <div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#ef4444"></span>Error Rate</div><div class="ch-stat" id="errr-stat"></div></div><div class="ch-box sm"><canvas id="errC"></canvas></div><div class="ch-hint">errors as % of requests</div></div>
</div>

<div class="chart-card"><div class="ch-head"><div class="ch-title"><span class="dot" style="background:#34d399"></span>Instance Logs (latest 25)</div></div>
<div class="tbl-wrap"><div class="tbl-scroll" id="logs"><div class="empty">Loading…</div></div></div></div>

</main></div>
<script>${chartClientJS()}${toastJS()}${rangeGuardJS()}
const SVCS=${services};let charts={},live=false,liveTimer=null,curRange='24h';
function pad(n){return String(n).padStart(2,'0');}
function toLocal(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());}
function setRange(r){
  const to=new Date();let from=new Date();
  const map={'1h':3600,'6h':21600,'24h':86400,'3d':259200,'7d':604800};
  from=new Date(to.getTime()-map[r]*1000);
  document.getElementById('from').value=toLocal(from);
  document.getElementById('to').value=toLocal(to);
  const res={'1h':'10sec','6h':'min','24h':'5min','3d':'15min','7d':'hour'}[r];
  document.getElementById('res').value=res;
}
function initSvc(){fetch('/api/services').then(r=>r.json()).then(s=>{const el=document.getElementById('svc');s.forEach(x=>{const o=document.createElement('option');o.value=x.name;o.text=x.name+(x.available?'':' (offline)');el.add(o);});reload();});}
document.querySelectorAll('#quick button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#quick button').forEach(x=>x.classList.remove('on'));b.classList.add('on');curRange=b.dataset.r;setRange(b.dataset.r);reload();});
function manual(){document.querySelectorAll('#quick button').forEach(x=>x.classList.remove('on'));reload();}
function toggleLive(){live=!live;document.getElementById('live').classList.toggle('on',live);if(live){liveTimer=setInterval(()=>{if(['1h','6h','24h'].includes(curRange)){setRange(curRange);reload(true);}},5000);}else clearInterval(liveTimer);}

async function reload(silent){
  const svc=document.getElementById('svc').value;if(!svc)return;
  const fromEl=document.getElementById('from'),toEl=document.getElementById('to'),res=document.getElementById('res').value;
  const g=rangeGuard(fromEl.value,toEl.value);if(!g)return;
  if(g.clamped){fromEl.value=toLocal(g.from);toEl.value=toLocal(g.to);}
  const q=new URLSearchParams({from:g.from.toISOString(),to:g.to.toISOString(),resolution:res});
  const d=await (await fetch('/api/metrics/'+svc+'?'+q)).json();
  render(d);
  if(!silent)loadLogs(svc);
}

function statHTML(o){return Object.entries(o).map(([k,v])=>k+': <b>'+v+'</b>').join('  ');}
function render(d){
  const s=d.series;
  document.getElementById('cards').innerHTML=[
    ['Total Requests',d.totals.requests.toLocaleString(),'#60a5fa'],
    ['Errors',d.totals.errors.toLocaleString(),'#f87171'],
    ['Warnings',d.totals.warnings.toLocaleString(),'#fbbf24'],
    ['Avg CPU',d.avgCpu+'%','#a78bfa'],
    ['Peak CPU',d.peakCpu+'%','#7c3aed'],
    ['Avg Latency',d.avgLat+'ms','#34d399'],
  ].map(([l,v,c])=>'<div class="card"><div class="lbl">'+l+'</div><div class="val" style="color:'+c+'">'+v+'</div></div>').join('');
  const errRate=d.totals.requests?((d.totals.errors/d.totals.requests)*100).toFixed(2):0;
  const ok=errRate<2;document.getElementById('health').className='health-bar '+(ok?'':'bad');
  document.getElementById('health').innerHTML='<span class="health-dot"></span> '+(ok?'Service Healthy':'Elevated Error Rate')+' · '+errRate+'% errors · '+d.points+' datapoints';
  document.getElementById('cpu-stat').innerHTML=statHTML({avg:d.avgCpu+'%',peak:d.peakCpu+'%'});
  document.getElementById('mem-stat').innerHTML=statHTML({avg:d.avgMem+'%'});
  document.getElementById('vol-stat').innerHTML=statHTML({req:d.totals.requests,err:d.totals.errors});
  document.getElementById('lat-stat').innerHTML=statHTML({avg:d.avgLat+'ms'});
  document.getElementById('errr-stat').innerHTML=statHTML({rate:errRate+'%'});

  drawLine('cpuC','cpu',s,'#7c3aed','%',100);
  drawLine('memC','mem',s,'#3b82f6','%',100);
  drawVol('volC',s);
  drawLine('latC','latency',s,'#f59e0b','ms');
  drawErr('errC',s);
}
function destroy(id){if(charts[id]){charts[id].destroy();delete charts[id];}}
function drawLine(id,key,data,color,unit,max){destroy(id);charts[id]=cleanLineChart(id,[lineDS(key.toUpperCase(),color,data,key)],unit,max);}
function drawVol(id,data){destroy(id);charts[id]=cleanLineChart(id,[mline('Requests','#3b82f6',data,'requests',true),mline('Warnings','#f59e0b',data,'warnings',false),mline('Errors','#ef4444',data,'errors',false)],'');}
function drawErr(id,data){destroy(id);const s=data.map(d=>({t:d.t,rate:d.requests?+((d.errors/d.requests)*100).toFixed(2):0}));charts[id]=cleanLineChart(id,[lineDS('Error %','#ef4444',s,'rate')],'%');}

async function loadLogs(svc){
  const d=await (await fetch('/api/logs/'+svc+'?page=1&limit=25')).json();
  const el=document.getElementById('logs');
  if(!d.logs.length){el.innerHTML='<div class="empty">No logs</div>';return;}
  el.innerHTML='<table><thead><tr><th>Timestamp</th><th>Level</th><th>Message</th><th>Meta</th></tr></thead><tbody>'+
   d.logs.map(l=>'<tr class="row-'+(l.level||'')+'"><td class="ts">'+(l.timestamp||'')+'</td><td><span class="badge b-'+(l.level||'')+'">'+(l.level||'')+'</span></td><td>'+esc(l.message||'')+'</td><td class="meta">'+meta(l)+'</td></tr>').join('')+'</tbody></table>';
}
function meta(l){const skip=['timestamp','level','message','service'];const o={};Object.keys(l).forEach(k=>{if(!skip.includes(k))o[k]=l[k];});const s=JSON.stringify(o);return s.length>2?esc(s.slice(0,160)):'—';}
function esc(t){return(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

setRange('24h');initSvc();
</script></body></html>`;
}

function extraCSS() {
  return `.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:22px;}
  .card{background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.06);border-radius:14px;padding:18px 20px;}
  .card .lbl{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:#64748b;margin-bottom:8px;}
  .card .val{font-size:24px;font-weight:800;letter-spacing:-.02em;}
  .health-bar{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.2);border-radius:10px;font-size:12px;font-weight:600;color:#34d399;margin-bottom:22px;}
  .health-bar.bad{background:rgba(248,113,113,.08);border-color:rgba(248,113,113,.2);color:#f87171;}
  .health-bar .health-dot{width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor;}`;
}
