/* Fixed machine rates. Each recipe port is an independent bounded endpoint.
 * Transport alone shares flow constraints; recipe utilization never does.
 * Equal-priority links use capped equal division, as in the transport solver. */
(function(root){'use strict';
function solve(g,d,G,E,L){
 const nodes=[],edges=[],endpoints=new Map(),reserved=new Set(g.nodes.map(n=>n.id));let serial=0;
 const fresh=()=>{let id;do{id='__nominal_'+serial++;}while(reserved.has(id));reserved.add(id);return id;};
 const base=g.nodes.filter(n=>!['group','missing'].includes(n.type));
 for(const n of base){
  if(L.is(n)){nodes.push(n);continue;}
  const p=G.ports(n,d),count=E.R.of(p.valid?(n.maxExact??n.max):0);
  for(const side of ['input','output']){
   const amounts=new Map();for(const port of p[side])amounts.set(port.item,(amounts.get(port.item)||E.R.of(0)).add(E.rate(n,p,port,side==='input').mul(count)));
   for(const [item,max]of amounts){const id=fresh();endpoints.set(JSON.stringify([n.id,side,item]),id);nodes.push({id,type:side==='input'?'sink':'resource',item,max:+max,maxExact:max.toString(),clock:100,x:0,y:0});}
  }
 }
 for(const e of g.edges)edges.push({...e,from:endpoints.get(JSON.stringify([e.from,'output',e.item]))??e.from,to:endpoints.get(JSON.stringify([e.to,'input',e.item]))??e.to});
 // These endpoints have no recipe input/output ratios. Storage and filtering
 // keep their existing transport semantics, priorities and port identities.
 const routed=E.solve({...g,nodes,edges},d,G),flows=new Map(routed.edges.map(e=>[e.id,e]));
 if(routed.edges.some(e=>!Number.isFinite(e.flow)||e.flow<0))throw Error('연결된 곳으로 보내는 양을 계산하지 못했습니다. 연결 상태와 입력한 수량을 확인하세요.');
 const summary={power:0,machines:0,resources:{},warnings:[]};
 const result=base.map(n=>{
  if(L.is(n))return routed.nodes.find(r=>r.id===n.id);
  const p=G.ports(n,d),q=E.R.of(p.valid?(n.maxExact??n.max):0),used=+q;let power=0;
  if(n.type==='recipe'&&p.valid){summary.machines+=used;if(p.modularResult)power=used*p.modularResult.power;else if(p.recipe.variablePower){summary.powerUnknown=true;summary.warnings.push(p.recipe.name+': 가변 전력 미확정');}else power=used*p.machine.power*Math.pow(n.clock/100,p.machine.exponent);summary.power+=power;}
  const side=(key,input)=>{const amounts=new Map();for(const port of p[key])amounts.set(port.item,(amounts.get(port.item)||E.R.of(0)).add(E.rate(n,p,port,input).mul(q)));return [...amounts].map(([item,amount])=>{const es=g.edges.filter(e=>e[input?'to':'from']===n.id&&e.item===item),flow=es.reduce((sum,e)=>sum.add(flows.get(e.id).exactFlow),E.R.of(0)),delta=amount.sub(flow),left=delta.cmp(0)>0?delta:E.R.of(0);return {item,amount:+amount,exactAmount:amount.toString(),flow:+flow,exactFlow:flow.toString(),connected:!!es.length,shortage:input?+left:0,surplus:input?0:+left,exactShortage:input?left.toString():'0',exactSurplus:input?'0':left.toString()};});};
  const input=side('input',true),output=side('output',false);
  if(n.type==='resource')summary.resources[n.item]=(summary.resources[n.item]||0)+(output[0]?.flow||0);
  return {id:n.id,used,exactUsed:q.toString(),power,valid:p.valid,input,output};
 });
 return {nodes:result,edges:g.edges.map(e=>({...e,flow:flows.get(e.id).flow,exactFlow:flows.get(e.id).exactFlow,kind:/LIQUID|GAS/.test(d.items[e.item]?.form)?'파이프':'벨트'})),summary};
}
const api={solve};if(typeof module!=='undefined')module.exports=api;else root.NominalGraph=api;
})(globalThis);
