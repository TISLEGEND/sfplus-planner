/* Deterministic, obstacle-aware channel allocation. Coordinates are graph pixels. */
(function(root){'use strict';
const GAP=8, EPS=1e-6;
function segment(a,b){return {a,b,h:Math.abs(a.y-b.y)<EPS};}
function overlap(s,t,gap=EPS){if(s.h!==t.h)return false;const axis=s.h?'y':'x',along=s.h?'x':'y';return Math.abs(s.a[axis]-t.a[axis])<(gap===EPS?EPS:gap-EPS) && Math.min(Math.max(s.a[along],s.b[along]),Math.max(t.a[along],t.b[along]))-Math.max(Math.min(s.a[along],s.b[along]),Math.min(t.a[along],t.b[along]))>EPS;}
function hits(a,b,r){return a.y===b.y?a.y>r.y+EPS&&a.y<r.y+r.h-EPS&&Math.max(Math.min(a.x,b.x),r.x)<Math.min(Math.max(a.x,b.x),r.x+r.w)-EPS:a.x>r.x+EPS&&a.x<r.x+r.w-EPS&&Math.max(Math.min(a.y,b.y),r.y)<Math.min(Math.max(a.y,b.y),r.y+r.h)-EPS;}
class Heap{constructor(){this.q=[];}push(v){const q=this.q;let i=q.length;q.push(v);while(i){const p=(i-1)>>1;if(q[p].f<=v.f)break;q[i]=q[p];i=p;}q[i]=v;}pop(){const q=this.q,v=q[0],z=q.pop();if(q.length){let i=0;while(i*2+1<q.length){let c=i*2+1;if(c+1<q.length&&q[c+1].f<q[c].f)c++;if(q[c].f>=z.f)break;q[i]=q[c];i=c;}q[i]=z;}return v;}}
class Router{
 constructor(boxes,jobs=[],gap=GAP){this.gap=Math.max(GAP,gap);this.boxes=[...boxes];this.used=[];this.ends=[];this.jobs=new Map();this.guards=[];const counts=new Map();for(const j of jobs)for(const [side,p] of [[1,j.a],[-1,j.b]]){const key=side+":"+p.x+":"+p.y;counts.set(key,(counts.get(key)||0)+1);}const allocate=(p,side)=>counts.get(side+":"+p.x+":"+p.y)>1?this.endpoint(p,side):{...p};for(const j of jobs){const a=allocate(j.a,1),b=allocate(j.b,-1);this.jobs.set(j.id,{a,b});this.guards.push({id:j.id,a,b:{x:a.x+180,y:a.y},escape:a.x+180,h:true},{id:j.id,a:{x:b.x-48,y:b.y},b,escape:b.x-48,h:true});}}
 endpoint(p,dir=1){const GAP=Math.max(64,this.gap);const lo=Math.min(p.x,p.x+dir*180),hi=Math.max(p.x,p.x+dir*180),used=this.ends.filter(v=>v.lo<hi&&v.hi>lo);let y=p.y,k=0;while(used.some(v=>Math.abs(v.y-y)<GAP-EPS)){k++;y=p.y+Math.ceil(k/2)*GAP*(k%2?-1:1);}this.ends.push({lo,hi,y});return {x:p.x,y};}
 route(a,b,waypoints=[],id){this.current=id;const job=this.jobs.get(id);a=job?.a||this.endpoint(a);b=job?.b||this.endpoint(b,-1);const start={x:a.x+(job?180:16),y:a.y},end={x:b.x-(job?48:16),y:b.y},points=[start,...waypoints,end],out=[a,start];for(let i=1;i<points.length;i++){const part=this.search(points[i-1],points[i]);out.push(...part.slice(1));}out.push(b);const clean=out.filter((p,i)=>!i||p.x!==out[i-1].x||p.y!==out[i-1].y);for(let i=1;i<clean.length;i++)this.used.push(segment(clean[i-1],clean[i]));return clean;}
 search(a,b){
 const GAP=this.gap;
 // Most local moves need only a clear two-bend corridor, not a visibility grid.
 const reserved=[...this.used,...this.guards.filter(u=>u.id!==this.current)];
 const clear=route=>route.slice(1).every((b,i)=>{const a=route[i],s=segment(a,b);return !this.boxes.some(r=>hits(a,b,{...r,x:r.x-8,w:r.w+16}))&&!reserved.some(u=>overlap(s,u,GAP));});
 const candidates=[[a,{x:a.x,y:b.y},b],[a,{x:b.x,y:a.y},b]];
 for(const x of [(a.x+b.x)/2,a.x+16,b.x-16])candidates.push([a,{x,y:a.y},{x,y:b.y},b]);
 for(const route of candidates)if(clear(route))return route.filter((p,i)=>!i||p.x!==route[i-1].x||p.y!==route[i-1].y);
 const xs=new Set([a.x,b.x,a.x+16,b.x-16]),ys=new Set([a.y,b.y]);
 for(const r of this.boxes){xs.add(r.x-16);xs.add(r.x+r.w+16);ys.add(r.y-16);ys.add(r.y+r.h+16);}
 for(const s of [...this.used,...this.guards]){xs.add(s.a.x);xs.add(s.b.x);ys.add(s.a.y);ys.add(s.b.y);if(s.h){ys.add(s.a.y-GAP);ys.add(s.a.y+GAP);}else{xs.add(s.a.x-GAP);xs.add(s.a.x+GAP);}}
 // Additional outside lanes keep congested channels routable without reusing trunks.
 const pad=24+this.used.length*2;xs.add(Math.min(...xs)-pad);xs.add(Math.max(...xs)+pad);ys.add(Math.min(...ys)-pad);ys.add(Math.max(...ys)+pad);
 const X=[...xs].sort((a,b)=>a-b),Y=[...ys].sort((a,b)=>a-b),nx=X.length,start=Y.indexOf(a.y)*nx+X.indexOf(a.x),end=Y.indexOf(b.y)*nx+X.indexOf(b.x),q=new Heap(),dist=new Map([[start,0]]),prev=new Map();q.push({id:start,f:0,g:0});
 const point=id=>({x:X[id%nx],y:Y[Math.floor(id/nx)]});
 const reservations=[...this.used,...this.guards.filter(u=>u.id!==this.current)],horizontal=new Map(),vertical=new Map(),blockedCache=new Map();
 const blockers=(s)=>{const key=s.h?s.a.y:s.a.x,map=s.h?horizontal:vertical;if(!map.has(key))map.set(key,{lines:reservations.filter(u=>u.h===s.h&&Math.abs((s.h?u.a.y:u.a.x)-key)<GAP-EPS),boxes:this.boxes.filter(r=>s.h?key>r.y+EPS&&key<r.y+r.h-EPS:key>r.x-8+EPS&&key<r.x+r.w+8-EPS)});return map.get(key);};
 while(q.q.length){const cur=q.pop();if(cur.g!==dist.get(cur.id))continue;if(cur.id===end){const out=[];let k=end;while(k!==undefined){out.push(point(k));k=prev.get(k);}out.reverse();return out.filter((p,i)=>!i||i===out.length-1||!((out[i-1].x===p.x&&p.x===out[i+1].x)||(out[i-1].y===p.y&&p.y===out[i+1].y)));}
 const x=cur.id%nx,y=Math.floor(cur.id/nx),p=point(cur.id);
 for(const [xx,yy]of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){if(xx<0||yy<0||xx>=nx||yy>=Y.length)continue;const id=yy*nx+xx,t=point(id),s=segment(p,t);const cacheKey=Math.min(cur.id,id)+':'+Math.max(cur.id,id);let blocked=blockedCache.get(cacheKey);if(blocked===undefined){const candidates=blockers(s);blocked=candidates.boxes.some(r=>hits(p,t,{...r,x:r.x-8,w:r.w+16}))||candidates.lines.some(u=>overlap(s,u,GAP));blockedCache.set(cacheKey,blocked);}if(blocked)continue;const pp=prev.get(cur.id),turn=pp!==undefined&&segment(point(pp),p).h!==s.h?12:0,g=cur.g+Math.abs(t.x-p.x)+Math.abs(t.y-p.y)+turn;if(g>=(dist.get(id)??Infinity))continue;dist.set(id,g);prev.set(id,cur.id);q.push({id,g,f:g+Math.abs(t.x-b.x)+Math.abs(t.y-b.y)});}
 }
 throw Error('연결선 채널 공간이 부족합니다. 노드 간격을 넓혀 주세요.');
 }
}
// Legacy port-to-port S: channel detours belong only to orthogonal mode.
function path(points,curve,waypoints=[]){
 if(!curve)return 'M'+points.map(p=>p.x+','+p.y).join(' L');
 const stops=[points[0],...waypoints,points[points.length-1]];
 let d=`M${stops[0].x},${stops[0].y}`;
 for(let i=1;i<stops.length;i++){
  const a=stops[i-1],b=stops[i],k=Math.max(25,Math.abs(b.x-a.x)/2),bend=Math.max(16,Math.abs(b.x-a.x)*.08);
  d+=` C${a.x+k},${a.y+bend} ${b.x-k},${b.y-bend} ${b.x},${b.y}`;
 }
 return d;
}
const api={Router,path,hits,overlap,segment,GAP};if(typeof module!=='undefined')module.exports=api;else root.SFChannelRouter=api;
})(typeof window!=='undefined'?window:globalThis);

