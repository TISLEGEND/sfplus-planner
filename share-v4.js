// Semantic share snapshot v4. UUID identity and reproducible presentation caches are not wire data.
(function(root){'use strict';
const registry=typeof module!=='undefined'?require('./share-v3/registry'):root.RiriShareRegistry;
const ports=typeof module!=='undefined'?require('./share-v4-ports'):root.RiriSharePorts;
const ids=new Map(registry.ids.map((id,i)=>[id,i]));
const types=['recipe','resource','sink','logistics','generator','group','missing'];
const defaults={clock:100,max:1,parent:null,center:false,title:'',showPpm:false,autoRound:false,unlimited:false,originalIndex:null,originalName:'',inputOrder:[],outputOrder:[],visualMax:'',physical:false,somersloops:0,fromPort:0,toPort:0,version:1,calculationVersion:1,dataMode:'sfplus',solver:'Nominal',snap:false,dark:true,activeGroup:null,numbers:{display:'Decimal',digits:2,round:'Nearest'},diagramEdges:[],expandMachines:true,machineClockMode:'overclock',lineStyle:'orthogonal',machinePositions:{}};
const keys=Object.keys(defaults).concat(['modular','maxExact','clockExact','priority','shards','item','recipe','logistics','fullness','extractionRate','extractor','fuel','target','targets','layoutShare','planNotes','constructionNotes','sourceId','from','to']);
const dropped=new Set(['view','camera','waypoints','warnings','result','results','resultCache','solverCache','calculatedFlow','calculatedUtilization','flow','used','power','shortage','surplus','derivedLabel']);
const same=(a,b)=>a===b||!!(a&&b&&typeof a==='object'&&typeof b==='object'&&Array.isArray(a)===Array.isArray(b)&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>Object.hasOwn(b,k)&&same(a[k],b[k])));
const token=s=>ids.has(s)?ids.get(s):s;
function untoken(t){if(typeof t==='string')return t;if(!Number.isInteger(t)||!registry.ids[t])throw Error('공유 ID 번호 오류');return registry.ids[t];}
function objectPack(o){return Object.entries(o).map(([k,v])=>[keys.includes(k)?keys.indexOf(k):k,JSON.stringify(v)]);}
function objectRead(a){if(!Array.isArray(a))throw Error('공유 속성 오류');return Object.fromEntries(a.map(([k,v])=>{const key=typeof k==='number'?keys[k]:k;if(typeof key!=='string'||typeof v!=='string')throw Error('공유 속성 오류');return [key,JSON.parse(v)];}));}
function extras(o,omit){return Object.fromEntries(Object.entries(o).filter(([k,v])=>!omit.includes(k)&&!dropped.has(k)&&!(Object.hasOwn(defaults,k)&&same(k==='numbers'&&v?{...defaults.numbers,...v}:v,defaults[k]))).map(([k,v])=>[k,k==='layoutShare'&&v&&typeof v==='object'?Object.fromEntries(Object.entries(v).filter(([key])=>!['view','camera','waypoints'].includes(key))):v]));}
function possible(a,b,mode){const p=n=>n.type==='recipe'?ports[mode]?.[n.recipe]:n.type==='resource'?[[],[n.item]]:n.type==='sink'?[[n.item],[]]:null;const ap=p(a),bp=p(b);return ap&&bp?[...new Set(ap[1].filter(x=>bp[0].includes(x)))]:[];}
function references(value,map,key=''){if(Array.isArray(value))return value.map(v=>references(v,map,key));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>{let name=k;if(['overrides','machinePositions'].includes(key)){for(const [id,next]of map)if(k===id||k.startsWith(id+':')||k.startsWith(id+'-')){name=next+k.slice(id.length);break;}}return [name,references(v,map,k)];}));if(['parent','sourceId','from','to','activeGroup','nodeId','edgeId'].includes(key)&&map.has(value))return map.get(value);return value;}
function pack(g){
 if(!Array.isArray(g.nodes)||!Array.isArray(g.edges)||g.nodes.length>500||g.edges.length>1500)throw Error('공유 그래프 형식/크기 오류');
 const map=new Map();for(const [i,n]of g.nodes.entries()){if(typeof n.id!=='string'||map.has(n.id))throw Error('공유 노드 ID 오류');map.set(n.id,'n'+i);}for(const [i,e]of g.edges.entries()){if(typeof e.id!=='string'||map.has(e.id))throw Error('공유 연결 ID 오류');map.set(e.id,'e'+i);}
 const mode=g.dataMode==='vanilla'?0:1;
 const nodes=g.nodes.map(n=>{const t=types.indexOf(n.type);if(t<0)throw Error('지원하지 않는 공유 노드');const more=references(extras(n,['id','type','recipe','item','x','y','max']),map);if(n.type!=='recipe'&&n.item!==undefined&& !['resource','sink'].includes(n.type))more.item=n.item;if(n.type!=='recipe'&&n.recipe!==undefined)more.recipe=n.recipe;const row=[t,token(n.type==='recipe'?n.recipe:n.item??''),n.x,n.y];if((n.max??1)!==1||Object.keys(more).length)row.push((n.max??1)===1?null:n.max);if(Object.keys(more).length)row.push(objectPack(more));return row;});
 const edges=g.edges.map(e=>{const a=g.nodes.findIndex(n=>n.id===e.from),b=g.nodes.findIndex(n=>n.id===e.to);if(a<0||b<0)throw Error('공유 연결 오류');const inferred=possible(g.nodes[a],g.nodes[b],mode),row=[a,b];const more=references(extras(e,['id','from','to','item']),map);if(inferred.length!==1||inferred[0]!==e.item||Object.keys(more).length)row.push(inferred.length===1&&inferred[0]===e.item?null:token(e.item));if(Object.keys(more).length)row.push(objectPack(more));return row;});
 return [4,nodes,edges,objectPack(references(extras(g,['nodes','edges']),map))];
}
function unpack(p){
 if(!Array.isArray(p)||p.length!==4||p[0]!==4||!Array.isArray(p[1])||p[1].length>500||!Array.isArray(p[2])||p[2].length>1500)throw Error('공유 v4 구조 오류');
 const fresh=()=>{if(root.crypto?.randomUUID)return root.crypto.randomUUID();if(typeof module!=='undefined')return require('crypto').randomUUID();throw Error('새 UUID 생성 불가');};
 const map=new Map(p[1].map((_,i)=>['n'+i,fresh()]));p[2].forEach((_,i)=>map.set('e'+i,fresh()));
 const g={version:1,calculationVersion:1,dataMode:'sfplus',solver:'Nominal',snap:false,dark:true,view:{zoom:1,x:30,y:30},...references(objectRead(p[3]),map)};
 g.nodes=p[1].map((r,i)=>{if(!Array.isArray(r)||r.length<4||r.length>6||!Number.isInteger(r[0])||!types[r[0]]||!Number.isFinite(r[2])||!Number.isFinite(r[3])||(r[4]!=null&&!Number.isFinite(r[4])))throw Error('공유 노드 오류');const type=types[r[0]],n={clock:100,...references(objectRead(r[5]||[]),map),id:map.get('n'+i),type,x:r[2],y:r[3],max:r[4]??1};if(type==='recipe')n.recipe=untoken(r[1]);else if(r[1]!=='')n.item=untoken(r[1]);return n;});
 g.edges=p[2].map((r,i)=>{if(!Array.isArray(r)||r.length<2||r.length>4||!Number.isInteger(r[0])||!Number.isInteger(r[1])||!g.nodes[r[0]]||!g.nodes[r[1]])throw Error('공유 연결 오류');const inferred=possible(g.nodes[r[0]],g.nodes[r[1]],g.dataMode==='vanilla'?0:1),item=r[2]==null?(inferred.length===1?inferred[0]:null):untoken(r[2]);if(!item)throw Error('공유 연결 아이템 오류');return {...references(objectRead(r[3]||[]),map),id:map.get('e'+i),from:g.nodes[r[0]].id,to:g.nodes[r[1]].id,item,waypoints:[]};});
 // Receiving UI computes its own camera; this hint is never saved or sent.
 Object.defineProperty(g,'shareAutoFit',{value:true});return g;
}
const api={pack,unpack,defaults,dropped};if(typeof module!=='undefined')module.exports=api;else root.RiriShareV4=api;
})(typeof window==='undefined'?globalThis:window);
