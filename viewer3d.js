import * as T from './viewer3d-vendor/three.module.js?v=20261126-2250';
// 좌표: 세이브·게임은 UE(왼손, cm). 화면은 UE (X,-Y,Z) m 로 거울 변환해 오른손 three.js 에서도 지도와 같은 방향으로 보이게 한다.
const $=id=>document.getElementById(id),status=$('status'),vp=$('viewport');
const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x9fc3d8);vp.prepend(renderer.domElement);
const scene=new T.Scene();scene.background=new T.Color(0x9fc3d8);scene.fog=new T.Fog(0x9fc3d8,2500,9000);
scene.add(new T.HemisphereLight(0xf0f9ff,0x5d6650,1.9));const sun=new T.DirectionalLight(0xfff4e0,2.2);sun.position.set(-0.45,0.35,0.82).multiplyScalar(1000);scene.add(sun);
const camera=new T.PerspectiveCamera(55,1,.2,20000);camera.up.set(0,0,1);
const root=new T.Group();scene.add(root);const terrainGroup=new T.Group();scene.add(terrainGroup);
const box=new T.BoxGeometry(1,1,1),dummy=new T.Object3D();
let catalogue,data,models=null,terrain=null,selected=null,low=false,yaw=0,pitch=-.6,needsRender=true,last=performance.now(),frameMs=0,drag=null,worker=null,loadId=0;
const keys=new Set(),materials=new Map(),pickables=[],drawStats={buildings:0,modeled:0,boxes:0,curves:0,wires:0};let nodesMesh,selectionMesh,water;
const color={foundation:0x8d969c,wall:0xb3bcc0,production:0x5bd9b0,power:0xffc663,storage:0xbd94ec,miner:0xed9653,other:0x9aa9b6,belt:0x3c4147,pipe:0xd9dde0,wire:0x2b2b2b};
const machineColor={ConstructorMk1:0xe8a25c,SmelterMk1:0xed9363,FoundryMk1:0xd9ad61,AssemblerMk1:0xe39b55,Crusher:0xef7c64,SorterMk1:0xe695bd,Cleaner2:0x7bd2c4,SoldifierAndCooler:0x79a4dc,GeneratorBiomass_Automated:0xf0b34a,GeneratorIntegratedBiomass:0xf0b34a,ConveyorAttachmentSplitter:0xd28a4a,ConveyorAttachmentMerger:0xd28a4a,PowerPoleMk1:0xb9a77a,StorageContainerMk1:0xc9a0e6};
const kind=c=>/Foundation(?!Passthrough)|Ramp|Roof/i.test(c)?'foundation':/Wall|Glass|Window/i.test(c)?'wall':/Miner|Mining|Extractor|WaterPump|Fracking|OilPump|Drill/i.test(c)?'miner':/Generator|PowerStorage|Battery/i.test(c)?'power':/Storage|Container|Sink|Dimensional/i.test(c)?'storage':/Constructor|Assembler|Manufacturer|Smelter|Foundry|Refinery|Blender|Packager|Crusher|Cleaner|Collider|Converter|Encoder|Mixer|Furnace|Press|Kiln|Machine|Sorter|Soldifier/i.test(c)?'production':'other';
// UE cm → 화면 m (Y 반전)
const v=a=>new T.Vector3(a[0]*.01,-a[1]*.01,a[2]*.01);
const mq=q=>new T.Quaternion(-q[0],q[1],-q[2],q[3]).normalize();
const names=c=>catalogue.names[c]||({foundation:'토대·경사로',wall:'벽·유리',production:'생산 기계',power:'발전 설비',storage:'보관 설비',miner:'채굴·추출 설비',other:'구조물'}[kind(c)]+' · '+c);
const mat=(key,c)=>{if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color:c,roughness:.72,metalness:.18,vertexColors:key.startsWith('m:')}));return materials.get(key);};
function aim(){camera.lookAt(camera.position.clone().add(dirOf(yaw,pitch)));needsRender=true;}
const dirOf=(y,p)=>new T.Vector3(Math.cos(y)*Math.cos(p),Math.sin(y)*Math.cos(p),Math.sin(p));
function setDir(d){d=d.clone().normalize();yaw=Math.atan2(d.y,d.x);pitch=Math.max(-1.55,Math.min(1.55,Math.asin(Math.max(-1,Math.min(1,d.z)))));aim();}
function lookAt(p){setDir(p.clone().sub(camera.position));}
function baseMatrix(b){return new T.Matrix4().compose(v(b.p),mq(b.q),new T.Vector3(...b.s));}
function dimMatrix(b){const d=b.dim,center=d.min.map((x,i)=>(x+d.max[i])/200),size=d.min.map((x,i)=>Math.max(.02,(d.max[i]-x)/100));center[1]=-center[1];
 return baseMatrix(b).multiply(new T.Matrix4().compose(new T.Vector3(...center),new T.Quaternion(),new T.Vector3(...size)));}
const modelOf=c=>models?.classes[c]?.[low?'lo':'hi']||models?.classes[c]?.hi||null;
function boundsMatrix(b){const m=modelOf(b.c);if(!m)return dimMatrix(b);const c=m.min.map((x,i)=>(x+m.max[i])/2),s=m.min.map((x,i)=>Math.max(.05,m.max[i]-x));return baseMatrix(b).multiply(new T.Matrix4().compose(new T.Vector3(...c),new T.Quaternion(),new T.Vector3(...s)));}
function heightRange(){return [$('minHeight').value===''?-Infinity:Number($('minHeight').value),$('maxHeight').value===''?Infinity:Number($('maxHeight').value)];}
function buildingBounds(b){return new T.Box3(new T.Vector3(-.5,-.5,-.5),new T.Vector3(.5,.5,.5)).applyMatrix4(boundsMatrix(b));}
function visible(b){const [min,max]=heightRange();if($('walls').checked&&kind(b.c)==='wall')return false;const bounds=buildingBounds(b);return bounds.max.z>=min&&bounds.min.z<=max;}
function curveVisible(points){const [min,max]=heightRange();return Math.max(...points.map(p=>p[2]/100))>=min&&Math.min(...points.map(p=>p[2]/100))<=max;}
function clear(){while(root.children.length){const o=root.children[0];root.remove(o);if(o.geometry&&o.geometry!==box&&!o.geometry.userData.shared)o.geometry.dispose();o.dispose?.();}pickables.length=0;}
const groupAdd=(groups,key,entry)=>{if(!groups.has(key))groups.set(key,[]);groups.get(key).push(entry);};
const cell=p=>Math.floor(p[0]/25000)+','+Math.floor(p[1]/25000);
function bezierSamples(points,n){const result=[];for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],p0=v(a.p),p1=v(a.p.map((x,j)=>x+a.l[j]/3)),p2=v(b.p.map((x,j)=>x-b.a[j]/3)),p3=v(b.p);const curve=new T.CubicBezierCurve3(p0,p1,p2,p3);const length=curve.getLength(),steps=Math.max(n,Math.min(96,Math.ceil(length/(low?10:4))));for(let j=i===1?0:1;j<=steps;j++)result.push(curve.getPoint(j/steps));}return result;}
// 실제 메시: data/viewer3d-models.bin.gz (tools/meshx/build_models.py)
const geoCache=new Map();
function modelGeometry(c){const m=modelOf(c);if(!m)return null;const key=c+(low?'|lo':'|hi');if(geoCache.has(key))return geoCache.get(key);
 const buf=models.buffer,stride=16,g=new T.BufferGeometry();const vbytes=new Uint8Array(buf,m.v*stride,m.vc*stride);const copy=new ArrayBuffer(vbytes.length);new Uint8Array(copy).set(vbytes);
 const ib=new T.InterleavedBuffer(new Float32Array(copy),4);g.setAttribute('position',new T.InterleavedBufferAttribute(ib,3,0));
 const i8=new Int8Array(copy),u8=new Uint8Array(copy),nor=new Int8Array(m.vc*3),col=new Uint8Array(m.vc*3);
 for(let i=0;i<m.vc;i++){nor[i*3]=i8[i*16+12];nor[i*3+1]=i8[i*16+13];nor[i*3+2]=i8[i*16+14];const s=u8[i*16+15];col[i*3]=col[i*3+1]=col[i*3+2]=s;}
 g.setAttribute('normal',new T.BufferAttribute(nor,3,true));g.setAttribute('color',new T.BufferAttribute(col,3,true));
 g.setIndex(new T.BufferAttribute(new Uint32Array(buf.slice(models.indexOffset+m.i*4,models.indexOffset+(m.i+m.ic)*4)),1));
 g.computeBoundingBox();g.computeBoundingSphere();g.userData.shared=true;geoCache.set(key,g);return g;}
// 벨트: 납작한 판, 파이프: 둥근 관
const beltGeo=new T.BoxGeometry(1,1,1);beltGeo.userData.shared=true;const pipeGeo=new T.CylinderGeometry(1,1,1,10,1);pipeGeo.userData.shared=true;
function rebuild(){if(!data)return;clear();const groups=new Map(),tubes=new Map();drawStats.buildings=drawStats.modeled=drawStats.boxes=drawStats.curves=drawStats.wires=0;
 for(const b of data.buildings){if(!visible(b))continue;const has=!!modelOf(b.c);groupAdd(groups,kind(b.c)+'|'+b.c+'|'+(has?'m':'b')+'|'+cell(b.p),{matrix:has?baseMatrix(b):dimMatrix(b),record:b});drawStats.buildings++;has?drawStats.modeled++:drawStats.boxes++;}
 for(const [key,list] of groups){const [k,c,t]=key.split('|');const g=t==='m'?modelGeometry(c):box;const col=machineColor[c]??color[k]??0x79bc91;
  const mesh=new T.InstancedMesh(g,mat((t==='m'?'m:':'b:')+col,col),list.length);mesh.userData.records=[];list.forEach((item,i)=>{mesh.setMatrixAt(i,item.matrix);mesh.userData.records.push(item.record);});mesh.computeBoundingBox();mesh.computeBoundingSphere();root.add(mesh);pickables.push(mesh);}
 for(const c of data.curves){const points=bezierSamples(c.points,low?4:12);if(!curveVisible(points.map(p=>[p.x*100,-p.y*100,p.z*100])))continue;
  const k=/Pipe|Hypertube/i.test(c.c)?'pipe':'belt';
  for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],d=b.clone().sub(a),len=d.length();if(len<.001)continue;const dir=d.clone().normalize();let m;
   if(k==='pipe'){const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),dir);m=new T.Matrix4().compose(a.clone().add(b).multiplyScalar(.5),q,new T.Vector3(.33,len,.33));}
   else{const side=new T.Vector3(0,0,1).cross(dir);if(side.lengthSq()<1e-6)side.set(1,0,0);side.normalize();const up=dir.clone().cross(side).normalize();
    const basis=new T.Matrix4().makeBasis(dir,side,up);const q=new T.Quaternion().setFromRotationMatrix(basis);m=new T.Matrix4().compose(a.clone().add(b).multiplyScalar(.5).addScaledVector(up,.12),q,new T.Vector3(len*1.02,1.2,.24));}
   groupAdd(tubes,k+'|'+cell([a.x*100,-a.y*100]),{matrix:m,record:c});}drawStats.curves++;}
 for(const [key,list] of tubes){const k=key.split('|')[0];const mesh=new T.InstancedMesh(k==='pipe'?pipeGeo:beltGeo,mat('c:'+k,color[k]),list.length);mesh.userData.records=[];list.forEach((item,i)=>{mesh.setMatrixAt(i,item.matrix);mesh.userData.records.push(item.record);});mesh.computeBoundingBox();mesh.computeBoundingSphere();root.add(mesh);pickables.push(mesh);}
 if($('wires').checked){const verts=[];for(const w of data.wires){if(!curveVisible(w.points))continue;for(let i=1;i<w.points.length;i++)verts.push(...v(w.points[i-1]).toArray(),...v(w.points[i]).toArray());drawStats.wires++;}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));const line=new T.LineSegments(geo,wireMaterial);root.add(line);}
 renderList();if(selected&&!visibleSelection(selected)){$('info').hidden=true;selectionMesh.visible=false;}else if(selected)highlight(selected);
 needsRender=true;}
const wireMaterial=new T.LineBasicMaterial({color:color.wire});
function visibleSelection(b){return b.dim?visible(b):curveVisible(b.points.map(x=>x.p));}
function renderList(){const term=$('search').value.toLocaleLowerCase(),all=data.buildings.filter(b=>visible(b)&&`${names(b.c)} ${b.c} ${b.p.join(' ')}`.toLocaleLowerCase().includes(term));$('listCount').textContent=`${all.length.toLocaleString()}개 · 최대 100개 표시`;const frag=document.createDocumentFragment();
 for(const b of all.slice(0,100)){const button=document.createElement('button');button.textContent=names(b.c);const sub=document.createElement('small');sub.textContent=`${b.p.map(x=>(x/100).toFixed(1)).join(' / ')} m · 이 건물로 이동`;button.append(sub);button.onclick=()=>{showInfo(b);focusBuilding(b);};frag.append(button);}$('buildingList').replaceChildren(frag);}
function highlight(b){selectionMesh.visible=true;if(b.dim)selectionMesh.matrix.copy(boundsMatrix(b));else{const bb=new T.Box3().setFromPoints(b.points.map(x=>v(x.p))),size=bb.getSize(new T.Vector3()).max(new T.Vector3(1,1,1));selectionMesh.matrix.compose(bb.getCenter(new T.Vector3()),new T.Quaternion(),size);}selectionMesh.matrixWorldNeedsUpdate=true;needsRender=true;}
function showInfo(b){selected=b;$('infoName').textContent=names(b.c);
 if(!b.dim){$('infoBody').textContent=[`클래스: ${b.c}`,`점 ${b.points.length}개`,'스플라인: 세이브 원본 탄젠트 · 단면 크기는 표시용'].join('\n');$('info').hidden=false;highlight(b);return;}
 const q=new T.Quaternion(...b.q).normalize(),e=new T.Euler().setFromQuaternion(q,'ZYX'),m=models?.classes[b.c];
 $('infoBody').textContent=[`클래스: ${b.c}`,`좌표 X/Y/Z (m): ${b.p.map(x=>(x/100).toFixed(2)).join(' / ')}`,`회전 X/Y/Z (°): ${[e.x,e.y,e.z].map(T.MathUtils.radToDeg).map(x=>x.toFixed(2)).join(' / ')}`,`배율: ${b.s.join(' / ')}`,`레시피: ${b.recipe?(catalogue.names[b.recipe]||b.recipe):'세이브 기록 없음'}`,`클럭: ${b.clock==null?'세이브 기록 없음':b.clock.toFixed(1)+'%'}`,
  m?`모델: 게임 메시 ${m.hi.parts.map(p=>p[0]).slice(0,4).join(', ')}${m.hi.parts.length>4?' 외 '+(m.hi.parts.length-4)+'개':''} (${(m[low?'lo':'hi']||m.hi).ic/3|0} 삼각형)`:`모델: 게임 메시 없음 → 크기 상자 (${b.dim.quality})`].join('\n');$('info').hidden=false;highlight(b);}
function focusBuilding(b){const bb=b.dim?buildingBounds(b):new T.Box3().setFromPoints(b.points.map(x=>v(x.p)));const target=bb.getCenter(new T.Vector3()),span=bb.getSize(new T.Vector3()).length();camera.position.copy(target).add(new T.Vector3(-1,1,.8).normalize().multiplyScalar(Math.max(18,span*1.8)));lookAt(target);pivot=target.clone();vp.focus();}
function home(){const districts=new Map();for(const b of data.buildings){if(kind(b.c)!=='production')continue;const k=cell(b.p);if(!districts.has(k))districts.set(k,[]);districts.get(k).push(b);}const dense=[...districts.values()].sort((a,b)=>b.length-a.length)[0];const anchor=dense?dense.reduce((p,b)=>p.add(v(b.p)),new T.Vector3()).multiplyScalar(1/dense.length):null;const list=data.buildings.filter(b=>!anchor||v(b.p).distanceTo(anchor)<180).map(b=>v(b.p));if(!list.length){camera.position.set(500,0,1500);lookAt(new T.Vector3(500,0,0));return;}const bounds=new T.Box3().setFromPoints(list),center=bounds.getCenter(new T.Vector3()),span=Math.max(80,bounds.getSize(new T.Vector3()).length());camera.position.copy(center).add(new T.Vector3(-.8,1,.8).normalize().multiplyScalar(span*1.1));lookAt(center);pivot=center.clone();}
function setupData(next){data=next;selected=null;$('info').hidden=true;selectionMesh.visible=false;$('saveName').textContent=data.file;$('badge').textContent=`${data.name} · 보기 전용`;
 const classes=[...new Set(data.buildings.map(b=>b.c))],noModel=classes.filter(c=>!models?.classes[c]);const boxed=data.buildings.filter(b=>!models?.classes[b.c]).length;
 status.textContent=`건물 ${data.buildings.length.toLocaleString()} · 운송 ${data.curves.length} · 전선 ${data.wires.length}\n게임 모델 ${classes.length-noModel.length}/${classes.length}종 · 상자 대체 ${boxed}개${noModel.length?' ('+noModel.join(', ')+')':''}\n지형: ${terrain?'게임 높이맵 적용':'불러오는 중'}`;
 rebuildNodes();rebuild();home();window.viewer3d.ready=true;}
function rebuildNodes(){if(nodesMesh){scene.remove(nodesMesh);nodesMesh.dispose();nodesMesh.geometry.dispose();nodesMesh.material.dispose();}
 const nodes=catalogue.nodes.map(n=>({...n}));for(const s of data.nodes){const i=nodes.findIndex(n=>Math.hypot(n.x-s.x,n.y-s.y)<500);if(i>=0)nodes[i]={...nodes[i],...s,resource:s.resource||nodes[i].resource};else nodes.push(s);}
 const geometry=new T.OctahedronGeometry(2.4,0);nodesMesh=new T.InstancedMesh(geometry,new T.MeshBasicMaterial(),nodes.length);nodes.forEach((n,i)=>{dummy.position.set(n.x/100,-n.y/100,n.z/100+3);dummy.scale.setScalar(1);dummy.quaternion.identity();dummy.updateMatrix();nodesMesh.setMatrixAt(i,dummy.matrix);const h=[...(n.resource||'unknown')].reduce((a,c)=>a+c.charCodeAt(0),0);nodesMesh.setColorAt(i,new T.Color().setHSL((h%360)/360,.65,.6));});nodesMesh.computeBoundingSphere();nodesMesh.visible=$('nodes').checked;scene.add(nodesMesh);}
// ── 지형: data/terrain-height.png (tools/terrain/build_heightmap.py, 게임 랜드스케이프 높이맵) ──
const MAP={x0:-3247,y0:-3750,size:7500};// 2D 지도(engine.js project)와 같은 범위, UE m
const CH=64;let mapTexture,terrainMat,chunks=[];
function heightAt(ix,iy){const t=terrain;ix=Math.max(0,Math.min(t.w-1,ix));iy=Math.max(0,Math.min(t.h-1,iy));return t.z[iy*t.w+ix];}
function groundZ(xm,ym){if(!terrain)return null;const fx=(xm-terrain.ox)/terrain.step,fy=(ym-terrain.oy)/terrain.step,ix=Math.floor(fx),iy=Math.floor(fy);if(ix<0||iy<0||ix>=terrain.w-1||iy>=terrain.h-1)return null;const tx=fx-ix,ty=fy-iy;
 return (heightAt(ix,iy)*(1-tx)+heightAt(ix+1,iy)*tx)*(1-ty)+(heightAt(ix,iy+1)*(1-tx)+heightAt(ix+1,iy+1)*tx)*ty;}
function chunkGeometry(cx,cy,step){const t=terrain,n=CH/step,x0=cx*CH,y0=cy*CH,cnt=(n+1)*(n+1),ring=4*n;const pos=new Float32Array((cnt+ring)*3),nor=new Float32Array((cnt+ring)*3),uv=new Float32Array((cnt+ring)*2),idx=[];
 const put=(k,ix,iy,drop)=>{const xm=t.ox+ix*t.step,ym=t.oy+iy*t.step,z=heightAt(ix,iy)-drop;pos[k*3]=xm;pos[k*3+1]=-ym;pos[k*3+2]=z;
  const dzx=(heightAt(ix+step,iy)-heightAt(ix-step,iy))/(2*step*t.step),dzy=(heightAt(ix,iy+step)-heightAt(ix,iy-step))/(2*step*t.step),l=Math.hypot(dzx,dzy,1);nor[k*3]=-dzx/l;nor[k*3+1]=dzy/l;nor[k*3+2]=1/l;
  uv[k*2]=(xm-MAP.x0)/MAP.size;uv[k*2+1]=1-(ym-MAP.y0)/MAP.size;};
 const ok=(ix,iy)=>ix<t.w&&iy<t.h&&t.valid[iy*t.w+ix];
 for(let j=0;j<=n;j++)for(let i=0;i<=n;i++)put(j*(n+1)+i,Math.min(t.w-1,x0+i*step),Math.min(t.h-1,y0+j*step),0);
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+1,c=a+n+1,d=c+1;const ix=x0+i*step,iy=y0+j*step;if(!(ok(ix,iy)&&ok(ix+step,iy)&&ok(ix,iy+step)&&ok(ix+step,iy+step)))continue;idx.push(a,c,b,b,c,d);}
 // 스커트: 다른 LOD 칸과 만나는 경계의 틈을 아래로 늘린 벽으로 가린다
 const edge=[];for(let i=0;i<n;i++)edge.push(i);for(let j=0;j<n;j++)edge.push(j*(n+1)+n);for(let i=n;i>0;i--)edge.push(n*(n+1)+i);for(let j=n;j>0;j--)edge.push(j*(n+1));
 edge.forEach((k,e)=>{const s=cnt+e;pos[s*3]=pos[k*3];pos[s*3+1]=pos[k*3+1];pos[s*3+2]=pos[k*3+2]-6*step;nor.set(nor.subarray(k*3,k*3+3),s*3);uv.set(uv.subarray(k*2,k*2+2),s*2);});
 for(let e=0;e<edge.length;e++){const a=edge[e],b=edge[(e+1)%edge.length],sa=cnt+e,sb=cnt+(e+1)%edge.length;idx.push(a,b,sa,b,sb,sa);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('normal',new T.BufferAttribute(nor,3));g.setAttribute('uv',new T.BufferAttribute(uv,2));g.setIndex(idx);g.computeBoundingSphere();g.computeBoundingBox();return g;}
async function loadTerrain(){const [meta,blob,wj]=await Promise.all([fetch('data/terrain-meta.json').then(r=>r.json()),fetch('data/terrain-height.png').then(r=>r.blob()),fetch('data/terrain-water.json').then(r=>r.json())]);
 const bmp=await createImageBitmap(blob,{colorSpaceConversion:'none',premultiplyAlpha:'none'});const cv=new OffscreenCanvas(bmp.width,bmp.height),cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(bmp,0,0);const px=cx.getImageData(0,0,bmp.width,bmp.height).data;
 const w=bmp.width,h=bmp.height,z=new Float32Array(w*h),valid=new Uint8Array(w*h);for(let i=0;i<w*h;i++){z[i]=((px[i*4]*256+px[i*4+1])-32768)/128+1;valid[i]=px[i*4+2]>127?1:0;}
 terrain={w,h,z,valid,ox:meta.originM[0],oy:meta.originM[1],step:meta.stepM,meta};
 terrainMat=new T.MeshStandardMaterial({map:mapTexture,roughness:.95,metalness:0,color:0xe8eee6,side:T.DoubleSide});
 for(let cy=0;cy*CH<h-1;cy++)for(let cx2=0;cx2*CH<w-1;cx2++){const mesh=new T.Mesh(chunkGeometry(cx2,cy,8),terrainMat);mesh.userData={cx:cx2,cy:cy,level:8,geos:{8:mesh.geometry}};mesh.matrixAutoUpdate=false;terrainGroup.add(mesh);chunks.push(mesh);}
 // 바다(게임 바다 평면 높이)와 호수·강 수면
 const wm=new T.MeshStandardMaterial({color:0x2f6f8f,roughness:.25,metalness:.1,transparent:true,opacity:.82});water=new T.Group();
 const sea=new T.Mesh(new T.PlaneGeometry(24000,24000),wm);sea.position.set(500,0,wj.oceanZ);water.add(sea);
 const pg=new T.PlaneGeometry(1,1);for(const [x,y,zz,sx,sy,yawDeg] of wj.planes){if(zz<wj.oceanZ+.5&&sx*sy>40000)continue;const m=new T.Mesh(pg,wm);m.position.set(x,-y,zz);m.rotation.z=-T.MathUtils.degToRad(yawDeg);m.scale.set(sx,sy,1);water.add(m);}
 scene.add(water);water.visible=$('map').checked;terrainGroup.visible=$('map').checked;updateTerrainLod(true);status.textContent=status.textContent.replace('지형: 불러오는 중','지형: 게임 높이맵 적용');needsRender=true;}
let lodTimer=0;function updateTerrainLod(force){if(!terrain)return;const now=performance.now();if(!force&&now-lodTimer<120)return;lodTimer=now;let built=0;const cam=camera.position;
 for(const m of chunks){const {cx,cy}=m.userData,mx=terrain.ox+(cx+.5)*CH*terrain.step,my=-(terrain.oy+(cy+.5)*CH*terrain.step),d=Math.hypot(cam.x-mx,cam.y-my,Math.max(0,cam.z-150)*.5);
  const want=low?(d<700?2:d<1800?4:8):(d<550?1:d<1300?2:d<2600?4:8);if(want===m.userData.level)continue;
  if(!m.userData.geos[want]){if(built>=(force?1e9:6))continue;m.userData.geos[want]=chunkGeometry(cx,cy,want);built++;}
  m.geometry=m.userData.geos[want];m.userData.level=want;needsRender=true;
}
 for(const m of chunks){const {cx,cy}=m.userData,mx=terrain.ox+(cx+.5)*CH*terrain.step,my=-(terrain.oy+(cy+.5)*CH*terrain.step),d=Math.hypot(cam.x-mx,cam.y-my);if(d>1600)for(const k of [1,2])if(m.userData.geos[k]&&m.userData.level!==k){m.userData.geos[k].dispose();delete m.userData.geos[k];}}}
function resize(){renderer.setSize(vp.clientWidth,vp.clientHeight);camera.aspect=vp.clientWidth/vp.clientHeight;camera.updateProjectionMatrix();needsRender=true;}new ResizeObserver(resize).observe(vp);
// ── 조작: 좌드래그 회전(클릭 지점 기준) · 우/휠클릭 드래그 이동 · 휠 커서 방향 확대 · WASD 보는 방향 기준 ──
let pivot=new T.Vector3();const ray=new T.Raycaster();
function ndc(e){const r=renderer.domElement.getBoundingClientRect();return new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);}
function pickPoint(e){ray.setFromCamera(ndc(e),camera);const hits=ray.intersectObjects([...pickables,...(terrainGroup.visible?chunks:[])],false);if(hits[0])return hits[0].point;
 const o=ray.ray.origin,d=ray.ray.direction,gz=groundZ(o.x,-o.y)??0;if(d.z<-1e-3){const t=(gz-o.z)/d.z;if(t>0&&t<8000)return o.clone().addScaledVector(d,t);}return o.clone().addScaledVector(d,300);}
function tick(now){requestAnimationFrame(tick);const dt=Math.min(.05,(now-last)/1000);last=now;frameMs=frameMs*.9+dt*1000*.1;
 if(keys.size){const alt=Math.max(1,camera.position.z-(groundZ(camera.position.x,-camera.position.y)??0)),speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?4:1)*Math.max(25,Math.min(600,alt*.9))*dt;
  const forward=new T.Vector3(Math.cos(yaw),Math.sin(yaw),0),right=new T.Vector3(Math.sin(yaw),-Math.cos(yaw),0);const move=new T.Vector3();
  if(keys.has('KeyW'))move.add(forward);if(keys.has('KeyS'))move.sub(forward);if(keys.has('KeyD'))move.add(right);if(keys.has('KeyA'))move.sub(right);if(keys.has('KeyE')||keys.has('Space'))move.z+=1;if(keys.has('KeyQ')||keys.has('KeyC'))move.z-=1;
  if(move.lengthSq()){move.normalize().multiplyScalar(speed);camera.position.add(move);pivot.add(move);needsRender=true;}}
 updateTerrainLod(false);
 if(needsRender){renderer.render(scene,camera);needsRender=false;$('stats').textContent=`${low?'저사양':'표준'} · 건물 ${drawStats.buildings} (모델 ${drawStats.modeled} · 상자 ${drawStats.boxes}) · ${renderer.info.render.calls} draw calls · ${renderer.info.render.triangles.toLocaleString()} 삼각형 · 고도 ${camera.position.z.toFixed(0)} m`;}}
window.addEventListener('keydown',e=>{const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable))return;if(e.ctrlKey||e.altKey||e.metaKey)return;if(['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','KeyC','Space','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();drag=null;});vp.addEventListener('blur',()=>keys.clear());
vp.addEventListener('contextmenu',e=>e.preventDefault());
const el=renderer.domElement;
el.addEventListener('pointerdown',e=>{vp.focus();if(![0,1,2].includes(e.button))return;e.preventDefault();const mode=e.button===0&&!e.shiftKey?'orbit':'pan';const p=pickPoint(e);if(mode==='orbit')pivot.copy(p);
 drag={mode,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false,dist:camera.position.distanceTo(p)};el.setPointerCapture(e.pointerId);});
el.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>4)drag.moved=true;if(!drag.moved)return;
 if(drag.mode==='orbit'){const a=-dx*.005,b=-dy*.005;const off=camera.position.clone().sub(pivot),dir=dirOf(yaw,pitch);const qz=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),a);off.applyQuaternion(qz);dir.applyQuaternion(qz);
  const right=new T.Vector3().crossVectors(dir,new T.Vector3(0,0,1)).normalize();const newPitch=Math.asin(Math.max(-1,Math.min(1,dir.clone().applyAxisAngle(right,b).z)));if(newPitch>-1.5&&newPitch<1.2){off.applyAxisAngle(right,b);dir.applyAxisAngle(right,b);}
  camera.position.copy(pivot).add(off);setDir(dir);}
 else{const h=el.clientHeight,scale=2*Math.tan(T.MathUtils.degToRad(camera.fov/2))*Math.max(5,drag.dist)/h;const r=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0),u=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,1);
  const mv=r.multiplyScalar(-dx*scale).add(u.multiplyScalar(dy*scale));camera.position.add(mv);pivot.add(mv);needsRender=true;}});
el.addEventListener('pointerup',e=>{const d=drag;drag=null;if(d&&!d.moved&&e.button===0){ray.setFromCamera(ndc(e),camera);const hit=ray.intersectObjects(pickables,false)[0];if(hit)showInfo(hit.object.userData.records[hit.instanceId]);}});
el.addEventListener('pointercancel',()=>drag=null);
el.addEventListener('wheel',e=>{e.preventDefault();const p=pickPoint(e),d=camera.position.distanceTo(p),k=e.deltaY<0?.18:-.22;const step=Math.max(-2500,Math.min(d-3,d*k));if(e.deltaY<0&&d<4)return;camera.position.addScaledVector(p.clone().sub(camera.position).normalize(),step);needsRender=true;},{passive:false});
$('home').onclick=()=>{home();vp.focus();};$('goSelected').onclick=()=>{if(selected)focusBuilding(selected);};$('closeInfo').onclick=()=>{$('info').hidden=true;selectionMesh.visible=false;selected=null;needsRender=true;};
for(const id of ['walls','minHeight','maxHeight','wires'])$(id).addEventListener('change',()=>{const [min,max]=heightRange();if(min>max){status.textContent='최저 높이는 최고 높이 이하여야 합니다.';return;}rebuild();});
$('nodes').onchange=()=>{nodesMesh.visible=$('nodes').checked;needsRender=true;};$('map').onchange=()=>{terrainGroup.visible=$('map').checked;if(water)water.visible=$('map').checked;needsRender=true;};$('search').oninput=renderList;
$('low').onclick=()=>{low=!low;$('low').textContent=`저사양 모드: ${low?'켬':'끔'}`;$('low').setAttribute('aria-pressed',String(low));renderer.setPixelRatio(low?Math.min(devicePixelRatio,1):Math.min(devicePixelRatio,1.5));resize();rebuild();updateTerrainLod(true);};
async function loadFile(file){if(!file||!file.name.toLowerCase().endsWith('.sav')){status.textContent='.sav 파일을 선택하세요.';return;}if(file.size>128*1024*1024){status.textContent='128MB 이하 세이브를 사용하세요.';return;}
 const id=++loadId;worker?.terminate();status.textContent='브라우저 안에서 세이브를 읽는 중…';const bytes=await file.arrayBuffer();if(id!==loadId)return;
 worker=new Worker('./viewer3d-vendor/save-parser.worker.js?v=20261126-2250');const timer=setTimeout(()=>{if(id===loadId){worker.terminate();worker=null;status.textContent='파싱 시간이 초과되었습니다. 이전 화면을 유지합니다.';}},60000);
 worker.onmessage=({data:msg})=>{if(id!==loadId)return;if(msg.result){clearTimeout(timer);worker.terminate();worker=null;setupData(msg.result);}else if(msg.error){clearTimeout(timer);worker.terminate();worker=null;status.textContent=msg.error;}else if(msg.progress!=null)status.textContent=`로컬 파싱 ${Math.min(100,Math.round(msg.progress*100))}%`;};worker.onerror=e=>{clearTimeout(timer);worker?.terminate();worker=null;status.textContent='파서 오류: '+e.message;};worker.postMessage({name:file.name,bytes,dimensions:catalogue.dimensions},[bytes]);}
$('saveFile').onchange=()=>loadFile($('saveFile').files[0]);let dragDepth=0;window.addEventListener('dragenter',e=>{e.preventDefault();dragDepth++;$('drop').hidden=false;});window.addEventListener('dragover',e=>e.preventDefault());window.addEventListener('dragleave',()=>{if(--dragDepth<=0){dragDepth=0;$('drop').hidden=true;}});window.addEventListener('drop',e=>{e.preventDefault();dragDepth=0;$('drop').hidden=true;loadFile(e.dataTransfer.files[0]);});
async function loadModels(){const [meta,res]=await Promise.all([fetch('data/viewer3d-models.json').then(r=>r.json()),fetch('data/viewer3d-models.bin.gz')]);if(!res.ok)throw Error('models '+res.status);
 const buffer=await new Response(res.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();meta.buffer=buffer;return meta;}
window.viewer3d={ready:false,get data(){return data;},get camera(){return camera;},get renderer(){return renderer;},get pivot(){return pivot;},get yaw(){return yaw;},get pitch(){return pitch;},get terrain(){return terrain;},get models(){return models;},get stats(){return {...drawStats,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};},focusBuilding,showInfo,dimMatrix,boundsMatrix,bezierSamples,loadFile,groundZ};
try{mapTexture=new T.TextureLoader().load('assets/world-map.webp',()=>needsRender=true);mapTexture.colorSpace=T.SRGBColorSpace;mapTexture.anisotropy=4;
 selectionMesh=new T.Mesh(box,new T.MeshBasicMaterial({color:0xfff1a1,wireframe:true,depthTest:false}));selectionMesh.matrixAutoUpdate=false;selectionMesh.renderOrder=100;selectionMesh.visible=false;scene.add(selectionMesh);
 const [cat,save,mdl]=await Promise.all([fetch('data/viewer3d-catalogue.json').then(r=>{if(!r.ok)throw Error('catalogue '+r.status);return r.json();}),fetch('data/viewer3d-save.json').then(r=>{if(!r.ok)throw Error('save '+r.status);return r.json();}),loadModels().catch(e=>{console.warn(e);return null;})]);
 catalogue=cat;models=mdl;setupData(save);resize();requestAnimationFrame(tick);
 loadTerrain().catch(e=>{status.textContent+='\n지형 불러오기 실패: '+e.message;});
}catch(e){status.textContent='뷰어 초기화 실패: '+e.message;}
