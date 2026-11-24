importScripts('parser.js','../../data/unlock-catalog.js','../../unlocks.js');
self.onmessage=e=>{try{const save=SFSaveParser.Parser.ParseSave(e.data.name,e.data.buffer,{throwErrors:true});self.postMessage({profile:SFUnlocks.extract(save)});}catch(err){self.postMessage({error:'세이브 해금 읽기 실패: '+err.message+' · JSON 가져오기 또는 수동 편집을 사용하세요.'});}};
