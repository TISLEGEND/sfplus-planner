/* Original: modeler/a/{a,a_0,c_0,d_0,t,x,u,v,w,o}.java.
 * Transport ports are grouped by item and priority, exactly as d/d/a.java.
 * Splitter aliases and smart filters are explicit UI extensions of Splurger. */
(function(root){'use strict';
const catalog=[
 ['splitter','Splitter','분배기',1,3,'Desc_ConveyorAttachmentSplitter_C'],
 ['smartSplitter','Smart Splitter','스마트 분배기',1,3,'Desc_ConveyorAttachmentSplitterSmart_C'],
 ['programmableSplitter','Programmable Splitter','프로그래머블 분배기',1,3,'Desc_ConveyorAttachmentSplitterProgrammable_C'],
 ['merger','Merger','합류기',3,1,'Desc_ConveyorAttachmentMerger_C'],
 ['splurger','Splurger','분배·합류',1,1,'Desc_ConveyorAttachmentMerger_C'],
 ['prioritySplitter','Priority Splitter','우선순위 분배기',1,2,'Desc_ConveyorAttachmentSplitterSmart_C'],
 ['priorityMerger','Priority Merger','우선순위 합류기',2,1,'Desc_ConveyorAttachmentMerger_C'],
 ['prioritySplurger','Priority Splurger','우선순위 분배·합류',2,2,'Desc_ConveyorAttachmentSplitterSmart_C'],
 ['storage','Storage Container','저장 컨테이너',1,1,'Build_StorageContainerMk1_C'],
 ['industrialStorage','Industrial Storage Container','산업용 저장 컨테이너',1,1,'Build_StorageContainerMk2_C'],
 ['fluidBuffer','Fluid Buffer','유체 버퍼',1,1,'Build_PipeStorageTank_C'],
 ['industrialFluidBuffer','Industrial Fluid Buffer','산업용 유체 버퍼',1,1,'Desc_IndustrialTank_C'],
 ['depot','Dimensional Depot','차원 저장소',1,0,'Build_CentralStorage_C'],
 ['pipeJunction','Pipeline Junction','파이프 교차 분기',1,1,'Build_PipelineJunction_Cross_C'],
 ['pipeTJunction','Pipeline T-Junction','파이프 T 분기',1,1,'Build_PipelineJunction_T_C']
].map(([id,name,ko,inputs,outputs,icon])=>({id,name,ko,inputs,outputs,icon}));
const kinds=new Map(catalog.map(a=>[a.id,a])),fullness=['Partially Full','Full','Empty','Input = Output'];
const is=n=>n?.type==='logistics',spec=n=>kinds.get(n.logistics),storage=n=>/storage|buffer/i.test(n.logistics||'');
const items=n=>n.items||[n.item];
function allows(n,item,port){const rule=n.rules?.[port]||['Any'];if(rule.includes('None'))return false;if(rule.includes('Any')||rule.includes('Overflow')||rule.includes(item))return true;return rule.includes('Any Undefined')&&!n.rules.some(r=>r.includes(item));}
function overflow(n,item,port){const r=n.rules?.[port];return !!r?.includes('Overflow')&&!r.includes('Any')&&!r.includes(item)&&!(r.includes('Any Undefined')&&!n.rules.some(a=>a.includes(item)));}
function ports(n,d){const s=spec(n);if(!s)return {valid:false,input:[],output:[]};const make=(count,out)=>Array.from({length:count},(_,port)=>items(n).map(item=>({item,amount:1,port,label:(out?'출력 ':'입력 ')+(port+1),allowed:!out||allows(n,item,port)}))).flat();return {valid:true,input:make(s.inputs,false),output:make(s.outputs,true)};}
function clean(n,d){if(!spec(n))throw Error('알 수 없는 물류 노드');const ids=items(n);if(!Array.isArray(ids)||!ids.length||ids.length>32||new Set(ids).size!==ids.length||ids.some(i=>!Object.hasOwn(d.items,i)))throw Error('물류 아이템 오류');
 const state=n.fullness??'Partially Full';if(!fullness.includes(state))throw Error('fullness 상태 오류');
 if(n.rules!==undefined&&(!Array.isArray(n.rules)||n.rules.length!==spec(n).outputs||n.rules.some(r=>!Array.isArray(r)||!r.length||r.length>64||new Set(r).size!==r.length||r.some(x=>!['Any','None','Overflow','Any Undefined'].includes(x)&&!Object.hasOwn(d.items,x)))))throw Error('스마트 분배 규칙 오류');
 if(n.logistics==='smartSplitter'&&n.rules?.some(r=>r.length!==1))throw Error('Smart Splitter는 포트당 규칙 하나');
 const fluid=/buffer|pipe/i.test(n.logistics);if(fluid&&ids.some(i=>!/LIQUID|GAS/.test(d.items[i]?.form)))throw Error('파이프 물류는 유체·기체만 허용');
 return {logistics:n.logistics,item:ids[0],unlimited:!!n.unlimited,...(n.items?{items:[...ids]}:{}),fullness:state,...(n.rules?{rules:n.rules.map(r=>[...r])}:{})};}
function edgePort(e,n,input,d){const key=input?'toPort':'fromPort',i=e[key]??0;if(!Number.isInteger(i)||i<0||!ports(n,d)[input?'input':'output'].some(p=>p.item===e.item&&p.port===i))throw Error('물류 포트 범위 오류');return i;}
function expand(g,d,G){let serial=0;const reserved=new Set(g.nodes.map(n=>n.id).concat(g.edges.map(e=>e.id))),fresh=()=>{let id;do{id='__logistics_'+serial++;}while(reserved.has(id));reserved.add(id);return id;},nodes=[],edges=[],map=new Map();
 const internal=(item,input,output,cap=null)=>{const n={id:fresh(),type:'_transport',item,max:cap??0,unlimited:cap===null,clock:100,x:0,y:0,_input:input?[{item,amount:1}]:[],_output:output?[{item,amount:1}]:[]};nodes.push(n);return n.id;};
 const link=(from,to,item,fp=0,tp=0)=>edges.push({id:fresh(),from,to,item,fromPriority:fp,toPriority:tp});
 for(const n of g.nodes){if(!is(n)){nodes.push(n);continue;}for(const item of items(n)){const hasIn=g.edges.some(e=>e.to===n.id&&e.item===item),hasOut=g.edges.some(e=>e.from===n.id&&e.item===item&&allows(n,item,e.fromPort??0));let a,b;
 if(storage(n)){if(n.fullness==='Full'){b=internal(item,true,true,hasOut?null:0);a=b;const source=internal(item,false,true);link(source,b,item,0,1);}else if(n.fullness==='Empty'){a=internal(item,true,true,hasIn?null:0);b=a;const sink=internal(item,true,false);link(a,sink,item,1,0);}else if(n.fullness==='Input = Output'){a=b=internal(item,true,true,hasIn&&hasOut?null:0);}else{a=internal(item,true,false);b=internal(item,false,true);}}
 else if(n.logistics==='depot'){a=internal(item,true,false,n.unlimited?null:n.max);b=a;}
 else a=b=internal(item,true,true,hasIn&&hasOut?(n.unlimited?null:n.maxExact??n.max):0);
 map.set(n.id+'\0'+item,{input:a,output:b});}}
 for(const e of g.edges){const a=g.nodes.find(n=>n.id===e.from),b=g.nodes.find(n=>n.id===e.to),blocked=is(a)&&!allows(a,e.item,e.fromPort??0);const z={...e,from:is(a)?map.get(a.id+'\0'+e.item).output:e.from,to:is(b)?map.get(b.id+'\0'+e.item).input:e.to};
 if(is(a))z.fromPriority=a.logistics.startsWith('priority')?(e.fromPort??0):overflow(a,e.item,e.fromPort??0)?1:0;
 if(is(b))z.toPriority=b.logistics.startsWith('priority')?(e.toPort??0):0;
 if(blocked){const zero=internal(e.item,false,true,0);z.from=zero;}
 edges.push(z);}
 const proxy={...G,ports:(n,data)=>n.type==='_transport'?{valid:true,input:n._input,output:n._output}:G.ports(n,data)};
 return {g:{...g,nodes,edges},G:proxy};}
function points(item){for(const k of ['sinkPoints','sink_points','points','mResourceSinkPoints','SinkPoints']){const v=item?.[k]??item?.original?.[k];if(v!==undefined&&v!==null&&Number.isFinite(+v)&&+v>=0)return +v;}return null;}
function decorate(result,g,d){const R=typeof module!=='undefined'?require('./exact-full').R:root.ExactFull.R;const s=result.summary;s.sinkPoints=0;s.sunk={};s.stored={};s.taken={};s.depot={};s.unknownSinkPoints=[];let total=R.of(0);
 for(const n of g.nodes){const r=result.nodes.find(a=>a.id===n.id);if(!r)continue;if(n.type==='sink'){const p=points(d.items[n.item]),flow=r.input[0]?.flow||0;s.sunk[n.item]=(s.sunk[n.item]||0)+flow;r.sinkPoints=p===null?null:flow*p;if(p===null){if(flow>0)s.unknownSinkPoints.push(n.item);}else total=total.add(R.of(r.input[0]?.exactFlow??flow).mul(p));}
 if(is(n)&&storage(n)){r.fullness=n.fullness??'Partially Full';r.stored=0;r.taken=0;for(const item of items(n)){const sum=side=>r[side].filter(p=>p.item===item).reduce((a,p)=>a+(Number.isFinite(p.flow)?p.flow:0),0),delta=sum('input')-sum('output');r.stored+=Math.max(0,delta);r.taken+=Math.max(0,-delta);s.stored[item]=(s.stored[item]||0)+Math.max(0,delta);s.taken[item]=(s.taken[item]||0)+Math.max(0,-delta);}}
 if(is(n)&&n.logistics==='depot')for(const p of r.input)s.depot[p.item]=(s.depot[p.item]||0)+p.flow;
 }s.sinkPoints=+total;s.exactSinkPoints=total.toString();return result;}
function solve(g,d,G,Exact){const ex=expand(g,d,G),raw=Exact.solve(ex.g,d,ex.G),by=new Map(raw.edges.map(e=>[e.id,e])),nodes=g.nodes.filter(n=>!['group','missing'].includes(n.type)).map(n=>{if(!is(n))return raw.nodes.find(r=>r.id===n.id);const p=ports(n,d),side=(key,input)=>p[key].map(port=>{const es=g.edges.filter(e=>e[input?'to':'from']===n.id&&e.item===port.item&&(e[input?'toPort':'fromPort']??0)===port.port),q=es.reduce((s,e)=>s.add(Exact.R.of(by.get(e.id)?.exactFlow??0)),Exact.R.of(0));return {...port,flow:+q,amount:+q,exactFlow:q.toString(),exactAmount:q.toString(),connected:!!es.length,shortage:0,surplus:0};});const input=side('input',true),output=side('output',false),sum=ps=>ps.reduce((a,p)=>a.add(p.exactFlow),Exact.R.of(0)),a=sum(input),b=sum(output),q=a.cmp(b)>0?a:b,used=+q;return {id:n.id,valid:true,used,exactUsed:q.toString(),power:0,input,output,unbounded:!Number.isFinite(used)};});return decorate({nodes,edges:g.edges.map(e=>({...e,flow:by.get(e.id)?.flow??0,exactFlow:by.get(e.id)?.exactFlow??'0'})),summary:raw.summary},g,d);}
const api={catalog,kinds,fullness,is,spec,storage,items,allows,ports,clean,edgePort,expand,solve,points,decorate};if(typeof module!=='undefined')module.exports=api;else root.SFLogistics=api;
})(globalThis);
