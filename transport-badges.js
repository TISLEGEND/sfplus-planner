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
// Move captions, never port coordinates. All collision decisions use graph pixels.
function placeGraphCaptions(root){
 const matrix=new DOMMatrixReadOnly(getComputedStyle(root).transform),z=Math.abs(matrix.a)||1,rr=rect(root);
 const world=e=>{const r=rect(e);return {left:(r.left-rr.left)/z,right:(r.right-rr.left)/z,top:(r.top-rr.top)/z,bottom:(r.bottom-rr.top)/z};};
 const occupied=[...root.querySelectorAll('.graph-node,.g-node-caption')].map(world);
 const buckets=new Map(),cell=64,paths=new Map();
 let edgeId,points;
 const add=p=>{p.edge=edgeId;const prev=points.at(-1);p.along=prev?prev.along+Math.hypot(p.x-prev.x,p.y-prev.y):0;points.push(p);const key=Math.floor(p.x/cell)+':'+Math.floor(p.y/cell);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(p);};
 for(const path of root.querySelectorAll('#gLines path[data-route]')){
  edgeId=path.dataset.id;points=[];paths.set(edgeId,points);
  let a;for(const command of path.getAttribute('d').matchAll(/([MLC])([^MLC]+)/g)){
   const n=command[2].trim().split(/[ ,]+/).map(Number),b={x:n.at(-2),y:n.at(-1)};
   if(command[1]==='M'){a=b;add(a);continue;}
   const c={x:n[0],y:n[1]},d={x:n[2],y:n[3]},cubic=command[1]==='C';
   const steps=Math.max(1,Math.ceil((cubic?3*Math.max(Math.hypot(c.x-a.x,c.y-a.y),Math.hypot(d.x-c.x,d.y-c.y),Math.hypot(b.x-d.x,b.y-d.y)):Math.hypot(b.x-a.x,b.y-a.y))/4));
   for(let i=1;i<=steps;i++){const t=i/steps,u=1-t;add(cubic?{x:u*u*u*a.x+3*u*u*t*c.x+3*u*t*t*d.x+t*t*t*b.x,y:u*u*u*a.y+3*u*u*t*c.y+3*u*t*t*d.y+t*t*t*b.y}:{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}a=b;
  }
 }
 const lineHit=(r,own)=>{for(let x=Math.floor((r.left-4)/cell);x<=Math.floor((r.right+4)/cell);x++)for(let y=Math.floor((r.top-4)/cell);y<=Math.floor((r.bottom+4)/cell);y++)for(const p of buckets.get(x+':'+y)||[])if(p.edge!==own&&p.x>r.left-4&&p.x<r.right+4&&p.y>r.top-4&&p.y<r.bottom+4)return true;return false;};
 const resourceIds=new Set(window.RiriGraph.display().nodes.filter(n=>n.type==='resource').map(n=>n.id));
 const warnings=[...root.querySelectorAll('.g-port-number')],labels=[...root.querySelectorAll('.g-edge-label:not(.g-waypoint)')];
 // Status belongs to its port, even when another route needs to yield.
 for(const e of warnings){
  e.style.position='absolute';e.style.left=e.dataset.portValue==='output'?'29px':'auto';e.style.right=e.dataset.portValue==='input'?'29px':'auto';e.style.top='50%';e.style.transform='translateY(-50%)';e.style.setProperty('--port-leader','0px');
  occupied.push(world(e));
 }
 // Reserve scarce clear spans first; a flexible caption must not consume the
 // only usable span of a neighbouring edge in a fan-out.
 const candidates=new Map();
 for(const e of labels){
  const base=world(e),w=(base.right-base.left)/2,h=(base.bottom-base.top)/2;
  const samples=paths.get(e.dataset.edge)||[],start=samples[0];
  const siblings=labels.filter(l=>l.dataset.source===e.dataset.source&&l.dataset.item===e.dataset.item).length;
  const resource=resourceIds.has(e.dataset.source);
  e.dataset.branchLabel=String(resource&&siblings>1);
  // Shared vertical escape trunks cannot identify an individual branch.
  // Require a complete caption width beyond the escape and a horizontal tangent.
  const branchSamples=resource&&siblings>1?samples.filter(p=>p.x>=start.x+40+w+16):samples;
  candidates.set(e,branchSamples.filter(p=>{if(Math.hypot(p.x-start.x,p.y-start.y)<w+12)return false;const r={left:p.x-w,right:p.x+w,top:p.y-h,bottom:p.y+h};return !occupied.some(o=>hit(r,o))&&!lineHit(r,e.dataset.edge);}));
  if(resource&&siblings>1&&!candidates.get(e).length){e.dataset.parallelBranch='true';candidates.set(e,branchSamples.filter(p=>!occupied.some(o=>hit({left:p.x-w,right:p.x+w,top:p.y-h,bottom:p.y+h},o))));}else delete e.dataset.parallelBranch;
 }
 labels.sort((a,b)=>candidates.get(a).length-candidates.get(b).length);
 for(const e of labels){
  const base=world(e),w=(base.right-base.left)/2,h=(base.bottom-base.top)/2;
  const samples=paths.get(e.dataset.edge)||[],start=samples[0];let chosen;
  // Prefer the first quarter of the arc, then 40%. Within each window,
  // stay near a common source-side column; collisions slide along this edge.
  const length=samples.at(-1)?.along||1;
  const siblings=labels.filter(l=>l.dataset.source===e.dataset.source&&l.dataset.item===e.dataset.item).length;
  const column=start.x+Math.sign((samples.at(-1)?.x||start.x)-start.x||1)*Math.max(64,w+12);
  for(const limit of [.25,.4,1]){
   let score=Infinity;
   for(const p of candidates.get(e)){
    if(p.along>length*limit)break;
    if(Math.hypot(p.x-start.x,p.y-start.y)<w+12)continue;
    const r={left:p.x-w,right:p.x+w,top:p.y-h,bottom:p.y+h};
    if(occupied.some(o=>hit(r,o))||(e.dataset.parallelBranch!=='true'&&lineHit(r,e.dataset.edge)))continue;
    const cost=p.along+(siblings>1?Math.abs(p.x-column)*.4:0);
    if(cost<score){chosen={p,r};score=cost;}
   }
   if(chosen)break;
  }
  e.dataset.placementFallback=String(!chosen);
  // In an impossible layout preserve ownership instead of floating off the line.
  if(!chosen){const p=samples.find(p=>Math.hypot(p.x-start.x,p.y-start.y)>=w+12)||start;if(!p)continue;chosen={p,r:{left:p.x-w,right:p.x+w,top:p.y-h,bottom:p.y+h}};}
  e.style.left=chosen.p.x+'px';e.style.top=chosen.p.y+'px';e.dataset.anchorX=chosen.p.x;e.dataset.anchorY=chosen.p.y;e.dataset.pathRatio=chosen.p.along/(samples.at(-1)?.along||1);occupied.push(chosen.r);
 }

}
window.SFTransportBadges={
 caption:(limit,amount)=>amount+(limit.kind==='pipe'?' m³/분':'/분')+' · '+(limit.kind==='pipe'?'파이프 ':'')+(/Mk\.\d+/.exec(limit.label)?.[0]||'Mk.1')+' ×'+limit.lines+'줄',
 graph(){const root=document.getElementById('gWorld');if(!root||!root.getBoundingClientRect||document.getElementById('graphPanel').hidden)return;const z=window.RiriGraph?.get().view.zoom||1;placeGraphCaptions(root);},
 layout(){const root=document.getElementById('alWorld');if(!root||document.getElementById('layoutPanel').hidden)return;place([...root.querySelectorAll('.transport-warning')],[...root.querySelectorAll('text:not(.transport-warning),.al-machine-art,.al-junction,.al-card')],(e,dx,dy)=>{const m=e.parentNode.getScreenCTM();if(!m)return;e.style.fontSize=(12/Math.hypot(m.a,m.b))+'px';e.style.strokeWidth=(5/Math.hypot(m.a,m.b))+'px';const origin=new DOMPoint(0,0).matrixTransform(m.inverse()),delta=new DOMPoint(dx,dy).matrixTransform(m.inverse());e.setAttribute('x',+e.dataset.anchorX+delta.x-origin.x);e.setAttribute('y',+e.dataset.anchorY+delta.y-origin.y);},rect(document.getElementById('alViewport')));}
};
})();
