/* NEXT STAGE 콘티: 백스테이지 입퇴장 동선, 음향 · 조명 콘티
   출연자별 상태를 한 곳(SWIM)에 정의하고, 타임라인 · 큐별 콘티 카드 · 윙 동선표가 모두 여기서 만들어진다.
   상태 코드: . 무대 밖  L SL 윙 대기  R SR 윙 대기  W 양쪽 윙 대기  S 무대 위  M 무대 위에서 이동  U 미확정(자료 비어 있음) */
(function(){
var NS=window.NS,D=NS.D,C=D.cues,ST=NS.ST;
var N=C.length; // 26
var IDX={};C.forEach(function(c,i){IDX[c.code]=i;});
function row(def){var a=[];for(var i=0;i<N;i++)a.push('.');for(var k in def){a[+k]=def[k];}return a.join('');}
function rng(ch,from,to){var d={};for(var i=from;i<=to;i++)d[i]=ch;return d;}
function mrg(){var o={};for(var i=0;i<arguments.length;i++)for(var k in arguments[i])o[k]=arguments[i][k];return o;}
var SWIM=[
 {n:'사회자',g:'mc',c:'#0071e3',cells:row({1:'R',2:'S',3:'R',4:'S',5:'L',6:'S',9:'R',10:'S',13:'R',14:'S',17:'R',18:'S',19:'L',20:'S',24:'R',25:'S'})},
 {n:'국악기 5인',g:'gu',c:'#c93400',cells:row(mrg(rng('S',1,3),{4:'M'},rng('S',5,25)))},
 {n:'밴드 · 드럼 · 스트링 · 타악',g:'fx',c:'#8e8e93',cells:row(rng('S',1,25)),fixed:true},
 {n:'신한비',g:'vo',c:'#1d1d1f',cells:row({5:'L',6:'L',7:'S',16:'L',17:'S'})},
 {n:'박민규',g:'vo',c:'#1d1d1f',cells:row({7:'L',8:'S'})},
 {n:'임지륜',g:'vo',c:'#1d1d1f',cells:row({8:'R',9:'S'})},
 {n:'김가희',g:'vo',c:'#1d1d1f',cells:row({10:'L',11:'S',16:'L',17:'S'})},
 {n:'주권기',g:'vo',c:'#1d1d1f',cells:row({11:'L',12:'S'})},
 {n:'강산',g:'vo',c:'#1d1d1f',cells:row({12:'R',13:'S'})},
 {n:'박설온',g:'vo',c:'#1d1d1f',cells:row({14:'L',15:'L',16:'S'})},
 {n:'김영수',g:'vo',c:'#1d1d1f',cells:row({14:'R',15:'R',16:'S'})},
 {n:'코러스 2~4명',g:'ch',c:'#6e6e73',cells:row({7:'S',8:'S',9:'S',11:'S',13:'S',16:'S',17:'S'}),note:'2단 좌측 4석 · 입퇴장 확인'},
 {n:'보컬 앙상블 14명',g:'en',c:'#1d1d1f',cells:row({20:'W',21:'S',22:'S',23:'W',24:'S',25:'S'})},
 {n:'풍물 4인',g:'pm',c:'#8944ab',cells:row({23:'W',24:'S',25:'S'})}
];
var EXITS={'신한비':{7:'SR',17:'SL'},'박민규':{8:'SL'},'임지륜':{9:'SR'},'김가희':{11:'SR',17:'SL'},'주권기':{12:'SL'},'강산':{13:'윙'},'박설온':{16:'윙'},'김영수':{16:'SR'},'보컬 앙상블 14명':{22:'SL·SR'},'사회자':{}};
SWIM.forEach(function(p){if(p.cells.length!==N)throw new Error('SWIM 길이 오류: '+p.n+' '+p.cells.length);});
var SIDE={L:'SL',R:'SR',W:'SL·SR'};
function st(p,i){return (i<0||i>=N)?'.':p.cells[i];}
function onS(ch){return ch==='S'||ch==='M';}
function wing(ch){return ch==='L'||ch==='R'||ch==='W';}
/* 큐 i 의 입장 · 퇴장 · 대기 목록 */
function moves(i){var inn=[],out=[],wt=[],on=[];
 SWIM.forEach(function(p){if(p.fixed)return;var cur=st(p,i),prev=st(p,i-1),next=st(p,i+1);
  if(onS(cur)&&wing(prev))inn.push({n:p.n,side:SIDE[prev],p:p});
  if(onS(cur)&&next==='.'&&i<N-1)out.push({n:p.n,side:(EXITS[p.n]||{})[i]||'윙',p:p});
  if(wing(cur))wt.push({n:p.n,side:SIDE[cur],p:p});
  if(onS(cur)||cur==='U')on.push(p.n);});
 return {in:inn,out:out,wait:wt,on:on};}
/* ---------- 출연자 동선 타임라인 ---------- */
NS.conti={};var CT=NS.conti;
var TCOL={song:'#1d1d1f',mc:'#0071e3',video:'#8944ab',pre:'#8e8e93'};
CT.timeline=function(){
 var W=1250,lx=190,cw=39,ch=34,top=96,H=top+SWIM.length*(ch+6)+110;
 var o='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif" role="img"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
 o+='<text x="24" y="32" font-size="20" font-weight="700" fill="#1d1d1f">출연자 입퇴장 타임라인 (SWIMLANE)</text><text x="24" y="54" font-size="12.5" fill="#6e6e73">가로: 공연 큐 순서 · 세로: 출연자. 검정 막대는 무대 위, 회색은 윙 대기(SL · SR), 초록 화살표는 입장, 붉은 화살표는 퇴장입니다</text>';
 // 헤더
 C.forEach(function(c,i){var x=lx+i*cw,col=TCOL[c.kind]||'#999';
  o+='<rect x="'+x+'" y="'+(top-30)+'" width="'+(cw-3)+'" height="24" rx="5" fill="'+col+'"/><text x="'+(x+(cw-3)/2)+'" y="'+(top-13)+'" font-size="'+(c.code.length>2?9:11)+'" font-weight="700" fill="#fff" text-anchor="middle">'+(c.kind==='mc'?'사'+c.mc:c.kind==='video'?c.code:c.code)+'</text>';});
 // 무지연 구간 표시
 var chains=[[7,9],[11,13],[15,17],[21,22],[23,24]];
 chains.forEach(function(r){var x=lx+r[0]*cw-2,w=(r[1]-r[0]+1)*cw+1;o+='<rect x="'+x+'" y="'+(top-34)+'" width="'+w+'" height="'+(SWIM.length*(ch+6)+40)+'" rx="10" fill="none" stroke="#d70015" stroke-width="1.4" stroke-dasharray="5 4"/>';});
 SWIM.forEach(function(p,r){var y=top+r*(ch+6);
  o+='<text x="'+(lx-12)+'" y="'+(y+ch/2+4)+'" font-size="13" font-weight="700" fill="#1d1d1f" text-anchor="end">'+p.n+'</text>';
  o+='<line x1="'+lx+'" y1="'+(y+ch/2)+'" x2="'+(lx+N*cw-3)+'" y2="'+(y+ch/2)+'" stroke="#ececef"/>';
  for(var i=0;i<N;i++){var ch0=st(p,i),x=lx+i*cw,w=cw-3;
   if(ch0==='S'||ch0==='M'){o+='<rect x="'+x+'" y="'+(y+3)+'" width="'+w+'" height="'+(ch-6)+'" rx="6" fill="'+(ch0==='M'?'#e08a00':(p.fixed?'#c9c9ce':p.c))+'"/>';if(ch0==='M')o+='<text x="'+(x+w/2)+'" y="'+(y+ch/2+4)+'" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">이동</text>';}
   else if(wing(ch0)){o+='<rect x="'+x+'" y="'+(y+6)+'" width="'+w+'" height="'+(ch-12)+'" rx="5" fill="#e5e5ea"/><text x="'+(x+w/2)+'" y="'+(y+ch/2+3.5)+'" font-size="9.5" font-weight="700" fill="#6e6e73" text-anchor="middle">'+(ch0==='W'?'양쪽':SIDE[ch0])+'</text>';}
   else if(ch0==='U'){o+='<rect x="'+x+'" y="'+(y+3)+'" width="'+w+'" height="'+(ch-6)+'" rx="6" fill="#fff" stroke="#c93400" stroke-dasharray="3 2"/><text x="'+(x+w/2)+'" y="'+(y+ch/2+4)+'" font-size="11" font-weight="700" fill="#c93400" text-anchor="middle">?</text>';}
   // 입장 · 퇴장 화살표
   if(!p.fixed&&onS(ch0)&&wing(st(p,i-1))){o+='<path d="M'+(x-9)+' '+(y+ch/2)+' h8 m-4 -4 l4 4 l-4 4" stroke="#248a3d" stroke-width="2" fill="none"/>';}
   if(!p.fixed&&onS(ch0)&&st(p,i+1)==='.'&&i<N-1){var sd=(EXITS[p.n]||{})[i]||'윙';o+='<path d="M'+(x+w-4)+' '+(y+ch/2)+' h8 m-4 -4 l4 4 l-4 4" stroke="#d70015" stroke-width="2" fill="none"/>';if(sd&&sd!=='윙')o+='<text x="'+(x+w+4)+'" y="'+(y+9)+'" font-size="8" font-weight="700" fill="#d70015" text-anchor="middle">'+sd+'</text>';}
  }
  if(p.note)o+='<text x="'+(lx-12)+'" y="'+(y+ch/2+17)+'" font-size="10" fill="#c93400" text-anchor="end">'+p.note+'</text>';
 });
 var ly=H-40,lx0=24;
 [['#1d1d1f','무대 위'],['#e08a00','이동'],['#e5e5ea','윙 대기'],['#c9c9ce','고정 악기(착석)']].forEach(function(l){o+='<rect x="'+lx0+'" y="'+(ly-10)+'" width="16" height="14" rx="4" fill="'+l[0]+'"/><text x="'+(lx0+22)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73">'+l[1]+'</text>';lx0+=l[1].length*13+52;});
 o+='<path d="M'+lx0+' '+(ly-3)+' h10 m-5 -4 l5 4 l-5 4" stroke="#248a3d" stroke-width="2" fill="none"/><text x="'+(lx0+18)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73">입장</text>';lx0+=70;
 o+='<path d="M'+lx0+' '+(ly-3)+' h10 m-5 -4 l5 4 l-5 4" stroke="#d70015" stroke-width="2" fill="none"/><text x="'+(lx0+18)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73">퇴장 (방향 표기)</text>';lx0+=130;
 o+='<rect x="'+lx0+'" y="'+(ly-10)+'" width="22" height="14" rx="5" fill="none" stroke="#d70015" stroke-dasharray="4 3"/><text x="'+(lx0+28)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73">무지연 연결 구간</text>';
 return o+'</svg>';
};
/* ---------- 큐별 콘티 카드 ---------- */
var SC=40,OX=404,OY=624;
function PX(x){return OX+x*SC;} function PY(y){return OY-y*SC;}
function tgt(p,c,side){
 var n=p.n;
 if(p.g==='mc'){var w=c.wing||'';return [w.indexOf('센터')>=0?0:(w.indexOf('좌측')>=0?2.2:-2.2),0.55];}
 if(p.g==='vo'){if(c.vocals&&c.vocals.length===2){var k=c.vocals.indexOf(n);return [k===0?2.2:-2.2,1.9];}return [0,1.9];}
 if(p.g==='en')return [side==='SL'?3:-3,2.9];
 if(p.g==='pm')return [side==='SL'?5.5:-5.5,3.4];
 return [0,2.5];}
function arrow(id,x1,y1,x2,y2,col,w){return '<line x1="'+PX(x1)+'" y1="'+PY(y1)+'" x2="'+PX(x2)+'" y2="'+PY(y2)+'" stroke="'+col+'" stroke-width="'+(w||4)+'" marker-end="url(#'+id+')" opacity="0.95"/>';}
CT.frame=function(i){
 var c=C[i],m=moves(i),pre='a'+i;
 var base=NS.planSvg(c,{compact:true});
 var o='<defs><marker id="'+pre+'g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#248a3d"/></marker><marker id="'+pre+'r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#d70015"/></marker></defs>';
 // 윙 대기 표식
 var wl={SL:[],SR:[]};m.wait.forEach(function(w){if(w.side==='SL')wl.SL.push(w.n);else if(w.side==='SR')wl.SR.push(w.n);else{wl.SL.push(w.n);wl.SR.push(w.n);}});
 ['SL','SR'].forEach(function(sd){var x=sd==='SL'?8.6:-8.6;wl[sd].slice(0,4).forEach(function(nm,k){o+='<g><rect x="'+(PX(x)-34)+'" y="'+(PY(6.2-k*1.2)-12)+'" width="68" height="22" rx="11" fill="#e5e5ea" stroke="#9a9aa0"/><text x="'+PX(x)+'" y="'+(PY(6.2-k*1.2)+4)+'" font-size="12" font-weight="700" fill="#3a3a3c" text-anchor="middle">'+(nm.length>6?nm.slice(0,6):nm)+'</text></g>';});});
 // 입장 · 퇴장 화살표
 m.in.forEach(function(e){var side=e.side==='SL·SR'?['SL','SR']:[e.side];side.forEach(function(sd){var t=tgt(e.p,c,sd),sx=sd==='SL'?8.2:-8.2;o+=arrow(pre+'g',sx,Math.max(t[1],1.2),t[0]+(sd==='SL'?0.6:-0.6),t[1],'#248a3d',5);});});
 m.out.forEach(function(e){var sd=e.side==='SL·SR'?['SL','SR']:[e.side==='SL'?'SL':(e.side==='SR'?'SR':(e.p.g==='mc'?'SR':'SL'))];sd.forEach(function(s2){var t=tgt(e.p,c,s2),ex=s2==='SL'?8.2:-8.2;o+=arrow(pre+'r',t[0]+(s2==='SL'?0.6:-0.6),t[1],ex,Math.max(t[1],1.2)+0.9,'#d70015',4);});});
 return base.replace(/<\/svg>\s*$/,o+'</svg>');
};
CT.cardHtml=function(i){
 var c=C[i],m=moves(i);function nm(a){return a.map(function(e){return e.n+(e.side?' ('+e.side+')':'');}).join(' · ');}
 var kind=c.kind==='song'?'곡 '+c.code:(c.kind==='mc'?'사회 '+c.mc:(c.kind==='video'?'영상 '+c.code:'입장'));
 var wl=m.wait.length?m.wait.map(function(w){return w.n+' ('+w.side+')';}).join(' · '):'';
 var L=[];
 if(c.kind==='video'&&c.code==='V1')L.push(['입장','밴드 · 드럼 · 스트링 · 국악기 5인이 어둠 속에서 SL · SR 윙으로 입장해 착석']);
 if(m.in.length)L.push(['입장',nm(m.in)]);
 if(m.out.length)L.push(['퇴장',m.out.map(function(e){return e.n+' (→'+e.side+')';}).join(' · ')]);
 if(wl)L.push(['윙 대기',wl]);
 if(c.code==='MC2')L.push(['이동','국악기 5인 중앙 → 2단 우측 4인 (모둠북은 3단) · 돗자리 회수 확인']);
 if(!L.length)L.push(['무대','입퇴장 없음 (고정 악기 연주)']);
 var mk=c.mics.length?c.mics.join(' · '):'—';
 var cls=['song','mc','video','pre'].indexOf(c.kind);
 return '<article class="cframe k-'+c.kind+'"><header><span class="ck">'+kind+'</span><b>'+c.title+'</b>'+(c.direct?'<span class="tag red">무지연</span>':'')+(c.scrim==='down'?'<span class="tag purple">샤막↓</span>':'')+'</header><div class="csvg">'+CT.frame(i)+'</div><dl>'+L.map(function(r){return '<div><dt>'+r[0]+'</dt><dd>'+r[1]+'</dd></div>';}).join('')+'<div class="aux"><dt>음향</dt><dd>'+mk+'</dd></div><div class="aux"><dt>조명</dt><dd>'+c.light+'</dd></div><div class="aux"><dt>호출</dt><dd>'+c.call+'</dd></div></dl></article>';
};
CT.groups=[['A · 오프닝 · 산조 · 밴드',0,6],['B · 보컬 3곡 연속 두 구간',7,14],['C · 중간 영상 · 듀엣 · 타악 협주',15,20],['D · 피날레',21,25]];
/* ---------- 윙 동선표 ---------- */
CT.wingTable=function(){
 var h='<thead><tr><th>큐</th><th>SL 윙 대기</th><th>무대 위 (이동 출연자)</th><th>SR 윙 대기</th><th>입장</th><th>퇴장</th></tr></thead><tbody>';
 C.forEach(function(c,i){var m=moves(i),sl=[],sr=[];m.wait.forEach(function(w){if(w.side==='SL'||w.side==='SL·SR')sl.push(w.n);if(w.side==='SR'||w.side==='SL·SR')sr.push(w.n);});
  h+='<tr><td>'+c.code+' '+c.title+'</td><td>'+(sl.join(' · ')||'—')+'</td><td>'+(m.on.join(' · ')||'—')+'</td><td>'+(sr.join(' · ')||'—')+'</td><td>'+(m.in.map(function(e){return e.n+' ('+e.side+')';}).join(' · ')||'—')+'</td><td>'+(m.out.map(function(e){return e.n+' (→'+e.side+')';}).join(' · ')||'—')+'</td></tr>';});
 return h+'</tbody>';};
CT.moves=moves;
})();
