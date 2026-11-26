'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const Machine=require('./machine-view.js');
const Channels=require('./graph-channel-router.js');
const data={recipes:[],buildings:{},items:{}};
const node=(id,x,y,parent=null)=>({id,type:'sink',item:'iron',x,y,parent});
function fixture(nodes,positions,expand=true){return {nodes,edges:[],machinePositions:positions,expandMachines:expand};}
function result(g){return {nodes:g.nodes.map(n=>({id:n.id,valid:true,used:1,input:[],output:[],power:0})),edges:[],summary:{warnings:[]}};}
const xy=nodes=>Object.fromEntries(nodes.map(n=>[n.id,{x:n.x,y:n.y}]));
function build(g){return Machine.build(g,result(g),data);}
for(const [label,b] of [['close',{x:245,y:0}],['overlap',{x:20,y:5}],['vertical gap',{x:0,y:95}]]){
 test('saved positions survive save and repeated projection: '+label,()=>{
  let g=fixture([node('a',0,0),node('b',b.x,b.y)],{'a:0':{x:0,y:0},'b:0':b});
  const expected=xy(g.nodes);
  for(let i=0;i<3;i++){const display=build(g);assert.deepEqual(xy(display.nodes),expected);for(const n of display.nodes)g.machinePositions[n.sourceId+':'+n.part]={x:n.x,y:n.y};g=JSON.parse(JSON.stringify(g));}
 });
}
test('unsaved box within old 32px margin stays put',()=>{const g=fixture([node('a',0,0),node('b',245,0)],{'a:0':{x:0,y:0}});assert.deepEqual(xy(build(g).nodes),{a:{x:0,y:0},b:{x:245,y:0}});});
test('only overlapping unsaved node moves, even when listed first',()=>{const g=fixture([node('b',10,0),node('a',0,0)],{'a:0':{x:0,y:0}});assert.deepEqual(xy(build(g).nodes),{b:{x:10,y:90},a:{x:0,y:0}});});
test('different parent boxes do not repel',()=>{const g=fixture([node('a',0,0),node('b',0,0,'group')],{'a:0':{x:0,y:0}});assert.equal(build(g).nodes.find(n=>n.id==='b').y,0);});
test('collapsed manual positions and center are unchanged',()=>{const g=fixture([node('a',0,0),{...node('b',5,5),center:true}],{},false);assert.deepEqual(build(g).nodes,g.nodes);});
const source=fs.readFileSync(require.resolve('./graph.js'),'utf8');
// Execute the production render channel section with local geometry/DOM substitutes.
const block=source.slice(source.indexOf('const channelEdges='),source.indexOf("const ns='http://www.w3.org/2000/svg';const computed="))+'\nglobalThis.routes=channelRoutes;';
function routeRender(g,edges,Router=Channels.Router,cache=null){
 const nodes=g.nodes,context={g,display:{nodes,edges},pos:new Map(nodes.map(n=>[n.id,n])),project:id=>id,nodeResult:()=>({input:[{item:'iron'}],output:[{item:'iron'}]}),origin:n=>({x:n.x,y:n.y}),width:()=>240,height:()=>90,portPosition:(n,input)=>({x:n.x+(input?1:239),y:n.y+25}),window:{SFChannelRouter:{Router},MODELER_VISUALS:{}},channelCache:cache};
 vm.runInNewContext(block,context);return context;
}
const edges=Array.from({length:4},(_,i)=>({id:'e'+i,from:'a',to:'b',item:'iron',waypoints:i===2?[{x:260,y:40}]:[]}));
function checkRoutes(ctx){assert.equal(ctx.routes.size,edges.length);for(const e of edges){const points=ctx.routes.get(e.id);assert.ok(points.length>=2);assert.equal(points[0].x,239);assert.equal(points.at(-1).x,246);for(let i=1;i<points.length;i++)assert.ok(points[i-1].x===points[i].x||points[i-1].y===points[i].y);for(const p of e.waypoints)assert.ok(points.some(q=>q.x===p.x&&q.y===p.y));assert.ok(!Channels.path(points,false).includes('undefined'));}}
test('real congested router preserves all edges and layout across render/cache/save',()=>{let g=fixture([node('a',0,0),node('b',245,0)],{'a:0':{x:0,y:0},'b:0':{x:245,y:0}});const before=JSON.stringify(g);const first=routeRender(g,edges);checkRoutes(first);checkRoutes(routeRender(g,edges,Channels.Router,first.channelCache));g=JSON.parse(JSON.stringify(g));checkRoutes(routeRender(g,edges));assert.equal(JSON.stringify(g),before);});
test('every forced routing failure keeps all edges, waypoints and node positions',()=>{class Failing{route(){throw Error('mock channel congestion');}}const g=fixture([node('a',0,0),node('b',245,0)],{});const before=JSON.stringify(g);checkRoutes(routeRender(g,edges,Failing));assert.equal(JSON.stringify(g),before);});
test('one failed edge does not discard earlier or later routes',()=>{let i=0;class Partial extends Channels.Router{route(...args){if(i++===1)throw Error('mock');return super.route(...args);}}const g=fixture([node('a',0,0),node('b',245,0)],{});checkRoutes(routeRender(g,edges,Partial));});
