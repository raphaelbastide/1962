if(typeof(linkwithin_is_running)==='undefined'){linkwithin_is_running=true;LW={v:35,hs:[],ts:[],ps:[],ws:[],wsl:[],dh:0};LW.gsn=function(){var load=[0.00,0.00,0.35,0.00,0.35,0.30];var sum=function(n){var c=0;for(var i=0;i<n;c+=load[i++]);return c;}
var r=Math.random();if(r<sum(1))return"";else if(r<sum(2))return"2";else if(r<sum(3))return"3";else if(r<sum(4))return"4";else if(r<sum(5))return"5";else return "6";}
LW.m=function(f,a){var a2=[];for(var i=0,l=a.length;i!==l;++i){a2.push(f(a[i]));}
return a2;};LW.f=function(f,a){var a2=[];for(var i=0,l=a.length;i!==l;++i){if(f(a[i]))a2.push(a[i]);}
return a2;};LW.c=function(u){var e=document.createElement('script');e.type='text/javascript';e.src=u;document.getElementsByTagName('head')[0].appendChild(e);};LW.sb=function(){if(window.addEventListener){window.addEventListener("scroll",function(){LW.cl();},false);window.addEventListener("resize",function(){LW.cl();},false);}
else if(window.attachEvent){window.attachEvent("onscroll",function(){LW.cl();});window.attachEvent("onresize",function(){LW.cl();})}
else if(document.getElementById){var oldOnScroll=window.onscroll;var oldOnResize=window.onresize;window.onload=function(){oldOnScroll();LW.cl();}
window.onresize=function(){oldOnResize();LW.cl();}}}
LW.cl=function(){topY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;topY-=200;vpHeight=window.innerHeight||document.documentElement.clientHeight;bottomY=parseInt(vpHeight+topY+1000);var extra='';if(window['linkwithin_text_only']){extra="&textonly=1";}
if(LW.hs.length>0&&LW.ws.length>0&&LW.wsl.length>0&&LW.ws[0].offsetWidth==0){LW.hs=[];LW.ps=[];LW.ws=[];LW.wsl=[];LW.lws3();return;}
for(i=0;i<LW.ws.length;i++){if(LW.wsl[i]){continue;}
var elemY=LW.getY(LW.ws[i]);if(bottomY>elemY&&elemY>topY){LW.dh=LW.gdh();LW.wsl[i]=1;LW.c(LW.u+'show_widget'+'?site_id='+linkwithin_site_id+'&url='+escape(window.location)+'&callback=LW.sw'+'&widget_id='+i+'&permalink='+escape(LW.ps[i]?LW.gl(LW.ps[i]):'')+'&version='+LW.v+extra);}}}
LW.getY=function(e){var y=0;while(e!=null){y+=e.offsetTop;e=e.offsetParent;}
return y;}
LW.ah=function(i,e,d){var e2=document.createElement('div');e2.setAttribute("id","lws_"+i);e2.innerHTML=d;e.appendChild(e2);LW.ws[i]=e2;};LW.gesbtc=function(t,c,r){var p=new RegExp('(^|\\s)'+c+'(\\s|$)','i');return LW.f(function(e){return p.test(e.className)},(r||document).getElementsByTagName(t));};LW.fesbc=function(l,c){var p=new RegExp('(^|\\s)'+c+'(\\s|$)','i');return LW.f(function(e){return p.test(e.className)},l);};LW.glil=function(l){return LW.f(function(e){return e},LW.m(function(e){return LW.gcsbt(e,'a')[0]},l));}
LW.gesbta=function(t,a,v){return LW.f(function(e){return e.getAttribute(a)===v},document.getElementsByTagName(t));};LW.gcsbt=function(e,n){n=n.toLowerCase();return LW.f(function(e2){return e2.nodeName.toLowerCase()===n},e.childNodes);};LW.gntcs=function(e){return LW.f(function(e2){return e2.nodeType===1},e.childNodes);};LW.gl=function(e){return e.href||e.id}
LW.gt=function(e){return e.innerText||e.textContent}
LW.gdh=function(){var D=document;return Math.max(Math.max(D.body.scrollHeight,D.documentElement.scrollHeight),Math.max(D.body.offsetHeight,D.documentElement.offsetHeight),Math.max(D.body.clientHeight,D.documentElement.clientHeight));};LW.gmg=function(){var metas=document.getElementsByTagName('META');var i;for(i=0;i<metas.length;i++){if(metas[i].getAttribute('NAME')=="generator"){return metas[i].getAttribute('CONTENT');}}
return'';}
LW.fhs=function(){var ns=['post-body','article-content','entry-content','entry','post-entry','post-inner','postmeta2','post_content','text','postcontent','single','post-header','content','post','art-PostContent'];var exclude=['format_teaser','sideContent','ngg-widget'];var es;var divs=document.getElementsByTagName('div');es=LW.fesbc(divs,'linkwithin_div');if(es.length>0)return es;if(window['linkwithin_div_class']){es=LW.fesbc(divs,window['linkwithin_div_class']);return es;}
es=LW.fesbc(divs,'linkwithin_hook');if(es.length>0)return es;es=document.getElementsByTagName('section');if(es.length>0){return LW.f(function(e){return e.parentNode.tagName=='ARTICLE'},es);}
if(typeof(window['Squarespace'])=='object'){return LW.fesbc(divs,'body');}
if(/\.blogs\.sapo\.pt$/.test(document.domain)){return LW.fesbc(divs,'sign');}
if(/\.mysinablog\.com$/.test(document.domain)){return document.getElementById('post_index')?LW.fesbc(divs,'post_content').slice(0,1):LW.fesbc(divs,'post_content');}
if(/\.canalblog\.com$/.test(document.domain)){return LW.fesbc(divs,'itemfooter');}
if(/\.blogg\.se$/.test(document.domain)){return LW.gesbtc('div','entrybody');}
if(/blog\.yam\.com$/.test(document.domain)){if(document.getElementById('articleSummary')){return LW.fesbc(divs,'articleSummary');}
if(document.getElementById('articleBody')){return LW.fesbc(divs,'articleBody');}
if(document.getElementById('post_content')){return LW.fesbc(divs,'post_content');}}
if(typeof(window['OB'])=='object'){return LW.gesbtc('div','contenuArticle',document.getElementById('articleSeul'));}
if(/ameblo\.jp$/.test(document.domain)){es=LW.gesbtc('div','subContents');if(document.getElementById('message')){es.shift();}
return es;}
for(var i=0;i!==ns.length;++i){es=LW.fesbc(divs,ns[i]);if(es.length>0){for(var j=0;j!==exclude.length;++j){es=LW.f(function(e){return e.className.slice(0,exclude[j].length)!=exclude[j]},es);}
if(ns[i]=='post-body'){es=LW.f(function(e){return e.parentNode.className.slice(0,9)!='post-body'},es);if(LW.fesbc(divs,'jump-link').length>0){es=LW.m(function(e){var sb=e;do{sb=sb.nextSibling}while(sb&&sb.nodeType!=1);return(sb.tagName=='DIV'&&sb.className=='jump-link')?sb:e;},es);}}
if(ns[i]=='entry-content'){es=LW.f(function(e){return!/entry-type-page/.test(e.parentNode.className)},es);return es;}
if(ns[i]=='text'){es=LW.f(function(e){var c=e.parentNode.className;return c=='post'||c=='cover'||c=='blogbody'},es);}
if(es.length>0)return es;}}
return[];};LW.fps=function(){var ns=['post-title','entry-header'];var ts=['h3','h2','h1'];var es;switch(linkwithin_site_id){case 8447:return LW.m(function(e){return LW.gcsbt(LW.gcsbt(e,'h2')[0],'a')[0];},LW.gesbtc('div','title'));}
es=LW.gesbtc('div','linkwithin_hook');if(es.length>0)return es;if(typeof(window['Squarespace'])=='object'){return LW.glil(LW.gesbtc('h2','title'));}
if(/\.blogs\.sapo\.pt$/.test(document.domain)){return LW.glil(LW.gesbtc('div','sign'));}
if(/\.mysinablog\.com$/.test(document.domain)){return LW.glil(LW.gesbtc('div','c_title'));}
if(/\.canalblog\.com$/.test(document.domain)){return LW.gesbta('a','title','Lien permanent vers ce message');}
if(/\.blogg\.se$/.test(document.domain)){return LW.m(function(e){return LW.f(function(e2){return e2.innerHTML=='Permalink'},LW.gcsbt(e,'a'))[0]},LW.gesbtc('div','entrymeta'));}
if(/blog\.yam\.com$/.test(document.domain)){if(document.getElementById('post_content')){return LW.glil(LW.gesbtc('div','post_titlediv'));}
return LW.glil(LW.gesbtc('div','articleTitleDiv'));}
if(typeof(window['OB'])=='object'){return LW.gesbtc('a','titreArticle');}
if(/ameblo\.jp$/.test(document.domain)){return LW.glil(LW.gesbtc('div','foot'));}
es=LW.gesbta('a','title','permanent link');if(es.length>0)return es;for(var i=0;i!==ns.length;++i){for(var j=0;j!==ts.length;++j){es=LW.glil(LW.gesbtc(ts[j],ns[i]));if(es.length>0)return es;}}
es=LW.gesbta('a','rel','bookmark');if(es.length>0)return es;es=LW.gesbtc('a','permalink');if(es.length>0)return es;es=LW.gesbtc('h2','art-PostHeader')
if(es.length>0)return es;var ps_path=[];var maxdepth=4;var tdt=function(e,level){if(e.tagName=='A'&&e.getAttribute('href')){return e;}
if(level>=maxdepth){return}
var i,r;var children=LW.gntcs(e).slice(0,maxdepth);for(i=0;i<children.length;i++){r=tdt(children[i],level+1);if(r){ps_path.unshift(i);return r;};}};es=LW.gesbtc('div','post');if(es.length>0){var link=tdt(es[0],0);if(link){return LW.m(function(a){for(var i=0;i<ps_path.length;i++){a=LW.gntcs(a)[ps_path[i]];if(!a){return;}}
return a;},es);}}
es=LW.gesbtc('li','title');if(es.length>0)return LW.f(function(e2){return e2},LW.m(function(e){var es2=LW.gcsbt(e,'h2');if(es2.length>0){return LW.gcsbt(es2[0],'a')[0];}},es));es=LW.gesbtc('*','post')
if(es.length>0)return LW.m(function(e){var es2=LW.gntcs(e);if(es2.length>0){var es3=LW.gcsbt(es2[0],'a');if(es3.length>0)return es3[0];}},es);return[];};LW.lws=function(){if(location.pathname.substring(0,3)=="/p/"&&LW.gmg()=='blogger'){return;}
LW.c(LW.u+'get_custom_js'+'?site_id='+linkwithin_site_id+'&callback=LW.lws2'+'&referrer='+escape(document.referrer));};LW.lws2=function(fhsc,fpsc,m6d,magn,a33,xg){LW.fhsc=fhsc;LW.fpsc=fpsc;if(!LW.msie){try{LW.lws3()}
catch(e){}}
DomReady.ready(LW.lws3);LW.sb();if(!window['linkwithin_disable_tracking']){if(m6d){(function(p,r){var b="",f="",h="",a="",o=0,m=[],n='http://map.media6degrees.com/orbserv/hbpix?pixId='+p+'&pcv='+r+'&cb='+Math.floor(Math.random()*9999999999);for(var g=0;3>g;++g){switch(g){case 0:f="top";h=top;break;case 1:f="par";h=parent;break;case 2:f="win";h=window;break}for(var d=0;2>d;++d){b="";a=0==d;try{b=encodeURIComponent(a?h.location.href:h.document.referrer)}catch(l){}if(""!=b){o=0;for(var c=0;m.length>c;++c){if(b==m[c]){o=1;break}}if(1>o){m[m.length]=b;n+="&"+f+(a?"Href=":"Refer=")+b}}}}(new Image(0,0)).src=n})(6511,42);}
if(magn){DomReady.ready(function(){var ifrm=document.createElement("IFRAME");ifrm.width=0;ifrm.height=0;ifrm.frameBorder=0;ifrm.setAttribute('src',magn);document.body.appendChild(ifrm);});}
if(a33){DomReady.ready(function(){var ifrm=document.createElement("IFRAME");ifrm.width=0;ifrm.height=0;ifrm.frameBorder=0;ifrm.setAttribute('src',a33);document.body.appendChild(ifrm);});}
if(xg){var refValue=top.document.referrer;var n=xg+'/15352/db/xg.gif?pid=15352&sid=12121&pcid=general&type=db&ref='+escape(top.document.referrer)+'&dref='+escape(document.referrer);(new Image(0,0)).src=n;}}};LW.lws3=function(){var l=LW.hs.length;var hs=LW.fhsc();var ps=LW.fpsc();LW.hs=hs!==null?hs:LW.fhs();LW.ps=ps!==null?ps:LW.fps();for(var i=l;i<LW.hs.length&&i<(LW.ps.length<=1?1:15);++i){LW.ah(i,LW.hs[i],"");}
LW.cl();};LW.sw=function(r,i){var e=document.getElementById("lws_"+i);if(e){e.innerHTML=r;ch=LW.gdh();if(ch-LW.dh>500){LW.gntcs(e)[0].style.clear='';var e2=document.getElementById("linkwithin_logo_"+i);e2.style.clear='';}
var lw_text=document.getElementById("linkwithin_text_"+i);if(lw_text){var lw_color_str=LW.gcs(lw_text,'color')
var divs=e.getElementsByTagName('div')
LW.m(function(e){e.style.color=lw_color_str},LW.fesbc(divs,"linkwithin_title_"+i));if(window['linkwithin_text']){lw_text.innerHTML=linkwithin_text;}}}};LW.gcs=function(e,s){var cs;if(typeof e.currentStyle!='undefined')
{cs=e.currentStyle;}
else
{cs=document.defaultView.getComputedStyle(e,null);}
return cs[s];};LW.cbc=function(e){var c;while(e.nodeType==1){c=LW.gcs(e,'backgroundColor');if(c!="transparent"){return c;}
e=e.parentNode}
return null;};(function(){var DomReady=window.DomReady={};var userAgent=navigator.userAgent.toLowerCase();var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:(/msie/.test(userAgent))&&(!/opera/.test(userAgent)),mozilla:(/mozilla/.test(userAgent))&&(!/(compatible|webkit)/.test(userAgent))};var readyBound=false;var isReady=false;var readyList=[];function domReady(){if(!isReady){isReady=true;if(readyList){for(var fn=0;fn<readyList.length;fn++){readyList[fn].call(window,[]);}
readyList=[];}}};function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}
func();}}};function bindReady(){if(readyBound){return;}
readyBound=true;if(document.addEventListener&&!browser.opera){document.addEventListener("DOMContentLoaded",domReady,false);}
if(browser.msie&&window==top)(function(){if(isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}
domReady();})();if(browser.opera){document.addEventListener("DOMContentLoaded",function(){if(isReady)return;for(var i=0;i<document.styleSheets.length;i++)
if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}
domReady();},false);}
if(browser.safari){var numStyles;(function(){if(isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}
if(numStyles===undefined){var links=document.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].getAttribute('rel')=='stylesheet'){numStyles++;}}
var styles=document.getElementsByTagName("style");numStyles+=styles.length;}
if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}
domReady();})();}
addLoadEvent(domReady);};DomReady.ready=function(fn,args){bindReady();if(isReady){fn.call(window,[]);}else{readyList.push(function(){return fn.call(window,[]);});}};bindReady();})();LW.ua=navigator.userAgent.toLowerCase();LW.uav=(LW.ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];LW.msie=(/msie/.test(LW.ua))&&(!/opera/.test(LW.ua));LW.u='http://widget'+LW.gsn()+'.linkwithin.com/';LW.lws();}
