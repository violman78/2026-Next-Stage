
(function(){
var D=window.NS_DATA, KEY='ns_state_v2';
var PAGES=[['index.html','홈'],['1-ops.html','공연 운영'],['2-mc-script.html','사회자 대본'],['3-mic-plan.html','무선 마이크'],['4-video-light.html','영상과 조명'],['5-backstage.html','백스테이지'],['6-site-prep.html','현장 준비'],['7-checklist.html','실행 체크리스트'],['8-cast-sheet.html','순서별 출연자'],['9-venue-notes.html','극장 스탭회의'],['10-stage-plot.html','무대 배치도'],['11-seat-zones.html','좌석 구역'],['12-drawing-set.html','무대 도면 세트'],['13-conti-movement.html','입퇴장 콘티'],['14-conti-sound-light.html','음향 · 조명 콘티']];
var S={idx:0,status:'STANDBY',elapsed:0,checks:{}};
try{var r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r));}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var GROUPS=[['홈',[0]],['공연 운영',[1,2,13,14,8]],['무대',[10,12,5,11,9]],['음향 · 영상 · 조명',[3,4]],['현장 준비',[6,7]]];
function chrome(active){
  var gi=0;GROUPS.forEach(function(g,k){if(g[1].indexOf(active)>=0)gi=k;});
  var top=GROUPS.map(function(g,k){return '<a class="tab '+(k===gi?'on':'')+'" href="'+PAGES[g[1][0]][0]+'">'+g[0]+'</a>';}).join('');
  var sub=gi===0?'':GROUPS[gi][1].map(function(pi){return '<a class="stab '+(pi===active?'on':'')+'" href="'+PAGES[pi][0]+'">'+PAGES[pi][1]+'</a>';}).join('');
  var c0=D.cues[S.idx]||D.cues[0];
  document.getElementById('chrome').innerHTML='<header class="gnav"><div class="wrap"><a class="brand" href="index.html">NEXT STAGE</a><nav class="tabs" aria-label="영역">'+top+'</nav><a class="cuebadge" href="1-ops.html" title="현재 큐로 이동"><i id="gdot"></i><span>현재 큐 <b id="gcue">'+c0.code+' '+c0.title+'</b></span></a><span class="fsz" aria-label="글자 크기"><button data-z="-1" title="글자 작게">A−</button><button data-z="1" title="글자 크게">A+</button></span><span class="clock">진행 <b id="gclock">'+fmt(S.elapsed)+'</b></span></div>'+(sub?'<div class="gsub"><div class="wrap">'+sub+'</div></div>':'')+'</header>';
  document.documentElement.style.setProperty('--navh',sub?'97px':'52px');
  [].forEach.call(document.querySelectorAll('.fsz button'),function(bt){bt.addEventListener('click',function(){zi=Math.max(0,Math.min(ZS.length-1,zi+(+bt.dataset.z)));try{localStorage.setItem('ns_zoom2',zi);}catch(e){}applyZ();});});applyZ();
  var f=document.getElementById('foot'); if(f)f.innerHTML='<footer><div class="wrap"><span>국립목포대학교 공연음악과 · 전남앵커 공연음악 인력양성 프로젝트</span><span>최종 반영본 2026.10.06</span></div></footer>';
  function tick(){ if(S.status==='LIVE'){S.elapsed++;save();} var c=document.getElementById('gclock'); if(c)c.textContent=fmt(S.elapsed); var q=D.cues[S.idx]||D.cues[0],g=document.getElementById('gcue'); if(g)g.textContent=q.code+' '+q.title; var dt=document.getElementById('gdot'); if(dt)dt.className=S.status; }
  setInterval(tick,1000);tick();
}
var ZS=[0.8,0.9,1,1.1,1.2,1.3],zi=2;try{var zs=localStorage.getItem('ns_zoom2');if(zs!==null)zi=Math.max(0,Math.min(5,+zs));}catch(e){}
function applyZ(){var a=document.getElementById('app');if(a)a.style.zoom=ZS[zi];}
function tabs(){
 var panes=[].slice.call(document.querySelectorAll('.tabpane'));if(panes.length<2)return;
 var key='ns_tab_'+location.pathname.split('/').pop(),cur=0;
 var m=location.hash.match(/t=(\d+)/);if(m)cur=+m[1];
 if(cur>=panes.length)cur=0;
 var nav=document.createElement('div');nav.className='subnav noprint';nav.setAttribute('role','tablist');
 nav.innerHTML=panes.map(function(p,i){return '<button class="chipbtn" role="tab" data-i="'+i+'">'+p.getAttribute('data-tab')+'</button>';}).join('')+'<button class="chipbtn all" data-all="1">전체 보기</button>';
 panes[0].parentNode.insertBefore(nav,panes[0]);
 function show(i,all){panes.forEach(function(p,k){p.hidden=!(all||k===i);});[].forEach.call(nav.children,function(c){var on=c.dataset.all?all:(!all&&+c.dataset.i===i);c.classList.toggle('on',!!on);});if(!all){cur=i;}}
 nav.addEventListener('click',function(e){var c=e.target.closest('button');if(!c)return;e.stopPropagation();if(c.dataset.all)show(0,true);else{show(+c.dataset.i,false);window.scrollTo({top:0,behavior:'smooth'});}});
 show(cur,false);
}
window.NS={D:D,S:S,tabs:tabs,applyZ:applyZ,save:save,fmt:fmt,esc:esc,chrome:chrome,PAGES:PAGES,
  head:function(eyebrow,title,desc){return '<div class="pagehead"><p class="eyebrow">'+eyebrow+'</p><h1>'+title+'</h1><p>'+desc+'</p></div>';}};
window.NS.stageSvg=function(c){
 var cen=c.layout==='center';
 var o='<svg viewBox="0 0 850 440" role="img" aria-label="무대 평면도">';
 o+='<rect x="50" y="15" width="310" height="62" rx="10" fill="#f5f5f7" stroke="#d2d2d7"/><text x="205" y="51" text-anchor="middle" fill="#1d1d1f" font-size="13" font-weight="600">밴드 (건반 2 · 기타 · 베이스)</text>';
 o+='<rect x="490" y="15" width="310" height="62" rx="10" fill="#f5f5f7" stroke="#d2d2d7"/><text x="645" y="51" text-anchor="middle" fill="#1d1d1f" font-size="13" font-weight="600">드럼 오준혁 · 모둠북 최지민</text>';
 o+='<rect x="180" y="90" width="200" height="56" rx="10" fill="#e8f2ff" stroke="#b9d8fb"/><text x="280" y="123" text-anchor="middle" fill="#0071e3" font-size="12" font-weight="600">스트링 10인 (좌)</text>';
 o+='<rect x="470" y="90" width="200" height="56" rx="10" fill="#e8f2ff" stroke="#b9d8fb"/><text x="570" y="123" text-anchor="middle" fill="#0071e3" font-size="12" font-weight="600">스트링 10인 (우)</text>';
 if(!cen){o+='<rect x="690" y="90" width="130" height="56" rx="10" fill="#fff0e0" stroke="#f6d3a8"/><text x="755" y="122" text-anchor="middle" fill="#c93400" font-size="12" font-weight="600">국악기 (후방)</text>';}
 var sc=c.scrim==='down';
 o+='<rect x="20" y="160" width="810" height="18" rx="9" fill="'+(sc?'#f3e8f9':'#f5f5f7')+'" stroke="'+(sc?'#d9b8ea':'#d2d2d7')+'"/><text x="425" y="173" text-anchor="middle" fill="'+(sc?'#8944ab':'#86868b')+'" font-size="10" font-weight="600">'+(sc?'샤막 내림 · 영상 영사 (전면 조명 차단)':'샤막 올림 · 후방 스크린')+'</text>';
 if(cen)o+='<rect x="300" y="200" width="250" height="90" rx="14" fill="#fff0e0" stroke="#c93400" stroke-dasharray="4 4"/><text x="425" y="240" text-anchor="middle" fill="#c93400" font-size="14" font-weight="700">국악기 중앙 배치</text><text x="425" y="262" text-anchor="middle" fill="#c93400" font-size="11">가야금 · 아쟁 · 대금 · 피리 · 모둠북</text>';
 o+='<rect x="395" y="300" width="60" height="110" rx="8" fill="#ffe8ea" stroke="#f5b5bb" stroke-dasharray="4 4"/><text x="425" y="355" text-anchor="middle" fill="#d70015" font-size="10" font-weight="600" transform="rotate(-90 425 355)">통로 폐쇄</text>';
 o+='<rect x="15" y="200" width="100" height="200" rx="14" fill="#fff" stroke="#0071e3" stroke-dasharray="3 3"/><text x="65" y="240" text-anchor="middle" fill="#0071e3" font-size="13" font-weight="600">SL 윙</text>';
 o+='<rect x="735" y="200" width="100" height="200" rx="14" fill="#fff" stroke="#0071e3" stroke-dasharray="3 3"/><text x="785" y="240" text-anchor="middle" fill="#0071e3" font-size="13" font-weight="600">SR 윙</text>';
 var v=c.vocals||[];
 if(v[0])o+='<circle cx="270" cy="350" r="28" fill="#1d1d1f"/><text x="270" y="354" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">'+v[0]+'</text>';
 if(v[1])o+='<circle cx="580" cy="350" r="28" fill="#1d1d1f"/><text x="580" y="354" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">'+v[1]+'</text>';
 if(c.mics&&c.mics[0]==='ENS')o+='<rect x="190" y="320" width="470" height="60" rx="14" fill="#1d1d1f"/><text x="425" y="355" text-anchor="middle" fill="#fff" font-size="13" font-weight="600">보컬 앙상블 10인 이상</text>';
 if(c.code==='14')o+='<text x="65" y="300" text-anchor="middle" fill="#c93400" font-size="11" font-weight="600">풍물 2</text><text x="785" y="300" text-anchor="middle" fill="#c93400" font-size="11" font-weight="600">풍물 2</text>';
 if(c.kind==='mc')o+='<circle cx="'+(c.wing&&c.wing.indexOf('SL')===0?300:c.wing&&c.wing.indexOf('센터')>0?425:560)+'" cy="350" r="28" fill="#0071e3"/><text x="'+(c.wing&&c.wing.indexOf('SL')===0?300:c.wing&&c.wing.indexOf('센터')>0?425:560)+'" y="354" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">사회자</text>';
 return o+'</svg>';
};
})();
