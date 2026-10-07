/* 무대 배치도 생성기: 빛고을시민문화관 도면(BGC-G-A1, 1/100)과 Theatre Technical Information 수치 기준
   좌표계: 원점 = 중심선(CL)과 영점선(ZL)의 교점. x(+) = 무대 좌측(SL), y(+) = 뒤(Upstage). 평면도는 객석이 아래, SR이 화면 왼쪽(극장 도면과 동일) */
(function(){
var NS=window.NS, D=NS.D;
var FULLBACK=['band','drums','strings','gugak_back'];
var ST={
 'P':{present:[]},
 'V1':{present:['gugak_center','band','drums','strings']},
 'MC1':{present:['gugak_center','band','drums','strings']},
 '1':{play:['gugak_center','band','drums'],present:['strings']},
 'MC2':{present:FULLBACK,move:true},
 '2':{play:['band','drums'],present:['strings','gugak_back']},
 '3':{play:['vocal','chorus','band','drums','strings'],present:['gugak_back']},
 '4':{play:['vocal','band','drums','strings'],present:['gugak_back']},
 '5':{play:['vocal','chorus','band','drums','strings'],present:['gugak_back']},
 '6':{play:['vocal','chorus','band','drums','strings'],present:['gugak_back']},
 '7':{play:['vocal','band','drums','strings'],present:['gugak_back']},
 '8':{play:['vocal','chorus','band','drums','strings'],present:['gugak_back']},
 '9':{play:['duo','chorus'].concat(FULLBACK)},
 '10':{play:['duo','chorus'].concat(FULLBACK)},
 '11':{play:['perc','drums','band'],present:['strings','gugak_back']},
 '12':{play:['ensemble'].concat(FULLBACK)},
 '13':{play:['ensemble'].concat(FULLBACK)},
 '14':{play:['ensemble','pungmul'].concat(FULLBACK)}
};
function stateOf(c,g,master){
 if(master)return 'play';
 var s=ST[c.code]||{present:FULLBACK};
 if((s.play||[]).indexOf(g)>=0)return 'play';
 if((s.present||[]).indexOf(g)>=0)return 'present';
 if(c.kind==='mc'||c.kind==='video'){ if(FULLBACK.indexOf(g)>=0)return 'present'; }
 return 'none';
}
var SC=40, OX=404, OY=624;
function X(x){return OX+x*SC;} function Y(y){return OY-y*SC;}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function T(x,y,txt,o){o=o||{};return '<text x="'+X(x)+'" y="'+Y(y)+'" text-anchor="'+(o.a||'middle')+'" font-size="'+(o.s||11)+'" font-weight="'+(o.w||500)+'" fill="'+(o.c||'#1d1d1f')+'"'+(o.r?' transform="rotate('+o.r+' '+X(x)+' '+Y(y)+')"':'')+'>'+esc(txt)+'</text>';}
function R(x,y,w,h,o){o=o||{};return '<rect x="'+X(x)+'" y="'+Y(y)+'" width="'+(w*SC)+'" height="'+(h*SC)+'" rx="'+(o.rx||0)+'" fill="'+(o.f||'none')+'" stroke="'+(o.s||'none')+'" stroke-width="'+(o.sw||1)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+(o.op?' opacity="'+o.op+'"':'')+'/>';}
function C(x,y,r,o){o=o||{};return '<circle cx="'+X(x)+'" cy="'+Y(y)+'" r="'+(r*SC)+'" fill="'+(o.f||'none')+'" stroke="'+(o.s||'none')+'" stroke-width="'+(o.sw||1)+'"'+(o.op?' opacity="'+o.op+'"':'')+'/>';}
function L(x1,y1,x2,y2,o){o=o||{};return '<line x1="'+X(x1)+'" y1="'+Y(y1)+'" x2="'+X(x2)+'" y2="'+Y(y2)+'" stroke="'+(o.c||'#999')+'" stroke-width="'+(o.w||1)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+(o.op?' opacity="'+o.op+'"':'')+'/>';}
var KC={safety:'#999',curtain:'#7b6fd6',set:'#c9c9ce',light:'#e08a00',shell:'#6aa3d9',screen:'#bbb',draw:'#7b6fd6',cyc:'#333',info:'#ccc'};

/* 덧마루 30×3 내모임형 지오메트리: 중앙부 직선 + 좌우 날개(전면 내측 모서리를 축으로 객석 쪽으로 th° 회전) */
var RG=D.plan.riser,GH=RG.Wc/2,GC=Math.cos(RG.th*Math.PI/180),GS=Math.sin(RG.th*Math.PI/180);
function tp(x,k,off){var a=Math.abs(x),sg=x<0?-1:1,d=k*RG.D+off;if(a<GH)return [x,RG.yF+d];var q=a-GH;return [sg*(GH+q*GC+d*GS),RG.yF-q*GS+d*GC];}
function PG(pts,o){o=o||{};return '<polygon points="'+pts.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join(' ')+'" fill="'+(o.f||'none')+'" stroke="'+(o.s||'none')+'" stroke-width="'+(o.sw||1)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+(o.op?' opacity="'+o.op+'"':'')+'/>';}
function RR(x0,x1,k,f0,f1,o){return PG([tp(x0,k,f0),tp(x1,k,f0),tp(x1,k,f1),tp(x0,k,f1)],o);}
NS.geo={tp:tp,GH:GH,GC:GC,GS:GS,RG:RG};

NS.planSvg=function(c,opt){
 opt=opt||{};var master=!!opt.master,cp=!!opt.compact;
 c=c||{code:'',kind:'song',mics:[],scrim:'up'};
 var fs=cp?15:11, o='';
 var vb=cp?[0,OY-12.1*SC-10,OX*2,(12.1+3.3)*SC+20]:[0,-32,960,822];
 o+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+vb.join(' ')+'" font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif" role="img" aria-label="무대 평면도">';
 o+='<rect x="'+vb[0]+'" y="'+vb[1]+'" width="'+vb[2]+'" height="'+vb[3]+'" fill="#fff"/>';
 // 1m grid
 for(var gx=-9;gx<=9;gx++)o+=L(gx,-2.2,gx,14.6,{c:'#eee',w:gx%5===0?1.2:.6});
 for(var gy=-2;gy<=14;gy++)o+=L(-9.6,gy,9.6,gy,{c:'#eee',w:gy%5===0?1.2:.6});
 // 공연 영역과 측무대
 o+=R(-7.3,13.5,14.6,13.5,{f:'#fafafa',s:'#8e8e93',sw:1.2});
 o+=R(-9.6,9.5,2.3,9.5,{f:'#f5f5f7',s:'#d2d2d7'})+R(7.3,9.5,2.3,9.5,{f:'#f5f5f7',s:'#d2d2d7'});
 o+=R(-7.4,0,14.8,1.915,{f:'#f3f3f6',s:'#8e8e93'});
 o+='<line x1="'+X(-9.8)+'" y1="'+Y(0)+'" x2="'+X(-7.4)+'" y2="'+Y(0)+'" stroke="#1d1d1f" stroke-width="5"/><line x1="'+X(7.4)+'" y1="'+Y(0)+'" x2="'+X(9.8)+'" y2="'+Y(0)+'" stroke="#1d1d1f" stroke-width="5"/>';
 o+=T(0,-0.95,'APRON · 무대 앞선 −1.915m',{s:fs-1,c:'#86868b'});
 o+=T(0,-2.7,'▼  객석 (AUDIENCE)',{s:fs+1,w:700,c:'#6e6e73'});
 o+=T(-8.5,10.8,'SR 윙',{s:fs+1,w:700,c:'#0071e3'})+T(8.5,10.8,'SL 윙',{s:fs+1,w:700,c:'#0071e3'});
 // 바텐
 var lines=D.plan.lines;
 lines.forEach(function(l){
  var y=l[2],k=l[3],col=KC[k]||'#ccc',w=(k==='light'||k==='cyc')?1.6:1;
  if(cp&&k!=='cyc'&&k!=='light'&&l[0]!==3)return;
  o+=L(-8.5,y,8.5,y,{c:col,w:w,d:(k==='set'||k==='info')?'3 3':null,op:cp?.5:1});
  if(!cp)o+='<text x="'+X(9.75)+'" y="'+(Y(y)+3)+'" font-size="8.5" fill="#6e6e73">'+(l[0]>0?l[0]+' ':'')+esc(l[1])+' '+y.toFixed(2)+'</text>';
 });
 // 샤막
 var sd=(master||c.scrim==='down');
 o+=L(-7.5,1.18,7.5,1.18,{c:'#8944ab',w:sd?6:3,op:sd?1:.55,d:sd?null:'8 5'});
 if(!cp)o+=T(-7.0,1.5,'샤막 W15×H9 (#1 장치봉 1.18m, 안)',{a:'start',s:fs-1,c:'#8944ab',w:600});
 // 덧마루 30×3 내모임형 (중앙부 + 좌우 날개 + 쐐기 보정판)
 var tiers=D.plan.tiers;var m1=(tiers[0].y0+tiers[0].y1)/2,m2=(tiers[1].y0+tiers[1].y1)/2,m3=(tiers[2].y0+tiers[2].y1)/2,yTop=tiers[2].y1,yBot=tiers[0].y0;
 var TF=['#ececef','#e2e2e6','#d6d6dc'];
 [-1,1].forEach(function(sg){var bi=[sg*(GH+RG.N*RG.D*GS),RG.yF+RG.N*RG.D*GC];o+=PG([[sg*GH,RG.yF],[sg*GH,yTop],bi],{f:'#fdecea',s:'#c0392b',sw:1,d:'4 3',op:cp?.8:1});});
 tiers.forEach(function(t,i){
  o+=R(-GH,t.y1,GH*2,RG.D,{f:TF[i],s:'#8e8e93',sw:1,op:cp?.9:1});
  [-1,1].forEach(function(sg){o+=RR(sg*GH,sg*(GH+RG.Lw),i,0,RG.D,{f:TF[i],s:'#8e8e93',sw:1,op:cp?.9:1});});
 });
 [-1,1].forEach(function(sg){o+='<circle cx="'+X(sg*GH)+'" cy="'+Y(RG.yF)+'" r="3.5" fill="#fff" stroke="#c0392b" stroke-width="1.6"/>';});
 o+=R(-D.plan.xout,12.93,D.plan.xout*2,12.93-yTop,{f:'#eef5ff',s:'none'});
 if(!cp){
  [-1,1].forEach(function(sg){var xs=sg*(GH+RG.Lw);o+=RR(xs,xs+sg*0.6,0,0,RG.D,{f:'#fff',s:'#0071e3',sw:1.2,d:'3 2'});var q=tp(xs+sg*0.3,0,RG.D/2);o+=T(q[0],q[1]-0.05,'승강',{s:8,c:'#0071e3',w:700});});
  o+=L(-7.15,1.18,-7.15,yBot,{c:'#1d1d1f',w:1})+L(-7.3,1.18,-7.0,1.18,{c:'#1d1d1f',w:1})+L(-7.3,yBot,-7.0,yBot,{c:'#1d1d1f',w:1})+T(-7.25,(1.18+yBot)/2,'연기 공간 '+(yBot-1.18).toFixed(1)+'m (샤막~1단)',{s:9,c:'#1d1d1f',w:600,r:-90});
  [['1단 +0.30',0],['2단 +0.60',1],['3단 +0.90',2]].forEach(function(l){o+=R(-6.55+l[1]*1.9,12.55,0.3,0.25,{f:TF[l[1]],s:'#8e8e93',sw:1})+T(-6.15+l[1]*1.9,12.34,l[0]+'m',{s:9,c:'#6e6e73',w:700,a:'start'});});
  o+=L(7.0,yTop,7.0,12.93,{c:'#0071e3',w:1.5})+L(6.8,yTop,7.2,yTop,{c:'#0071e3',w:1.5})+L(6.8,12.93,7.2,12.93,{c:'#0071e3',w:1.5})+T(7.15,(yTop+12.93)/2,'후방 간격 '+(12.93-yTop).toFixed(1)+'m · 후방 통로',{a:'start',s:9,c:'#0071e3',w:700});
 }
 function g(name,svgStr,label,lx,ly){var s=stateOf(c,name,master);if(s==='none')return '';var op=s==='play'?1:.38;return '<g opacity="'+op+'">'+svgStr+(s==='play'||master?(label?T(lx,ly,label,{s:fs-(cp?1:1),w:700}):''):'')+'</g>';}
 // 국악기 중앙 (1번)
 var gc=R(-3.4,4.3,6.8,3.0,{f:'#fff7ec',s:'#c93400',sw:1,d:'5 3'});
 [['가야금',-2.4],['아쟁',-1.2],['대금',0],['피리',1.2],['모둠북',2.4]].forEach(function(p){gc+=C(p[1],3.0,.34,{f:'#c93400'})+T(p[1],2.35,p[0],{s:fs-3,c:'#c93400'});});
 o+=g('gugak_center',gc,master?'1번 돗자리 6.8×3.0m':'국악기 5인 · 돗자리 6.8×3.0m (1번)',0,master?4.05:3.75);
 var LY=D.plan.layout;
 // 국악기 (2단 우측: 대금 · 피리 · 가야금 · 아쟁)
 var gb='';LY.t2g.forEach(function(it){var q=tp(it.x,1,it.o);gb+=C(q[0],q[1],.17,{f:'#c93400'})+T(q[0],q[1]-0.4,it.l,{s:fs-4,c:'#c93400'});});gb+=T(tp(3.75,1,1.25)[0],tp(3.75,1,1.25)[1],'국악기 4인',{s:cp?11:9,c:'#c93400',w:700});
 o+=g('gugak_back',gb,'',0,0);
 // 스트링 (1단 앞줄: Vn 4, Va 2, Vc 4)
 var sg='';LY.t1.forEach(function(it){var p0=tp(it.x-.25,0,0.7),p1=tp(it.x+.25,0,0.7),p2=tp(it.x+.25,0,1.27),p3=tp(it.x-.25,0,1.27),q=tp(it.x,0,0.3);sg+=PG([p0,p1,p2,p3],{f:'#0071e3'})+T(q[0],q[1],it.l,{s:fs-4,c:'#0071e3'});});
 o+=g('strings',sg,'스트링 10인 (Vn 4 · Va 2 · Vc 4)',0,tiers[0].y0-0.25);
 // 3단: Gt · E.B · Dr · 모둠북 · 건반 2
 var bd='',dr='',pc='';
 LY.t3.forEach(function(it){
  var q=tp(it.x,2,0.75),ql=tp(it.x,2,0.3);
  if(it.k==='gt'||it.k==='eb'){q=tp(it.x,2,1.05);bd+=C(q[0],q[1],.25,{f:'#1d1d1f'})+T(ql[0],ql[1],it.l,{s:fs-3});}
  else if(it.k==='kb'){bd+=RR(it.x-.65,it.x+.65,2,0.85,1.25,{f:'#1d1d1f'})+T(ql[0],ql[1]+0.1,it.l,{s:fs-3});}
  else if(it.k==='dr'){dr=C(q[0],q[1],.62,{f:'#1d1d1f',op:.85})+T(q[0],q[1]-0.04,'Dr',{s:fs-2,c:'#fff',w:700});}
  else if(it.k==='pc'){var q1=tp(it.x-0.33,2,0.75),q2=tp(it.x+0.33,2,0.75);pc=C(q1[0],q1[1],.3,{f:'#c93400'})+C(q2[0],q2[1],.3,{f:'#c93400'})+T(q[0]+0.03,ql[1],it.l,{s:fs-3,c:'#c93400'});}
 });
 o+=g('band',bd,'3단: Gt · E.B · Dr · 모둠북 · 건반 2',0,yTop+0.4);
 o+=g('drums',dr,'',0,0);
 o+=g('perc',pc,'',0,0);
 // 보컬
 var v=c.vocals||[];
 var vs=C(0,1.9,.35,{f:'#0071e3'})+T(0,1.0,v[0]||'보컬',{s:fs-2,c:'#0071e3',w:700})+((c.code==='5'||c.code==='7')?T(0,1.45,'스탠드 마이크',{s:fs-4,c:'#0071e3'}):'');
 o+=g('vocal',vs,'',0,0);
 var dv=C(2.2,1.9,.35,{f:'#0071e3'})+C(-2.2,1.9,.35,{f:'#0071e3'})+T(2.2,1.0,v[0]||'',{s:fs-2,c:'#0071e3',w:700})+T(-2.2,1.0,v[1]||'',{s:fs-2,c:'#0071e3',w:700});
 o+=g('duo',dv,'',0,0);
 var cn=master?4:(c.chorus||0);
 var ch='';LY.t2c.forEach(function(c2,k){var qs=tp(c2.x,1,c2.o+0.32),qm=tp(c2.x,1,c2.o);ch+='<circle cx="'+X(qs[0])+'" cy="'+Y(qs[1])+'" r="4" fill="none" stroke="#6e6e73" stroke-width="1.5"/><line x1="'+X(qs[0])+'" y1="'+Y(qs[1])+'" x2="'+X(qm[0])+'" y2="'+Y(qm[1]+0.15)+'" stroke="#6e6e73" stroke-width="1.5"/>'+((k<cn&&!master)?C(qm[0],qm[1],.17,{f:'#6e6e73'}):C(qm[0],qm[1],.17,{f:'none',s:'#b9b9c0'}));});
 if(cn>0||master)o+=g('chorus',ch+T(tp(-3.75,1,1.25)[0],tp(-3.75,1,1.25)[1],master?'코러스 4석 · 스탠드 4':'코러스 '+cn+'명 · 스탠드 4',{s:cp?11:9,w:700,c:'#6e6e73'}),'',0,0);
 var en='';for(var i=-3;i<=3;i++){en+=C(i*1.0,3.4,.28,{f:'#1d1d1f'})+C(i*1.0,2.4,.28,{f:'#1d1d1f'});}
 if(!master)o+=g('ensemble',en+T(0,4.1,'보컬 앙상블 14명 (2열×7)',{s:fs-1,w:700}),'',0,0);
 var pm=[[-8.3,4.1],[-8.3,4.9],[8.3,4.1],[8.3,4.9]].map(function(p){return C(p[0],p[1],.3,{f:'#8944ab'});}).join('');
 o+=g('pungmul',pm+T(-8.3,3.5,'풍물 2',{s:fs-3,c:'#8944ab',w:700})+T(8.3,3.5,'풍물 2',{s:fs-3,c:'#8944ab',w:700}),'',0,0);
 // 사회자
 if(c.kind==='mc'||master){
  var w=c.wing||'';var mx=w.indexOf('센터')>=0?0:(w.indexOf('좌측')>=0?2.2:(w.indexOf('우측')>=0?-2.2:0));
  if(master){[-2.2,0,2.2].forEach(function(x){o+=C(x,0.55,.3,{f:'none',s:'#0071e3',sw:2});});o+=T(0,-0.1,'사회자 위치 3곳 (DSC 우측 · 센터 · 좌측)',{s:fs-1,c:'#0071e3',w:700});}
  else{o+=C(mx,0.55,.32,{f:'#0071e3'})+T(mx,-0.12,'사회자',{s:fs-1,c:'#0071e3',w:700});}
 }
 // 국악기 이동 화살표 (MC2)
 if((ST[c.code]||{}).move)o+=L(0,3.0,3.0,7.4,{c:'#c93400',w:3,d:'6 4'})+T(1.9,5.4,'2단 우측으로 이동',{s:fs-1,c:'#c93400',w:700});
 // 측무대 설비
 if(!cp||master){
  o+=R(-9.0,1.4,1.6,.7,{f:'#fff',s:'#1d1d1f'})+T(-8.2,1.1,'무대감독',{s:8.5,c:'#1d1d1f',w:600})+T(-8.2,.62,'인터컴 (SR)',{s:7.5,c:'#6e6e73'});
  o+=R(7.4,1.4,1.6,.7,{f:'#fff',s:'#1d1d1f'})+T(8.2,1.1,'인터컴',{s:8.5,c:'#1d1d1f',w:600})+T(8.2,.62,'(SL)',{s:7.5,c:'#6e6e73'});
  [[-8.6,6.7],[-8.6,9.7],[-8.6,3.7],[7.8,6.7],[7.8,9.7],[7.8,3.7]].forEach(function(p,i){});
  [[-8.6,7.0],[-8.6,10.0],[-8.6,2.8]].forEach(function(p){o+=R(p[0],p[1],1.0,1.0,{f:'#fff7ec',s:'#e08a00',sw:1});});
  [[7.6,7.0],[7.6,10.0],[7.6,2.8]].forEach(function(p){o+=R(p[0],p[1],1.0,1.0,{f:'#fff7ec',s:'#e08a00',sw:1});});
  o+=T(-8.1,6.4,'조명타워',{s:8,c:'#e08a00'})+T(8.1,6.4,'조명타워',{s:8,c:'#e08a00'});
  o+=L(-7.0,14.1,7.0,14.1,{c:'#0071e3',w:1.5,d:'6 4'})+T(0,14.3,'SR ↔ SL 후방 크로스오버 (화이트막 13.70m ~ 뒷벽 15.4m)',{s:fs-2,c:'#0071e3'});
  // 모니터
  o+=R(-3.3,1.2,.8,.5,{f:'#e5e5ea',s:'#8e8e93'})+R(2.5,1.2,.8,.5,{f:'#e5e5ea',s:'#8e8e93'})+T(0,0.95,'',{});
 }
 // 후방 프로젝터 영사 (개략)
 if(master||c.scrim==='down'){
  o+='<polygon points="'+X(0)+','+Y(14.9)+' '+X(-7.5)+','+Y(1.18)+' '+X(7.5)+','+Y(1.18)+'" fill="#8944ab" opacity="'+(master?.07:.1)+'"/>';
  o+=R(-0.5,15.0,1.0,.5,{f:'#8944ab'})+(master?T(0,15.45,'후방 프로젝터 (외부 반입 · 위치 확인)',{s:fs-1,c:'#8944ab',w:700}):'');
 }
 // 치수선
 if(!cp||master){
  o+=L(-7.3,-3.35,7.3,-3.35,{c:'#1d1d1f',w:1})+T(-1.5,-3.55,'프로시니엄 W14.8 × H8.2m · 공연 영역 W14.6 × D13.5m (197㎡)',{s:fs-1,c:'#1d1d1f',w:600});
 }
 // 축척 막대
 o+=L(-9.4,-2.0,-4.4,-2.0,{c:'#1d1d1f',w:3})+T(-6.9,-2.45,'5m',{s:fs-1,c:'#1d1d1f'});
 if(master){o+='<g><rect x="25" y="-26" width="250" height="82" rx="8" fill="#fff" stroke="#c9c9ce"/><text x="35" y="-8" font-size="11.5" font-weight="700" fill="#1d1d1f">DSC 연기 공간 사용 (y 1.3 ~ 4.3m)</text><text x="35" y="9" font-size="10.5" fill="#3a3a3c">· 1번 국악기 5인, 돗자리 6.8×3.0m</text><text x="35" y="24" font-size="10.5" fill="#3a3a3c">· 3~10번 보컬 + 코러스 스탠드 4개</text><text x="35" y="39" font-size="10.5" fill="#3a3a3c">· 12~14번 앙상블 14명, 2열×7</text></g><g><rect x="640" y="724" width="305" height="60" fill="#fff" stroke="#1d1d1f" stroke-width="1.2"/><line x1="610" y1="744" x2="945" y2="744" stroke="#1d1d1f"/><text x="620" y="738" font-size="12" font-weight="700" fill="#1d1d1f">NEXT STAGE 무대 배치도 (평면)</text><text x="620" y="760" font-size="10" fill="#3a3a3c">빛고을시민문화관 공연장 · 2026.10.07 19:30</text><text x="620" y="775" font-size="10" fill="#3a3a3c">기준 BGC-G-A1 (1/100) · 최종 10/6 · 단 위치 배치안</text></g>';}
 return o+'</svg>';
};
NS.stageSvg=function(c){return NS.planSvg(c,{compact:true});};
var FIXLBL={band:'밴드(Gt · E.B · 건반 2)',drums:'드럼',strings:'스트링 10인(1단)',gugak_back:'국악기 4인(2단)',perc:'모둠북(3단)'};
NS.fixedOf=function(c){var s=ST[c.code];if(!s||!s.play)return '—';var a=[];(s.play||[]).forEach(function(g){if(FIXLBL[g])a.push(FIXLBL[g]);});if(c.chorus)a.push('코러스 '+c.chorus+'명(2단 스탠드)');return a.length?a.join(' · '):'—';};
NS.movingOf=function(c){
 if(c.kind==='mc')return '사회자';
 if(c.kind!=='song')return '—';
 var a=[];
 if(c.code==='1')a.push('국악기 5인(무대 중앙)');
 if(c.vocals&&c.vocals.length)a.push('보컬 '+c.vocals.join(' · '));
 if(c.code==='12'||c.code==='13')a.push('보컬 앙상블 14명');
 if(c.code==='14'){a.push('풍물 4인(약 4분)');a.push('보컬 앙상블 14명');}
 return a.length?a.join(' · '):'—';
};


/* 공연 런다운 보드: 전체 흐름과 진행 위치를 한 장으로 */
var SHORT={'P':['입장','하우스 오픈',''],'V1':['오프닝 영상','',''],'MC1':['사회 ①','오프닝',''],'MC2':['사회 ②','The De’but 소개',''],'MC3':['사회 ③','3 · 4 · 5번 소개',''],'MC4':['사회 ④','6 · 7 · 8번 소개',''],'MC5':['사회 ⑤','중간 영상 소개',''],'V2':['중간 영상','',''],'MC6':['사회 ⑥','타악 협주곡 소개',''],'MC7':['사회 ⑦','12 · 13번 안내',''],'V3':['파이널 영상','',''],'MC8':['사회 ⑧','클로징',''],
'1':['산조, 새로운 울림','국악 5인 중앙','국악 마이킹'],'2':['The De’but','밴드',''],'3':['태양물고기','신한비','무선1 · 코러스3'],'4':['첫 눈처럼 너에게 가겠다','박민규','무선1 · 코러스3'],'5':['Valerie','임지륜','스탠드1 · 코러스4'],'6':['첫인상','김가희','무선1 · 코러스3'],'7':['I Fall In Love Too Easily','주권기','스탠드1'],'8':['이 밤이 지나면','강산','무선1 · 코러스4'],'9':['신사랑가','박설온 · 김영수','무선2 · 코러스2'],'10':['홀로 아리랑','김가희 · 신한비','무선2 · 코러스2'],'11':['타악기 협주곡','모둠북 · 드럼',''],'12':['네모의 꿈','앙상블 14명','구성 확인'],'13':['I Want You Back','앙상블 14명',''],'14':['풍물 · 아름다운나라','풍물 · 앙상블 14명','']};
function wrapT(t,max){var w=t.split(' '),lines=[],cur='',cw=0;function ew(s){var n=0;for(var i=0;i<s.length;i++)n+=/[\u3131-\uD79D]/.test(s[i])?16:8.5;return n;}
 w.forEach(function(x){var xw=ew(x)+(cur?4:0);if(cur&&cw+xw>max){lines.push(cur);cur=x;cw=ew(x);}else{cur=cur?cur+' '+x:x;cw+=xw;}});if(cur)lines.push(cur);return lines.slice(0,3);}
var KCOL={song:'#1d1d1f',mc:'#0071e3',video:'#8944ab',pre:'#8e8e93'};
NS.rundownSvg=function(o){
 o=o||{};var C=D.cues,idx=(o.idx===undefined?-1:o.idx),W=1250,cw=134,ch=142,gap=14,x0=25;
 var rows=[[0,7,'오프닝 · 산조 · 밴드'],[7,15,'보컬 3곡 연속 두 구간'],[15,21,'중간 영상 · 듀엣 · 타악 협주'],[21,26,'피날레']];
 var songs=C.filter(function(c){return c.kind==='song';}),doneSongs=songs.filter(function(c){return C.indexOf(c)<idx;}).length;
 var H=96+4*(ch+52)+40,s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif" role="img" aria-label="공연 런다운">';
 s+='<rect width="'+W+'" height="'+H+'" fill="#fff"/>';
 s+='<text x="25" y="38" font-size="22" font-weight="700" fill="#1d1d1f">NEXT STAGE 공연 런다운</text><text x="25" y="60" font-size="13" fill="#6e6e73">2026.10.07 19:30 · 빛고을시민문화관 · 인터미션 없이 논스톱 · 곡 14 · 사회 8 · 영상 3</text>';
 if(idx>=0){var pct=(idx+1)/C.length;s+='<text x="'+(W-25)+'" y="38" font-size="15" font-weight="700" fill="#1d1d1f" text-anchor="end">곡 '+doneSongs+' / 14 완료 · 큐 '+(idx+1)+' / '+C.length+'</text><rect x="'+(W-325)+'" y="48" width="300" height="8" rx="4" fill="#e5e5ea"/><rect x="'+(W-325)+'" y="48" width="'+(300*pct)+'" height="8" rx="4" fill="#248a3d"/>';}
 rows.forEach(function(r,ri){
  var y0=96+ri*(ch+52);
  s+='<text x="25" y="'+(y0-12)+'" font-size="15" font-weight="700" fill="#6e6e73">'+String.fromCharCode(65+ri)+'  ·  '+r[2]+'</text>';
  // 무지연 연결 구간 표시
  var i=r[0];
  while(i<r[1]){var c=C[i],nxt=C[i+1],chain=(c.direct||(c.kind==='video'&&nxt&&nxt.kind==='song'));
   if(chain&&i+1<r[1]+0){var j=i;while(j+1<r[1]&&(C[j].direct||(C[j].kind==='video'&&C[j+1]&&C[j+1].kind==='song')))j++;
    var xa=x0+(i-r[0])*(cw+gap),xb=x0+(j-r[0])*(cw+gap)+cw;
    s+='<rect x="'+(xa-4)+'" y="'+(y0-4)+'" width="'+(xb-xa+8)+'" height="'+(ch+8+26)+'" rx="14" fill="none" stroke="#d70015" stroke-width="1.6" stroke-dasharray="5 4"/><text x="'+((xa+xb)/2)+'" y="'+(y0+ch+24)+'" font-size="12" font-weight="700" fill="#d70015" text-anchor="middle">무지연 연결</text>';
    i=j+1;}else i++;}
  for(var k=r[0];k<r[1];k++){
   var c=C[k],sh=SHORT[c.code]||[c.title,'',''],x=x0+(k-r[0])*(cw+gap),col=KCOL[c.kind]||'#999',cur=(k===idx),done=(idx>=0&&k<idx);
   s+='<g data-i="'+k+'" style="cursor:pointer">';
   s+='<rect x="'+x+'" y="'+y0+'" width="'+cw+'" height="'+ch+'" rx="14" fill="'+(done?'#f5f5f7':'#fff')+'" stroke="'+(cur?'#0071e3':'#d2d2d7')+'" stroke-width="'+(cur?3.5:1.2)+'"/>';
   s+='<path d="M'+(x+14)+' '+y0+'h'+(cw-28)+'a14 14 0 0 1 14 14v0h-'+cw+'v0a14 14 0 0 1 14 -14z" fill="'+col+'" opacity="'+(done?.35:1)+'"/>';
   var lab=c.kind==='song'?'곡 '+c.code:c.kind==='mc'?'사회':c.kind==='video'?'영상':'입장';
   s+='<text x="'+(x+14)+'" y="'+(y0+12)+'" font-size="11.5" font-weight="700" fill="#fff" opacity="'+(done?.8:1)+'">'+lab+'</text>';
   if(c.scrim==='down')s+='<text x="'+(x+cw-12)+'" y="'+(y0+12)+'" font-size="11" font-weight="700" fill="#fff" text-anchor="end">샤막↓</text>';
   var tl=wrapT(sh[0],cw-24);
   tl.forEach(function(t,ti){s+='<text x="'+(x+12)+'" y="'+(y0+46+ti*21)+'" font-size="16.5" font-weight="700" fill="'+(done?'#86868b':'#1d1d1f')+'">'+esc(t)+'</text>';});
   var sy=y0+46+tl.length*21+2;
   if(sh[1])s+='<text x="'+(x+12)+'" y="'+sy+'" font-size="13" fill="#6e6e73">'+esc(sh[1].length>11?sh[1].slice(0,11):sh[1])+'</text>';
   if(sh[2])s+='<text x="'+(x+12)+'" y="'+(sy+18)+'" font-size="12" font-weight="600" fill="'+(sh[2].indexOf('확인')>=0?'#c93400':'#0071e3')+'">'+esc(sh[2])+'</text>';
   if(done)s+='<circle cx="'+(x+cw-16)+'" cy="'+(y0+ch-16)+'" r="9" fill="#248a3d"/><path d="M'+(x+cw-20)+' '+(y0+ch-16)+'l3 3 6 -6" stroke="#fff" stroke-width="2" fill="none"/>';
   if(cur)s+='<rect x="'+(x+cw-48)+'" y="'+(y0+ch-26)+'" width="40" height="18" rx="9" fill="#0071e3"/><text x="'+(x+cw-28)+'" y="'+(y0+ch-13)+'" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">현재</text>';
   if(k<r[1]-1)s+='<path d="M'+(x+cw+2)+' '+(y0+ch/2)+'h'+(gap-4)+'" stroke="#c9c9ce" stroke-width="2"/>';
   s+='</g>';
  }
 });
 var ly=H-22,lx=25;[['곡','#1d1d1f'],['사회','#0071e3'],['영상','#8944ab'],['입장','#8e8e93']].forEach(function(l){s+='<rect x="'+lx+'" y="'+(ly-10)+'" width="14" height="14" rx="4" fill="'+l[1]+'"/><text x="'+(lx+20)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73">'+l[0]+'</text>';lx+=70;});
 s+='<rect x="'+lx+'" y="'+(ly-10)+'" width="22" height="14" rx="5" fill="none" stroke="#d70015" stroke-dasharray="4 3"/><text x="'+(lx+28)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73">무지연 연결 (사회 없이 이어짐)</text>';
 s+='<text x="'+(W-25)+'" y="'+(ly+2)+'" font-size="12" fill="#6e6e73" text-anchor="end">샤막↓ = 샤막을 내려 영상 영사 · 막이 올라가면 풀 무대</text>';
 return s+'</svg>';
};

/* 단면도: 덧마루 30×3 (30 / 60 / 90cm). 1 · 2단 15cm × 2겹, 3단 30cm 1장, 2 · 3단은 받침 장치로 지지 */
NS.sectionSvg=function(h,title){
 h=h||0.30;
 var s=52,ox=40,oy=520;function x(y){return ox+(y+2.2)*s;}function z(v){return oy-v*s;}
 var o='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 580" font-family="Pretendard Variable,Pretendard,Apple SD Gothic Neo,sans-serif" role="img" aria-label="무대 단면도">';
 o+='<rect width="900" height="580" fill="#fff"/>';
 for(var m=0;m<=9;m++)o+='<line x1="'+x(-2.2)+'" y1="'+z(m)+'" x2="'+x(14)+'" y2="'+z(m)+'" stroke="#eee"/><text x="'+(ox-6)+'" y="'+(z(m)+3)+'" font-size="9" fill="#86868b" text-anchor="end">'+m+'m</text>';
 o+='<line x1="'+x(-1.915)+'" y1="'+z(0)+'" x2="'+x(13.7)+'" y2="'+z(0)+'" stroke="#1d1d1f" stroke-width="3"/>';
 o+='<line x1="'+x(0)+'" y1="'+z(8.2)+'" x2="'+x(0)+'" y2="'+z(9.5)+'" stroke="#1d1d1f" stroke-width="5"/><text x="'+x(0)+'" y="'+(z(9.5)-6)+'" font-size="10" fill="#1d1d1f" text-anchor="middle">프로시니엄 상단 8.2m</text>';
 o+='<line x1="'+x(1.18)+'" y1="'+z(0.0)+'" x2="'+x(1.18)+'" y2="'+z(9.0)+'" stroke="#8944ab" stroke-width="4"/><text x="'+(x(1.18)+6)+'" y="'+z(8.5)+'" font-size="10" fill="#8944ab" font-weight="600">샤막 H9m (#1 장치봉 1.18m)</text>';
 [[5.78,'조명봉 #2 · 5.78m'],[9.23,'조명봉 #3 · 9.23m']].forEach(function(l){o+='<line x1="'+x(l[0])+'" y1="'+z(9.2)+'" x2="'+x(l[0])+'" y2="'+z(0.8)+'" stroke="#e08a00" stroke-dasharray="4 4"/><text x="'+x(l[0])+'" y="'+(z(9.2)-5)+'" font-size="9" fill="#e08a00" text-anchor="middle">'+l[1]+'</text>';});
 o+='<line x1="'+x(12.93)+'" y1="'+z(0)+'" x2="'+x(12.93)+'" y2="'+z(9.0)+'" stroke="#333" stroke-width="3"/><text x="'+(x(12.93)-6)+'" y="'+z(8.6)+'" font-size="10" fill="#333" text-anchor="end">하늘막 12.93m</text>';
 var tiers=D.plan.tiers,DV=0.25;
 tiers.forEach(function(t,i){var top=h*(i+1),bot=h*i,fill=['#ececef','#e2e2e6','#d6d6dc'][i];
  if(i>0){[[t.y0,'앞'],[t.y1-DV,'뒤']].forEach(function(d){o+='<rect x="'+x(d[0])+'" y="'+z(bot)+'" width="'+(DV*s)+'" height="'+(bot*s)+'" fill="#fff3e8" stroke="#c93400" stroke-width="1.2"/><line x1="'+x(d[0])+'" y1="'+z(bot)+'" x2="'+(x(d[0])+DV*s)+'" y2="'+z(0)+'" stroke="#c93400"/><line x1="'+(x(d[0])+DV*s)+'" y1="'+z(bot)+'" x2="'+x(d[0])+'" y2="'+z(0)+'" stroke="#c93400"/>';});}
  o+='<rect x="'+x(t.y0)+'" y="'+z(top)+'" width="'+((t.y1-t.y0)*s)+'" height="'+(h*s)+'" fill="'+fill+'" stroke="#8e8e93"/>'+(i<2?'<line x1="'+x(t.y0)+'" y1="'+z(top-0.15)+'" x2="'+x(t.y1)+'" y2="'+z(top-0.15)+'" stroke="#8e8e93"/>':'')+'<text x="'+(x(t.y0)+(t.y1-t.y0)*s/2)+'" y="'+(oy+18)+'" font-size="11" font-weight="700" text-anchor="middle" fill="#1d1d1f">'+t.n+'단 '+Math.round(top*100)+'cm</text>';});
 o+='<text x="'+x(9.9)+'" y="'+(oy+58)+'" font-size="10" fill="#c93400" font-weight="700" text-anchor="middle">주황 교차 표시 = 받침 장치 (2 · 3단 앞 · 뒤 끝 아래) · 1 · 2단 15cm × 2겹, 3단 30cm 1장</text>';
 function person(py,base,hgt,col){return '<circle cx="'+x(py)+'" cy="'+z(base+hgt-0.12)+'" r="'+(0.12*s)+'" fill="'+col+'"/><rect x="'+(x(py)-0.13*s)+'" y="'+z(base+hgt-0.25)+'" width="'+(0.26*s)+'" height="'+((hgt-0.25)*s)+'" rx="4" fill="'+col+'"/>';}
 var m3s=(tiers[2].y0+tiers[2].y1)/2;o+=person(m3s,h*3,1.7,'#1d1d1f')+'<text x="'+x(m3s)+'" y="'+(z(h*3+1.7)-8)+'" font-size="9" text-anchor="middle" fill="#1d1d1f">연주자 1.7m</text>';
 o+=person(2.0,0,1.7,'#0071e3');
 o+='<text x="'+x(tiers[2].y1+0.3)+'" y="'+(z(h*3)+16)+'" font-size="10" fill="#d70015" font-weight="700">후면 지지대 없음</text><text x="'+x((tiers[2].y1+12.93)/2)+'" y="'+(z(2.6))+'" font-size="10" fill="#0071e3" font-weight="700" text-anchor="middle">후방 간격 '+(12.93-tiers[2].y1).toFixed(1)+'m</text><line x1="'+x(tiers[2].y1)+'" y1="'+z(2.2)+'" x2="'+x(12.93)+'" y2="'+z(2.2)+'" stroke="#0071e3" stroke-width="1.5"/>';
 o+='<line x1="'+x(tiers[2].y1)+'" y1="'+z(h*3)+'" x2="'+x(tiers[2].y1)+'" y2="'+z(0)+'" stroke="#d70015" stroke-width="2" stroke-dasharray="3 3"/>';
 o+='<text x="880" y="26" font-size="15" font-weight="700" fill="#1d1d1f" text-anchor="end">'+(title||'30cm × 3단 (30 / 60 / 90cm)')+'</text>';
 o+='<text x="'+x(-1.9)+'" y="'+(oy+40)+'" font-size="11" fill="#6e6e73">◀ 객석 (DOWNSTAGE)</text><text x="'+x(13.7)+'" y="'+(oy+40)+'" font-size="11" fill="#6e6e73" text-anchor="end">무대 뒤 (UPSTAGE) ▶</text>';
 return o+'</svg>';
};
NS.ST=ST;
})();
