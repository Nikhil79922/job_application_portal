export function head(title: string, extra = "", scripts = false) {
  const libs = scripts
    ? `<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script><script src="https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js"></script><script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@1.3.1/dist/chartjs-adapter-luxon.umd.min.js"></script><script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/chartjs-plugin-zoom.min.js"></script>`
    : "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${libs}<style>${resetCSS()}${extra}${responsiveCSS()}</style></head>`;
}

export function resetCSS() {
  return `*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#050507;color:#e2e8f0;min-height:100vh;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5;}::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#334155;border-radius:3px;}::-webkit-scrollbar-thumb:hover{background:#475569;}input[type=date],input[type=datetime-local],input[type=time]{color-scheme:dark;cursor:pointer;}input[type=date]::-webkit-calendar-picker-indicator,input[type=datetime-local]::-webkit-calendar-picker-indicator,input[type=time]::-webkit-calendar-picker-indicator{filter:invert(.8);opacity:.7;cursor:pointer;padding:2px;border-radius:4px;}input[type=date]::-webkit-calendar-picker-indicator:hover,input[type=datetime-local]::-webkit-calendar-picker-indicator:hover,input[type=time]::-webkit-calendar-picker-indicator:hover{opacity:1;background:rgba(124,58,237,.25);}`;
}

export function layoutCSS() {
  return `.shell{display:flex;min-height:100vh;}.side{width:260px;background:#0a0a0f;border-right:1px solid rgba(148,163,184,.06);position:fixed;height:100vh;display:flex;flex-direction:column;z-index:10;}.side-head{padding:28px 24px;border-bottom:1px solid rgba(148,163,184,.06);}.side-head h2{font-size:16px;font-weight:700;color:#f8fafc;display:flex;align-items:center;gap:10px;}.side-head h2 span{width:32px;height:32px;background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;}.side nav{flex:1;padding:20px 14px;}.side a{display:flex;align-items:center;gap:12px;padding:12px 16px;color:#64748b;text-decoration:none;border-radius:10px;font-size:13px;font-weight:500;margin-bottom:2px;transition:all .15s;}.side a:hover{color:#e2e8f0;background:rgba(148,163,184,.05);}.side a.on{color:#a78bfa;background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.15);font-weight:600;}.side a .ico{font-size:16px;width:20px;text-align:center;}.side-ft{padding:16px 20px;border-top:1px solid rgba(148,163,184,.06);}.side-ft button{width:100%;padding:10px;background:rgba(148,163,184,.05);border:1px solid rgba(148,163,184,.08);border-radius:8px;color:#64748b;cursor:pointer;font-size:12px;font-weight:500;transition:all .15s;}.side-ft button:hover{color:#e2e8f0;background:rgba(148,163,184,.1);}.main{margin-left:260px;flex:1;padding:36px 40px;min-width:0;}.main h1{font-size:22px;font-weight:700;color:#f8fafc;margin-bottom:8px;letter-spacing:-.02em;}.main .desc{font-size:13px;color:#64748b;margin-bottom:32px;}`;
}

export function sidebar(active: string) {
  const nav = [
    { id: "dashboard", ico: "📊", label: "Dashboard", href: "/dashboard" },
    { id: "service-logs", ico: "📋", label: "Service Logs", href: "/service-logs" },
    { id: "error-logs", ico: "🚨", label: "Error Logs", href: "/error-logs" },
    { id: "service-details", ico: "⚙️", label: "Service Details", href: "/service-details" },
    { id: "infrastructure", ico: "🏗️", label: "Infrastructure", href: "/infrastructure" },
    { id: "architecture", ico: "🧭", label: "Architecture", href: "/architecture" },
  ];
  return `<aside class="side"><div class="side-head"><h2><span>🔍</span>Log Admin</h2></div><nav>${nav.map(n => `<a href="${n.href}" class="${n.id === active ? 'on' : ''}"><span class="ico">${n.ico}</span>${n.label}</a>`).join("")}</nav><div class="side-ft"><button onclick="fetch('/api/logout',{method:'POST'}).then(()=>location='/login')">Sign Out</button></div></aside>`;
}

export function tableCSS() {
  return `.toolbar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center;}.toolbar select,.toolbar input[type=text],.toolbar input[type=date]{padding:10px 14px;background:rgba(15,15,23,.8);border:1px solid rgba(148,163,184,.1);border-radius:10px;color:#e2e8f0;font-size:13px;outline:none;transition:border .15s;font-family:inherit;}.toolbar select:focus,.toolbar input:focus{border-color:rgba(124,58,237,.4);}.toolbar .btn-search{padding:10px 20px;background:linear-gradient(135deg,#7c3aed,#6d28d9);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}.toolbar .btn-search:hover{transform:translateY(-1px);box-shadow:0 6px 20px -6px rgba(124,58,237,.4);}.tbl-wrap{background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.06);border-radius:14px;overflow:hidden;}.tbl-scroll{overflow:auto;max-height:68vh;}table{width:100%;border-collapse:collapse;font-size:12.5px;}thead{position:sticky;top:0;z-index:2;}th{background:#0f0f17;padding:14px 16px;text-align:left;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#475569;border-bottom:1px solid rgba(148,163,184,.08);}td{padding:12px 16px;border-bottom:1px solid rgba(148,163,184,.04);vertical-align:top;}tr:hover td{background:rgba(148,163,184,.02);}.ts{font-family:'JetBrains Mono',monospace;font-size:11px;color:#64748b;white-space:nowrap;}.badge{padding:3px 10px;border-radius:6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.3px;display:inline-block;}.b-error{background:rgba(248,113,113,.1);color:#f87171;border:1px solid rgba(248,113,113,.2);}.b-warn{background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.2);}.b-info{background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.2);}.b-http{background:rgba(96,165,250,.1);color:#60a5fa;border:1px solid rgba(96,165,250,.2);}.b-debug{background:rgba(148,163,184,.08);color:#94a3b8;border:1px solid rgba(148,163,184,.12);}.row-error{border-left:3px solid #f87171;}.row-warn{border-left:3px solid #fbbf24;}.meta{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#64748b;max-width:320px;overflow:hidden;text-overflow:ellipsis;word-break:break-all;}.pager{display:flex;align-items:center;justify-content:center;gap:14px;padding:16px;margin-top:12px;}.pager button{padding:8px 18px;background:rgba(148,163,184,.06);border:1px solid rgba(148,163,184,.1);border-radius:8px;color:#e2e8f0;font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;}.pager button:hover{background:rgba(148,163,184,.1);border-color:rgba(148,163,184,.2);}.pager span{font-size:12px;color:#64748b;}.empty{text-align:center;padding:60px 20px;color:#475569;font-size:14px;}`;
}

export function infraCSS() {
  return `.grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;}.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:28px;}.panel{background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.06);border-radius:16px;padding:24px;overflow:hidden;}.panel h3{font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;margin-bottom:16px;display:flex;align-items:center;gap:8px;}.panel h3 .dot{width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 6px rgba(52,211,153,.5);}.schema-tbl{width:100%;border-collapse:collapse;font-size:12px;}.schema-tbl th{text-align:left;padding:8px 12px;background:rgba(148,163,184,.04);color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid rgba(148,163,184,.06);}.schema-tbl td{padding:8px 12px;border-bottom:1px solid rgba(148,163,184,.03);color:#e2e8f0;font-family:'JetBrains Mono',monospace;font-size:11.5px;}.schema-tbl tr:hover td{background:rgba(124,58,237,.03);}.flow{font-family:'JetBrains Mono',monospace;font-size:11px;color:#94a3b8;line-height:2;white-space:pre;overflow-x:auto;}.flow .hl{color:#a78bfa;font-weight:600;}.flow .gr{color:#34d399;}.flow .yl{color:#fbbf24;}.metric{text-align:center;padding:16px;}.metric .val{font-size:28px;font-weight:800;color:#f8fafc;letter-spacing:-.02em;}.metric .lbl{font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:.5px;}.chart-wrap{height:180px;position:relative;display:flex;align-items:flex-end;gap:4px;padding-top:20px;}.bar-group{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;}.bar{width:100%;border-radius:4px 4px 0 0;transition:height .3s;min-height:2px;position:relative;}.bar:hover{opacity:.8;}.bar.req{background:linear-gradient(to top,#3b82f6,#60a5fa);}.bar.err{background:linear-gradient(to top,#ef4444,#f87171);}.bar.wrn{background:linear-gradient(to top,#f59e0b,#fbbf24);}.bar-lbl{font-size:9px;color:#64748b;font-family:'JetBrains Mono',monospace;margin-top:6px;}.legend{display:flex;gap:16px;margin-top:14px;justify-content:center;}.legend span{font-size:11px;color:#64748b;display:flex;align-items:center;gap:6px;}.legend span::before{content:'';width:10px;height:10px;border-radius:3px;}.legend .l-req::before{background:#3b82f6;}.legend .l-err::before{background:#ef4444;}.legend .l-wrn::before{background:#f59e0b;}.idx-list{list-style:none;}.idx-list li{padding:8px 12px;border-bottom:1px solid rgba(148,163,184,.04);font-size:12px;font-family:'JetBrains Mono',monospace;color:#e2e8f0;display:flex;justify-content:space-between;}.idx-list li .type{color:#64748b;font-size:10px;text-transform:uppercase;}.audit-row{display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(148,163,184,.04);font-size:12px;align-items:center;}.audit-row .date{color:#64748b;font-family:'JetBrains Mono',monospace;font-size:11px;}.audit-row .nums{display:flex;gap:14px;}.audit-row .nums span{color:#94a3b8;}.audit-row .nums b{font-weight:600;}.cpu-graph{height:100px;display:flex;align-items:flex-end;gap:2px;}.cpu-bar{flex:1;background:linear-gradient(to top,#7c3aed,#a78bfa);border-radius:2px 2px 0 0;transition:height .5s;animation:pulse 2s infinite alternate;}@keyframes pulse{0%{opacity:.7;}100%{opacity:1;}}.conn-card{display:flex;align-items:center;gap:12px;padding:12px 16px;background:rgba(148,163,184,.03);border-radius:10px;margin-bottom:8px;}.conn-card .icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;}.conn-card .icon.pg{background:rgba(51,103,145,.15);}.conn-card .icon.rd{background:rgba(220,38,38,.1);}.conn-card .icon.kf{background:rgba(35,31,32,.2);}.conn-card .info .name{font-size:13px;font-weight:600;color:#e2e8f0;}.conn-card .info .detail{font-size:11px;color:#64748b;}`;
}

export function metricsCSS() {
  return `.tr-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.06);border-radius:14px;padding:14px 18px;margin-bottom:22px;position:sticky;top:0;z-index:20;backdrop-filter:blur(12px);}
  .tr-bar label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#475569;margin-right:4px;}
  .tr-bar input[type=datetime-local],.tr-bar select{padding:8px 12px;background:rgba(15,15,23,.9);border:1px solid rgba(148,163,184,.12);border-radius:8px;color:#e2e8f0;font-size:12px;font-family:'JetBrains Mono',monospace;outline:none;color-scheme:dark;}
  .tr-bar input:focus,.tr-bar select:focus{border-color:rgba(124,58,237,.5);}
  .tr-bar .sep{width:1px;height:24px;background:rgba(148,163,184,.1);margin:0 4px;}
  .quick{display:flex;gap:4px;}
  .quick button{padding:7px 12px;background:rgba(148,163,184,.05);border:1px solid rgba(148,163,184,.1);border-radius:7px;color:#94a3b8;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:inherit;}
  .quick button:hover{background:rgba(148,163,184,.1);color:#e2e8f0;}
  .quick button.on{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.4);color:#a78bfa;}
  .tr-bar .apply{padding:8px 18px;background:linear-gradient(135deg,#7c3aed,#6d28d9);border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:600;cursor:pointer;}
  .tr-bar .apply:hover{box-shadow:0 6px 18px -6px rgba(124,58,237,.5);}
  .tr-bar .live{display:flex;align-items:center;gap:6px;font-size:11px;color:#64748b;cursor:pointer;user-select:none;}
  .tr-bar .live .ld{width:8px;height:8px;border-radius:50%;background:#475569;}
  .tr-bar .live.on .ld{background:#34d399;box-shadow:0 0 8px rgba(52,211,153,.6);animation:blink 1.5s infinite;}
  @keyframes blink{50%{opacity:.4;}}
  .chart-card{background:rgba(10,10,15,.8);border:1px solid rgba(148,163,184,.06);border-radius:16px;padding:20px 22px;margin-bottom:20px;}
  .chart-card .ch-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:12px;}
  .chart-card .ch-title{font-size:13px;font-weight:700;color:#cbd5e1;display:flex;align-items:center;gap:8px;}
  .chart-card .ch-title .dot{width:7px;height:7px;border-radius:50%;}
  .chart-card .ch-stat{font-size:11px;color:#64748b;font-family:'JetBrains Mono',monospace;display:flex;gap:16px;margin-left:auto;}
  .chart-card .ch-stat b{color:#e2e8f0;}
  .chart-card .expand{flex-shrink:0;width:30px;height:30px;border-radius:8px;background:rgba(148,163,184,.06);border:1px solid rgba(148,163,184,.12);color:#94a3b8;cursor:pointer;font-size:14px;line-height:1;transition:all .15s;}
  .chart-card .expand:hover{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.4);color:#a78bfa;}
  .chart-modal-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);padding:24px;animation:fadeIn .2s ease;}
  .chart-modal{background:#0a0a0f;border:1px solid rgba(148,163,184,.12);border-radius:20px;width:100%;max-width:900px;max-height:90vh;padding:24px;position:relative;box-shadow:0 40px 100px rgba(0,0,0,.6);animation:scaleIn .2s ease;}
  .chart-modal .ch-box{height:420px;}
  .chart-modal .ch-head{margin-bottom:16px;}
  .chart-modal .ch-hint{margin-top:12px;}
  .chart-modal-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:8px;background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.12);color:#94a3b8;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all .15s;}
  .chart-modal-close:hover{background:rgba(248,113,113,.15);border-color:rgba(248,113,113,.3);color:#f87171;}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
  .ch-box{position:relative;height:240px;}
  .ch-box.sm{height:180px;}
  .ch-hint{font-size:10px;color:#475569;margin-top:8px;text-align:right;font-style:italic;}
  .mgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .subhead{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700;color:#f1f5f9;margin:8px 0 16px;padding-bottom:10px;border-bottom:1px solid rgba(148,163,184,.08);}
  .subhead .tag{font-size:10px;font-weight:600;color:#64748b;font-family:'JetBrains Mono',monospace;text-transform:none;margin-left:auto;}
  .subhead .ic{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;}
  @media(max-width:1100px){.mgrid{grid-template-columns:1fr;}}`;
}

// Shared Chart.js theming + fetch/build helpers injected into pages
export function chartClientJS() {
  return `
  const C={grid:'rgba(148,163,184,.05)',tick:'#64748b',font:"'Inter',sans-serif"};
  Chart.defaults.color=C.tick;Chart.defaults.font.family=C.font;Chart.defaults.font.size=11;
  Chart.defaults.elements.line.capBezierPoints=true;
  // Vertical crosshair on hover (CloudWatch-style)
  const crosshair={id:'crosshair',afterDraw(c){if(c.tooltip?._active?.length){const x=c.tooltip._active[0].element.x,a=c.chartArea,ctx=c.ctx;ctx.save();ctx.beginPath();ctx.moveTo(x,a.top);ctx.lineTo(x,a.bottom);ctx.lineWidth=1;ctx.strokeStyle='rgba(148,163,184,.25)';ctx.setLineDash([4,4]);ctx.stroke();ctx.restore();}}};
  Chart.register(crosshair);
  // Clean scales: NO x gridlines, faint dashed y gridlines, breathing room
  function baseScales(){
    return {x:{type:'time',time:{tooltipFormat:'LLL dd, HH:mm:ss'},grid:{display:false},border:{display:false},ticks:{maxRotation:0,autoSkip:true,maxTicksLimit:7,padding:8,color:'#475569'}},
            y:{beginAtZero:true,border:{display:false},grid:{color:C.grid,drawTicks:false},ticks:{padding:10,color:'#475569',maxTicksLimit:5},grace:'8%'}};
  }
  function tip(extra){return {mode:'index',intersect:false,backgroundColor:'rgba(8,8,14,.97)',borderColor:'rgba(148,163,184,.15)',borderWidth:1,padding:{x:14,y:12},titleColor:'#f8fafc',titleFont:{size:11,weight:'700'},titleMarginBottom:8,bodyColor:'#cbd5e1',bodyFont:{size:11,family:"'JetBrains Mono',monospace"},bodySpacing:6,displayColors:true,boxWidth:8,boxHeight:8,boxPadding:4,usePointStyle:true,caretSize:5,cornerRadius:10,...(extra||{})};}
  const zoomCfg={zoom:{wheel:{enabled:true},pinch:{enabled:true},drag:{enabled:true,backgroundColor:'rgba(124,58,237,.12)',borderColor:'rgba(124,58,237,.4)',borderWidth:1},mode:'x'},pan:{enabled:true,mode:'x',modifierKey:'shift'}};
  function area(ctx,color){const g=ctx.createLinearGradient(0,0,0,260);g.addColorStop(0,color+'40');g.addColorStop(.6,color+'12');g.addColorStop(1,color+'00');return g;}
  function lineDS(label,color,data,key){return {label,data:data.map(d=>({x:d.t,y:d[key]})),borderColor:color,backgroundColor:(c)=>area(c.chart.ctx,color),borderWidth:2,fill:true,tension:.4,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:color,pointHoverBorderColor:'#0a0a0f',pointHoverBorderWidth:2,clip:false};}
  // Clean multi-line (replaces clustered stacked bars)
  function mline(label,color,data,key,fill){return {label,data:data.map(d=>({x:d.t,y:d[key]})),borderColor:color,backgroundColor:fill?(c)=>area(c.chart.ctx,color):'transparent',borderWidth:2,fill:!!fill,tension:.4,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:color,pointHoverBorderColor:'#0a0a0f',pointHoverBorderWidth:2};}
  function cleanLineChart(id,datasets,unit,max){const e=document.getElementById(id);return new Chart(e,{type:'line',data:{datasets},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},scales:{...baseScales(),y:{...baseScales().y,min:0,max:max,grace:max?0:'8%',ticks:{padding:10,color:'#475569',maxTicksLimit:max===100?6:5,stepSize:max===100?20:undefined,precision:max===100?undefined:0,callback:v=>v+(unit||'')}}},plugins:{legend:datasets.length>1?{display:true,position:'top',align:'end',labels:{boxWidth:8,boxHeight:8,usePointStyle:true,pointStyle:'circle',padding:16,font:{size:11}}}:{display:false},tooltip:tip({callbacks:{label:c=>'  '+c.dataset.label+': '+c.parsed.y+(unit||'')}}),zoom:zoomCfg}}});}
  // Full-width expand in modal — does not disturb sibling chart layout
  function toggleExpand(btn){
    const card=btn.closest('.chart-card');
    const canvas=card.querySelector('canvas');if(!canvas)return;
    const chartInst=Chart.getChart(canvas);if(!chartInst)return;
    // Build modal
    const overlay=document.createElement('div');overlay.className='chart-modal-overlay';
    overlay.onclick=(e)=>{if(e.target===overlay)closeModal();};
    const modal=document.createElement('div');modal.className='chart-modal';
    const close=document.createElement('button');close.className='chart-modal-close';close.innerHTML='✕';close.onclick=closeModal;
    const head=card.querySelector('.ch-head');
    const hint=card.querySelector('.ch-hint');
    modal.innerHTML=(head?'<div class="ch-head">'+head.innerHTML+'</div>':'')+'<div class="ch-box"><canvas></canvas></div>'+(hint?'<div class="ch-hint">'+hint.textContent+'</div>':'');
    modal.querySelector('.expand')?.remove();
    modal.appendChild(close);overlay.appendChild(modal);document.body.appendChild(overlay);
    // Recreate chart with original data references
    const mc=modal.querySelector('canvas');
    const origCfg=chartInst.config;
    const datasets=origCfg.data.datasets.map(ds=>({...ds,data:[...ds.data]}));
    const opts=JSON.parse(JSON.stringify(origCfg.options||{}));
    opts.responsive=true;opts.maintainAspectRatio=false;
    // Re-enable zoom plugin for modal
    if(opts.plugins)opts.plugins.zoom=origCfg.options?.plugins?.zoom;
    new Chart(mc,{type:origCfg.type,data:{datasets},options:opts});
    function closeModal(){overlay.remove();}
    document.addEventListener('keydown',function esc(e){if(e.key==='Escape'){closeModal();document.removeEventListener('keydown',esc);}});
  }
  function addExpandButtons(){document.querySelectorAll('.chart-card .ch-head').forEach(h=>{if(h.querySelector('.expand'))return;const b=document.createElement('button');b.className='expand';b.title='Expand';b.textContent='⤢';b.onclick=()=>toggleExpand(b);h.appendChild(b);});}
  addExpandButtons();
  `;
}

export function toastCSS() {
  return `.toast-wrap{position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;}
  .toast{display:flex;align-items:center;gap:12px;min-width:280px;max-width:380px;padding:14px 16px;border-radius:12px;background:rgba(15,15,23,.96);border:1px solid rgba(148,163,184,.12);backdrop-filter:blur(16px);box-shadow:0 12px 40px -8px rgba(0,0,0,.6);color:#e2e8f0;font-size:13px;font-weight:500;transform:translateX(120%);opacity:0;transition:all .35s cubic-bezier(.22,1,.36,1);}
  .toast.show{transform:translateX(0);opacity:1;}
  .toast .ti{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
  .toast.ok{border-color:rgba(52,211,153,.3);}.toast.ok .ti{background:rgba(52,211,153,.15);color:#34d399;}
  .toast.err{border-color:rgba(248,113,113,.3);}.toast.err .ti{background:rgba(248,113,113,.15);color:#f87171;}
  .toast.info{border-color:rgba(96,165,250,.3);}.toast.info .ti{background:rgba(96,165,250,.15);color:#60a5fa;}
  .toast .tx{flex:1;line-height:1.4;}`;
}

export function toastJS() {
  return `
  function toast(msg,type){
    type=type||'info';
    let w=document.querySelector('.toast-wrap');
    if(!w){w=document.createElement('div');w.className='toast-wrap';document.body.appendChild(w);}
    const ic={ok:'✓',err:'✕',info:'ℹ'}[type];
    const t=document.createElement('div');t.className='toast '+type;
    t.innerHTML='<div class="ti">'+ic+'</div><div class="tx">'+msg+'</div>';
    w.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},3200);
  }`;
}

// Validates a from/to selection against the 7-day log retention window; clamps + toasts.
// Requires toast() (toastJS) and a pad/toLocal in page scope.
export function rangeGuardJS() {
  return `
  function rangeGuard(fromV,toV){
    const now=Date.now(), min=now-7*86400000;
    let from=new Date(fromV).getTime(), to=new Date(toV).getTime();
    if(isNaN(from)||isNaN(to)){toast('Please select a valid date & time','err');return null;}
    if(from>=to){toast('"From" must be earlier than "To"','err');return null;}
    let clamped=false;
    if(to>now+60000){toast('Future time selected — no logs ahead of now. Trimmed to current time.','info');to=now;clamped=true;}
    if(from<min){toast('Logs are retained for 7 days only. Range trimmed to the last 7 days.','info');from=min;clamped=true;}
    return {from:new Date(from),to:new Date(to),clamped};
  }`;
}

export function responsiveCSS() {
  return `
  @media (max-width:1024px){
    .grid2,.grid3{grid-template-columns:1fr !important;}
  }
  @media (max-width:900px){
    .side{position:static;width:100%;height:auto;flex-direction:row;align-items:center;flex-wrap:wrap;border-right:none;border-bottom:1px solid rgba(148,163,184,.08);}
    .side-head{padding:14px 18px;border-bottom:none;}
    .side nav{display:flex;flex-direction:row;overflow-x:auto;padding:8px 10px;gap:4px;flex:1 1 100%;}
    .side nav a{white-space:nowrap;margin-bottom:0;}
    .side-ft{border-top:none;padding:8px 14px;width:auto;}
    .side-ft button{width:auto;padding:8px 14px;}
    .main{margin-left:0;padding:20px 16px;}
    .mgrid{grid-template-columns:1fr !important;}
    .tabs{overflow-x:auto;}
    .tab-btn{white-space:nowrap;padding:11px 14px;}
    .er-wrap{height:420px;}
    .wire .wrow.svcs{gap:10px;}.wire .wrow.infra{gap:10px;}
    .wnode{min-width:100px !important;padding:10px 14px;font-size:12px;}
    .wfan{width:95%;}
    .conn-card{flex-direction:column;text-align:center;gap:8px;}
  }
  @media (max-width:560px){
    .cards,.stats-grid,.dev-grid,.svc-grid,.service-grid{grid-template-columns:1fr !important;}
    .main{padding:16px 12px;}
    .main h1{font-size:19px;}
    .tr-bar,.toolbar,.filter-bar{padding:10px;gap:6px;}
    .tr-bar label{display:none;}
    .toolbar input,.toolbar select,.tr-bar input,.tr-bar select{flex:1 1 auto;min-width:0;}
    .ch-box{height:200px;}.ch-box.sm{height:160px;}
    .count{margin-left:0;width:100%;}
    .er-wrap{height:340px;}
    .wire .wrow.svcs{flex-direction:column;align-items:center;}
    .wire .wrow.infra{flex-direction:column;align-items:center;}
    .wfan{display:none;}
    .subhead{font-size:13px;flex-wrap:wrap;}
    .subhead .tag{width:100%;margin-left:0;margin-top:4px;}
    .db-tuples{grid-template-columns:repeat(auto-fit,minmax(90px,1fr));}
    .panel{padding:16px;}
    .note-list li{font-size:11.5px;}
  }`;
}
