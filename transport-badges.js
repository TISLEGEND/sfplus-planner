/* Presentation only: deterministic placement in screen pixels, independent of solver state. */
(() => {
'use strict';
const rect=e=>e.getBoundingClientRect(), visible=e=>{const s=getComputedStyle(e),r=rect(e);return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;};
const hit=(a,b)=>a.left<b.right+6&&a.right>b.left-6&&a.top<b.bottom+6&&a.bottom>b.top-6;
function place(labels,obstacles,move,bounds){
 const occupied=obstacles.filter(visible).map(rect);
 for(const e of labels){
  e.style.visibility='visible';move(e,0,0);const base=rect(e);let found=false;
  // Search near the line first, then above/below or along it. Never hide a warning.
  const step=Math.max(24,base.height+12);
  for(let ring=0;ring<40&&!found;ring++){
   const candidates=ring===0?[[0,0]]:[[0,-ring*step],[0,ring*step],[-ring*step,0],[ring*step,0],[-ring*step,-ring*step],[ring*step,-ring*step],[-ring*step,ring*step],[ring*step,ring*step]];
   for(let [dx,dy] of candidates){if(bounds){dx=Math.max(bounds.left+6-base.left,Math.min(dx,bounds.right-6-base.right));dy=Math.max(bounds.top+8-base.top,Math.min(dy,bounds.bottom-8-base.bottom));}const r={left:base.left+dx,right:base.right+dx,top:base.top+dy,bottom:base.bottom+dy};if(occupied.some(b=>hit(r,b)))continue;move(e,dx,dy);occupied.push(rect(e));found=true;break;}
  }
  if(!found){const bottom=Math.max(base.bottom,...occupied.map(r=>r.bottom));move(e,0,bottom-base.top+12);occupied.push(rect(e));}
 }
}
window.SFTransportBadges={
 caption:(limit,amount)=>amount+(limit.kind==='pipe'?' m³/분':'/분')+' · '+(limit.kind==='pipe'?'파이프 ':'')+(/Mk\.\d+/.exec(limit.label)?.[0]||'Mk.1')+' ×'+limit.lines+'줄',
 graph(){const root=document.getElementById('gWorld');if(!root||!root.getBoundingClientRect||document.getElementById('graphPanel').hidden)return;const z=window.RiriGraph?.get().view.zoom||1;place([...root.querySelectorAll('.g-port-number')],[...root.querySelectorAll('.graph-node,.g-port,.g-node-caption')],(e,dx,dy)=>{e.style.transform=`translate(${dx/z}px,${dy/z}px)`;});place([...root.querySelectorAll('.g-edge-label.transport-over')],[...root.querySelectorAll('.graph-node,.graph-node *,.g-edge-label:not(.transport-over)')],(e,dx,dy)=>{e.style.left=(+e.dataset.anchorX+dx/z)+'px';e.style.top=(+e.dataset.anchorY+dy/z)+'px';});},
 layout(){const root=document.getElementById('alWorld');if(!root||document.getElementById('layoutPanel').hidden)return;place([...root.querySelectorAll('.transport-warning')],[...root.querySelectorAll('text:not(.transport-warning),.al-machine-art,.al-junction,.al-card')],(e,dx,dy)=>{const m=e.parentNode.getScreenCTM();if(!m)return;e.style.fontSize=(12/Math.hypot(m.a,m.b))+'px';e.style.strokeWidth=(5/Math.hypot(m.a,m.b))+'px';const origin=new DOMPoint(0,0).matrixTransform(m.inverse()),delta=new DOMPoint(dx,dy).matrixTransform(m.inverse());e.setAttribute('x',+e.dataset.anchorX+delta.x-origin.x);e.setAttribute('y',+e.dataset.anchorY+delta.y-origin.y);},rect(document.getElementById('alViewport')));}
};
})();
