import { TABLES, RELATIONS, SERVICE_COLORS, Table } from "../data/dbSchema";

const TW = 210, ROW_H = 24, HEAD_H = 32;
const tH = (t: Table) => HEAD_H + t.columns.length * ROW_H;
const colIndex = (t: Table, name: string) => Math.max(0, t.columns.findIndex((c) => c.name === name));
const pkIndex = (t: Table) => Math.max(0, t.columns.findIndex((c) => c.key === "PK"));
const rowY = (t: Table, i: number) => t.y + HEAD_H + i * ROW_H + ROW_H / 2;

// Interactive ER: each FK column connects by a curved wire to the referenced PK column.
export function renderERDiagram(): string {
  const byName: Record<string, Table> = {};
  TABLES.forEach((t) => (byName[t.name] = t));

  const edges = RELATIONS.map((r) => {
    const a = byName[r.from], b = byName[r.to];
    if (!a || !b) return "";
    const fkCol = r.label.split(" ")[0];               // e.g. "user_id"
    const ay = rowY(a, colIndex(a, fkCol));
    const by = rowY(b, pkIndex(b));
    const aRight = a.x + TW / 2 < b.x + TW / 2;          // is target to the right?
    const ax = aRight ? a.x + TW : a.x;
    const bx = aRight ? b.x : b.x + TW;
    const dx = Math.max(40, Math.abs(bx - ax) * 0.45) * (aRight ? 1 : -1);
    const d = `M ${ax} ${ay} C ${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`;
    return `<g class="edge" data-from="${r.from}" data-to="${r.to}">
      <path d="${d}" fill="none" stroke="#3b4252" stroke-width="1.6"/>
      <circle cx="${bx}" cy="${by}" r="3.5" class="pk-dot"/>
      <circle cx="${ax}" cy="${ay}" r="3" class="fk-dot"/>
      <title>${r.from}.${r.label}</title></g>`;
  }).join("");

  const tables = TABLES.map((t) => {
    const h = tH(t), color = SERVICE_COLORS[t.service] || "#64748b";
    const rows = t.columns.map((c, i) => {
      const y = t.y + HEAD_H + i * ROW_H;
      const badge = c.key ? `<text x="${t.x + TW - 12}" y="${y + 16}" text-anchor="end" class="erk erk-${c.key}">${c.key}</text>` : "";
      const dot = c.key === "FK" ? `<circle cx="${t.x + 7}" cy="${y + ROW_H / 2}" r="2.5" fill="#60a5fa"/>` : (c.key === "PK" ? `<circle cx="${t.x + 7}" cy="${y + ROW_H / 2}" r="2.5" fill="#fbbf24"/>` : "");
      return `<g class="errow"><rect x="${t.x}" y="${y}" width="${TW}" height="${ROW_H}" class="errow-bg"/>${dot}
        <text x="${t.x + 16}" y="${y + 16}" class="ercol">${c.name}</text>
        <text x="${t.x + TW - 30}" y="${y + 16}" text-anchor="end" class="ertype">${c.type}</text>${badge}</g>`;
    }).join("");
    return `<g class="ertable" data-name="${t.name}">
      <rect x="${t.x}" y="${t.y}" width="${TW}" height="${h}" rx="12" class="ertable-bg"/>
      <path d="M ${t.x} ${t.y + 14} Q ${t.x} ${t.y} ${t.x + 14} ${t.y} L ${t.x + TW - 14} ${t.y} Q ${t.x + TW} ${t.y} ${t.x + TW} ${t.y + 14} L ${t.x + TW} ${t.y + HEAD_H} L ${t.x} ${t.y + HEAD_H} Z" fill="${color}" opacity="0.16"/>
      <rect x="${t.x}" y="${t.y}" width="4" height="${h}" rx="2" fill="${color}"/>
      <text x="${t.x + 16}" y="${t.y + 21}" class="ertitle" fill="${color}">${t.name}</text>
      <text x="${t.x + TW - 12}" y="${t.y + 21}" text-anchor="end" class="ersvc">${t.service}</text>
      ${rows}</g>`;
  }).join("");

  const maxX = Math.max(...TABLES.map((t) => t.x + TW)) + 40;
  const maxY = Math.max(...TABLES.map((t) => t.y + tH(t))) + 40;
  return `<div class="er-wrap"><div class="er-hint">⌘ / Ctrl + scroll to zoom · drag to pan · hover a table for relations</div><svg id="erSvg" viewBox="0 0 ${maxX} ${maxY}" preserveAspectRatio="xMidYMid meet" class="er-svg">${edges}${tables}</svg></div>`;
}

export function erCSS() {
  return `.er-wrap{background:radial-gradient(circle at 50% 0%,rgba(124,58,237,.05),transparent 55%);border:1px solid rgba(148,163,184,.06);border-radius:16px;padding:8px;overflow:hidden;height:560px;position:relative;}
  .er-hint{position:absolute;top:12px;left:12px;z-index:5;background:rgba(8,8,14,.82);border:1px solid rgba(148,163,184,.14);border-radius:8px;padding:6px 12px;font-size:11px;color:#94a3b8;backdrop-filter:blur(8px);pointer-events:none;}
  .er-svg{width:100%;height:100%;display:block;font-family:'JetBrains Mono',monospace;user-select:none;touch-action:none;}
  .ertable-bg{fill:rgba(13,13,20,.96);stroke:rgba(148,163,184,.1);stroke-width:1;transition:stroke .15s,filter .15s;}
  .ertable{cursor:default;transition:opacity .15s;}
  .ertable:hover .ertable-bg{stroke:rgba(124,58,237,.7);filter:drop-shadow(0 0 16px rgba(124,58,237,.3));}
  .ertitle{font-size:13.5px;font-weight:700;}
  .ersvc{font-size:9px;fill:#475569;text-transform:uppercase;letter-spacing:.5px;}
  .ercol{font-size:11px;fill:#cbd5e1;}
  .ertype{font-size:9.5px;fill:#5b6675;}
  .errow-bg{fill:transparent;}
  .errow:hover .errow-bg{fill:rgba(124,58,237,.07);}
  .erk{font-size:8px;font-weight:700;}
  .erk-PK{fill:#fbbf24;}.erk-FK{fill:#60a5fa;}.erk-UQ{fill:#34d399;}
  .edge path{transition:stroke .15s,stroke-width .15s;}
  .edge .pk-dot{fill:#fbbf24;}.edge .fk-dot{fill:#60a5fa;}
  .edge.hot path{stroke:#a78bfa;stroke-width:2.5;}
  .edge.hot .pk-dot{fill:#fff;}.edge.hot .fk-dot{fill:#a78bfa;}
  .ertable.dim{opacity:.2;}.edge.dim{opacity:.12;}
  .er-legend{display:flex;gap:18px;flex-wrap:wrap;margin-top:16px;font-size:11px;color:#64748b;align-items:center;}
  .er-legend span{display:flex;align-items:center;gap:6px;}
  .er-legend .sw{width:11px;height:11px;border-radius:3px;}`;
}

export function erClientJS() {
  return `(function(){
    const svg=document.getElementById('erSvg');if(!svg)return;
    // ── hover highlight ──
    const tables=[...svg.querySelectorAll('.ertable')],edges=[...svg.querySelectorAll('.edge')];
    tables.forEach(t=>{
      t.addEventListener('mouseenter',()=>{
        const n=t.dataset.name,linked=new Set([n]);
        edges.forEach(e=>{const on=e.dataset.from===n||e.dataset.to===n;e.classList.toggle('hot',on);if(on){linked.add(e.dataset.from);linked.add(e.dataset.to);}else e.classList.add('dim');});
        tables.forEach(x=>{if(!linked.has(x.dataset.name))x.classList.add('dim');});
      });
      t.addEventListener('mouseleave',()=>{edges.forEach(e=>e.classList.remove('hot','dim'));tables.forEach(x=>x.classList.remove('dim'));});
    });
    // ── pan + zoom (scales as tables grow) ──
    const base=svg.getAttribute('viewBox').split(' ').map(Number);
    let cur=base.slice();
    const minW=base[2]*0.25, maxW=base[2]*3;
    const apply=()=>svg.setAttribute('viewBox',cur.join(' '));
    window.erZoom=(f)=>{const cx=cur[0]+cur[2]/2,cy=cur[1]+cur[3]/2;let w=cur[2]/f;if(w<minW||w>maxW)return;const h=cur[3]/f;cur=[cx-w/2,cy-h/2,w,h];apply();};
    window.erReset=()=>{cur=base.slice();apply();};
    svg.addEventListener('wheel',(e)=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();const f=e.deltaY<0?1.12:0.89;const r=svg.getBoundingClientRect();const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;const mx=cur[0]+px*cur[2],my=cur[1]+py*cur[3];let w=cur[2]/f;if(w<minW||w>maxW)return;const h=cur[3]/f;cur=[mx-px*w,my-py*h,w,h];apply();},{passive:false});
    let pan=null;
    svg.addEventListener('mousedown',(e)=>{pan={x:e.clientX,y:e.clientY,vx:cur[0],vy:cur[1]};svg.style.cursor='grabbing';});
    window.addEventListener('mouseup',()=>{if(pan){pan=null;svg.style.cursor='grab';}});
    window.addEventListener('mousemove',(e)=>{if(!pan)return;const r=svg.getBoundingClientRect();cur[0]=pan.vx-(e.clientX-pan.x)/r.width*cur[2];cur[1]=pan.vy-(e.clientY-pan.y)/r.height*cur[3];apply();});
    svg.style.cursor='grab';
  })();`;
}

export function flowCSS() {
  return `.wire{display:flex;flex-direction:column;align-items:center;padding:8px 0 4px;}
  .wrow{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;width:100%;}
  .wnode{position:relative;background:rgba(15,15,23,.9);border:1px solid rgba(148,163,184,.12);border-radius:14px;padding:14px 20px;text-align:center;color:#e2e8f0;font-size:13px;font-weight:600;min-width:120px;transition:all .18s;}
  .wnode span{display:block;font-size:10px;font-weight:500;color:#64748b;margin-top:3px;font-family:'JetBrains Mono',monospace;}
  .wnode b{font-weight:700;}
  .wnode:hover{transform:translateY(-2px);border-color:rgba(124,58,237,.45);box-shadow:0 10px 28px -12px rgba(124,58,237,.4);}
  .wnode.front{background:linear-gradient(135deg,rgba(96,165,250,.12),rgba(15,15,23,.9));border-color:rgba(96,165,250,.3);}
  .wnode.gw{background:linear-gradient(135deg,rgba(124,58,237,.16),rgba(15,15,23,.9));border-color:rgba(124,58,237,.4);padding:16px 28px;font-size:14px;}
  .wnode .pills{display:flex;gap:6px;justify-content:center;margin-top:10px;flex-wrap:wrap;}
  .wnode .pills i{font-style:normal;font-size:9px;font-weight:600;color:#a78bfa;background:rgba(124,58,237,.12);border:1px solid rgba(124,58,237,.25);padding:3px 8px;border-radius:20px;font-family:'Inter',sans-serif;}
  .wrow.svcs .svc{min-width:96px;border-top:2px solid;}
  .svc.auth{border-top-color:#7c3aed;}.svc.user{border-top-color:#3b82f6;}.svc.job{border-top-color:#34d399;}.svc.pay{border-top-color:#f59e0b;}.svc.utils{border-top-color:#ec4899;}
  .wrow.infra .wnode{min-width:140px;}
  .wnode.db{background:linear-gradient(135deg,rgba(52,211,153,.1),rgba(15,15,23,.9));border-color:rgba(52,211,153,.3);}
  .wpipe{width:2px;height:26px;background:linear-gradient(to bottom,rgba(124,58,237,.6),rgba(124,58,237,.15));margin:6px 0;position:relative;}
  .wpipe::after{content:'';position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid rgba(124,58,237,.5);}
  .wpipe.tall{height:34px;}
  .wfan{position:relative;height:30px;width:80%;max-width:760px;border-top:2px solid rgba(124,58,237,.3);border-left:2px solid rgba(124,58,237,.18);border-right:2px solid rgba(124,58,237,.18);border-radius:0 0 0 0;margin:0 0 6px;}
  .wfan span{position:absolute;top:-2px;width:2px;height:30px;background:rgba(124,58,237,.25);}
  .wfan span:nth-child(1){left:10%;}.wfan span:nth-child(2){left:30%;}.wfan span:nth-child(3){left:50%;}.wfan span:nth-child(4){left:70%;}.wfan span:nth-child(5){left:90%;}
  .note-list{list-style:none;display:flex;flex-direction:column;gap:10px;}
  .note-list li{font-size:12.5px;color:#94a3b8;line-height:1.5;padding-left:18px;position:relative;}
  .note-list li::before{content:'▹';position:absolute;left:0;color:#7c3aed;}
  .note-list b{color:#e2e8f0;font-weight:600;}
  .note-list code{font-family:'JetBrains Mono',monospace;font-size:11px;color:#a78bfa;background:rgba(124,58,237,.1);padding:1px 6px;border-radius:5px;}`;
}

// Client-side dynamic ER renderer — consumes /api/db/schema (works for ANY database).
export function erDynamicJS() {
  return `
  const ER_TW=210,ER_ROW=24,ER_HEAD=32,ER_PAL=['#7c3aed','#3b82f6','#34d399','#f59e0b','#ec4899','#06b6d4','#a78bfa','#ef4444','#10b981','#eab308'];
  function erTableH(t){return ER_HEAD+t.columns.length*ER_ROW;}
  function erLayout(tables){
    // column-pack: balance by count; stack vertically per column with gaps
    const n=tables.length,cols=Math.max(1,Math.ceil(Math.sqrt(n)));
    const colX=[],colY=[];for(let i=0;i<cols;i++){colX.push(40+i*(ER_TW+90));colY.push(40);}
    tables.forEach((t,i)=>{const c=i%cols;t._x=colX[c];t._y=colY[c];colY[c]+=erTableH(t)+40;});
    const maxX=Math.max(...tables.map(t=>t._x+ER_TW))+40;
    const maxY=Math.max(...colY)+10;return {maxX,maxY};
  }
  function erBuild(schema){
    const tables=schema.tables,rel=schema.relations;
    const byName={};tables.forEach((t,i)=>{t._c=ER_PAL[i%ER_PAL.length];byName[t.name]=t;});
    const {maxX,maxY}=erLayout(tables);
    const colIdx=(t,n)=>{const i=t.columns.findIndex(c=>c.name===n);return i<0?0:i;};
    const pkIdx=(t)=>{const i=t.columns.findIndex(c=>c.key==='PK');return i<0?0:i;};
    const rowY=(t,i)=>t._y+ER_HEAD+i*ER_ROW+ER_ROW/2;
    const edges=rel.map(r=>{const a=byName[r.from],b=byName[r.to];if(!a||!b)return '';
      const ay=rowY(a,colIdx(a,r.fk)),by=rowY(b,pkIdx(b));const right=a._x<b._x;const ax=right?a._x+ER_TW:a._x,bx=right?b._x:b._x+ER_TW;
      const dx=Math.max(40,Math.abs(bx-ax)*0.45)*(right?1:-1);
      return '<g class="edge" data-from="'+r.from+'" data-to="'+r.to+'"><path d="M '+ax+' '+ay+' C '+(ax+dx)+' '+ay+', '+(bx-dx)+' '+by+', '+bx+' '+by+'" fill="none" stroke="#3b4252" stroke-width="1.6"/><circle cx="'+bx+'" cy="'+by+'" r="3.5" class="pk-dot"/><circle cx="'+ax+'" cy="'+ay+'" r="3" class="fk-dot"/><title>'+r.from+'.'+r.label+'</title></g>';
    }).join('');
    const tbl=tables.map(t=>{const h=erTableH(t),C=t._c;
      const rows=t.columns.map((c,i)=>{const y=t._y+ER_HEAD+i*ER_ROW;
        const badge=c.key?'<text x="'+(t._x+ER_TW-12)+'" y="'+(y+16)+'" text-anchor="end" class="erk erk-'+c.key+'">'+c.key+'</text>':'';
        const dot=c.key==='FK'?'<circle cx="'+(t._x+7)+'" cy="'+(y+ER_ROW/2)+'" r="2.5" fill="#60a5fa"/>':(c.key==='PK'?'<circle cx="'+(t._x+7)+'" cy="'+(y+ER_ROW/2)+'" r="2.5" fill="#fbbf24"/>':'');
        return '<g class="errow"><rect x="'+t._x+'" y="'+y+'" width="'+ER_TW+'" height="'+ER_ROW+'" class="errow-bg"/>'+dot+'<text x="'+(t._x+16)+'" y="'+(y+16)+'" class="ercol">'+c.name+'</text><text x="'+(t._x+ER_TW-30)+'" y="'+(y+16)+'" text-anchor="end" class="ertype">'+c.type+'</text>'+badge+'</g>';
      }).join('');
      return '<g class="ertable" data-name="'+t.name+'"><rect x="'+t._x+'" y="'+t._y+'" width="'+ER_TW+'" height="'+h+'" rx="12" class="ertable-bg"/><path d="M '+t._x+' '+(t._y+14)+' Q '+t._x+' '+t._y+' '+(t._x+14)+' '+t._y+' L '+(t._x+ER_TW-14)+' '+t._y+' Q '+(t._x+ER_TW)+' '+t._y+' '+(t._x+ER_TW)+' '+(t._y+14)+' L '+(t._x+ER_TW)+' '+(t._y+ER_HEAD)+' L '+t._x+' '+(t._y+ER_HEAD)+' Z" fill="'+C+'" opacity="0.16"/><rect x="'+t._x+'" y="'+t._y+'" width="4" height="'+h+'" rx="2" fill="'+C+'"/><text x="'+(t._x+16)+'" y="'+(t._y+21)+'" class="ertitle" fill="'+C+'">'+t.name+'</text>'+rows+'</g>';
    }).join('');
    return '<div class="er-hint">⌘ / Ctrl + scroll to zoom · drag to pan · hover a table for relations</div><svg id="erSvg" viewBox="0 0 '+maxX+' '+maxY+'" preserveAspectRatio="xMidYMid meet" class="er-svg">'+edges+tbl+'</svg>';
  }
  function erInit(){
    const svg=document.getElementById('erSvg');if(!svg)return;
    const tables=[...svg.querySelectorAll('.ertable')],edges=[...svg.querySelectorAll('.edge')];
    tables.forEach(t=>{t.addEventListener('mouseenter',()=>{const n=t.dataset.name,L=new Set([n]);edges.forEach(e=>{const on=e.dataset.from===n||e.dataset.to===n;e.classList.toggle('hot',on);if(on){L.add(e.dataset.from);L.add(e.dataset.to);}else e.classList.add('dim');});tables.forEach(x=>{if(!L.has(x.dataset.name))x.classList.add('dim');});});t.addEventListener('mouseleave',()=>{edges.forEach(e=>e.classList.remove('hot','dim'));tables.forEach(x=>x.classList.remove('dim'));});});
    const base=svg.getAttribute('viewBox').split(' ').map(Number);let cur=base.slice();const minW=base[2]*0.25,maxW=base[2]*3;const apply=()=>svg.setAttribute('viewBox',cur.join(' '));
    window.erZoom=f=>{const cx=cur[0]+cur[2]/2,cy=cur[1]+cur[3]/2;let w=cur[2]/f;if(w<minW||w>maxW)return;const h=cur[3]/f;cur=[cx-w/2,cy-h/2,w,h];apply();};
    window.erReset=()=>{cur=base.slice();apply();};
    svg.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();const f=e.deltaY<0?1.12:0.89;const r=svg.getBoundingClientRect();const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;const mx=cur[0]+px*cur[2],my=cur[1]+py*cur[3];let w=cur[2]/f;if(w<minW||w>maxW)return;const h=cur[3]/f;cur=[mx-px*w,my-py*h,w,h];apply();},{passive:false});
    let pan=null;svg.addEventListener('mousedown',e=>{pan={x:e.clientX,y:e.clientY,vx:cur[0],vy:cur[1]};svg.style.cursor='grabbing';});window.addEventListener('mouseup',()=>{if(pan){pan=null;svg.style.cursor='grab';}});window.addEventListener('mousemove',e=>{if(!pan)return;const r=svg.getBoundingClientRect();cur[0]=pan.vx-(e.clientX-pan.x)/r.width*cur[2];cur[1]=pan.vy-(e.clientY-pan.y)/r.height*cur[3];apply();});svg.style.cursor='grab';
  }
  `;
}
