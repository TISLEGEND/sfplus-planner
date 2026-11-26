from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import threading, json
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),Quiet)
threading.Thread(target=server.serve_forever,daemon=True).start()
passed=failed=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=r'C:\Users\USER\AppData\Local\ms-playwright\chromium_headless_shell-1254\chrome-headless-shell-win64\chrome-headless-shell.exe')
 page=browser.new_page(viewport={'width':1400,'height':900})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('**/*',lambda r:r.continue_() if r.request.url.startswith('http://127.0.0.1:') else r.abort())
 page.goto(f'http://127.0.0.1:{server.server_port}/');page.wait_for_function('!!window.RiriGraph');page.locator('#graphTab').click()
 def fixture(expand,zoom=1):
  page.evaluate('''([expand,zoom])=>{const item=Object.keys(RiriGraph.data().items)[0];RiriGraph.loadShared({version:1,nodes:['a','b','c'].map((id,i)=>({id,type:'sink',item,max:10,clock:100,x:expand?2000+i*400:200+i*350,y:expand?2000:200})),edges:[],view:{x:30,y:60,zoom},expandMachines:expand,machinePositions:{'a:0':{x:200,y:200},'b:0':{x:550,y:200},'c:0':{x:1000,y:600}},numbers:{display:'Decimal',digits:2},solver:'Nominal',warnings:[]})}''',[expand,zoom])
 def rect(id):return page.locator(f'.graph-node[data-id="{id}"]').bounding_box()
 for expand in [True,False]:
  for button in ['right','shift']:
   for zoom in [1,.7]:
    label=f'expand={expand} gesture={button} zoom={zoom}'
    try:
     fixture(expand,zoom);a,b=rect('a'),rect('b');start=(a['x']-35,a['y']-35);end=(b['x']+b['width']+25,b['y']+b['height']+25)
     if button=='shift':page.keyboard.down('Shift')
     page.mouse.move(*start);page.mouse.down(button='right' if button=='right' else 'left');page.mouse.move(*end,steps=12)
     assert page.locator('#gMarquee').is_visible(),'marquee hidden'
     assert not page.locator('#gMenu').is_visible(),'menu intercepted drag'
     page.mouse.up(button='right' if button=='right' else 'left')
     if button=='shift':page.keyboard.up('Shift')
     assert page.locator('.graph-node.selected').evaluate_all('(es)=>es.map(e=>e.dataset.id).sort()')==['a','b'],'wrong selection'
     assert not page.locator('#gMenu').is_visible(),'menu after drag'
     before={id:rect(id) for id in ['a','b','c']}
     page.mouse.move(a['x']+100*zoom,a['y']+20*zoom);page.mouse.down();page.mouse.move(a['x']+100*zoom+70,a['y']+20*zoom+45,steps=10);page.mouse.up()
     page.wait_for_timeout(80)
     for id in ['a','b','c']:
      after=rect(id);dx,dy=(70,45) if id!='c' else (0,0)
      assert abs(after['x']-before[id]['x']-dx)<1 and abs(after['y']-before[id]['y']-dy)<1,('movement',id,before[id],after)
     page.mouse.click(80,750,button='right');assert page.locator('#gMenu').is_visible(),'plain right click missing menu'
     page.keyboard.press('Escape');passed+=1;print('PASS',label)
    except Exception as e:failed+=1;print('FAIL',label,str(e));page.keyboard.up('Shift');page.mouse.up(button='right');page.mouse.up()
 # Distinct parts of the same recipe must be selected/moved independently.
 page.evaluate("""()=>{const recipe=RiriGraph.data().recipes.find(r=>ModelerGraph.recipeValid(r,RiriGraph.data()));RiriGraph.loadShared({version:1,nodes:[{id:'parts',type:'recipe',recipe:recipe.id,max:3,clock:100,x:2000,y:2000}],edges:[],view:{x:0,y:0,zoom:1},expandMachines:true,machineClockMode:'underclock',machinePositions:{'parts:0':{x:200,y:200},'parts:1':{x:550,y:200},'parts:2':{x:1000,y:600}},numbers:{display:'Decimal',digits:2},solver:'Nominal',warnings:[]})}""")
 parts=page.locator('.graph-node').evaluate_all('(es)=>es.map(e=>e.dataset.id)')
 assert len(parts)==3,parts
 before={id:rect(id) for id in parts}
 page.mouse.move(160,160);page.mouse.down(button='right');page.mouse.move(850,420,steps=10);page.mouse.up(button='right')
 assert page.locator('.graph-node.selected').count()==2
 page.mouse.move(before[parts[0]]['x']+100,before[parts[0]]['y']+20);page.mouse.down();page.mouse.move(before[parts[0]]['x']+160,before[parts[0]]['y']+50,steps=10);page.mouse.up();page.wait_for_timeout(80)
 for i,id in enumerate(parts):
  after=rect(id);dx,dy=(60,30) if i<2 else (0,0)
  assert abs(after['x']-before[id]['x']-dx)<1 and abs(after['y']-before[id]['y']-dy)<1,(id,after,before[id])
 passed+=1;print('PASS independent machine parts select and move')
 # Shift adds a visible node without losing the existing two-part selection.
 page.keyboard.down('Shift');page.mouse.move(960,560);page.mouse.down();page.mouse.move(1300,820,steps=10);page.mouse.up();page.keyboard.up('Shift')
 assert page.locator('.graph-node.selected').count()==3
 passed+=1;print('PASS additive Shift selection')
 # Browser implementations may send contextmenu at pointerdown instead of release.
 fixture(True);page.mouse.move(160,160);page.mouse.down(button='right')
 page.locator('#gCanvas').dispatch_event('contextmenu',{'clientX':160,'clientY':160,'button':2})
 page.mouse.move(850,400,steps=10);page.mouse.up(button='right')
 assert not page.locator('#gMenu').is_visible();assert page.locator('.selected.graph-node').count()==2
 passed+=1;print('PASS early contextmenu closes during drag')
 assert not errors,errors
 passed+=1;print('PASS no browser errors')
 page.screenshot(path='marquee-verified.png')
 browser.close()
server.shutdown()
print(json.dumps({'passed':passed,'failed':failed,'actual_model_calls':0}))
if failed:raise SystemExit(1)
