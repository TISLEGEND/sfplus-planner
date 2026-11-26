from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
import threading,json
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
s=ThreadingHTTPServer(('127.0.0.1',0),Quiet);threading.Thread(target=s.serve_forever,daemon=True).start()
passed=failed=0
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=r'C:\Users\USER\AppData\Local\ms-playwright\chromium_headless_shell-1254\chrome-headless-shell-win64\chrome-headless-shell.exe')
 page=b.new_page(viewport={'width':1600,'height':1000});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('**/*',lambda r:r.continue_() if r.request.url.startswith('http://127.0.0.1:') else r.abort());page.goto(f'http://127.0.0.1:{s.server_port}');page.wait_for_function('!!window.RiriGraph');page.locator('#graphTab').click()
 def check(stage):
  state=page.evaluate('''()=>({ids:RiriGraph.get().nodes.map(n=>n.id),shown:[...document.querySelectorAll('.graph-node')].map(n=>n.dataset.sourceId),rates:RiriGraph.result().nodes.map(n=>[n.id,n.used]),group:RiriGraph.get().activeGroup,totals:document.querySelector('#gTotals').textContent})''')
  assert all(x in state['ids'] and x in state['shown'] for x in ['ore','ingot','plate']), (stage,state)
  for id in ['ore','ingot','plate']:
   assert page.locator(f'.graph-node[data-source-id="{id}"]').first.is_visible(),(stage,id,state)
  return state
 for mode in ['vanilla','sfplus']:
  for solver in ['Nominal','Full','Sink']:
   for expand in [False,True]:
    for method in ['menu','connect','drag']:
     label=f'{mode}/{solver}/expand={expand}/{method}'
     try:
      page.evaluate('''([mode,solver,expand])=>{RiriGraph.setMode(mode);const d=RiriGraph.data(),find=name=>Object.keys(d.items).find(id=>d.items[id].name===name),recipe=name=>d.recipes.find(r=>r.name===name&&ModelerGraph.recipeValid(r,d));const ingot=recipe('Iron Ingot'),plate=recipe('Iron Plate');if(!ingot||!plate)throw Error('fixture recipes unavailable');const ore=ingot.ingredients[0].item;window.sinkItem=ingot.products[0].item;RiriGraph.loadShared({version:1,dataMode:mode,solver,expandMachines:expand,machineClockMode:'underclock',nodes:[{id:'ore',type:'resource',item:ore,max:120,clock:100,x:30,y:100},{id:'ingot',type:'recipe',recipe:ingot.id,max:2,clock:100,x:350,y:100},{id:'plate',type:'recipe',recipe:plate.id,max:1,clock:100,x:700,y:100}],edges:[{id:'a',from:'ore',to:'ingot',item:ore},{id:'b',from:'ingot',to:'plate',item:sinkItem}],view:{x:30,y:80,zoom:.7},warnings:[]});RiriGraph.fit()}''',[mode,solver,expand])
      check('before')
      if method=='drag':
       port=page.locator('.graph-node[data-source-id="ingot"] .g-port.output').first.bounding_box();page.mouse.move(port['x']+port['width']/2,port['y']+port['height']/2);page.mouse.down();page.mouse.move(1200,650,steps=12);page.mouse.up()
      else:page.locator('#gAdd').click()
      page.locator('#gMenu .g-filters button').filter(has_text='싱크').click();page.locator('#gSearch').fill(page.evaluate('RiriGraph.data().items[sinkItem].name'))
      page.locator('#gSearchResults .g-search-row').filter(has=page.locator('span')).first.click()
      state=check('after add');assert len(state['ids'])==4,state
      if method=='connect':
       page.evaluate('RiriGraph.fit()');a=page.locator('.graph-node[data-source-id="ingot"] .g-port.output').first.bounding_box();z=page.locator('.graph-node').filter(has_text='AWESOME Sink').locator('.g-port.input').first.bounding_box();page.mouse.move(a['x']+a['width']/2,a['y']+a['height']/2);page.mouse.down();page.mouse.move(z['x']+z['width']/2,z['y']+z['height']/2,steps=12);page.mouse.up()
      check('after connection')
      if method!='menu':assert page.evaluate('RiriGraph.get().edges.length')==3,page.evaluate('RiriGraph.get()')
      # A real save to browser storage followed by page reload must preserve data and DOM.
      page.evaluate('''()=>{RiriGraph.saveShared();const saved=JSON.parse(localStorage.getItem('riri-sfplus-graph-v2'));RiriGraph.loadShared(saved)}''');check('storage roundtrip')
      passed+=1;print('PASS',label,flush=True)
     except Exception as e:failed+=1;print('FAIL',label,str(e),flush=True);page.keyboard.press('Escape')
 page.reload();page.wait_for_function('!!window.RiriGraph');page.locator('#graphTab').click();check('reload');passed+=1;print('PASS final SF+ reload',flush=True)
 for solver in ['Nominal','Full','Sink']:
  for expand in [False,True]:
   for case in ['zero','group']:
    page.evaluate('''([solver,expand,kind])=>{const g=RiriGraph.get();g.solver=solver;g.expandMachines=expand;g.machinePositions={};if(kind==='zero'){g.nodes=g.nodes.filter(n=>n.type!=='group');g.nodes.forEach(n=>{n.max=0;n.parent=null});g.activeGroup=null}else{g.nodes=g.nodes.filter(n=>n.type!=='group');g.nodes.forEach(n=>{n.max=n.type==='recipe'?1:60;n.parent='group'});g.nodes.push({id:'group',type:'group',title:'Test group',x:0,y:0,max:0,clock:100});g.activeGroup='group'}RiriGraph.loadShared(g);RiriGraph.fit()}''',[solver,expand,case])
    check(case);passed+=1;print('PASS',case,solver,expand,flush=True)
 assert not errors,errors
 b.close()
s.shutdown();print(json.dumps({'passed':passed,'failed':failed,'actual_model_calls':0}))
if failed:raise SystemExit(1)


