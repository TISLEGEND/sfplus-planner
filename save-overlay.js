// 세이브 오버레이: data/save-data.js(tools/saveparse/extract-save.mjs로 생성)를 월드맵 위에 그린다.
(function () {
  const S = window.SFP_SAVE, E = window.SFEngine;
  if (!S || !E) return;
  const $ = id => document.getElementById(id), NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); return e; };
  const P = (x, y) => { const p = E.project(x, y); return [p.x * 1000, p.y * 1000]; };

  const kindOf = c => /Miner|MiningHead|Extractor|WaterPump|Fracking|OilPump|Drill/i.test(c) ? 'miner'
    : /Generator|PowerStorage|Battery/i.test(c) ? 'power'
    : /Storage|Container|Sink|Dimensional/i.test(c) ? 'storage'
    : /Splitter|Merger|Lift|Sorter|Passthrough|Pole|PowerTower|Pipeline|Pump|Valve|Junction/i.test(c) ? 'logistics'
    : /Constructor|Assembler|Manufacturer|Smelter|Foundry|Refinery|Blender|Packager|Crusher|Cleaner|Collider|Converter|Encoder|Mixer|Furnace|Press|Kiln|Bench|Workshop|Machine/i.test(c) ? 'production'
    : 'other';
  const kinds = { production: ['생산 기계', '#5ee0c0'], miner: ['채굴·추출', '#ffa64d'], power: ['발전', '#ffe066'], storage: ['보관·싱크', '#c58cff'], logistics: ['분배·리프트·전주', '#9fb3c8'], other: ['기타 구조물', '#6f8aa6'] };
  const show = Object.fromEntries(Object.keys(kinds).map(k => [k, true]));
  let showBelts = true, showWires = true, on = true, focusClass = '';

  const svg = el('svg', { id: 'saveLayer', viewBox: '0 0 1000 1000' });
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  $('mapSurface').append(svg);

  const states = { NoPower: '전력 없음', Producing: '가동 중', Idle: '대기', Standby: '정지', OutputFull: '출력 가득', NoInput: '재료 없음' };
  function info(b) {
    const parts = [b.c, b.recipe && '레시피 ' + b.recipe, b.clock != null && '클럭 ' + b.clock + '%', b.state && (states[b.state] || b.state), b.on && '가동 중',
      `X ${b.x}, Y ${b.y}, Z ${b.z} cm`].filter(Boolean);
    $('nodeInfo').textContent = '세이브 건물 · ' + parts.join(' · ');
  }

  function draw() {
    svg.replaceChildren();
    if (!on) return;
    const Z = (window.SFMap && SFMap.view.z) || 1;
    if (showWires) for (const w of S.wires) {
      const a = P(w[0], w[1]), b = P(w[2], w[3]);
      svg.append(el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#ffe06688', 'stroke-width': 1 / Z, 'vector-effect': 'non-scaling-stroke' }));
    }
    if (showBelts) for (const b of S.belts) {
      const pts = []; for (let i = 0; i < b.p.length; i += 2) pts.push(P(b.p[i], b.p[i + 1]).join(','));
      svg.append(el('polyline', { points: pts.join(' '), fill: 'none', stroke: /Pipe/i.test(b.c) ? '#5aa9ff' : '#e9eef5', 'stroke-width': 2 / Z, 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke' }));
    }
    for (const b of S.buildings) {
      const k = kindOf(b.c); if (!show[k] && b.c !== focusClass) continue;
      const [x, y] = P(b.x, b.y), ppu = (window.SFMap ? SFMap.view.base * SFMap.view.z : $('mapSurface').clientWidth) / 1000 || 1, s = Math.max(k === 'logistics' ? 0.35 : 0.9, (k === 'logistics' ? 4 : 8) / ppu), hit = focusClass && b.c === focusClass;
      const r = el('rect', { x: x - s / 2, y: y - s / 2, width: s, height: s, fill: kinds[k][1], stroke: hit ? '#ff4d6d' : '#0b1118', 'stroke-width': (hit ? 3 : 1) / Z, 'vector-effect': 'non-scaling-stroke', transform: `rotate(${b.r} ${x} ${y})` });
      r.style.cssText = 'pointer-events:auto;cursor:pointer';
      const t = el('title', {}); t.textContent = b.c + (b.recipe ? ' · ' + b.recipe : ''); r.append(t);
      r.onclick = e => { e.stopPropagation(); info(b); };
      svg.append(r);
    }
    S.players.forEach((p, i) => {
      const [x, y] = P(p.x, p.y);
      const c = el('circle', { cx: x, cy: y, r: Math.max(1.4, 7 / ((window.SFMap ? SFMap.view.base * SFMap.view.z : $('mapSurface').clientWidth) / 1000 || 1)), fill: '#ff4d9a', stroke: 'white', 'stroke-width': 2 / Z, 'vector-effect': 'non-scaling-stroke' });
      c.style.pointerEvents = 'auto';
      const t = el('title', {}); t.textContent = `플레이어 ${i + 1} · X ${p.x}, Y ${p.y}`; c.append(t);
      c.onclick = e => { e.stopPropagation(); $('nodeInfo').textContent = `플레이어 ${i + 1} 마지막 위치 · X ${p.x}, Y ${p.y}, Z ${p.z} cm`; };
      svg.append(c);
    });
  }

  function focus(list) {
    if (!list.length) return;
    const xs = list.map(p => p[0]), ys = list.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const span = Math.max(x1 - x0, y1 - y0, 8);
    window.SFMap.focus((x0+x1)/2000,(y0+y1)/2000,Math.min(16,800/span));
  }

  // 사이드 패널
  window.addEventListener('mapviewchange', draw);
  $('zoom').max = 40;
  const zoomInput = $('zoom').oninput;
  $('zoom').oninput = () => { zoomInput(); if (typeof renderMap === 'function') renderMap(); draw(); };
  const box = document.createElement('div');
  box.className = 'savebox';
  box.innerHTML = `<div class="eyebrow">SAVE OVERLAY</div><h2>세이브 · ${S.name}</h2>
    <p class="small muted">${S.file}<br>저장 ${new Date(S.savedAt).toLocaleString('ko-KR')}${S.playHours != null ? ' · 플레이 ' + S.playHours + '시간' : ''}<br>건물 ${S.buildings.length} · 벨트/파이프 ${S.belts.length} · 전선 ${S.wires.length}</p>
    <label>기지로 이동<select id="saveBase"></select></label><button id="saveFocusPlayer">플레이어 위치로</button>
    <div id="saveToggles"></div><label>건물 찾기<select id="saveClass"><option value="">강조 없음</option></select></label>
    <p class="small muted">세이브가 바뀌면 refresh-save.cmd를 실행한 뒤 새로고침하세요.</p>`;
  $('markerList').before(box);
  const check = (label, val, fn, color) => {
    const l = document.createElement('label'), i = document.createElement('input'), s = document.createElement('span');
    l.className = 'savecheck'; i.type = 'checkbox'; i.checked = val; i.onchange = () => { fn(i.checked); draw(); };
    s.textContent = label; if (color) l.style.setProperty('--dot', color); l.append(i, s); $('saveToggles').append(l);
  };
  check('세이브 표시', on, v => on = v);
  check(`벨트·파이프 ${S.belts.length}`, showBelts, v => showBelts = v, '#e9eef5');
  check(`전선 ${S.wires.length}`, showWires, v => showWires = v, '#ffe066');
  const per = {}; for (const b of S.buildings) { const k = kindOf(b.c); per[k] = (per[k] || 0) + 1; }
  for (const [k, [label, color]] of Object.entries(kinds)) if (per[k]) check(`${label} ${per[k]}`, show[k], v => show[k] = v, color);
  const perClass = {}; for (const b of S.buildings) perClass[b.c] = (perClass[b.c] || 0) + 1;
  for (const [c, n] of Object.entries(perClass).sort((a, b) => b[1] - a[1])) { const o = document.createElement('option'); o.value = c; o.textContent = `${c} × ${n}`; $('saveClass').append(o); }
  $('saveClass').onchange = () => { focusClass = $('saveClass').value; draw(); if (focusClass) focus(S.buildings.filter(b => b.c === focusClass).map(b => P(b.x, b.y))); };
  // 300m 안에 이어진 건물끼리 한 기지로 묶는다
  const bases = [], seen = new Set();
  for (let i = 0; i < S.buildings.length; i++) {
    if (seen.has(i)) continue;
    const group = [i], q = [i]; seen.add(i);
    while (q.length) { const a = S.buildings[q.pop()]; S.buildings.forEach((b, j) => { if (!seen.has(j) && Math.hypot(a.x - b.x, a.y - b.y) < 30000) { seen.add(j); group.push(j); q.push(j); } }); }
    bases.push(group.map(j => S.buildings[j]));
  }
  bases.sort((a, b) => b.length - a.length);
  bases.forEach((g, i) => { const o = document.createElement('option'); o.value = i; const c = g.filter(b => kindOf(b.c) === 'production').length; o.textContent = `기지 ${i + 1} · 건물 ${g.length}${c ? ' · 생산 ' + c : ''}`; $('saveBase').append(o); });
  const all = document.createElement('option'); all.value = 'all'; all.textContent = '전체 건물'; $('saveBase').append(all);
  $('saveBase').onchange = () => focus(($('saveBase').value === 'all' ? S.buildings : bases[$('saveBase').value]).map(b => P(b.x, b.y)));
  $('saveFocusPlayer').onclick = () => focus(S.players.map(p => P(p.x, p.y)));
  draw();
  let first = false;
  $('mapTab').addEventListener('click', () => { if (first) { first = false; setTimeout(() => $('saveBase').onchange(), 50); } });
})();
