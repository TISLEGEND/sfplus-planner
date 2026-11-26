"""Deployment: python update-asset-version.py 20261127-1 (creates backups before changing files)."""
from pathlib import Path
import json,re,sys,shutil
from datetime import datetime
from uuid import uuid4
root=Path(__file__).resolve().parent
version=sys.argv[1] if len(sys.argv)>1 else json.loads((root/'asset-version.json').read_text())['version']
if not re.fullmatch(r'[A-Za-z0-9._-]+',version):raise SystemExit('Invalid version')
names=['index.html','viewer3d.html','viewer3d.js','help.js','viewer3d-vendor/three.module.js']
backup=Path(r'C:\Users\USER\riri-widget_extra\backups\backup_20261126_2139_c1126213900c8')/('assets-'+datetime.now().strftime('%Y%m%d-%H%M%S')+'-'+uuid4().hex[:8])
for name in names+['asset-version.json']:
 dest=backup/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/name,dest)
for name in names:
 p=root/name
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'(\.(?:js|css)\?v=)[A-Za-z0-9._-]+',lambda m:m[1]+version,s)
 p.write_text(s,encoding='utf-8',newline='')
(root/'asset-version.json').write_text(json.dumps({'version':version},indent=2)+'\n',encoding='utf-8')
print('Asset version:',version)
