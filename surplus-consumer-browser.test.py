"""Local-only regression for attaching Cast Brass Ingot to surplus Molten Brass."""
from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import threading, json, os, math
ROOT=Path(__file__).resolve().parent
os.chdir(ROOT)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a): pass
server=ThreadingHTTPServer(('127.0.0.1',0),Quiet)
threading.Thread(target=server.serve_forever,daemon=True).start()
passed=failed=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=r'C:\Users\USER\AppData\Local\ms-playwright\chromium_headless_shell-1254\chrome-headless-shell-win64\chrome-headless-shell.exe')
 page=browser.new_page(viewport={'width':1904,'height':1100});page.set_default_timeout(8000)
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('**/*',lambda r:r.continue_() if r.request.url.startswith('http://127.0.0.1:') else r.abort())
 base=f'http://127.0.0.1:{server.server_port}/index.html'
 hash='#'+(ROOT/'.repro_vanish_link.txt').read_text(encoding='utf-8-sig').strip().split('#',1)[1]
 page.goto(base+hash);page.wait_for_function('window.RiriGraph && RiriGraph.get().nodes.length===8');page.locator('#graphTab').click()
 fixture=page.evaluate('RiriGraph.get()')
 def state():return page.evaluate('''()=>({rates:RiriGraph.result().nodes.map(n=>[n.id,n.used]),parts:RiriGraph.display().nodes.map(n=>[n.sourceId,n.machineClock,n.part]),nodes:RiriGraph.display().nodes.length,edges:RiriGraph.display().edges.length,totals:document.querySelector('#gTotals').textContent,result:RiriGraph.result(),g:RiriGraph.get()})''')
 def port(id,side):return page.locator(f'.graph-node[data-source-id="{id}"] .g-port.{side}[data-item="Desc_LiquidBrass_C"]').first
 def center(loc):
  loc.evaluate('''el=>{const r=el.getBoundingClientRect(),g=RiriGraph.get(),c=document.querySelector('#gCanvas').getBoundingClientRect();g.view.x+=c.x+c.width/2-r.x-r.width/2;g.view.y+=c.y+c.height/2-r.y-r.height/2;document.querySelector('#gWorld').style.transform=`translate(${g.view.x}px,${g.view.y}px) scale(${g.view.zoom})`;}''')
  r=loc.bounding_box();return r['x']+r['width']/2,r['y']+r['height']/2
 def load(solver='Full',expand=True):
  page.evaluate('''([g,solver,expand])=>{g.solver=solver;g.expandMachines=expand;RiriGraph.loadShared(g)}''',[fixture,solver,expand]);page.locator('#graphTab').click()
 def add(method='existing',count=1):
  source=fixture['nodes'][0]['id']
  if method=='drag-add':
   x,y=center(port(source,'output'));page.mouse.move(x,y);page.mouse.down();page.mouse.move(1700,850,steps=12);page.mouse.up()
  else:page.locator('#gAdd').click()
  page.locator('#gSearch').fill('Cast Brass Ingot')
  recipe=page.evaluate("RiriGraph.data().recipes.find(r=>r.name==='Cast Brass Ingot').id")
  page.locator(f'#gSearchResults .g-search-row[data-value="{recipe}"]').click()
  target=page.evaluate('RiriGraph.get().nodes.at(-1).id')
  if count!=1:
   page.evaluate('''([id,count])=>{const g=RiriGraph.get();g.nodes.find(n=>n.id===id).max=count;RiriGraph.loadShared(g)}''',[target,count])
  before=state()
  if method!='drag-add':
   # Drag between real DOM ports, panning between endpoints while mouse is held.
   x,y=center(port(source,'output'));page.mouse.move(x,y);page.mouse.down();x,y=center(port(target,'input'));page.mouse.move(x,y,steps=12);page.mouse.up()
  assert '연결 완료' in page.locator('#gToast').inner_text()
  return before,state(),target
 def stable(before,after,target):
  old=dict(before['rates']);new=dict(after['rates'])
  assert all(new[k]==v for k,v in old.items() if k!=target),(old,new)
  ids={n['id'] for n in fixture['nodes']}
  assert sorted(x for x in before['parts'] if x[0] in ids)==sorted(x for x in after['parts'] if x[0] in ids),'physical clocks/parts changed'
  assert all(n['max']==next(x['max'] for x in fixture['nodes'] if x['id']==n['id']) for n in after['g']['nodes'] if n['id'] in ids)
  assert after['g']['edges'][-1].get('surplusOnly') is True
 # Serve the exact backed-up pre-fix connection code to prove the observed failure.
 backup=Path(r'C:\Users\USER\riri-widget_extra\backups\backup_20261126_2147_c11262147442b\graph.js')
 page.route('**/graph.js*',lambda r:r.fulfill(path=str(backup),content_type='application/javascript'))
 page.reload();page.wait_for_function('window.RiriGraph && RiriGraph.get().nodes.length===8');page.locator('#graphTab').click()
 load();before,after,target=add();assert before['nodes']==17 and after['nodes']==9,(before['nodes'],after['nodes'])
 assert dict(after['rates'])[fixture['nodes'][0]['id']]==.5
 print('PASS baseline actual drag reproduces 16 original parts -> 9 parts; brass 3 -> 0.5',flush=True);passed+=1
 page.unroute('**/graph.js*');page.reload();page.wait_for_function('window.RiriGraph');page.locator('#graphTab').click()
 for solver in ['Full','Nominal']:
  for expand in [True,False]:
   for method in ['existing','drag-add']:
    try:
     load(solver,expand);initial=state();before,after,target=add(method)
     stable(initial if method=='drag-add' else before,after,target)
     brass=next(n for n in after['result']['nodes'] if n['id']==fixture['nodes'][0]['id'])
     consumer=next(n for n in after['result']['nodes'] if n['id']==target)
     assert brass['output'][0]['amount']==240 and brass['output'][0]['surplus']==200,brass
     assert consumer['input'][0]['flow']==40 and consumer['input'][0]['shortage']==0,consumer
     assert after['g']['solver']==solver
     assert not errors,errors
     passed+=1;print('PASS',solver,expand,method,after['nodes'],after['edges'],flush=True)
    except Exception as e:
     failed+=1;print('FAIL',solver,expand,method,repr(e),flush=True)
 for solver in ['Full','Nominal']:
  try:
   load(solver);before,after,target=add(count=10);stable(before,after,target)
   consumer=next(n for n in after['result']['nodes'] if n['id']==target)
   assert consumer['input'][0]['flow']==240 and consumer['input'][0]['shortage']==160,consumer
   # Preserve the behavior through validation, file save, codecs and a real reload.
   for codec in ['encodeV2','encodeV3','encode']:
    url=page.evaluate('async codec=>GraphFeatures[codec](RiriGraph.get(),location.href.split("#")[0])',codec)
    page.goto(url);page.wait_for_function('window.RiriGraph && RiriGraph.get().nodes.length===9');page.locator('#graphTab').click()
    current=state();assert current['g']['edges'][-1].get('surplusOnly')
    assert sorted(v for _,v in current['rates'])==sorted(v for _,v in after['rates'])
    assert sum(n['input'][0]['shortage'] for n in current['result']['nodes'] if n['input'] and n['input'][0]['item']=='Desc_LiquidBrass_C')==160
   page.evaluate('RiriGraph.saveShared();history.replaceState(null,"",location.pathname)');page.reload();page.wait_for_function('window.RiriGraph');assert page.evaluate('RiriGraph.get().edges.at(-1).surplusOnly')
   passed+=1;print('PASS shortage and persistence',solver,flush=True)
  except Exception as e:failed+=1;print('FAIL shortage/persistence',solver,repr(e),flush=True)
 # Sink optimization still controls ordinary links; a byproduct consumer cannot
 # steal that supply or introduce a new utilization constraint.
 try:
  load('Sink')
  info=page.evaluate('''()=>{const g=RiriGraph.get(),d=RiriGraph.data(),source=g.nodes.find(n=>n.recipe==='Recipe_Sorter_T1_Copper_C'),item='Desc_CrushedMagnesium_C';g.nodes.push({id:'sink-anchor',type:'sink',item:'Desc_LiquidBrass_C',max:240,clock:100,x:3000,y:0});g.edges.push({id:'anchor',from:g.nodes[0].id,to:'sink-anchor',item:'Desc_LiquidBrass_C'});const recipe=d.recipes.find(r=>r.ingredients.some(p=>p.item===item)&&ModelerGraph.recipeValid(r,d));if(!recipe)throw Error('magnesium consumer unavailable');g.nodes.push({id:'byproduct-consumer',type:'recipe',recipe:recipe.id,max:10,clock:100,x:3000,y:600});RiriGraph.loadShared(g);return {source:source.id,item};}''')
  before=state()
  def byport(id,side):return page.locator(f'.graph-node[data-source-id="{id}"] .g-port.{side}[data-item="{info["item"]}"]').first
  x,y=center(byport(info['source'],'output'));page.mouse.move(x,y);page.mouse.down();x,y=center(byport('byproduct-consumer','input'));page.mouse.move(x,y,steps=12);page.mouse.up()
  after=state();stable(before,after,'byproduct-consumer')
  assert math.isclose(next(e for e in after['result']['edges'] if e['id']=='anchor')['flow'],240)
  consumer=next(n for n in after['result']['nodes'] if n['id']=='byproduct-consumer')
  inp=next(p for p in consumer['input'] if p['item']==info['item'])
  assert math.isclose(inp['flow'],100) and inp['shortage']>0,inp
  passed+=1;print('PASS Sink byproduct preserves original supply, rates and shortage',flush=True)
 except Exception as e:failed+=1;print('FAIL Sink byproduct',repr(e),flush=True)
 # An unmarked Full constraint retains the original global balancing behavior.
 try:
  load();_,after,target=add()
  page.evaluate('''()=>{const g=RiriGraph.get();g.edges.forEach(e=>delete e.surplusOnly);RiriGraph.loadShared(g)}''')
  assert dict(state()['rates'])[fixture['nodes'][0]['id']]==.5
  passed+=1;print('PASS ordinary Full still balances globally',flush=True)
 except Exception as e:failed+=1;print('FAIL ordinary Full',repr(e),flush=True)
 try:
  load('Nominal');_,_,first=add()
  page.evaluate('''()=>{const g=RiriGraph.get();g.edges.forEach(e=>delete e.surplusOnly);RiriGraph.loadShared(g)}''')
  before,after,target=add(count=10);stable(before,after,target)
  old=next(n for n in after['result']['nodes'] if n['id']==first)['input'][0]
  new=next(n for n in after['result']['nodes'] if n['id']==target)['input'][0]
  assert old['flow']==40 and new['flow']==200 and new['shortage']==200,(old,new)
  passed+=1;print('PASS reserve existing delivery before sharing residual supply',flush=True)
 except Exception as e:failed+=1;print('FAIL reserve supply',repr(e),flush=True)
 browser.close()
server.shutdown()
print(json.dumps({'passed':passed,'failed':failed,'actual_model_calls':0}),flush=True)
if failed:raise SystemExit(1)
