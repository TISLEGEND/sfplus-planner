/* Snapshot adapter: never select recipes or recalculate the user's graph. */
(function(root){'use strict';
function fromGraph(graph,data,result){
 if(!graph?.nodes?.length)throw Error('노드 그래프에 노드를 먼저 추가하세요.');
 const G=typeof module!=='undefined'?require('./graph-engine'):root.SFGraph;
 const L=typeof module!=='undefined'?require('./logistics'):root.SFLogistics;
 const groups=[],sources=[],sinks=[],warnings=[];
 const d={...data,buildings:{...data.buildings},recipes:[...data.recipes]};
 const flows=new Map(result.edges.map(e=>[e.id,e]));
 for(const n of graph.nodes){
  if(!['recipe','resource','sink','logistics'].includes(n.type))throw Error('지원하지 않는 노드: '+n.type+' ('+n.id+') · 레시피·자원·물류·싱크 노드를 사용하세요.');
  const r=result.nodes.find(r=>r.id===n.id),p=G.ports(n,data);
  if(!p.valid||!r)throw Error('노드 계산을 확인하세요: '+n.id);
  const item=n.item||p.output[0]?.item||p.input[0]?.item;
  if(n.type==='resource'||n.type==='sink'){(n.type==='resource'?sources:sinks).push({id:n.id,kind:n.type==='resource'?'source':'sink',item,amount:n.max,graphNode:{...n}});continue;}
  let recipe=n.recipe,machine=p.recipe?.machines[0],count=n.max,clock=n.clock;
  if(n.type==='logistics'){
   const spec=L.spec(n);recipe='__layout_'+n.id;machine=recipe;count=1;clock=100;
   d.buildings[machine]={name:spec.ko,speed:1,layoutIcon:spec.icon};d.recipes.push({id:recipe,name:spec.ko,ingredients:[],products:[],machines:[machine]});
  }
  const extraByproducts=n.type==='recipe'?r.output.filter(o=>!graph.edges.some(e=>e.from===n.id&&e.item===o.item)&&o.amount>0).map(o=>({item:o.item,amount:o.amount})):[];
  groups.push({extraByproducts,id:n.id,kind:'group',item,recipe,machine,count,clock,modular:n.modular,amount:(p.output[0]?.amount||0)*n.max,graphNode:JSON.parse(JSON.stringify(n)),final:!graph.edges.some(e=>e.from===n.id&&graph.nodes.find(n=>n.id===e.to)?.type!=='sink')});
 }
 const edges=graph.edges.map(e=>{const amount=flows.get(e.id)?.flow;if(!Number.isFinite(amount)||amount<0)throw Error('분당량이 미확인인 연결: '+e.id);return {...e,amount};});
 return {graph:JSON.parse(JSON.stringify(graph)),data:d,dataMode:graph.dataMode||'sfplus',clock:100,graphLayout:{groups,sources,sinks,edges},warnings};
}
const api={fromGraph};if(typeof module!=='undefined')module.exports=api;else root.RiriLayoutGraph=api;
})(typeof window==='undefined'?globalThis:window);
