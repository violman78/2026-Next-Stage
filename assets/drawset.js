/* NEXT STAGE 무대 도면 세트: 종단면 · 정면 · 축측 · 덧마루 구성 · 영사 · 수치 계산
   좌표: x(+)=SL, y(+)=무대 뒤(영점선 기준), z=무대 바닥 위 높이 (m). 수치 계산은 calc.js(NS_CALC)를 따른다 */
(function(){
var NS=window.NS,D=NS.D,K=window.NS_CALC,P=K.P,T=D.plan.tiers;
var FONT='font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif"';
function t(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||12)+'" font-weight="'+(o.w||500)+'" fill="'+(o.c||'#1d1d1f')+'" text-anchor="'+(o.a||'middle')+'"'+(o.r?' transform="rotate('+o.r+' '+x+' '+y+')"':'')+'>'+s+'</text>';}
function ln(x1,y1,x2,y2,o){o=o||{};return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(o.c||'#1d1d1f')+'" stroke-width="'+(o.w||1)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+'/>';}
function rc(x,y,w,h,o){o=o||{};return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(o.rx||0)+'" fill="'+(o.f||'none')+'" stroke="'+(o.s||'none')+'" stroke-width="'+(o.sw||1)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+(o.op?' opacity="'+o.op+'"':'')+'/>';}
function ci(x,y,r,o){o=o||{};return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(o.f||'none')+'" stroke="'+(o.s||'none')+'" stroke-width="'+(o.sw||1)+'"/>';}
function dimH(x1,x2,y,txt,o){o=o||{};return ln(x1,y,x2,y,{c:o.c||'#1d1d1f'})+ln(x1,y-5,x1,y+5,{c:o.c||'#1d1d1f'})+ln(x2,y-5,x2,y+5,{c:o.c||'#1d1d1f'})+t((x1+x2)/2,y-6,txt,{s:o.s||11,c:o.c||'#1d1d1f',w:600});}
function dimV(x,y1,y2,txt,o){o=o||{};return ln(x,y1,x,y2,{c:o.c||'#1d1d1f'})+ln(x-5,y1,x+5,y1,{c:o.c||'#1d1d1f'})+ln(x-5,y2,x+5,y2,{c:o.c||'#1d1d1f'})+t(x-7,(y1+y2)/2,txt,{s:o.s||11,c:o.c||'#1d1d1f',w:600,r:-90});}
function open(w,h){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" '+FONT+' xmlns:xlink="http://www.w3.org/1999/xlink" role="img">'+rc(0,0,w,h,{f:'#fff'});}
var D1={};NS.dwg=D1;

/* 사람 실루엣: 서 있는 사람(1.7m)과 앉은 사람 */
function fig(cx,base,kind,sc,col){var s=sc,c=col||'#3a3a3c';var hgt=kind==='sit'?1.25:1.7;
 var head=ci(cx,base-(hgt-0.12)*s,0.12*s,{f:c});
 var body=kind==='sit'?rc(cx-0.17*s,base-(hgt-0.26)*s,0.34*s,0.6*s,{f:c,rx:3})+rc(cx-0.17*s,base-0.5*s,0.5*s,0.1*s,{f:c,rx:2}):rc(cx-0.15*s,base-(hgt-0.26)*s,0.3*s,(hgt-0.26)*s,{f:c,rx:4});
 return head+body;}

/* 덧마루 30×3 내모임형 공통: 단 상면 높이 H·(k+1), 단 깊이 D, 중앙부 + 좌우 날개(th°) */
var GEO=NS.geo,RG=GEO.RG,GH=GEO.GH,tp=GEO.tp,HH=RG.H,TIER_F=['#ececef','#e2e2e6','#d6d6dc'];
function topz(k){return HH*(k+1);}
function slabPolys(k){var o=[],D0=RG.D;
 o.push({n:'C',p:[[-GH,RG.yF+k*D0],[GH,RG.yF+k*D0],[GH,RG.yF+(k+1)*D0],[-GH,RG.yF+(k+1)*D0]]});
 [-1,1].forEach(function(sg){var a=sg*GH,b=sg*(GH+RG.Lw);o.push({n:sg>0?'SL':'SR',p:[tp(a,k,0),tp(b,k,0),tp(b,k,D0),tp(a,k,D0)]});});
 return o;}

/* ---------- SP-02 종단면도 ---------- */
D1.section=function(){
 var s=66,ox=46,oy=735,W=1240,H=850,hp=K.hp;
 function X(y){return ox+(y+2.2)*s;} function Z(v){return oy-v*s;}
 var o=open(W,H);
 for(var m=0;m<=9;m++)o+=ln(X(-2.2),Z(m),X(15.6),Z(m),{c:'#ececef'})+t(ox-8,Z(m)+4,m+'m',{s:10,c:'#86868b',a:'end'});
 o+=ln(X(P.apron),Z(0),X(P.back_wall),Z(0),{w:3})+ln(X(P.apron),Z(0),X(P.apron),Z(-0.7),{w:2})+ln(X(-2.2),Z(-0.7),X(P.apron),Z(-0.7),{w:2})+t(X(-1.0),Z(-0.7)-8,'객석 바닥 −0.70m',{s:10,c:'#6e6e73'});
 o+=ln(X(P.back_wall),Z(0),X(P.back_wall),Z(9.6),{c:'#8e8e93',w:3})+t(X(P.back_wall)-4,Z(9.95),'뒷벽 15.40m',{s:10,c:'#6e6e73',a:'end'});
 o+=ln(X(0),Z(P.prosc_h),X(0),Z(9.8),{w:6})+t(X(0)-8,Z(9.0),'프로시니엄 상단 H8.2m',{s:10.5,a:'end'});
 D.plan.lines.forEach(function(l){var k=l[3],c=k==='light'?'#e08a00':(k==='cyc'?'#333':'#a1a1a6');o+='<path d="M'+X(l[2])+' '+Z(9.75)+' l-4 -8 l8 0z" fill="'+c+'"/>'+t(X(l[2]),Z(9.75)-12,l[0]>0?l[0]:'',{s:8,c:c});});
 o+=t(X(6.5),Z(9.75)-28,'라인셋 번호 (주황: 조명봉)',{s:9,c:'#86868b'});
 o+=ln(X(P.cyc),Z(0),X(P.cyc),Z(8.8),{c:'#333',w:3})+t(X(P.cyc)-6,Z(8.1),'하늘막 12.93m',{s:10,c:'#333',a:'end'})+ln(X(P.black),Z(0),X(P.black),Z(8.8),{c:'#9a9aa0',w:5})+t(X(P.black)+6,Z(8.1),'화이트막 13.70m',{s:10,c:'#6e6e73',a:'start'});
 o+=ln(X(P.scrim_y),Z(0.3),X(P.scrim_y),Z(9.3),{c:'#8944ab',w:4})+t(X(P.scrim_y)+8,Z(9.0),'샤막 H9m · 하단 0.3m(가정) · #1 장치봉 1.18m',{s:10.5,c:'#8944ab',a:'start',w:600});
 // 덧마루 30×3: 모듈 1.5 × 1.5 × 0.30. 2 · 3단은 쌓지 않고 받침 장치로 지지
 var DV=0.25;
 T.forEach(function(q,i){var top=topz(i),bot=HH*i;
  if(i>0){[q.y0,q.y1-DV].forEach(function(yy){o+=rc(X(yy),Z(bot),DV*s,bot*s,{f:'#fff3e8',s:'#c93400',sw:1.2})+ln(X(yy),Z(bot),X(yy)+DV*s,Z(0),{c:'#c93400',w:1})+ln(X(yy)+DV*s,Z(bot),X(yy),Z(0),{c:'#c93400',w:1});});}
  o+=rc(X(q.y0),Z(top),(q.y1-q.y0)*s,HH*s,{f:TIER_F[i],s:'#6e6e73',sw:1.3});
  o+=t(X((q.y0+q.y1)/2),Z(0)+16,q.n+'단 +'+top.toFixed(2)+'m',{s:10.5,w:700,c:'#1d1d1f'});});
 o+=t(X(9.15),Z(0)+36,'덧마루 30cm × 3단 (단 상면 30 / 60 / 90cm) · 모듈 1.5 × 1.5 × 0.30m · 주황 교차 = 받침 장치 (2 · 3단 모듈의 앞 · 뒤 끝 아래)',{s:11,w:700});
 // 사람 / 악기 (단 상면 기준)
 var y1m=(T[0].y0+T[0].y1)/2,y2m=(T[1].y0+T[1].y1)/2,y3m=(T[2].y0+T[2].y1)/2;
 o+=fig(X(2.0),Z(0),'stand',s,'#0071e3');
 o+=fig(X(y1m),Z(0.30),'sit',s,'#0071e3')+fig(X(y2m-0.5),Z(0.60),'stand',s,'#6e6e73')+fig(X(y2m+0.3),Z(0.60),'sit',s,'#c93400')+fig(X(y3m-0.2),Z(0.90),'sit',s,'#1d1d1f')+fig(X(y3m+0.6),Z(0.90),'stand',s,'#1d1d1f');
 o+=ci(X(y3m-0.2),Z(0.90+0.4),0.35*s*0.9,{f:'#1d1d1f'});
 o+=t(X(2.0),Z(1.7)-8,'보컬 1.7m',{s:9.5,c:'#0071e3'})+t(X(y1m),Z(0.30+1.25)-8,'1단 스트링(앉음)',{s:9.5,c:'#0071e3'})+t(X(y2m-0.6),Z(0.60+1.7)-8,'코러스',{s:9.5,c:'#6e6e73',a:'end'})+t(X(y2m+0.3),Z(0.60+1.25)-8,'국악(앉음)',{s:9.5,c:'#c93400',a:'start'})+t(X(y3m+0.6),Z(0.90+1.7)-8,'밴드(서서)',{s:9.5})+t(X(y3m-0.4),Z(0.90+1.25)-8,'드럼',{s:9.5,a:'end'});
 var pj=K.proj;o+='<polygon points="'+X(pj.yp)+','+Z(hp)+' '+X(P.scrim_y)+','+Z(pj.z_t)+' '+X(P.scrim_y)+','+Z(pj.z_b)+'" fill="#8944ab" opacity="0.10"/>'+ln(X(pj.yp),Z(hp),X(P.scrim_y),Z(pj.z_t),{c:'#8944ab',w:1.2,d:'5 3'})+ln(X(pj.yp),Z(hp),X(P.scrim_y),Z(pj.z_b),{c:'#8944ab',w:1.2,d:'5 3'});
 o+=rc(X(pj.yp)-14,Z(hp)-10,28,20,{f:'#8944ab',rx:3})+ln(X(pj.yp),Z(hp)+10,X(pj.yp),Z(0),{c:'#8944ab',w:2})+t(X(pj.yp)-20,Z(hp)-16,'프로젝터 y14.9m · 높이 '+hp.toFixed(1)+'m (스탠드)',{s:10,c:'#8944ab',w:700,a:'end'});
 var b0=K.beam[0],h0=K.clear[0];o+=ci(X(11.4),Z(b0.z),4,{f:'#d70015'})+ln(X(11.4),Z(b0.z),X(11.4),Z(h0.H),{c:'#d70015',w:1.2,d:'3 2'})+ci(X(11.4),Z(h0.H),3,{f:'none',s:'#d70015'})+t(X(11.4)+8,Z(b0.z)+16,'빔 하단 '+b0.z.toFixed(2)+'m (스탠드 3.0m)',{s:9.5,c:'#d70015',a:'start',w:700})+t(X(11.4)+8,Z(h0.H)-8,'머리 '+h0.H.toFixed(2)+'m → 필요 높이 '+h0.min.toFixed(2)+'m',{s:9.5,c:'#d70015',a:'start'});
 var yy=Z(0)+100;
 o+=dimH(X(P.apron),X(0),yy,'1.92')+dimH(X(0),X(P.scrim_y),yy,'1.18',{s:10})+dimH(X(P.scrim_y),X(T[0].y0),yy,K.dsc_depth+'m  연기 공간',{c:'#0071e3'})+dimH(X(T[0].y0),X(T[2].y1),yy,'4.50m  단 3열 (1.5 × 3)')+dimH(X(T[2].y1),X(P.cyc),yy,K.gap_back+'m  후방 간격',{c:'#0071e3'})+dimH(X(P.black),X(P.back_wall),yy,K.crossover+'m  후방 통로',{c:'#0071e3'});
 o+=t(ox,30,'SP-02  종단면도 (SECTION A-A, 중심선 단면, SR 방향에서 본 깊이 방향)',{s:16,w:700,a:'start'})+t(ox,48,'수평 y: 영점선 기준(무대 뒤 +), 수직 z: 무대 바닥 기준. 중앙부 단면이며 날개는 같은 높이로 객석 쪽으로 15° 회전합니다',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-03 정면도 ---------- */
D1.front=function(){
 var s=56,W=1240,H=1090,cx=620,fy=650;
 function X(x){return cx+x*s;} function Z(v){return fy-v*s;}
 var o=open(W,H);
 for(var m=0;m<=10;m++)o+=ln(X(-10.3),Z(m),X(10.3),Z(m),{c:'#f0f0f2'})+t(X(-10.3)-6,Z(m)+4,m+'m',{s:10,c:'#86868b',a:'end'});
 o+='<g id="elev">';
 o+=rc(X(-7.3),Z(8.2),14.6*s,8.2*s,{f:'#fafafc',s:'#c9c9ce',d:'6 3'})+t(X(6.2),Z(7.6),'하늘막(백) 12.93m',{s:10,c:'#6e6e73'});
 // 단: 뒤(3단)부터. 각 단의 앞선 x 범위(중앙부 + 날개)
 for(var k=2;k>=0;k--){var zt=topz(k),f0=tp(-GH-RG.Lw,k,0)[0],f1=tp(GH+RG.Lw,k,0)[0];
  o+=rc(X(Math.min(f0,f1)),Z(zt),Math.abs(f1-f0)*s,zt*s,{f:TIER_F[k],s:'#6e6e73',sw:1.2});
  [-GH,GH].forEach(function(xx){var xa=tp(xx,k,0)[0];o+=ln(X(xa),Z(zt),X(xa),Z(0),{c:'#a1a1a6',w:1,d:'3 3'});});}
 var LY=D.plan.layout;
 function fx(x,k){return X(tp(x,k,0.75)[0]);}
 LY.t3.forEach(function(it){var z3=0.90,x0=fx(it.x,2);
  if(it.k==='gt'||it.k==='eb')o+=fig(x0,Z(z3),'stand',s,'#3a3a3c')+rc(x0+9,Z(z3+0.55),0.3*s,0.5*s,{f:'#6e6e73',rx:3});
  else if(it.k==='dr')o+=ci(x0,Z(z3+0.37),0.37*s,{f:'#1d1d1f'})+ci(x0-0.6*s,Z(z3+0.95),0.2*s,{f:'#3a3a3c'})+ci(x0+0.6*s,Z(z3+0.95),0.2*s,{f:'#3a3a3c'})+ln(x0-0.9*s,Z(z3+1.35),x0-0.4*s,Z(z3+1.3),{c:'#3a3a3c',w:3})+ln(x0+0.4*s,Z(z3+1.45),x0+0.9*s,Z(z3+1.4),{c:'#3a3a3c',w:3})+fig(x0,Z(z3),'sit',s,'#c9c9ce');
  else if(it.k==='pc')o+=ci(x0-0.45*s,Z(z3+0.4),0.45*s*0.8,{f:'#c93400'})+ci(x0+0.5*s,Z(z3+0.35),0.4*s*0.8,{f:'#c93400'})+fig(x0+0.05*s,Z(z3),'stand',s,'#c9c9ce');
  else if(it.k==='kb')o+=rc(x0-0.65*s,Z(z3+0.8),1.3*s,0.08*s,{f:'#1d1d1f'})+ln(x0-0.55*s,Z(z3+0.72),x0-0.55*s,Z(z3),{c:'#1d1d1f',w:2})+ln(x0+0.55*s,Z(z3+0.72),x0+0.55*s,Z(z3),{c:'#1d1d1f',w:2})+fig(x0,Z(z3),'sit',s,'#3a3a3c');
 });
 LY.t2c.forEach(function(c2){var x0=fx(c2.x,1);o+=fig(x0,Z(0.60),'stand',s,'#6e6e73')+ln(x0+10,Z(1.6),x0+10,Z(0.60),{c:'#6e6e73',w:1.5})+ci(x0+10,Z(1.65),3.5,{f:'none',s:'#6e6e73'});});
 LY.t2g.forEach(function(it){o+=fig(fx(it.x,1),Z(0.60),'sit',s,'#c93400');});
 LY.t1.forEach(function(it){o+=fig(fx(it.x,0),Z(0.30),'sit',s,'#0071e3');});
 o+=rc(X(-7.5),Z(9.3),15*s,9*s,{f:'#8944ab',op:0.10})+rc(X(-7.5),Z(9.3),15*s,9*s,{s:'#8944ab',sw:1.6,d:'8 5'});
 o+=fig(X(-2.2),Z(0),'stand',s,'#0071e3')+fig(X(0),Z(0),'stand',s,'#0071e3')+fig(X(2.2),Z(0),'stand',s,'#0071e3');
 [-3,-1,1,3].forEach(function(x){o+=ln(X(x),Z(1.45),X(x),Z(0),{c:'#6e6e73',w:1.5})+ci(X(x),Z(1.5),4,{f:'none',s:'#6e6e73'});});
 o+=rc(X(-10),Z(10),2.6*s,10*s,{f:'#e9e9ee',s:'#8e8e93',sw:1.4})+rc(X(7.4),Z(10),2.6*s,10*s,{f:'#e9e9ee',s:'#8e8e93',sw:1.4})+rc(X(-7.4),Z(10),14.8*s,1.8*s,{f:'#e9e9ee',s:'#8e8e93',sw:1.4});
 o+=ln(X(-10.3),Z(0),X(10.3),Z(0),{w:3});
 o+='</g>';
 o+=t(X(0),Z(9.1),'프로시니엄 개구부 W14.8 × H8.2m',{s:12,w:700,c:'#6e6e73'});
 o+=t(X(-8.7),Z(5),'SR 측벽',{s:11,c:'#6e6e73',r:-90})+t(X(8.7),Z(5),'SL 측벽',{s:11,c:'#6e6e73',r:-90});
 o+=t(X(0),Z(3.6),'3단 (+0.90m): Gt · E.B · Dr · 모둠북 · 건반 2',{s:11,w:700})+t(X(-3.4),Z(2.9),'2단 (+0.60m) 코러스 4석 (스탠드)',{s:11,w:700,c:'#6e6e73'})+t(X(3.7),Z(2.9),'2단 국악 4인',{s:11,w:700,c:'#c93400'})+t(X(0),Z(2.3),'1단 (+0.30m) 스트링 10인 (Vn 4 · Va 2 · Vc 4)',{s:11,w:700,c:'#0071e3'})+t(X(0),Z(1.85),'DSC: 보컬 · 앙상블',{s:11,w:700,c:'#6e6e73'});
 var dy=Z(0)+40,fw=GEO.GH*2+RG.Lw*2*GEO.GC;
 o+=dimH(X(-7.5),X(7.5),dy,'샤막 W15.0m',{c:'#8944ab'})+dimH(X(-(GH+RG.Lw*GEO.GC)),X(GH+RG.Lw*GEO.GC),dy+30,'덧마루 전면 폭 '+K.geo.front_w.toFixed(2)+'m (후단 '+K.geo.back_w.toFixed(2)+'m)')+dimH(X(-7.4),X(7.4),dy+60,'프로시니엄 W14.8m');
 o+=dimV(X(10.55),Z(0),Z(8.2),'개구부 H8.2m')+dimV(X(11.0)+10,Z(0.3),Z(9.3),'샤막 H9.0m (하단 0.3m 가정)',{c:'#8944ab'});
 o+=dimV(X(-10.5),Z(0),Z(0.90),'0.90',{s:9,c:'#c93400'});
 var iy=800,iw=1170,ih=240;
 o+=rc(34,iy-20,iw+6,ih+34,{f:'#fafafc',s:'#c9c9ce'})+t(44,iy-4,'연주 구역 확대 (z 0 ~ 3.4m, 약 1.4배)  단 상면 30 / 60 / 90cm',{s:12,w:700,a:'start'});
 o+='<svg x="37" y="'+(iy+4)+'" width="'+iw+'" height="'+(ih-6)+'" viewBox="'+X(-7.6)+' '+Z(3.5)+' '+(15.2*s)+' '+(3.6*s)+'" preserveAspectRatio="xMidYMax meet"><use href="#elev" xlink:href="#elev"/></svg>';
 o+=t(34,30,'SP-03  정면도 (FRONT ELEVATION, 객석에서 본 모습)',{s:16,w:700,a:'start'})+t(34,50,'화면 오른쪽이 SL. 날개는 객석 쪽으로 15° 모여 있어 가로 폭이 줄어 보입니다. 단 상면 30 / 60 / 90cm, 연주자 1.7m 기준',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-04 축측도 (카비넷 사투영) ---------- */
D1.iso=function(){
 var s=44,W=1240,H=720,X0=460,Y0=650,q=0.5,ang=Math.PI/6;
 function pr(x,y,z){return [X0+(x+q*y*Math.cos(ang))*s,Y0-(z+q*y*Math.sin(ang))*s];}
 function poly(pts,f,st,op,dash){return '<polygon points="'+pts.map(function(p){var a=pr(p[0],p[1],p[2]);return a[0].toFixed(1)+','+a[1].toFixed(1);}).join(' ')+'" fill="'+f+'" stroke="'+(st||'#6e6e73')+'" stroke-width="1"'+(op?' fill-opacity="'+op+'"':'')+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';}
 function box(x0,x1,y0,y1,z0,z1,c,opt){opt=opt||{};var f=c||'#ececef';
  var front=poly([[x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1]],f,'#6e6e73',opt.op);
  var top=poly([[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]],opt.top||'#f7f7fa','#6e6e73',opt.op);
  var side=poly([[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[x1,y0,z1]],opt.side||'#c9c9ce','#6e6e73',opt.op);
  return {y:y0,z:z0,svg:side+front+top};}
 /* 다각형 기둥: 보이는 옆면(앞 · 오른쪽)과 윗면 */
 function prism(pts,z1,fill,top){var n=pts.length,area=0,i;for(i=0;i<n;i++){var a=pts[i],b=pts[(i+1)%n];area+=a[0]*b[1]-b[0]*a[1];}
  var ccw=area>0,svg='';
  for(i=0;i<n;i++){var a2=pts[i],b2=pts[(i+1)%n],dx=b2[0]-a2[0],dy=b2[1]-a2[1],nx=ccw?dy:-dy,ny=ccw?-dx:dx;
   if(nx*(-q*Math.cos(ang))+ny<0)svg+=poly([[a2[0],a2[1],0],[b2[0],b2[1],0],[b2[0],b2[1],z1],[a2[0],a2[1],z1]],fill,'#6e6e73');}
  svg+=poly(pts.map(function(p){return [p[0],p[1],z1];}),top,'#6e6e73');return svg;}
 var o=open(W,H);
 o+=poly([[-7.3,0,0],[7.3,0,0],[7.3,13.5,0],[-7.3,13.5,0]],'#fafafc','#c9c9ce');
 o+=poly([[-7.3,P.cyc,0],[7.3,P.cyc,0],[7.3,P.cyc,8.2],[-7.3,P.cyc,8.2]],'#f3f3f6','#c9c9ce',0.9,'6 3');
 o+=poly([[-7.3,P.black,0],[7.3,P.black,0],[7.3,P.black,8.2],[-7.3,P.black,8.2]],'#d6d6dc','#8e8e93',0.5,'6 3');
 // 쐐기 보정판 (바닥에 점선) + 단 슬랩 (뒤→앞, 중앙부와 날개)
 [-1,1].forEach(function(sg){var bi=[sg*(GH+RG.N*RG.D*GEO.GS),RG.yF+RG.N*RG.D*GEO.GC];o+=poly([[sg*GH,RG.yF,0],[sg*GH,T[2].y1,0],[bi[0],bi[1],0]],'#fdecea','#c0392b',0.9,'4 3');});
 [2,1,0].forEach(function(k){slabPolys(k).sort(function(a,b){return b.p[0][1]-a.p[0][1];}).forEach(function(sp){o+=prism(sp.p,topz(k),['#f4f4f6','#e9e9ee','#dcdce2'][k],TIER_F[k]);});});
 var items=[];
 var LY=D.plan.layout;
 function at(x,k,off){return tp(x,k,off);}
 LY.t3.forEach(function(it){var z3=0.90,c3=at(it.x,2,0.75),cx=c3[0],cy=c3[1];
  if(it.k==='gt'||it.k==='eb'){items.push(box(cx-0.3,cx+0.3,cy+0.1,cy+0.5,z3,z3+0.6,'#6e6e73'));items.push(box(cx-0.2,cx+0.2,cy-0.3,cy,z3,z3+1.7,'#8e8e93',{top:'#a1a1a6'}));}
  else if(it.k==='kb'){items.push(box(cx-0.65,cx+0.65,cy+0.1,cy+0.5,z3+0.75,z3+0.85,'#1d1d1f',{top:'#3a3a3c',side:'#111'}));}
  else if(it.k==='dr'){items.push(box(cx-0.35,cx+0.35,cy-0.1,cy+0.4,z3,z3+0.7,'#1d1d1f',{top:'#3a3a3c',side:'#111'}));items.push(box(cx-0.9,cx-0.4,cy-0.3,cy+0.1,z3+0.7,z3+0.95,'#3a3a3c'));items.push(box(cx+0.4,cx+0.9,cy-0.3,cy+0.1,z3+0.7,z3+0.95,'#3a3a3c'));}
  else if(it.k==='pc'){items.push(box(cx-0.9,cx-0.05,cy-0.3,cy+0.4,z3,z3+0.8,'#c93400',{top:'#e08a60',side:'#a02e00'}));items.push(box(cx+0.1,cx+0.9,cy-0.3,cy+0.4,z3,z3+0.7,'#c93400',{top:'#e08a60',side:'#a02e00'}));}
 });
 LY.t2c.forEach(function(cc){var c2=at(cc.x,1,cc.o+0.25);items.push(box(c2[0]-0.08,c2[0]+0.08,c2[1]-0.08,c2[1]+0.08,0.60,1.95,'#8e8e93',{top:'#b9b9c0'}));});
 LY.t2g.forEach(function(it){var c2=at(it.x,1,it.o);items.push(box(c2[0]-0.17,c2[0]+0.17,c2[1]-0.2,c2[1]+0.2,0.60,0.95,'#c93400',{top:'#e08a60',side:'#a02e00'}));items.push(box(c2[0]-0.15,c2[0]+0.15,c2[1]-0.15,c2[1]+0.15,1.0,1.65,'#e07a50',{top:'#f0a07a',side:'#b85a30'}));});
 LY.t1.forEach(function(it){var c1=at(it.x,0,0.8);items.push(box(c1[0]-0.25,c1[0]+0.25,c1[1]-0.28,c1[1]+0.28,0.30,0.75,'#0071e3',{top:'#5aa7f0',side:'#0058b0'}));items.push(box(c1[0]-0.2,c1[0]+0.2,c1[1]-0.15,c1[1]+0.15,0.75,1.4,'#4a90e2',{top:'#7fb6f2',side:'#2f6fb5'}));});
 items.sort(function(a,b){return (b.y-a.y)||(a.z-b.z);});
 items.forEach(function(it){o+=it.svg;});
 o+=poly([[-7.5,P.scrim_y,0.3],[7.5,P.scrim_y,0.3],[7.5,P.scrim_y,9.3],[-7.5,P.scrim_y,9.3]],'#8944ab','#8944ab',0.14,'8 4');
 o+=poly([[-3.4,1.3,0.02],[3.4,1.3,0.02],[3.4,4.3,0.02],[-3.4,4.3,0.02]],'#fff7ec','#c93400',0.9,'5 3');
 [-3,-1,1,3].forEach(function(x){var a=pr(x,3.7,0),b=pr(x,3.7,1.5);o+=ln(a[0],a[1],b[0],b[1],{c:'#6e6e73',w:1.5})+ci(b[0],b[1],4,{f:'none',s:'#6e6e73'});});
 [[-2.2,1.9],[0,1.9],[2.2,1.9]].forEach(function(p){var a=pr(p[0],p[1],0),b=pr(p[0],p[1],1.5);o+=ln(a[0],a[1],b[0],b[1],{c:'#0071e3',w:6})+ci(b[0],b[1]-4,7,{f:'#0071e3'});});
 var pj=K.proj,hp=K.hp,pa=pr(0,pj.yp,hp);
 [[-7.5,pj.z_t],[7.5,pj.z_t],[7.5,pj.z_b],[-7.5,pj.z_b]].forEach(function(c){var b=pr(c[0],P.scrim_y,c[1]);o+=ln(pa[0],pa[1],b[0],b[1],{c:'#8944ab',w:0.8,d:'4 3'});});
 o+=poly([[-0.5,pj.yp-0.4,hp-0.25],[0.5,pj.yp-0.4,hp-0.25],[0.5,pj.yp-0.4,hp],[-0.5,pj.yp-0.4,hp]],'#8944ab','#5a2d73');
 var ps=pr(0,pj.yp,0);o+=ln(pa[0],pa[1],ps[0],ps[1],{c:'#8944ab',w:2});
 var fw=function(x0,x1,z0,z1){return poly([[x0,0,z0],[x1,0,z0],[x1,0,z1],[x0,0,z1]],'#e9e9ee','#8e8e93',0.85);};
 o+=fw(-10,-7.4,0,9.8)+fw(7.4,10,0,9.8)+fw(-7.4,7.4,8.2,9.8);
 var lab=function(x,y,z,s2,c){var a=pr(x,y,z);return t(a[0],a[1],s2,{s:11,w:700,c:c||'#1d1d1f'});};
 o+=lab(0,0.5,9.2,'프로시니엄','#6e6e73')+lab(0,P.scrim_y,9.7,'샤막 15×9m','#8944ab')+lab(0,11.0,3.2,'3단 (+0.90) Gt / E.B / Dr / 모둠북 / 건반 2')+lab(-3.2,9.0,2.3,'2단 코러스 4석','#6e6e73')+lab(3.9,9.0,2.2,'2단 국악 4인','#c93400')+lab(0,7.6,1.8,'1단 스트링 10인','#0071e3')+lab(0,2.9,0.5,'DSC 연기 공간 (1번 국악 · 보컬 · 코러스 · 앙상블)','#6e6e73')+lab(0,pj.yp,hp+0.6,'프로젝터 3.0m · 빔 영사 범위','#8944ab')+lab(0,P.cyc,8.5,'하늘막');
 o+=t(34,30,'SP-04  축측도 (사투영: 객석 좌측 위에서 본 모습)',{s:16,w:700,a:'start'})+t(34,50,'덧마루 30×3 내모임형: 중앙부 + 좌우 날개(15°). 붉은 점선 면은 쐐기 보정판 영역입니다',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-05 덧마루 모듈 배치도 (1.5 × 1.5 × 0.30m × 21개) ---------- */
D1.risers=function(){
 var sc=78,W=1240,H=760,OX=620,OY=690;
 function PX(x){return OX+x*sc;} function PY(y){return OY-(y-4.9)*sc;}
 function pg(pts,f,st,sw,dash){return '<polygon points="'+pts.map(function(p){return PX(p[0]).toFixed(1)+','+PY(p[1]).toFixed(1);}).join(' ')+'" fill="'+f+'" stroke="'+st+'" stroke-width="'+sw+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';}
 var o=open(W,H),M=RG.M;
 o+=t(34,30,'SP-05  덧마루 모듈 배치도 (15 × 15 × 30 모듈 21개)',{s:16,w:700,a:'start'})+t(34,50,'모듈 1.5 × 1.5m, 두께 0.30m. 단마다 중앙부 3개 + 좌우 날개 2개씩 = 7개. 2 · 3단은 쌓지 않고 받침 장치로 지지합니다 (받침 장치 형식 확인 필요)',{s:11,c:'#6e6e73',a:'start'});
 // 쐐기 보정판
 [-1,1].forEach(function(sg){var bi=[sg*(GH+RG.N*RG.D*GEO.GS),RG.yF+RG.N*RG.D*GEO.GC];o+=pg([[sg*GH,RG.yF],[sg*GH,T[2].y1],bi],'#fdecea','#c0392b',1.2,'4 3')+t(PX(sg*(GH+0.55)),PY(T[2].y1-0.6),'쐐기 보정판',{s:10,c:'#c0392b',w:700});});
 var NAMES=['SR2','SR1','C1','C2','C3','SL1','SL2'];
 for(var k=0;k<3;k++){
  var xs=[[-GH-3,-GH-1.5],[-GH-1.5,-GH],[-GH,-GH+1.5],[-GH+1.5,GH-1.5],[GH-1.5,GH],[GH,GH+1.5],[GH+1.5,GH+3]];
  xs=[[-GH-3,-GH-1.5],[-GH-1.5,-GH],[-GH,-GH+M],[-GH+M,-GH+2*M],[-GH+2*M,GH],[GH,GH+M],[GH+M,GH+2*M]];
  xs.forEach(function(r,i){var a=r[0],b=r[1];var cp=[tp(a,k,0),tp(b,k,0),tp(b,k,RG.D),tp(a,k,RG.D)];
   // 중앙부 경계 모서리 보정: 정확히 ±GH는 날개 쪽 좌표를 쓰므로 중앙 모듈은 직선 좌표로
   if(i>=2&&i<=4){cp=[[a,RG.yF+k*RG.D],[b,RG.yF+k*RG.D],[b,RG.yF+(k+1)*RG.D],[a,RG.yF+(k+1)*RG.D]];}
   o+=pg(cp,TIER_F[k],'#6e6e73',1.2);
   var cx=(cp[0][0]+cp[1][0]+cp[2][0]+cp[3][0])/4,cy=(cp[0][1]+cp[1][1]+cp[2][1]+cp[3][1])/4;
   var CONT={'3|SR2':'Gt','3|SR1':'E.B','3|C2':'드럼','3|C3':'모둠북','3|SL1':'건반 1','3|SL2':'건반 2','2|SR2':'코러스 4명 1열','2|SR1':'코러스 4명 1열','2|SL1':'국악 4인 1열','2|SL2':'국악 4인 1열','1|C1':'스트링 10인 (1단 전체)'},ct=CONT[(k+1)+'|'+NAMES[i]]||'';o+=t(PX(cx),PY(cy)-(ct?4:-4),(k+1)+'·'+NAMES[i],{s:11,w:700,c:'#1d1d1f'})+(ct?t(PX(cx),PY(cy)+12,ct,{s:10.5,w:600,c:'#0b3a7a'}):'');
   if(k>0){var q0=[(cp[0][0]*3+cp[3][0])/4,(cp[0][1]*3+cp[3][1])/4],q1=[(cp[1][0]*3+cp[2][0])/4,(cp[1][1]*3+cp[2][1])/4];
    o+=ln(PX(cp[0][0]),PY(cp[0][1]),PX(cp[1][0]),PY(cp[1][1]),{c:'#c93400',w:3})+ln(PX(cp[3][0]),PY(cp[3][1]),PX(cp[2][0]),PY(cp[2][1]),{c:'#c93400',w:3});}
  });
 }
 o+='<circle cx="'+PX(-GH)+'" cy="'+PY(RG.yF)+'" r="5" fill="#fff" stroke="#c0392b" stroke-width="2"/><circle cx="'+PX(GH)+'" cy="'+PY(RG.yF)+'" r="5" fill="#fff" stroke="#c0392b" stroke-width="2"/>';
 o+=t(PX(-GH)-10,PY(RG.yF)+22,'힌지(전면 내측 모서리)',{s:10,c:'#c0392b',w:700,a:'end'})+t(PX(GH)+10,PY(RG.yF)+22,'힌지',{s:10,c:'#c0392b',w:700,a:'start'});
 // 치수
 var f=K.geo.front,b=K.geo.back,yq=PY(f[1])+40;
 o+=dimH(PX(-f[0]),PX(f[0]),yq,'전면 현 폭 '+K.geo.front_w.toFixed(2)+'m')+dimH(PX(-GH),PX(GH),PY(T[2].y1)-30,'중앙부 4.50m (3모듈)')+dimH(PX(GH),PX(GH+3),PY(T[2].y1)-62,'날개 3.00m (2모듈)×2 · 경사 15°');
 o+=dimV(PX(-b[0])-44,PY(T[0].y0),PY(T[2].y1),'깊이 4.50m (1.5 × 3)');
 o+=t(PX(b[0])-4,PY(b[1])-34,'외곽 후단 x=±'+b[0].toFixed(2)+' · 측벽 여유 '+K.geo.side_clear.toFixed(2)+'m',{s:10,a:'end'});
 // 범례
 var lx=40,ly=H-46;[['1단 +0.30',0],['2단 +0.60',1],['3단 +0.90',2]].forEach(function(l,i){o+=rc(lx+i*150,ly,18,14,{f:TIER_F[l[1]],s:'#6e6e73'})+t(lx+i*150+24,ly+12,l[0]+'m',{s:11,a:'start'});});
 o+=ln(lx+470,ly+7,lx+500,ly+7,{c:'#c93400',w:3})+t(lx+506,ly+12,'받침 장치 위치 (2 · 3단 모듈의 앞 · 뒤 끝)',{s:11,a:'start'});
 o+=t(lx,ly+34,'모듈 번호: 단·위치 (SR2 SR1 C1 C2 C3 SL1 SL2). SR은 화면 왼쪽, SL은 오른쪽. 객석은 아래',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-06 영사 기하 (평면 개략) ---------- */
D1.proj=function(){
 var s=46,W=700,H=720,ox=350,oy=660,pj=K.proj;
 function X(x){return ox+x*s;} function Y(y){return oy-y*s;}
 var o=open(W,H);
 o+=rc(X(-7.3),Y(13.5),14.6*s,13.5*s,{f:'#fafafc',s:'#8e8e93'});
 o+=ln(X(-7.5),Y(P.scrim_y),X(7.5),Y(P.scrim_y),{c:'#8944ab',w:6})+t(X(0),Y(P.scrim_y)+20,'샤막 W15.0m (y 1.18m)',{s:12,c:'#8944ab',w:700});
 function pgp(pts,f,st){return '<polygon points="'+pts.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join(' ')+'" fill="'+f+'" stroke="'+st+'"/>';}
 [0,1,2].forEach(function(k){slabPolys(k).forEach(function(sp){o+=pgp(sp.p,TIER_F[k],'#8e8e93');});});
 o+='<polygon points="'+X(0)+','+Y(pj.yp)+' '+X(-7.5)+','+Y(P.scrim_y)+' '+X(7.5)+','+Y(P.scrim_y)+'" fill="#8944ab" opacity="0.10"/>'+ln(X(0),Y(pj.yp),X(-7.5),Y(P.scrim_y),{c:'#8944ab',d:'5 3'})+ln(X(0),Y(pj.yp),X(7.5),Y(P.scrim_y),{c:'#8944ab',d:'5 3'});
 o+=rc(X(-0.5),Y(pj.yp)-8,1.0*s,16,{f:'#8944ab',rx:3})+t(X(0),Y(pj.yp)-14,'프로젝터 (y '+pj.yp+'m)',{s:12,c:'#8944ab',w:700});
 o+=dimV(X(-8.2),Y(P.scrim_y),Y(pj.yp),'투사 거리 '+pj.d+'m',{c:'#8944ab',s:12});
 o+=dimH(X(-7.5),X(7.5),Y(P.scrim_y)+44,'영상 폭 15.0m (화면 가득)',{c:'#8944ab',s:12});
 o+=t(X(0),Y(7.5),'투사비 '+pj.ratio+' : 1',{s:20,w:700,c:'#8944ab'})+t(X(0),Y(7.5)+22,'(투사 거리 ÷ 영상 폭, 와이드 렌즈 계열)',{s:11,c:'#6e6e73'});
 o+=t(20,28,'SP-06  영사 기하 (평면 개략)',{s:15,w:700,a:'start'});
 return o+'</svg>';
};
})();
