/* NEXT STAGE 음향 · 조명 콘티 (큐별 매트릭스, 조명 색 콘티, 호출 체인, 장비 요약) */
(function(){
var NS=window.NS,D=NS.D,C=D.cues,ST=NS.ST,CT=NS.conti,N=C.length;
var LC={'P':['#f5deb3'],'V1':['#111111'],'MC1':['#fff3d6'],'1':['#f6c343','#e08a00'],'MC2':['#fff3d6'],'2':['#2f6bff','#8a4bff'],'MC3':['#fff3d6'],'3':['#ff9f1c','#ff6a00'],'4':['#eaf4ff','#9ecbff'],'5':['#ff5fa2','#ffd23f'],'MC4':['#fff3d6'],'6':['#ff2fd1','#00d5ff'],'7':['#0a2a8a','#ffffff'],'8':['#ff4d4d','#3fa9ff','#ffd23f'],'MC5':['#fff3d6','#111111'],'V2':['#111111'],'9':['#d62828','#f5c542'],'10':['#1f4fd1','#ffffff'],'MC6':['#fff3d6'],'11':['#e01f1f','#ffffff'],'MC7':['#fff3d6'],'12':['#ffc8dd','#bde0fe','#caffbf'],'13':['#ffd23f','#ff2fd1'],'V3':['#111111'],'14':['#ffe9a8','#ffffff'],'MC8':['#ffffff','#ffe9a8']};
function grad(a){return a.length===1?a[0]:'linear-gradient(90deg,'+a.join(',')+')';}
function pl(c,g){var s=ST[c.code];return s&&s.play&&s.play.indexOf(g)>=0;}
function pr(c,g){var s=ST[c.code];return s&&s.present&&s.present.indexOf(g)>=0;}
function has(c,k){return c.mics.some(function(m){return String(m).indexOf(k)>=0;});}
function num(c,re){var r='';c.mics.forEach(function(m){var x=String(m).match(re);if(x)r=x[1];});return r;}
/* 마이크 · 음원 매트릭스 */
var ROWS=[
 ['사회자 무선',function(c){return c.kind==='mc'?['on','']:null;}],
 ['무선 핸드 (보컬)',function(c){var n=num(c,/보컬 무선 (\d)/);return n?['on',n]:null;}],
 ['보컬 스탠드 마이크',function(c){return has(c,'보컬 스탠드')?['on','1']:null;}],
 ['코러스 스탠드 ×4',function(c){var n=num(c,/\((\d)명\)/);return has(c,'코러스 스탠드')?['on',n]:null;}],
 ['앙상블 14명 (구성 확인)',function(c){return has(c,'앙상블')?['u','14']:null;}],
 ['풍물 4인 (마이크 확인)',function(c){return has(c,'풍물')?['u','4']:null;}],
 ['국악기 마이킹',function(c){return (pl(c,'gugak_center')||pl(c,'gugak_back'))?['on','']:((pr(c,'gugak_center')||pr(c,'gugak_back'))?['off','']:null);}],
 ['밴드 (건반 · 기타 · 베이스)',function(c){return pl(c,'band')?['on','']:(pr(c,'band')?['off','']:null);}],
 ['드럼',function(c){return pl(c,'drums')?['on','']:(pr(c,'drums')?['off','']:null);}],
 ['모둠북 · 타악',function(c){return pl(c,'perc')?['on','']:null;}],
 ['스트링 10인',function(c){return pl(c,'strings')?['on','']:(pr(c,'strings')?['off','']:null);}],
 ['영상 음원 L/R',function(c){return c.kind==='video'?['on','']:null;}],
 ['하우스 BGM · 안내방송',function(c){return c.kind==='pre'?['on','']:null;}]
];
NS.sl={};var SL=NS.sl;
SL.matrix=function(){
 var W=1250,lx=230,cw=38,ch=32,top=110,H=top+ROWS.length*(ch+4)+90;
 var o='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif" role="img"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
 o+='<text x="24" y="32" font-size="20" font-weight="700" fill="#1d1d1f">음향 마이크 · 음원 매트릭스 (MIC PLOT)</text><text x="24" y="54" font-size="12.5" fill="#6e6e73">가로: 공연 큐 순서 · 세로: 입력 소스. 검정 원은 사용, 빈 원은 대기(자리에 있으나 연주하지 않음), 주황 ?는 구성 확인 필요입니다. 원 안 숫자는 수량 또는 인원</text>';
 var TC={song:'#1d1d1f',mc:'#0071e3',video:'#8944ab',pre:'#8e8e93'};
 C.forEach(function(c,i){var x=lx+i*cw;o+='<rect x="'+x+'" y="'+(top-32)+'" width="'+(cw-3)+'" height="24" rx="5" fill="'+TC[c.kind]+'"/><text x="'+(x+(cw-3)/2)+'" y="'+(top-15)+'" font-size="'+(c.code.length>2?9:11)+'" font-weight="700" fill="#fff" text-anchor="middle">'+(c.kind==='mc'?'사'+c.mc:c.code)+'</text>';});
 ROWS.forEach(function(r,k){var y=top+k*(ch+4);o+=(k%2?'<rect x="24" y="'+y+'" width="'+(lx+N*cw-24)+'" height="'+ch+'" fill="#fafafc"/>':'')+'<text x="'+(lx-12)+'" y="'+(y+ch/2+4)+'" font-size="13" font-weight="700" fill="#1d1d1f" text-anchor="end">'+r[0]+'</text>';
  C.forEach(function(c,i){var v=r[1](c);if(!v)return;var cx=lx+i*cw+(cw-3)/2,cy=y+ch/2;
   if(v[0]==='on')o+='<circle cx="'+cx+'" cy="'+cy+'" r="11" fill="#1d1d1f"/>'+(v[1]?'<text x="'+cx+'" y="'+(cy+4)+'" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">'+v[1]+'</text>':'');
   else if(v[0]==='off')o+='<circle cx="'+cx+'" cy="'+cy+'" r="10" fill="none" stroke="#9a9aa0" stroke-width="1.6"/>';
   else o+='<circle cx="'+cx+'" cy="'+cy+'" r="11" fill="#fff" stroke="#c93400" stroke-width="1.8" stroke-dasharray="3 2"/><text x="'+cx+'" y="'+(cy+4)+'" font-size="10.5" font-weight="700" fill="#c93400" text-anchor="middle">'+v[1]+'</text>';});});
 // 동시 사용 무선 수 (하단)
 var by=top+ROWS.length*(ch+4)+14;o+='<text x="'+(lx-12)+'" y="'+(by+4)+'" font-size="12.5" font-weight="700" fill="#0071e3" text-anchor="end">동시 무선 (보컬 + 사회)</text>';
 C.forEach(function(c,i){var n=+(num(c,/보컬 무선 (\d)/)||0)+(c.kind==='mc'?1:0);if(n)o+='<text x="'+(lx+i*cw+(cw-3)/2)+'" y="'+(by+4)+'" font-size="13" font-weight="700" fill="#0071e3" text-anchor="middle">'+n+'</text>';});
 o+='<text x="24" y="'+(H-14)+'" font-size="11.5" fill="#6e6e73">코러스는 스탠드 마이크 4개로 통일 (곡마다 2~4명 사용). 무선 마이크 최대 동시 사용은 보컬 2대(9 · 10번)입니다. 극장 보유 무선은 수신기 20 · 송신기 14 · 핸드 6 (2016년 자료)</text>';
 return o+'</svg>';
};
/* 조명 콘티 카드 */
SL.lightCards=function(){
 return C.map(function(c,i){var cols=LC[c.code]||['#eee'];var dark=(c.kind==='video'||c.code==='V1');
  var tag=c.kind==='song'?'곡 '+c.code:(c.kind==='mc'?'사회 '+c.mc:(c.kind==='video'?'영상 '+c.code:'입장'));
  return '<article class="lcard"><div class="lsw" style="background:'+grad(cols)+'"><span class="ck" style="'+(dark?'color:#fff':'')+'">'+tag+'</span>'+(c.scrim==='down'?'<span class="lsc">샤막↓ 전면 차단</span>':'')+'</div><div class="lb"><b>'+c.title+'</b><p class="lt">'+c.light+'</p><p class="ls">영상 · '+c.visual+'</p><p class="lc">호출 · '+c.call+'</p></div></article>';}).join('');
};
/* 조명 컬러 스트립(한 장 요약) */
SL.strip=function(){
 var W=1250,cw=46,H=170,lx=24;
 var o='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif" role="img"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
 o+='<text x="24" y="30" font-size="18" font-weight="700" fill="#1d1d1f">조명 색 흐름 (LIGHT CONCEPT STRIP)</text>';
 C.forEach(function(c,i){var x=lx+i*cw,cols=LC[c.code]||['#eee'],id='lg'+i;
  o+='<defs><linearGradient id="'+id+'" x1="0" x2="1">'+cols.map(function(k,j){return '<stop offset="'+(cols.length===1?0:j/(cols.length-1))+'" stop-color="'+k+'"/>';}).join('')+(cols.length===1?'<stop offset="1" stop-color="'+cols[0]+'"/>':'')+'</linearGradient></defs>';
  o+='<rect x="'+x+'" y="48" width="'+(cw-3)+'" height="72" rx="6" fill="url(#'+id+')" stroke="#d2d2d7"/>';
  o+='<text x="'+(x+(cw-3)/2)+'" y="140" font-size="'+(c.code.length>2?9.5:11)+'" font-weight="700" fill="#1d1d1f" text-anchor="middle">'+(c.kind==='mc'?'사'+c.mc:c.code)+'</text>';
  if(c.scrim==='down')o+='<rect x="'+x+'" y="124" width="'+(cw-3)+'" height="4" rx="2" fill="#8944ab"/>';});
 o+='<text x="24" y="162" font-size="11.5" fill="#6e6e73">보라 선: 샤막 하강 구간(전면 조명 차단). 사회 큐는 모두 핀스팟(웜 화이트)입니다. 색은 큐시트의 조명 문구를 색 칩으로 옮긴 것이며 실제 컬러 값은 조명 감독이 확정합니다</text>';
 return o+'</svg>';
};
/* 큐별 음향 · 조명 콘티표 */
SL.table=function(){
 return '<thead><tr><th>큐</th><th>프로그램</th><th>음향 (마이크 · 믹싱)</th><th>조명</th><th>영상 · 샤막</th><th>호출</th></tr></thead><tbody>'+C.map(function(c){var mk=c.mics.length?c.mics.join(' · '):'—';return '<tr><td>'+c.code+'</td><td>'+c.title+'</td><td><b style="color:var(--ink);font-weight:600">'+mk+'</b><br>'+c.audio+'</td><td>'+c.light+'</td><td>'+c.visual+' · '+(c.scrim==='down'?'샤막 내림':'샤막 올림')+'</td><td>'+c.call+'</td></tr>';}).join('')+'</tbody>';};
/* 호출 체인 */
SL.chain=function(){
 return '<thead><tr><th>큐</th><th>호출 (GO)</th><th>다음 큐</th><th>전환 성격</th><th>예상 시간</th></tr></thead><tbody>'+C.map(function(c,i){var n=C[i+1];var tr=c.direct?'<span class="tag red">무지연 연결</span>':(c.kind==='video'&&n&&n.kind==='song'?'<span class="tag purple">영상 직결</span>':(c.kind==='song'?'박수 후 사회':(c.kind==='mc'?'MC OUT 후 시작':'—')));return '<tr><td>'+c.code+' '+c.title+'</td><td>'+c.call+'</td><td>'+(n?n.code+' '+n.title:'공연 종료')+'</td><td>'+tr+'</td><td>'+(c.est||'실측 후 확정')+'</td></tr>';}).join('')+'</tbody>';};
/* 장비 · 수량 요약 */
SL.summary=function(){
 var down=C.filter(function(c){return c.scrim==='down';}).length,mcn=C.filter(function(c){return c.kind==='mc';}).length,songs=C.filter(function(c){return c.kind==='song';}).length,vids=C.filter(function(c){return c.kind==='video';}).length;
 var chains=C.filter(function(c){return c.direct;}).length;
 return {down:down,mc:mcn,songs:songs,vids:vids,chains:chains};};
})();
