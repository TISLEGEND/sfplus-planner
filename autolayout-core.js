/* Pure geometry adapter for SFEngine's calculated tree. No engine mutation or network. */
(function(root){
'use strict';
const MAX_BUILDINGS=2000, STEP=132, BW=120, BH=134;
const MM=typeof module!=='undefined'?require('./modular-miner'):root.SFModularMiner;
function build(plan,options={}){
 try{return generate(plan,options);}catch(error){
  // Dense packing is optional. Preserve a valid layout for alternate recipes.
  if(options.presentation&&plan?.dataMode==='vanilla'&&options.packing!==false)return generate(plan,{...options,packing:false});
  throw error;
 }
}
function generate(plan,options={}){
 if(!plan?.graph&&!plan?.result?.tree)throw Error('생산 플래너에서 유효한 계획을 먼저 계산하세요.');
 const U=typeof module!=='undefined'?require('./unlocks'):root.SFUnlocks;for(const n of (plan.graphLayout?.groups||plan.result?.rows||[])){const r=plan.data.recipes.find(r=>r.id===n.recipe);U?.assertRecipe(r);}
 const {data,result,clock=100}=plan, groups=[],sources=[],sinks=[],edges=[],byKey=new Map(),raw=new Map();
 const recipes=new Map(data.recipes.map(r=>[r.id,r]));
 function link(from,to,item,amount){const old=edges.find(e=>e.from===from&&e.to===to&&e.item===item);if(old)old.amount+=amount;else edges.push({id:'ae'+edges.length,from,to,item,amount});}
 function walk(n){
  if(n.raw){let s=raw.get(n.id);if(!s){s={id:'ar'+sources.length,item:n.id,amount:0,kind:'source'};raw.set(n.id,s);sources.push(s);}s.amount+=n.amount;return s;}
  if(n.unknown||!Number.isFinite(n.count)||n.count<=0)throw Error('필요 대수가 미확인인 레시피는 배치할 수 없습니다: '+n.id);
  const key=JSON.stringify([n.recipe,n.id,n.machine]);let g=byKey.get(key);
  if(!g){g={id:'ag'+groups.length,item:n.id,recipe:n.recipe,machine:n.machine,count:0,amount:0,kind:'group',modular:plan.choices?.modular?.[n.recipe]};groups.push(g);byKey.set(key,g);}
  g.count+=n.count;g.amount+=n.amount;
  for(const c of n.children)link(walk(c).id,g.id,c.id,c.amount);
  return g;
 }
 let target;
 if(plan.graph){
  const imported=plan.graphLayout;groups.push(...imported.groups.map(g=>({...g})));sources.push(...imported.sources.map(n=>({...n})));sinks.push(...imported.sinks.map(n=>({...n})));edges.push(...imported.edges.map(e=>({...e})));target=groups.at(-1)||sources.at(-1)||sinks.at(-1);
 }else{
 target=walk(result.tree);sinks.push({id:'as0',kind:'sink',item:result.tree.id,amount:result.tree.amount});link(target.id,'as0',result.tree.id,result.tree.amount);
 // Preserve every recipe's byproducts as separate export nodes, without pretending to recycle them.
 for(const g of groups){const r=recipes.get(g.recipe),products=r.modularMiner?MM.evaluate(r,g.modular,clock).output:r.products,p=products.find(p=>p.item===g.item);for(const out of products)if(out.item!==g.item){const s={id:'as'+sinks.length,kind:'sink',byproduct:true,item:out.item,amount:g.amount/p.amount*out.amount};sinks.push(s);link(g.id,s.id,s.item,s.amount);}}
 }
 let total=0;for(const g of groups){g.installed=Math.max(1,Math.ceil(g.count-1e-9));total+=g.installed;g.utilization=g.count/g.installed*(recipes.get(g.recipe)?.modularMiner?Math.min(g.clock??clock,100):(g.clock??clock));g.recipeName=recipes.get(g.recipe)?.name||g.recipe;}
 if(total>MAX_BUILDINGS)throw Error('배치 한도는 건물 '+MAX_BUILDINGS+'대입니다. 생산량을 줄여 주세요.');
 if(groups.length>450||edges.length>1400)throw Error('배치할 생산 단계가 너무 많습니다.');
 const nodes=[...sources,...groups,...sinks],byId=new Map(nodes.map(n=>[n.id,n])),pending=new Set(groups.map(g=>g.id));sources.forEach(s=>s.level=0);
 while(pending.size){let changed=false;for(const id of [...pending]){const incoming=edges.filter(e=>e.to===id).map(e=>byId.get(e.from));if(incoming.every(n=>n.level!==undefined)){byId.get(id).level=1+Math.max(0,...incoming.map(n=>n.level));pending.delete(id);changed=true;}}if(!changed){if(!plan.graph)throw Error('합쳐진 생산 단계가 순환합니다. 레시피를 변경하세요.');for(const id of pending)byId.get(id).level=1+Math.max(0,...groups.filter(n=>n.level!==undefined).map(n=>n.level));pending.clear();}}
 const last=1+Math.max(0,...groups.map(g=>g.level));sinks.forEach(n=>n.level=last);
 // Schedule independent branches just before their consumers (pipe and wire share a stage).
 for(const g of [...groups].sort((a,b)=>b.level-a.level)){
  const next=edges.filter(e=>e.from===g.id).map(e=>byId.get(e.to)).filter(n=>n.kind==='group');
  g.level=next.length?Math.min(...next.map(n=>n.level))-1:last-1;
 }
 // Compact production halls: dependency order, then weighted neighbour ordering.
 const classic=options.presentation&&options.packing!==false&&plan.dataMode==='vanilla'&&groups.length>5;
 const items=[...new Set(edges.map(e=>e.item))].sort(),lane=new Map(items.map((id,i)=>[id,i])),gap=classic?40+items.length*2.5:48+items.length*5,clearance=classic?0:items.length>16?32:8;
 const unique=(g,out)=>[...new Set(edges.filter(e=>out?e.from===g.id:e.to===g.id).map(e=>e.item))].sort((a,b)=>lane.get(a)-lane.get(b));
 for(const g of groups){
  const size=options.sizes?.[g.machine];g.bodyW=size?.w||BW;g.bodyH=size?.h||BH;g.slot=14;
  g.inputs=unique(g,false);g.outputs=unique(g,true);g.treeLeaves=2**Math.ceil(Math.log2(Math.max(1,g.installed)));
  const im=options.overrides?.[g.id]?.input||options.input||'manifold',om=options.overrides?.[g.id]?.output||options.output||'manifold';
  const treeSpace=Math.ceil(Math.log2(Math.max(2,g.treeLeaves)))*20+18;
  g.upper=im==='balanced'?treeSpace:0;g.lower=om==='balanced'?treeSpace:0;
  g.w=Math.max(220,g.installed*(g.bodyW+12)+32)+(im==='balanced'?(g.treeLeaves-g.installed)*16:0);
  if(g.id===target.id&&!classic)g.w+=32;
  g.h=(g.id===target.id&&!classic?94:70)+g.inputs.length*g.slot+g.bodyH+g.outputs.length*g.slot+g.upper+g.lower;
 }
 const area=groups.reduce((sum,g)=>sum+(g.w+gap)*(g.h+gap),0),targetWidth=Math.max(1050,...groups.map(g=>g.w),Math.sqrt(area*1.65));
 const ordered=[...groups].sort((a,b)=>a.level-b.level||a.item.localeCompare(b.item)),rows=[];
 if(classic){
  let pack=[],packed=0;for(const g of ordered){if(pack.length&&packed+g.w>targetWidth){rows.push(pack);pack=[];packed=0;}pack.push(g);packed+=g.w+gap;}if(pack.length)rows.push(pack);
 }else for(const g of ordered){let row=rows.find(r=>r[0].level===g.level);if(!row){row=[];rows.push(row);}row.push(g);}
 // Barycentric sweeps put consumers close to their producers without changing stages.
 const rank=new Map();rows.forEach(r=>r.forEach((g,i)=>rank.set(g.id,i)));
 for(let sweep=0;sweep<4;sweep++)for(const r of (sweep%2?[...rows].reverse():rows)){
  const score=g=>{const ee=edges.filter(e=>sweep%2?e.from===g.id:e.to===g.id).filter(e=>rank.has(sweep%2?e.to:e.from));return ee.length?ee.reduce((v,e)=>v+rank.get(sweep%2?e.to:e.from),0)/ee.length:rank.get(g.id);};
  r.sort((a,b)=>score(a)-score(b)||a.item.localeCompare(b.item));r.forEach((g,i)=>rank.set(g.id,i));
 }
 let maxWidth=Math.max(targetWidth,...rows.map(r=>r.reduce((v,g)=>v+g.w+gap,0)-gap))+gap*2;
 const cardW=190,cardH=64,cardGap=14,cols=Math.max(1,Math.floor((maxWidth-gap*2)/(cardW+cardGap)));
 sources.sort((a,b)=>lane.get(a.item)-lane.get(b.item));
 sources.forEach((n,i)=>Object.assign(n,{x:gap+i%cols*(cardW+cardGap),y:24+Math.floor(i/cols)*(cardH+cardGap),w:cardW,h:cardH,boxes:[]}));
 let y=24+Math.ceil(sources.length/cols)*(cardH+cardGap)+gap;
 const corridors=[y-gap/2];
 rows.forEach((r,ri)=>{
  const height=Math.max(...r.map(g=>g.h)),orderedRow=classic&&ri%2?[...r].reverse():r;let x=gap;
  for(const g of orderedRow){g.x=x;g.y=y;g.row=ri;g.bodyY=y+42+g.inputs.length*g.slot+g.upper;
   g.boxes=Array.from({length:g.installed},(_,i)=>({x:x+22+i*(g.bodyW+12),y:g.bodyY,w:g.bodyW,h:g.bodyH}));x+=g.w+gap;}
  y+=height+gap;corridors.push(y-gap/2);
 });
 // Optimise actual centre distances as well as layer order (unequal hall widths).
 function placeRow(r){let x=gap;for(const g of r){const dx=x-g.x;g.x=x;g.boxes.forEach(b=>b.x+=dx);x+=g.w+gap;}}
 const physicalRows=rows.map((r,i)=>classic&&i%2?[...r].reverse():[...r]);
 const travel=()=>edges.filter(e=>byId.get(e.from).kind==='group'&&byId.get(e.to).kind==='group').reduce((cost,e)=>{const a=byId.get(e.from),b=byId.get(e.to);return cost+Math.abs(a.x+a.w/2-b.x-b.w/2);},0);
 for(let sweep=0;sweep<4;sweep++)for(const r of physicalRows)for(let i=0;i+1<r.length;i++){
  const before=travel();[r[i],r[i+1]]=[r[i+1],r[i]];placeRow(r);
  if(travel()>=before-.01){[r[i],r[i+1]]=[r[i+1],r[i]];placeRow(r);}
 }
 const center=n=>n.x+n.w/2;
 const neighbourX=(n,out)=>{const next=edges.filter(e=>out?e.from===n.id:e.to===n.id).map(e=>byId.get(out?e.to:e.from));return next.length?next.reduce((sum,g)=>sum+center(g),0)/next.length:0;};
 sources.sort((a,b)=>neighbourX(a,true)-neighbourX(b,true));sources.forEach((n,i)=>n.x=gap+i%cols*(cardW+cardGap));
 const exports=[...sinks].sort((a,b)=>neighbourX(a,false)-neighbourX(b,false)||a.item.localeCompare(b.item));
 const sinkCols=Math.min(5,cols,Math.max(1,exports.length)),startX=Math.max(gap,maxWidth-gap-sinkCols*(cardW+cardGap));
 const exportRows=Math.ceil(exports.length/sinkCols);
 exports.forEach((n,i)=>Object.assign(n,{x:startX+Math.floor(i/exportRows)*(cardW+cardGap),y:y+i%exportRows*(cardH+cardGap),w:cardW,h:cardH,boxes:[]}));
 y+=Math.ceil(exports.length/sinkCols)*(cardH+cardGap)+24;
 // A single ordered parallel lane per item in the corridors. Route shortest paths
 // on the panel visibility grid; favour already-used segments of the same bus.
 for(const g of groups){g.final=plan.graph?!!g.final:g.id===target.id;g.byproducts=edges.filter(e=>e.from===g.id&&byId.get(e.to).byproduct).map(e=>({item:e.item,amount:e.amount,sink:e.to}));}
 const terminal=n=>n.byproduct?{...n,...n.badge}:n;
 for(const g of groups)for(const [i,b] of g.byproducts.entries()){const n=byId.get(b.sink);n.producer=g.id;n.badge={x:g.x+22+(g.outputs.indexOf(b.item)+1)*(g.w-44)/(g.outputs.length+1)-12,y:g.y+g.h+4,w:24,h:24};}
 const routed=[],busMap=new Map(),obstacles=nodes.map(n=>({x:n.x,y:n.y,w:n.w,h:n.h}));
 const hits=(a,b)=>obstacles.some(r=>a.x===b.x?a.x>r.x+.01&&a.x<r.x+r.w-.01&&Math.max(a.y,b.y)>r.y+.01&&Math.min(a.y,b.y)<r.y+r.h-.01:a.y>r.y+.01&&a.y<r.y+r.h-.01&&Math.max(a.x,b.x)>r.x+.01&&Math.min(a.x,b.x)<r.x+r.w-.01);
 const key=(a,b)=>[a.x,a.y,b.x,b.y].join(',');
 const span=item=>{const ns=edges.filter(e=>e.item===item).flatMap(e=>[byId.get(e.from),byId.get(e.to)]),xs=ns.map(n=>n.x+n.w/2),ys=ns.map(n=>n.y+n.h/2);return Math.max(...xs)-Math.min(...xs)+Math.max(...ys)-Math.min(...ys);};
 for(const routeKey of (plan.graph?edges.map(e=>e.id):[...items].sort((a,b)=>span(a)-span(b)||a.localeCompare(b)))){
  const item=plan.graph?edges.find(e=>e.id===routeKey).item:routeKey;
  const ee=edges.filter(e=>(plan.graph?e.id===routeKey:e.item===item)&&!byId.get(e.to).byproduct);if(!ee.length)continue;const offset=12+lane.get(item)*2.5,used=new Set(),segments=[];
  for(const e of ee){const a=terminal(byId.get(e.from)),b=terminal(byId.get(e.to));
   e.ax=a.kind==='group'?a.x+22+(a.outputs.indexOf(item)+1)*(a.w-44)/(a.outputs.length+1):a.x+a.w/2;
   e.bx=b.kind==='group'?b.x+22+(b.inputs.indexOf(item)+1)*(b.w-44)/(b.inputs.length+1):b.x+b.w/2;
   // Reserve clearance for the short terminal legs as well as the routed trunk.
   const clearPort=(n,x,y1,y2)=>{
    const clear=q=>!routed.some(([c,d])=>c.x===d.x&&Math.abs(q-c.x)<clearance-.01&&Math.min(Math.max(y1,y2),Math.max(c.y,d.y))-Math.max(Math.min(y1,y2),Math.min(c.y,d.y))>.01);
    if(clear(x))return x;
    for(let step=1;step<Math.ceil(n.w/8);step++)for(const dir of [1,-1]){const q=x+dir*step*8;if(q>n.x+16&&q<n.x+n.w-16&&clear(q))return q;}
    throw Error('입출력 단자 간격을 확보하지 못했습니다.');
   };
   e.ax=clearPort(a,e.ax,a.y+a.h,a.y+a.h+(a.kind==='group'?offset:8));
   e.bx=clearPort(b,e.bx,b.y,b.y-(b.kind==='group'?offset:8));
   e.busStart={x:e.ax,y:a.y+a.h+(a.kind==='group'?offset:8)};e.busEnd={x:e.bx,y:b.y-(b.kind==='group'?offset:8)};
  }
  const xs=[...new Set([offset,maxWidth-offset,...groups.flatMap(g=>[g.x-offset,g.x+g.w+offset]),...ee.flatMap(e=>[e.ax,e.bx])])].sort((a,b)=>a-b);
  const ys=[...new Set([24-offset,...nodes.flatMap(n=>[n.y-offset,n.y+n.h+offset]),...ee.flatMap(e=>[e.busStart.y,e.busEnd.y])])].sort((a,b)=>a-b);
  const crossing=(a,b)=>routed.reduce((n,[c,d])=>{
   const v=a.x===b.x,w=c.x===d.x;if(v===w)return n;
   const [p,q,r,s]=v?[a,b,c,d]:[c,d,a,b];return n+(p.x>=Math.min(r.x,s.x)-.01&&p.x<=Math.max(r.x,s.x)+.01&&r.y>=Math.min(p.y,q.y)-.01&&r.y<=Math.max(p.y,q.y)+.01?1:0);
  },0);
  const spaced=(a,b)=>hits(a,b)||routed.some(([c,d])=>{
   const v=a.x===b.x;if(v!==(c.x===d.x))return false;
   const distance=Math.abs(v?a.x-c.x:a.y-c.y);
   return distance<clearance-.01&&(v?Math.min(Math.max(a.y,b.y),Math.max(c.y,d.y))-Math.max(Math.min(a.y,b.y),Math.min(c.y,d.y)):Math.min(Math.max(a.x,b.x),Math.max(c.x,d.x))-Math.max(Math.min(a.x,b.x),Math.min(c.x,d.x)))>.01;
  });
  const optimal=makeRouter(xs,ys,spaced,used,key,crossing),shortest=makeRouter(xs,ys,spaced,used,key,()=>0);
  const length=p=>p.slice(1).reduce((sum,q,i)=>sum+Math.abs(q.x-p[i].x)+Math.abs(q.y-p[i].y),0);
  const route=(start,end)=>{const saved=[...used],restore=()=>{used.clear();saved.forEach(k=>used.add(k));};const direct=shortest(start,end);restore();const preferred=optimal(start,end);if(length(preferred)>length(direct)*1.4+.01){restore();return shortest(start,end);}return preferred;};
  // Grow one shared tree by joining the nearest remaining terminal to any point
  // already on the bus. This avoids independent fan-out routes and connector loops.
  const connectors=[],pointKey=p=>p.x+','+p.y,terminals=[...new Map(ee.flatMap(e=>[e.busStart,e.busEnd]).map(p=>[pointKey(p),p])).values()];
  const anchor=ee.map(e=>e.busStart).sort((a,b)=>a.y-b.y||a.x-b.x)[0],treePoints=new Map([[pointKey(anchor),anchor]]),pendingTerminals=terminals.filter(p=>pointKey(p)!==pointKey(anchor));
  while(pendingTerminals.length){
   const distance=p=>Math.min(...[...treePoints.values()].map(q=>Math.abs(p.x-q.x)+Math.abs(p.y-q.y)));
   pendingTerminals.sort((a,b)=>distance(a)-distance(b)||a.x-b.x||a.y-b.y);const terminal=pendingTerminals.shift();
   const points=route(terminal,[...treePoints.values()]);
   for(let i=1;i<points.length;i++)connectors.push([points[i-1],points[i]]);
   for(const k of used){const [x,y,u,v]=k.split(',').map(Number);treePoints.set(x+','+y,{x,y});treePoints.set(u+','+v,{x:u,y:v});}
  }
  const adjacent=new Map();for(const k of used){const [x,y,u,v]=k.split(',').map(Number),a=x+','+y,b=u+','+v;if(!adjacent.has(a))adjacent.set(a,[]);adjacent.get(a).push(b);}
  for(const e of ee){const start=pointKey(e.busStart),end=pointKey(e.busEnd),previous=new Map([[start,null]]),queue=[start];
   for(let i=0;i<queue.length&&!previous.has(end);i++)for(const next of adjacent.get(queue[i])||[])if(!previous.has(next)){previous.set(next,queue[i]);queue.push(next);}
   if(!previous.has(end))throw Error('공용 버스 연결을 찾지 못했습니다.');
   const chain=[];for(let k=end;k!==null;k=previous.get(k))chain.push(treePoints.get(k));chain.reverse();
   const p=chain.filter((v,i)=>!i||i===chain.length-1||!((chain[i-1].x===v.x&&v.x===chain[i+1].x)||(chain[i-1].y===v.y&&v.y===chain[i+1].y)));
   const a=terminal(byId.get(e.from)),b=terminal(byId.get(e.to));e.points=[{x:e.ax,y:a.y+a.h},...p,{x:e.bx,y:b.y}];e.fromY=e.busStart.y;e.toY=e.busEnd.y;
   for(let i=1;i<e.points.length;i++)segments.push([e.points[i-1],e.points[i]]);
  }
  segments.push(...connectors);
  // Union collinear intervals, so fan-out never paints duplicate trunks.
  const axes=new Map();for(const [a,b] of segments){const v=a.x===b.x,k=(v?'v':'h')+','+(v?a.x:a.y);if(!axes.has(k))axes.set(k,[]);axes.get(k).push({lo:Math.min(v?a.y:a.x,v?b.y:b.x),hi:Math.max(v?a.y:a.x,v?b.y:b.x),dir:(v?b.y-a.y:b.x-a.x)>0?1:-1});}
  const paths=[];for(const [k,ranges] of axes){ranges.sort((a,b)=>a.lo-b.lo);const merged=[];for(const r of ranges){const prev=merged.at(-1);if(prev&&r.lo<=prev.hi+.01)prev.hi=Math.max(prev.hi,r.hi);else merged.push({...r});}const [axis,c]=k.split(',');for(const r of merged){let points=axis==='v'?[{x:+c,y:r.lo},{x:+c,y:r.hi}]:[{x:r.lo,y:+c},{x:r.hi,y:+c}];if(r.dir<0)points.reverse();paths.push(points);}}
  routed.push(...paths.map(p=>[p[0],p[1]]));
  busMap.set(routeKey,{item,paths,amount:ee.reduce((n,e)=>n+e.amount,0),start:ee[0].points[1]||ee[0].points[0]});
 }
 for(const e of edges.filter(e=>byId.get(e.to).byproduct)){const g=byId.get(e.from),b=byId.get(e.to).badge;e.ax=b.x+12;e.bx=e.ax;e.fromY=g.y+g.h+2;e.toY=b.y;e.points=[{x:e.ax,y:g.y+g.h},{x:e.ax,y:b.y}];}
 const buses=[...busMap.values()];

 for(const e of edges)Object.defineProperty(e,'transport',{value:U?.capacity(data,e.item,e.amount,plan.dataMode),enumerable:false});
 const layout={groups,sources,sinks,nodes,edges,width:maxWidth+30,height:y,clock,total,buses,graph:!!plan.graph,dataMode:plan.dataMode};
 return options.presentation?present(layout):layout;
}
// Monotone axis compaction preserves every route intersection and panel separation.
// A compact hall has fewer world units per machine lane; images retain their aspect ratio.
function point(projection,p){
 const axis=(a,v)=>{const {from,to}=projection[a];let lo=0,hi=from.length-1;while(lo+1<hi){const m=(lo+hi)>>1;if(from[m]<=v)lo=m;else hi=m;}const i=v<=from[0]?0:v>=from.at(-1)?from.length-2:lo;return to[i]+(v-from[i])*(to[i+1]-to[i])/(from[i+1]-from[i]);};
 const x=axis('x',p.x),y=axis('y',p.y);return projection.horizontal?{x:y,y:x}:{x,y};
}
function present(drawing){
 const horizontal=drawing.graph||drawing.dataMode!=='vanilla'&&drawing.groups.length>3;
 // Byproduct summaries live on their producer's badge, never in a remote export yard.
 for(const n of drawing.sinks.filter(n=>n.byproduct))Object.assign(n,n.badge);
 const panels=drawing.nodes.filter(n=>!n.byproduct),points=panels.flatMap(n=>[{x:n.x,y:n.y},{x:n.x+n.w,y:n.y+n.h}]).concat(drawing.buses.flatMap(b=>b.paths.flat()),drawing.sinks.filter(n=>n.byproduct).flatMap(n=>[{x:n.x,y:n.y},{x:n.x+n.w,y:n.y+n.h}]));
 const projection={horizontal};
 for(const axis of ['x','y']){
  const size=axis==='x'?'w':'h',from=[...new Set(points.map(p=>p[axis]))].sort((a,b)=>a-b),to=[20];
  // Wide multi-machine lanes become narrow vertical lanes in the horizontal view.
  const scale=horizontal?(drawing.groups.length>24?(axis==='x'?.30:.49):.60):2/3;
  for(let i=1;i<from.length;i++){const mid=(from[i]+from[i-1])/2,d=from[i]-from[i-1],occupied=panels.some(n=>mid>n[axis]&&mid<n[axis]+n[size]);const cardBand=horizontal&&axis==='y'&&panels.some(n=>n.kind==='source'&&mid>n.y&&mid<n.y+n.h);to.push(to.at(-1)+(occupied?d:Math.min(d,Math.max(8,d*(drawing.groups.length>24?(axis==='x'?1:.50):.25))))*(cardBand?2:scale));}
  // Keep distinct parallel buses at least eight drawing units apart after compaction.
  const lines=drawing.buses.flatMap(b=>b.paths.map(p=>({item:b.item,a:p[0],b:p[1]}))).filter(s=>axis==='x'?s.a.x===s.b.x:s.a.y===s.b.y),constraints=[];
  for(let i=0;i<lines.length;i++)for(let j=i+1;j<lines.length;j++){
   const a=lines[i],b=lines[j],other=axis==='x'?'y':'x';if(a.item===b.item||Math.min(Math.max(a.a[other],a.b[other]),Math.max(b.a[other],b.b[other]))-Math.max(Math.min(a.a[other],a.b[other]),Math.min(b.a[other],b.b[other]))<=.1)continue;
   const lo=from.indexOf(Math.min(a.a[axis],b.a[axis])),hi=from.indexOf(Math.max(a.a[axis],b.a[axis]));if(lo!==hi)constraints.push({lo,hi});
  }
  constraints.sort((a,b)=>a.hi-b.hi||b.lo-a.lo);for(const {lo,hi}of constraints){const extra=8-(to[hi]-to[lo]);if(extra>.001)for(let i=hi;i<to.length;i++)to[i]+=extra;}
  projection[axis]={from,to};
 }
 const rect=r=>{const a=point(projection,r),b=point(projection,{x:r.x+r.w,y:r.y+r.h});return {...r,x:a.x,y:a.y,w:b.x-a.x,h:b.y-a.y};};
 const nodes=drawing.nodes.map(n=>({...rect(n),boxes:n.boxes.map(rect),...(n.badge?{badge:rect(n.badge)}:{})})),byId=new Map(nodes.map(n=>[n.id,n]));
 const edges=drawing.edges.map(e=>({...e,points:e.points.map(p=>point(projection,p))})),buses=drawing.buses.map(b=>({...b,paths:b.paths.map(p=>p.map(p=>point(projection,p))),start:point(projection,b.start)}));
 // The final export belongs beside its producer, with a short local connection.
 const target=nodes.find(n=>n.final),output=nodes.find(n=>n.kind==='sink'&&!n.byproduct);
 if(target&&output&&!drawing.graph){
  const edge=edges.find(e=>e.to===output.id),start=edge.points[0];
  if(horizontal){Object.assign(output,{x:target.x+target.w+32,y:target.y+target.h/2-32,w:170,h:64});edge.points=[start,{x:output.x-16,y:start.y},{x:output.x-16,y:output.y+32},{x:output.x,y:output.y+32}];}
  else{Object.assign(output,{x:target.x+target.w/2-85,y:target.y+target.h+32,w:170,h:64});edge.points=[start,{x:start.x,y:output.y-16},{x:output.x+85,y:output.y-16},{x:output.x+85,y:output.y}];}
  const bus=buses.find(b=>b.item===edge.item);if(bus&&edges.filter(e=>e.item===edge.item).length===1){bus.paths=edge.points.slice(1).map((p,i)=>[edge.points[i],p]).filter(([a,b])=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y)>.01);bus.start=start;}
 }

 return {...drawing,nodes,groups:drawing.groups.map(n=>byId.get(n.id)),sources:drawing.sources.map(n=>byId.get(n.id)),sinks:drawing.sinks.map(n=>byId.get(n.id)),edges,buses,width:Math.max(...nodes.filter(n=>!n.byproduct).map(n=>n.x+n.w),...buses.flatMap(b=>b.paths.flat().map(p=>p.x)))+20,height:Math.max(...nodes.filter(n=>!n.byproduct).map(n=>n.y+n.h),...buses.flatMap(b=>b.paths.flat().map(p=>p.y)))+20,projection,drawing};
}
// Reusable orthogonal A* router. Every segment is checked against whole panels.
function makeRouter(xs,ys,hits,used,key,crossing){
 const nx=xs.length,pos=id=>({x:xs[id%nx],y:ys[Math.floor(id/nx)]}),valid=new Map(),penalties=new Map();
 return function(start,end){
  const targets=Array.isArray(end)?end:[end],targetSet=new Set(targets.map(p=>ys.indexOf(p.y)*nx+xs.indexOf(p.x))),minX=Math.min(...targets.map(p=>p.x)),maxX=Math.max(...targets.map(p=>p.x)),minY=Math.min(...targets.map(p=>p.y)),maxY=Math.max(...targets.map(p=>p.y));
  const source=ys.indexOf(start.y)*nx+xs.indexOf(start.x),dist=new Map([[source,0]]),prev=new Map(),heap=[],closed=new Set();
  function push(id,cost){let i=heap.length;heap.push({id,cost});while(i){const p=(i-1)>>1;if(heap[p].cost<=cost)break;heap[i]=heap[p];i=p;}heap[i]={id,cost};}
  function pop(){const first=heap[0],tail=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let c=i*2+1;if(c+1<heap.length&&heap[c+1].cost<heap[c].cost)c++;if(heap[c].cost>=tail.cost)break;heap[i]=heap[c];i=c;}heap[i]=tail;}return first;}
  push(source,0);
  while(heap.length){const {id}=pop();if(closed.has(id))continue;if(targetSet.has(id)){const p=[];let cur=id;while(cur!==undefined){p.push(pos(cur));cur=prev.get(cur);}p.reverse();for(let i=1;i<p.length;i++){used.add(key(p[i-1],p[i]));used.add(key(p[i],p[i-1]));}return p.filter((v,i)=>!i||i===p.length-1||!((p[i-1].x===v.x&&v.x===p[i+1].x)||(p[i-1].y===v.y&&v.y===p[i+1].y)));}closed.add(id);const x=id%nx,y=Math.floor(id/nx),a=pos(id);
   for(const next of [x?id-1:-1,x+1<nx?id+1:-1,y?id-nx:-1,y+1<ys.length?id+nx:-1]){if(next<0||closed.has(next))continue;const b=pos(next),k=key(a,b);if(!valid.has(k))valid.set(k,!hits(a,b));if(!valid.get(k))continue;
    if(!penalties.has(k))penalties.set(k,crossing(a,b)*600);
    const length=Math.abs(a.x-b.x)+Math.abs(a.y-b.y),cost=dist.get(id)+length*(used.has(k)?.78:1)+penalties.get(k);
    if(cost<(dist.get(next)??Infinity)){dist.set(next,cost);prev.set(next,id);push(next,cost+.78*(Math.max(0,minX-b.x,b.x-maxX)+Math.max(0,minY-b.y,b.y-maxY)));}}
  }
  throw Error('건물을 통과하지 않는 연결 통로를 찾지 못했습니다.');
 };
}
function toGraph(layout,plan,graphData=plan.data){
 const normalize=s=>s.toLowerCase().replace(/^alternate:\s*/,'').replace(/\bscrews\b/g,'screw').replace(/[^a-z0-9]/g,''),itemMap=new Map();
 function item(id){if(itemMap.has(id))return itemMap.get(id);const found=graphData.items[id]?id:Object.keys(graphData.items).find(k=>normalize(graphData.items[k].name)===normalize(plan.data.items[id]?.name||id));if(!found)throw Error('편집기 품목 매핑 없음: '+id);itemMap.set(id,found);return found;}
 function mappedRecipe(n){
  if(graphData===plan.data)return {id:n.recipe,count:n.count};
  const old=plan.data.recipes.find(r=>r.id===n.recipe),primary=item(n.item),product=old.products.find(p=>p.item===n.item);
  const equivalent=r=>['ingredients','products'].every(side=>{const a=old[side].map(p=>[item(p.item),p.amount/product.amount]).sort((a,b)=>a[0].localeCompare(b[0]));const p=r.products.find(p=>p.item===primary);if(!p)return false;const b=r[side].map(q=>[q.item,q.amount/p.amount]).sort((a,b)=>a[0].localeCompare(b[0]));return a.length===b.length&&a.every((q,i)=>q[0]===b[i][0]&&Math.abs(q[1]-b[i][1])<1e-7);});
  const r=graphData.recipes.find(r=>r.id===n.recipe&&equivalent(r))||graphData.recipes.find(r=>normalize(r.name)===normalize(old.name)&&equivalent(r));
  if(!r)throw Error('편집기와 수량이 일치하는 레시피 없음: '+old.name);
  const p=r.products.find(p=>p.item===primary),rate=p.amount*60/r.seconds*graphData.buildings[r.machines[0]].speed*(plan.clock||100)/100;
  return {id:r.id,count:n.amount/rate};
 }
 const nodes=layout.nodes.map(n=>{const r=n.kind==='group'?mappedRecipe(n):null;return {id:n.id,type:n.kind==='group'?'recipe':n.kind==='source'?'resource':'sink',x:n.x,y:n.y,max:r?r.count:n.amount,clock:plan.clock||100,...(r?{recipe:r.id,modular:n.modular}:{item:item(n.item)})};});
 return {version:1,calculationVersion:1,dataMode:plan.dataMode,solver:'Nominal',nodes,edges:layout.edges.map(e=>({id:e.id,from:e.from,to:e.to,item:item(e.item)})),view:{zoom:1,x:30,y:30},warnings:['자동 배치에서 가져옴: 묶음별 생산 노드입니다. 분배·합류 도형은 편집기에 넘기지 않습니다.']};
}
// Maximum actual load on a drawn shared segment, without summing disjoint branches.
function segmentFlow(points,edges,item){const a=points[0],b=points.at(-1),vertical=Math.abs(a.x-b.x)<1e-6,axis=vertical?'y':'x',fixed=vertical?'x':'y',lo=Math.min(a[axis],b[axis]),hi=Math.max(a[axis],b[axis]),events=[];
 for(const e of edges.filter(e=>e.item===item)){const ranges=[];for(let i=1;i<e.points.length;i++){const c=e.points[i-1],d=e.points[i];if(Math.abs(c[fixed]-a[fixed])>1e-5||Math.abs(d[fixed]-a[fixed])>1e-5)continue;const from=Math.max(lo,Math.min(c[axis],d[axis])),to=Math.min(hi,Math.max(c[axis],d[axis]));if(to-from>1e-6)ranges.push([from,to]);}ranges.sort((a,b)=>a[0]-b[0]);const merged=[];for(const r of ranges){const last=merged.at(-1);if(last&&r[0]<=last[1]+1e-6)last[1]=Math.max(last[1],r[1]);else merged.push(r);}for(const [from,to]of merged)events.push([from,e.amount],[to,-e.amount]);}
 events.sort((a,b)=>a[0]-b[0]);let load=0,max=0;for(let i=0;i<events.length;){const x=events[i][0];do{load+=events[i++][1];}while(i<events.length&&Math.abs(events[i][0]-x)<1e-6);max=Math.max(max,load);}return max;}
const api={segmentFlow,build,toGraph,point,BW,BH,STEP,MAX_BUILDINGS};if(typeof module!=='undefined')module.exports=api;else root.SFAutolayout=api;
})(typeof window==='undefined'?globalThis:window);



