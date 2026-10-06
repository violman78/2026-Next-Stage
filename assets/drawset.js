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

/* ---------- SP-02 종단면도 ---------- */
D1.section=function(){
 var s=66,ox=46,oy=735,W=1240,H=850,hp=K.hp;
 function X(y){return ox+(y+2.2)*s;} function Z(v){return oy-v*s;}
 var o=open(W,H);
 for(var m=0;m<=9;m++)o+=ln(X(-2.2),Z(m),X(15.6),Z(m),{c:'#ececef'})+t(ox-8,Z(m)+4,m+'m',{s:10,c:'#86868b',a:'end'});
 o+=ln(X(P.apron),Z(0),X(P.back_wall),Z(0),{w:3})+ln(X(P.apron),Z(0),X(P.apron),Z(-0.7),{w:2})+ln(X(-2.2),Z(-0.7),X(P.apron),Z(-0.7),{w:2})+t(X(-1.0),Z(-0.7)-8,'객석 바닥 −0.70m',{s:10,c:'#6e6e73'});
 o+=ln(X(P.back_wall),Z(0),X(P.back_wall),Z(9.6),{c:'#8e8e93',w:3})+t(X(P.back_wall)-4,Z(9.95),'뒷벽 15.40m',{s:10,c:'#6e6e73',a:'end'});
 o+=ln(X(0),Z(P.prosc_h),X(0),Z(9.8),{w:6})+t(X(0)-8,Z(9.0),'프로시니엄 상단 H8.2m',{s:10.5,a:'end'});
 // 라인셋 위치
 D.plan.lines.forEach(function(l){var k=l[3],c=k==='light'?'#e08a00':(k==='cyc'?'#333':'#a1a1a6');o+='<path d="M'+X(l[2])+' '+Z(9.75)+' l-4 -8 l8 0z" fill="'+c+'"/>'+t(X(l[2]),Z(9.75)-12,l[0]>0?l[0]:'',{s:8,c:c});});
 o+=t(X(6.5),Z(9.75)-28,'라인셋 번호 (주황: 조명봉)',{s:9,c:'#86868b'});
 // 하늘막 / 흑막
 o+=ln(X(P.cyc),Z(0),X(P.cyc),Z(8.8),{c:'#333',w:3})+t(X(P.cyc)-6,Z(8.1),'하늘막 12.93m',{s:10,c:'#333',a:'end'})+ln(X(P.black),Z(0),X(P.black),Z(8.8),{c:'#111',w:5})+t(X(P.black)+6,Z(8.1),'흑막 13.70m',{s:10,c:'#111',a:'start'});
 // 샤막
 o+=ln(X(P.scrim_y),Z(0.3),X(P.scrim_y),Z(9.3),{c:'#8944ab',w:4})+t(X(P.scrim_y)+8,Z(9.0),'샤막 H9m · 하단 0.3m(가정) · #1 장치봉 1.18m',{s:10.5,c:'#8944ab',a:'start',w:600});
 // 단 안 B (점선) 와 안 A (면)
 T.forEach(function(q,i){var hb=0.30*(i+1);o+=rc(X(q.y0),Z(hb),(q.y1-q.y0)*s,hb*s,{f:'none',s:'#c93400',sw:1.4,d:'5 3'});});
 T.forEach(function(q,i){var ha=0.15*(i+1);o+=rc(X(q.y0),Z(ha),(q.y1-q.y0)*s,ha*s,{f:['#ececef','#e2e2e6','#d6d6dc'][i],s:'#6e6e73',sw:1.2});});
 o+=t(X(8.7),Z(0)+34,'덧마루 1 · 2 · 3단 (면: 안 A 15 / 30 / 45cm,  점선: 안 B 30 / 60 / 90cm)',{s:11,w:700});
 // 사람 / 악기
 o+=fig(X(2.0),Z(0),'stand',s,'#0071e3');
 o+=fig(X(6.9),Z(0.15),'sit',s,'#0071e3')+fig(X(8.4),Z(0.30),'stand',s,'#6e6e73')+fig(X(9.0),Z(0.30),'sit',s,'#c93400')+fig(X(10.5),Z(0.45),'sit',s,'#1d1d1f')+fig(X(11.0),Z(0.45),'stand',s,'#1d1d1f');
 o+=ci(X(10.7),Z(0.45+0.4),0.35*s*0.9,{f:'#1d1d1f'});
 o+=t(X(2.0),Z(1.7)-8,'보컬 1.7m',{s:9.5,c:'#0071e3'})+t(X(6.9),Z(0.15+1.25)-8,'1단 스트링(앉음)',{s:9.5,c:'#0071e3'})+t(X(8.2),Z(0.3+1.7)-8,'코러스',{s:9.5,c:'#6e6e73',a:'end'})+t(X(9.2),Z(0.3+1.25)-8,'국악(앉음)',{s:9.5,c:'#c93400',a:'start'})+t(X(11.0),Z(0.45+1.7)-8,'밴드(서서)',{s:9.5})+t(X(10.3),Z(0.45+1.25)-8,'드럼',{s:9.5,a:'end'});
 // 프로젝터와 빔
 var pj=K.proj;o+='<polygon points="'+X(pj.yp)+','+Z(hp)+' '+X(P.scrim_y)+','+Z(pj.z_t)+' '+X(P.scrim_y)+','+Z(pj.z_b)+'" fill="#8944ab" opacity="0.10"/>'+ln(X(pj.yp),Z(hp),X(P.scrim_y),Z(pj.z_t),{c:'#8944ab',w:1.2,d:'5 3'})+ln(X(pj.yp),Z(hp),X(P.scrim_y),Z(pj.z_b),{c:'#8944ab',w:1.2,d:'5 3'});
 o+=rc(X(pj.yp)-14,Z(hp)-10,28,20,{f:'#8944ab',rx:3})+ln(X(pj.yp),Z(hp)+10,X(pj.yp),Z(0),{c:'#8944ab',w:2})+t(X(pj.yp)-20,Z(hp)-16,'프로젝터 y14.9m · 높이 '+hp.toFixed(1)+'m (스탠드)',{s:10,c:'#8944ab',w:700,a:'end'});
 var b0=K.beam[0],h0=K.clear[0];o+=ci(X(11.4),Z(b0.z),4,{f:'#d70015'})+ln(X(11.4),Z(b0.z),X(11.4),Z(h0.HA),{c:'#d70015',w:1.2,d:'3 2'})+ci(X(11.4),Z(h0.HA),3,{f:'none',s:'#d70015'})+t(X(11.4)+8,Z(b0.z)-3,'빔 하단 '+b0.z.toFixed(2)+'m',{s:9.5,c:'#d70015',a:'start',w:700})+t(X(11.4)+8,Z(h0.HA)+12,'머리 '+h0.HA.toFixed(2)+'m (안 A)',{s:9.5,c:'#d70015',a:'start'});
 // 치수선
 var yy=Z(0)+100;
 o+=dimH(X(P.apron),X(0),yy,'1.92')+dimH(X(0),X(P.scrim_y),yy,'1.18',{s:10})+dimH(X(P.scrim_y),X(T[0].y0),yy,K.dsc_depth+'m  연기 공간',{c:'#0071e3'})+dimH(X(T[0].y0),X(T[2].y1),yy,'5.40m  단 3열 (1.8 × 3)')+dimH(X(T[2].y1),X(P.cyc),yy,K.gap_back+'m  후방 간격',{c:'#0071e3'})+dimH(X(P.black),X(P.back_wall),yy,K.crossover+'m  후방 통로',{c:'#0071e3'});
 o+=t(ox,30,'SP-02  종단면도 (SECTION A-A, SR 방향에서 본 깊이 방향)',{s:16,w:700,a:'start'})+t(ox,48,'수평 y: 영점선 기준(무대 뒤 +), 수직 z: 무대 바닥 기준. 단 높이는 안 A(면)와 안 B(점선) 비교',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-03 정면도 ---------- */
D1.front=function(){
 var s=56,W=1240,H=1090,cx=620,fy=650;
 function X(x){return cx+x*s;} function Z(v){return fy-v*s;}
 var o=open(W,H);
 for(var m=0;m<=10;m++)o+=ln(X(-10.3),Z(m),X(10.3),Z(m),{c:'#f0f0f2'})+t(X(-10.3)-6,Z(m)+4,m+'m',{s:10,c:'#86868b',a:'end'});
 // 장면 (확대 도면에서 재사용)
 o+='<g id="elev">';
 // 하늘막
 o+=rc(X(-7.3),Z(8.2),14.6*s,8.2*s,{f:'#fafafc',s:'#c9c9ce',d:'6 3'})+t(X(6.2),Z(7.6),'하늘막(백) 12.93m',{s:10,c:'#6e6e73'});
 // 단 (안 B 점선, 안 A 면) — 뒤쪽부터
 for(var i=2;i>=0;i--){var hb=0.30*(i+1);o+=rc(X(-6.6),Z(hb),13.2*s,hb*s,{f:'none',s:'#c93400',sw:1.2,d:'5 3'});}
 for(var j=2;j>=0;j--){var ha2=0.15*(j+1);o+=rc(X(-6.6),Z(ha2),13.2*s,ha2*s,{f:['#ececef','#e2e2e6','#d6d6dc'][j],s:'#6e6e73',sw:1.2});}
 var z3=0.45,LY=D.plan.layout;
 LY.t3.forEach(function(it){
  if(it.k==='gt'||it.k==='eb')o+=fig(X(it.x),Z(z3),'stand',s,'#3a3a3c')+rc(X(it.x)+9,Z(z3+0.55),0.3*s,0.5*s,{f:'#6e6e73',rx:3});
  else if(it.k==='dr')o+=ci(X(it.x),Z(z3+0.37),0.37*s,{f:'#1d1d1f'})+ci(X(it.x)-0.6*s,Z(z3+0.95),0.2*s,{f:'#3a3a3c'})+ci(X(it.x)+0.6*s,Z(z3+0.95),0.2*s,{f:'#3a3a3c'})+ln(X(it.x)-0.9*s,Z(z3+1.35),X(it.x)-0.4*s,Z(z3+1.3),{c:'#3a3a3c',w:3})+ln(X(it.x)+0.4*s,Z(z3+1.45),X(it.x)+0.9*s,Z(z3+1.4),{c:'#3a3a3c',w:3})+fig(X(it.x),Z(z3),'sit',s,'#c9c9ce');
  else if(it.k==='pc')o+=ci(X(it.x-0.45),Z(z3+0.4),0.45*s*0.8,{f:'#c93400'})+ci(X(it.x+0.5),Z(z3+0.35),0.4*s*0.8,{f:'#c93400'})+fig(X(it.x+0.05),Z(z3),'stand',s,'#c9c9ce');
  else if(it.k==='kb')o+=rc(X(it.x-0.65),Z(z3+0.8),1.3*s,0.08*s,{f:'#1d1d1f'})+ln(X(it.x-0.55),Z(z3+0.72),X(it.x-0.55),Z(z3),{c:'#1d1d1f',w:2})+ln(X(it.x+0.55),Z(z3+0.72),X(it.x+0.55),Z(z3),{c:'#1d1d1f',w:2})+fig(X(it.x),Z(z3),'sit',s,'#3a3a3c');
 });
 LY.t2c.forEach(function(x){o+=fig(X(x),Z(0.30),'stand',s,'#6e6e73')+ln(X(x)+10,Z(1.3),X(x)+10,Z(0.30),{c:'#6e6e73',w:1.5})+ci(X(x)+10,Z(1.35),3.5,{f:'none',s:'#6e6e73'});});
 LY.t2g.forEach(function(it){o+=fig(X(it.x),Z(0.30),'sit',s,'#c93400');});
 LY.t1.forEach(function(it){o+=fig(X(it.x),Z(0.15),'sit',s,'#0071e3');});
 // 샤막 (투명)
 o+=rc(X(-7.5),Z(9.3),15*s,9*s,{f:'#8944ab',op:0.10})+rc(X(-7.5),Z(9.3),15*s,9*s,{s:'#8944ab',sw:1.6,d:'8 5'});
 // 바닥 앞: 보컬 듀엣, 솔로, 코러스 스탠드
 o+=fig(X(-2.2),Z(0),'stand',s,'#0071e3')+fig(X(0),Z(0),'stand',s,'#0071e3')+fig(X(2.2),Z(0),'stand',s,'#0071e3');
 [-3,-1,1,3].forEach(function(x){o+=ln(X(x),Z(1.45),X(x),Z(0),{c:'#6e6e73',w:1.5})+ci(X(x),Z(1.5),4,{f:'none',s:'#6e6e73'});});
 // 프로시니엄 벽
 o+=rc(X(-10),Z(10),2.6*s,10*s,{f:'#e9e9ee',s:'#8e8e93',sw:1.4})+rc(X(7.4),Z(10),2.6*s,10*s,{f:'#e9e9ee',s:'#8e8e93',sw:1.4})+rc(X(-7.4),Z(10),14.8*s,1.8*s,{f:'#e9e9ee',s:'#8e8e93',sw:1.4});
 o+=ln(X(-10.3),Z(0),X(10.3),Z(0),{w:3});
 o+='</g>';
 // 라벨
 o+=t(X(0),Z(9.1),'프로시니엄 개구부 W14.8 × H8.2m',{s:12,w:700,c:'#6e6e73'});
 o+=t(X(-8.7),Z(5),'SR 측벽',{s:11,c:'#6e6e73',r:-90})+t(X(8.7),Z(5),'SL 측벽',{s:11,c:'#6e6e73',r:-90});
 o+=t(X(0),Z(3.2),'3단: Gt · E.B · Dr · 모둠북 · 건반 2',{s:11,w:700})+t(X(-4.2),Z(2.55),'2단 코러스 4석 (스탠드)',{s:11,w:700,c:'#6e6e73'})+t(X(3.7),Z(2.55),'2단 국악 4인',{s:11,w:700,c:'#c93400'})+t(X(0),Z(1.95),'1단 스트링 10인 (Vn 4 · Va 2 · Vc 4)',{s:11,w:700,c:'#0071e3'})+t(X(0),Z(1.45),'DSC: 보컬 · 앙상블',{s:11,w:700,c:'#6e6e73'});
 // 치수
 var dy=Z(0)+40;
 o+=dimH(X(-7.5),X(7.5),dy,'샤막 W15.0m',{c:'#8944ab'})+dimH(X(-6.6),X(6.6),dy+30,'덧마루 연속 폭 13.2m')+dimH(X(-7.4),X(7.4),dy+60,'프로시니엄 W14.8m');
 o+=dimV(X(10.55),Z(0),Z(8.2),'개구부 H8.2m')+dimV(X(11.0)+10,Z(0.3),Z(9.3),'샤막 H9.0m (하단 0.3m 가정)',{c:'#8944ab'});
 o+=dimV(X(-10.5),Z(0),Z(0.45),'0.45',{s:9,c:'#c93400'});
 // 연주 구역 확대
 var iy=800,iw=1170,ih=240;
 o+=rc(34,iy-20,iw+6,ih+34,{f:'#fafafc',s:'#c9c9ce'})+t(44,iy-4,'연주 구역 확대 (z 0 ~ 3.4m, 약 1.4배)  안 A 단: 15 / 30 / 45cm',{s:12,w:700,a:'start'});
 o+='<svg x="37" y="'+(iy+4)+'" width="'+iw+'" height="'+(ih-6)+'" viewBox="'+X(-7.6)+' '+Z(3.5)+' '+(15.2*s)+' '+(3.6*s)+'" preserveAspectRatio="xMidYMax meet"><use href="#elev" xlink:href="#elev"/></svg>';
 o+=t(34,30,'SP-03  정면도 (FRONT ELEVATION, 객석에서 본 모습)',{s:16,w:700,a:'start'})+t(34,50,'화면 오른쪽이 SL. 단 면: 안 A(15/30/45cm), 점선: 안 B(30/60/90cm). 연주자 1.7m 기준',{s:11,c:'#6e6e73',a:'start'});
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
 var o=open(W,H),items=[];
 // 바닥 · 하늘막
 o+=poly([[-7.3,0,0],[7.3,0,0],[7.3,13.5,0],[-7.3,13.5,0]],'#fafafc','#c9c9ce');
 o+=poly([[-7.3,P.cyc,0],[7.3,P.cyc,0],[7.3,P.cyc,8.2],[-7.3,P.cyc,8.2]],'#f3f3f6','#c9c9ce',0.9,'6 3');
 o+=poly([[-7.3,P.black,0],[7.3,P.black,0],[7.3,P.black,8.2],[-7.3,P.black,8.2]],'#d6d6dc','#8e8e93',0.5,'6 3');
 // 단
 T.forEach(function(qq,i){items.push(box(-6.6,6.6,qq.y0,qq.y1,0,0.15*(i+1),['#ececef','#e2e2e6','#d6d6dc'][i]));});
 // 배치 (3단 z=0.45, 2단 z=0.30, 1단 z=0.15)
 var z3=0.45,LY=D.plan.layout;
 LY.t3.forEach(function(it){
  if(it.k==='gt'||it.k==='eb'){items.push(box(it.x-0.3,it.x+0.3,10.9,11.3,z3,z3+0.6,'#6e6e73'));items.push(box(it.x-0.2,it.x+0.2,10.3,10.6,z3,z3+1.7,'#8e8e93',{top:'#a1a1a6'}));}
  else if(it.k==='kb'){items.push(box(it.x-0.65,it.x+0.65,10.0,10.4,z3+0.75,z3+0.85,'#1d1d1f',{top:'#3a3a3c',side:'#111'}));}
  else if(it.k==='dr'){items.push(box(it.x-0.35,it.x+0.35,10.4,10.9,z3,z3+0.7,'#1d1d1f',{top:'#3a3a3c',side:'#111'}));items.push(box(it.x-0.9,it.x-0.4,10.2,10.6,z3+0.7,z3+0.95,'#3a3a3c'));items.push(box(it.x+0.4,it.x+0.9,10.2,10.6,z3+0.7,z3+0.95,'#3a3a3c'));}
  else if(it.k==='pc'){items.push(box(it.x-0.9,it.x-0.05,10.2,10.9,z3,z3+0.8,'#c93400',{top:'#e08a60',side:'#a02e00'}));items.push(box(it.x+0.1,it.x+0.9,10.2,10.9,z3,z3+0.7,'#c93400',{top:'#e08a60',side:'#a02e00'}));}
 });
 LY.t2c.forEach(function(x){items.push(box(x-0.15,x+0.15,8.6,8.9,0.30,1.95,'#8e8e93',{top:'#b9b9c0'}));});
 LY.t2g.forEach(function(it){items.push(box(it.x-0.3,it.x+0.3,8.4,9.0,0.30,0.70,'#c93400',{top:'#e08a60',side:'#a02e00'}));items.push(box(it.x-0.2,it.x+0.2,8.55,8.85,0.70,1.35,'#e07a50',{top:'#f0a07a',side:'#b85a30'}));});
 LY.t1.forEach(function(it){items.push(box(it.x-0.25,it.x+0.25,6.6,7.17,0.15,0.60,'#0071e3',{top:'#5aa7f0',side:'#0058b0'}));items.push(box(it.x-0.2,it.x+0.2,6.75,7.05,0.60,1.25,'#4a90e2',{top:'#7fb6f2',side:'#2f6fb5'}));});
 items.sort(function(a,b){return (b.y-a.y)||(a.z-b.z);});
 items.forEach(function(it){o+=it.svg;});
 // 샤막 (반투명)
 o+=poly([[-7.5,P.scrim_y,0.3],[7.5,P.scrim_y,0.3],[7.5,P.scrim_y,9.3],[-7.5,P.scrim_y,9.3]],'#8944ab','#8944ab',0.14,'8 4');
 // 연기 공간: 돗자리, 스탠드, 사람
 o+=poly([[-3.4,1.3,0.02],[3.4,1.3,0.02],[3.4,4.3,0.02],[-3.4,4.3,0.02]],'#fff7ec','#c93400',0.9,'5 3');
 [-3,-1,1,3].forEach(function(x){var a=pr(x,3.7,0),b=pr(x,3.7,1.5);o+=ln(a[0],a[1],b[0],b[1],{c:'#6e6e73',w:1.5})+ci(b[0],b[1],4,{f:'none',s:'#6e6e73'});});
 [[-2.2,1.9],[0,1.9],[2.2,1.9]].forEach(function(p){var a=pr(p[0],p[1],0),b=pr(p[0],p[1],1.5);o+=ln(a[0],a[1],b[0],b[1],{c:'#0071e3',w:6})+ci(b[0],b[1]-4,7,{f:'#0071e3'});});
 // 프로젝터와 빔
 var pj=K.proj,hp=K.hp,pa=pr(0,pj.yp,hp);
 [[-7.5,pj.z_t],[7.5,pj.z_t],[7.5,pj.z_b],[-7.5,pj.z_b]].forEach(function(c){var b=pr(c[0],P.scrim_y,c[1]);o+=ln(pa[0],pa[1],b[0],b[1],{c:'#8944ab',w:0.8,d:'4 3'});});
 o+=poly([[-0.5,pj.yp-0.4,hp-0.25],[0.5,pj.yp-0.4,hp-0.25],[0.5,pj.yp-0.4,hp],[-0.5,pj.yp-0.4,hp]],'#8944ab','#5a2d73');
 var ps=pr(0,pj.yp,0);o+=ln(pa[0],pa[1],ps[0],ps[1],{c:'#8944ab',w:2});
 // 프로시니엄 (앞)
 var fw=function(x0,x1,z0,z1){return poly([[x0,0,z0],[x1,0,z0],[x1,0,z1],[x0,0,z1]],'#e9e9ee','#8e8e93',0.85);};
 o+=fw(-10,-7.4,0,9.8)+fw(7.4,10,0,9.8)+fw(-7.4,7.4,8.2,9.8);
 var lab=function(x,y,z,s2,c){var a=pr(x,y,z);return t(a[0],a[1],s2,{s:11,w:700,c:c||'#1d1d1f'});};
 o+=lab(0,0.5,9.2,'프로시니엄','#6e6e73')+lab(0,P.scrim_y,9.7,'샤막 15×9m','#8944ab')+lab(0,10.0,3.1,'3단 · Gt / E.B / Dr / 모둠북 / 건반 2')+lab(-4.2,8.7,2.4,'2단 코러스 4석','#6e6e73')+lab(3.7,8.7,2.0,'2단 국악 4인','#c93400')+lab(0,6.9,1.7,'1단 스트링 10인','#0071e3')+lab(0,2.9,0.5,'DSC 연기 공간 (1번 국악 · 보컬 · 코러스 · 앙상블)','#6e6e73')+lab(0,pj.yp,hp+0.6,'프로젝터 3.0m · 빔 영사 범위','#8944ab')+lab(0,P.cyc,8.5,'하늘막');
 o+=t(34,30,'SP-04  축측도 (사투영: 객석 좌측 위에서 본 모습)',{s:16,w:700,a:'start'})+t(34,50,'단 높이는 안 A 기준. 연기 공간, 샤막, 하늘막, 후방 프로젝터의 위치 관계를 입체로 확인합니다',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-05 덧마루 층별 배열 (안 A, 연속 구성) ---------- */
var COLS={'1800×1800':'#9DC3E6','900×2700 쌍':'#C6E0B4','1200×1800':'#FFD966','900×1800':'#F4B6C2','600×1800':'#D9C2E9','300×1800':'#CFCFD6'};
D1.risers=function(){
 var sc=78,x0=170,W=1240,rows=K.layout,rh=46,H=120+rows.length*(rh+12)+110,o=open(W,H);
 o+=t(34,30,'SP-05  덧마루 층별 배열도 (안 A: 15cm 단위 3단, 폭 13.2m 연속)',{s:16,w:700,a:'start'})+t(34,50,'각 층은 폭 13.2m × 깊이 1.8m. 극장 보유 덧마루(깊이 1800 기준)를 모두 사용한 배열 예이며 위아래 층의 이음매는 어긋나게 쌓습니다',{s:11,c:'#6e6e73',a:'start'});
 o+=dimH(x0,x0+13.2*sc,86,'13.2m');
 rows.forEach(function(r,i){var y=100+i*(rh+12),x=x0;o+=t(x0-12,y+rh/2+4,r.tier+' '+r.layer+'층',{s:12,w:700,a:'end'});
  r.pieces.forEach(function(p,k){var u=r.units[k],w=u*0.3*sc;o+=rc(x,y,w-1.5,rh,{f:COLS[p],s:'#6e6e73',sw:1,rx:3})+t(x+w/2-0.7,y+rh/2+4,p==='900×2700 쌍'?'2700':p.split('×')[0],{s:w>34?11:8,w:600});x+=w;});});
 var ly=100+rows.length*(rh+12)+14,lx=x0;Object.keys(COLS).forEach(function(k){o+=rc(lx,ly,16,16,{f:COLS[k],s:'#6e6e73',rx:3})+t(lx+22,ly+13,k,{s:11,a:'start'});lx+=150;});
 o+=t(x0,ly+44,'표기: 칸의 숫자는 폭(mm). 900×2700은 2장을 나란히 놓아 깊이 1.8m를 맞춥니다. 모든 보유 모듈의 깊이 방향이 1800이 되도록 배치했습니다',{s:11,c:'#6e6e73',a:'start'});
 return o+'</svg>';
};

/* ---------- SP-06 영사 기하 (평면 개략) ---------- */
D1.proj=function(){
 var s=46,W=700,H=720,ox=350,oy=660,pj=K.proj;
 function X(x){return ox+x*s;} function Y(y){return oy-y*s;}
 var o=open(W,H);
 o+=rc(X(-7.3),Y(13.5),14.6*s,13.5*s,{f:'#fafafc',s:'#8e8e93'});
 o+=ln(X(-7.5),Y(P.scrim_y),X(7.5),Y(P.scrim_y),{c:'#8944ab',w:6})+t(X(0),Y(P.scrim_y)+20,'샤막 W15.0m (y 1.18m)',{s:12,c:'#8944ab',w:700});
 T.forEach(function(q,i){o+=rc(X(-6.6),Y(q.y1),13.2*s,1.8*s,{f:['#ececef','#e2e2e6','#d6d6dc'][i],s:'#8e8e93'});});
 o+='<polygon points="'+X(0)+','+Y(pj.yp)+' '+X(-7.5)+','+Y(P.scrim_y)+' '+X(7.5)+','+Y(P.scrim_y)+'" fill="#8944ab" opacity="0.10"/>'+ln(X(0),Y(pj.yp),X(-7.5),Y(P.scrim_y),{c:'#8944ab',d:'5 3'})+ln(X(0),Y(pj.yp),X(7.5),Y(P.scrim_y),{c:'#8944ab',d:'5 3'});
 o+=rc(X(-0.5),Y(pj.yp)-8,1.0*s,16,{f:'#8944ab',rx:3})+t(X(0),Y(pj.yp)-14,'프로젝터 (y '+pj.yp+'m)',{s:12,c:'#8944ab',w:700});
 o+=dimV(X(-8.2),Y(P.scrim_y),Y(pj.yp),'투사 거리 '+pj.d+'m',{c:'#8944ab',s:12});
 o+=dimH(X(-7.5),X(7.5),Y(P.scrim_y)+44,'영상 폭 15.0m (화면 가득)',{c:'#8944ab',s:12});
 o+=t(X(0),Y(7.5),'투사비 '+pj.ratio+' : 1',{s:20,w:700,c:'#8944ab'})+t(X(0),Y(7.5)+22,'(투사 거리 ÷ 영상 폭, 와이드 렌즈 계열)',{s:11,c:'#6e6e73'});
 o+=t(20,28,'SP-06  영사 기하 (평면 개략)',{s:15,w:700,a:'start'});
 return o+'</svg>';
};
})();
