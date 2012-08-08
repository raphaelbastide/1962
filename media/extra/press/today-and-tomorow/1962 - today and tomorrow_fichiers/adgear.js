var ADGEAR=ADGEAR||{};ADGEAR.lang=ADGEAR.lang||{};ADGEAR.lang.namespace=function(b){var a=b.split(".");var d=window;for(var c=0;c<a.length;c++){d[a[c]]=d[a[c]]||{};d=d[a[c]]}return d};ADGEAR.lang.singleton=function(){var d=Array.prototype.slice.call(arguments);var c=d.shift();var g=d.shift();var b=c.split(".");var h=window;var a=b.length-1;var f;for(var e=0;e<a;e++){h[b[e]]=h[b[e]]||{};h=h[b[e]]}f=h[b[a]];h[b[a]]=f||g.apply(null,d);return h};ADGEAR.lang.klass=function(a,b){return ADGEAR.lang.singleton(a,function(){return b})};ADGEAR.lang.bind=function(b,c){var a=c;return function(){return b.apply(a,arguments)}};ADGEAR.lang.mergeHashes=function(c,a){var d={};for(var b in c){d[b]=c[b]}for(var b in a){d[b]=a[b]}return d};ADGEAR.lang.log=function(c){if((typeof ADGEAR_JS_DEBUG==="undefined")||(ADGEAR_JS_DEBUG!==true)){return}try{if(typeof(window.console)==="object"){window.console.log(c)}var g=document.getElementById("adgearPreviewConsole");if(g){var f=g.getElementsByTagName("ul");if(f&&f[0]){f=f[0]}else{f=document.createElement("ul");g.appendChild(f)}var a=new Date();var b=document.createElement("li");b.innerHTML="<strong>[ "+String(a.getFullYear())+"-"+String(a.getMonth()+1)+"-"+String(a.getDate())+" "+String(a.getHours())+":"+String(a.getMinutes())+":"+String(a.getSeconds())+"  ] &gt;&gt; </strong>"+String(c);f.appendChild(b);g.scrollTop=g.scrollHeight}}catch(d){}};ADGEAR.lang.indexOf=function(d,b){var a=d.length;var c=Number(arguments[2])||0;c=(c<0)?Math.ceil(c):Math.floor(c);if(c<0){c+=a}for(;(c>=0)&&(c<a);c++){if(d[c]===b){return c}}return -1};ADGEAR.lang.safeDecodeURIComponent=function(c){var a="";try{a=decodeURIComponent(c)}catch(b){}return a};ADGEAR.lang.klass("ADGEAR.EventQueue",function(){var h={num_processed:0,num_loaded:0,num_error:0,num_aborted:0};var f=new Array();var b=new Image();var j=false;function i(){h.num_processed+=1;b=new Image();if(f.length>0){d()}else{j=false}}function e(){h.num_loaded+=1;i()}function c(){h.num_error+=1;i()}function a(){h.num_aborted+=1;i()}function d(){j=true;b.onload=i;b.onerror=i;b.onabort=i;b.src=f.shift()}function g(){if(!j){d();return true}return false}return{dispatch:function(k){if("string"===typeof(k)&&k.match(/^https?:\/\//)){f.push(k);return g()}},stats:function(k){if(k in h){return h[k]}return null}}});ADGEAR.lang.klass("ADGEAR.QueryString",function(e){var d="";var b={};function c(i){var j={};for(var g in i){j[g]=i[g]}return j}function a(j){var f,l,h,m,g,k;var n=ADGEAR.lang.safeDecodeURIComponent;if((typeof j==="string")&&(j!=="")){d=j;if(d.substring(0,1)==="?"){d=d.substring(1)}l=d.split("&");for(h=0;h<l.length;h++){m=l[h].split("=");g=n(m.shift());k=((m!=null)&&(m.length>0))?n(m.join("=")):null;b[g]=k}}else{if(typeof j==="object"){b=c(j);f=new Array();for(g in b){k=encodeURIComponent(String(g));if(b[g]!=null){k+="="+encodeURIComponent(String(b[g]))}f.push(k)}d=f.join("&")}}}if(e!=null){a(e)}return{toString:function(){return d},toHash:function(){return b},update:function(f,g){b[f]=g;a(b);return this},add:function(f,g){return this.update(f,g)},del:function(f){delete b[f];a(b);return this},contains:function(f){return !!(f in b)},get:function(f){if(this.contains(f)){return b[f]}return null},delAdGearParams:function(){var g={};for(var f in b){if(!f.match(/^AG_/)){g[f]=b[f]}}a(g);return this},dup:function(){return ADGEAR.QueryString(this.toHash())}}});ADGEAR.lang.singleton("ADGEAR.browser",function(){var b=ADGEAR.lang;var e=null;var d=null;var c=null;var a=null;return{type:{IE:!!(window.attachEvent&&(b.indexOf(navigator.userAgent,"Opera")===-1)),Opera:b.indexOf(navigator.userAgent,"Opera")>-1,WebKit:b.indexOf(navigator.userAgent,"AppleWebKit/")>-1,Gecko:b.indexOf(navigator.userAgent,"Gecko")>-1&&b.indexOf(navigator.userAgent,"KHTML")===-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/)},topWindow:function(){if(e==null){try{e=window.parent;while(e&&(e!=e.parent)){e=e.parent}}catch(f){}}return e},isTopWindow:function(){return(this.topWindow()==window)},currentQueryString:function(){if(d==null){try{d=ADGEAR.QueryString(window.location.search)}catch(f){}}return d},trueReferrer:function(){if(c==null){try{c=this.topWindow().document.referrer}catch(f){}if(c==null){c=""}}return c},trueReferer:function(){return this.trueReferrer()},trueLocation:function(){if(a==null){try{a=String(this.topWindow().location)}catch(f){}if(a==null){a=""}}return a},localtime:function(){var h="";try{var m=new Date();var l=m.getTimezoneOffset();var g=(l<0?"+":"-");l=Math.abs(l);var k=parseInt(l/60);var f=(l%60);var j=function(n){n=String(n);while(n.length<2){n="0"+n}return(n)};h=String(m.getFullYear())+"-"+j(m.getMonth()+1)+"-"+j(m.getDate())+"T"+j(m.getHours())+":"+j(m.getMinutes())+":"+j(m.getSeconds())+g+j(k)+":"+j(f)}catch(i){}return h}}});ADGEAR.lang.klass("ADGEAR.Environment",function(a){var e={};var c={};var b="ag"+String(Math.floor(Math.random()*100000000000000));var i=ADGEAR.EventQueue();var d="http";for(var g in a){e[g]=a[g]}function h(){e.durl="";e.aurl="";if(("delivery" in e)&&(d in e.delivery)&&("hostname" in e.delivery[d])&&(e.delivery[d]["hostname"]!=="")){e.durl=d+"://"+e.delivery[d]["hostname"]}if(("assets" in e)&&(d in e.assets)&&("hostname" in e.assets[d])&&(e.assets[d]["hostname"]!=="")){e.aurl=d+"://"+e.assets[d]["hostname"];if(("bucket" in e.assets[d])&&(e.assets[d]["bucket"]!=="")){e.aurl+="/"+e.assets[d]["bucket"]}}}function f(n,k){var m=n.indexOf("?");var j=n;var l="";if(k!==""){if(m<0){l="?"}else{if(m!=(n.length-1)){l="&"}}j=j+l+k}return j}h();if(window.location.protocol=="https:"){d="https";h()}return{config:function(){return e},proto:function(){return d},getSessionId:function(){return b},setSessionId:function(j){b=String(j)},eventQueue:function(){return i},helloUrl:function(){this.setSessionId(arguments[0]||this.getSessionId());return this.deliveryUrl("/session.js",{session:this.getSessionId()})},deliveryUrl:function(n){var l=arguments[1]||{};var k=ADGEAR.browser;var j=ADGEAR.QueryString({});if("querystring" in l&&typeof(l.querystring.toHash)!=="undefined"){j=ADGEAR.QueryString(l.querystring.toHash())}if(String(n).match(/^https?:\/\//)){return f(n,j.toString())}if(!("cachebust" in l)||(l.cachebust!==false)){j.add("AG_R",String(Math.floor(Math.random()*100000000000000)))}if(!("localtime" in l)||(l.localtime!==false)){j.add("AG_LT",k.localtime())}if(!("trueref" in l)||(l.trueref!==false)){j.add("AG_REF",k.trueReferrer())}if("session" in l){j.add("AG_SESSID",l.session)}if(!("deliveryhints" in l)||(l.deliveryhints!==false)){for(var m in c){j.add(m,c[m].join(","))}}return(e.durl+f(n,j.toString()))},assetUrl:function(l){var k=arguments[1]||{};var j=ADGEAR.QueryString({});if("querystring" in k){j=ADGEAR.QueryString(k.querystring.toHash())}if(String(l).match(/^https?:\/\//)){return f(l,j.toString())}if(("cachebust" in k)&&(k.cachebust===true)){j.add("AG_R",String(Math.floor(Math.random()*100000000000000)))}return(e.aurl+f(l,j.toString()))},addDeliveryHint:function(j,k){if(!(j in c)){c[j]=[]}c[j].push(k)},isLivePreview:function(){return(("live_preview" in e)&&(e.live_preview===true))}}});ADGEAR.lang.singleton("ADGEAR.envs",function(){var a={};return{config:function(c){var b=c.name;if(!(b in a)){a[b]=ADGEAR.Environment(c)}return a[b]}}});ADGEAR.lang.singleton("ADGEAR.templateApi",function(){return{getClickUrlFromPath:function(c){var b={querystring:arguments[1]||ADGEAR.QueryString({}),cachebust:false,localtime:false,trueref:false,deliveryhints:false};var a=this.env.deliveryUrl(c,b);if(this["source_clicktracker"]){var f;if(this["source_clicktracker_is_encoded"]){f=ADGEAR.lang.safeDecodeURIComponent(this["source_clicktracker"])}else{if(this["source_clicktracker_is_double_encoded"]){var e=ADGEAR.lang.safeDecodeURIComponent;f=e(e(this["source_clicktracker"]))}else{f=this["source_clicktracker"]}}var d=this["source_clicktracker_expects_encoded"]?encodeURIComponent(a):a;a=f+d}return a},getClickUrl:function(b){if(!("clicks" in this)||!(b in this["clicks"])){return null}if(this.env.isLivePreview()){return this.declared_click_urls[b]}var a=arguments[1]||ADGEAR.QueryString({});return this.getClickUrlFromPath(this.clicks[b],a)},getInteractionUrl:function(a){if(("interactions" in this)&&(a in this["interactions"])){return this.env.deliveryUrl(this.interactions[a],{querystring:arguments[1]||ADGEAR.QueryString({}),localtime:false,trueref:false,deliveryhints:false})}return null},getFileUrl:function(a){if(("files" in this)&&(a in this["files"])){return this.env.assetUrl(this.files[a])}return null},getVariable:function(a){if(("variables" in this)&&(a in this["variables"])){return this.variables[a]}return null},getContainerId:function(){return"adgear_"+String(this.instance_id).replace(/-/g,"_")},getWidth:function(){var a=this["format_width"];if(a&&String(a)!=="1"){return a}if(this["natural_width"]){return String(this["natural_width"])}return"500"},getHeight:function(){var a=this["format_height"];if(a&&String(a)!=="1"){return a}if(this["natural_height"]){return String(this["natural_height"])}return"500"},prepThirdParty:function(b){var c=b;var a=this["click_tracker"];if(String(a).length>0){c=c.replace(/__CLICK_TRACKER_URL__/g,this.getClickUrlFromPath(a+"?"))}c=c.replace(/__RANDOM_NUMBER__/g,Math.floor(Math.random()*100000000000000));return c},regClick:function(b){var a=arguments[1]||ADGEAR.QueryString({});var c=this.getClickUrl(b,a);if(c){ADGEAR.lang.log("AdUnit registered CLICK with name: "+String(b)+" - redirect URL: "+c+" - params: [ "+a.toString()+" ]")}else{ADGEAR.lang.log("AdUnit attempted to register CLICK with name: "+String(b)+" - params: [ "+a.toString()+" ] - but click NOT FOUND!")}ADGEAR.browser.topWindow().location=c},regInteraction:function(c){var b=arguments[1]||ADGEAR.QueryString({});var a=this.env.eventQueue();var d=this.getInteractionUrl(c,b);if(d){ADGEAR.lang.log("AdUnit registered INTERACTION/EVENT with name: "+String(c)+" - params: [ "+b.toString()+" ]")}else{ADGEAR.lang.log("AdUnit attempted to register INTERACTION/EVENT with name: "+String(c)+" - params: [ "+b.toString()+" ] - but interaction NOT FOUND!")}return a.dispatch(d)},getGeoCountryCode:function(){if(("geo" in this)&&("country_code" in this["geo"])){return String(this.geo.country_code)}return null},getGeoCountryName:function(){if(("geo" in this)&&("country_name" in this["geo"])){return String(this.geo.country_name)}return null},getGeoRegion:function(){if(("geo" in this)&&("region" in this["geo"])){return String(this.geo.region)}return null},getGeoCity:function(){if(("geo" in this)&&("city" in this["geo"])){return String(this.geo.city)}return null},getGeoPostalCode:function(){if(("geo" in this)&&("postal_code" in this["geo"])){return String(this.geo.postal_code)}return null},getGeoIsp:function(){if(("geo" in this)&&("isp" in this["geo"])){return String(this.geo.isp)}return null},getGeoNetspeed:function(){if(("geo" in this)&&("netspeed" in this["geo"])){return String(this.geo.netspeed)}return null},getGeoLongitude:function(){if(("geo" in this)&&("longitude" in this["geo"])){return String(this.geo.longitude)}return null},getGeoLatitude:function(){if(("geo" in this)&&("latitude" in this["geo"])){return String(this.geo.latitude)}return null},getGeoDmaCode:function(){if(("geo" in this)&&("dma_code" in this["geo"])){return String(this.geo.dma_code)}return null},getGeoAreaCode:function(){if(("geo" in this)&&("area_code" in this["geo"])){return String(this.geo.area_code)}return null},getImpressionHint:function(a){if(("impression_hints" in this)&&(a in this["impression_hints"])){return String(this.impression_hints[a])}return null},regOnLoadEvent:function(a){if(typeof window.addEventListener!="undefined"){window.addEventListener("load",a,false)}else{if(typeof document.addEventListener!="undefined"){document.addEventListener("load",a,false)}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onload",a)}else{if(typeof window.onload=="function"){var b=window.onload;window.onload=function(){b();a()}}else{window.onload=a}}}}}}});ADGEAR.render=function(h,i,d){function c(e){if(("placement_id" in e)&&("adunit_id" in e)){e.env.addDeliveryHint("AG_S","p"+String(e.placement_id)+",a"+String(e.adunit_id))}}function g(n){var o=null;try{if("tilings" in n){o=n.tilings;if("served" in o){n.env.addDeliveryHint("AG_TS",String(o.served))}if("unserved" in o){for(var m=0;m<o.unserved.length;m++){n.env.addDeliveryHint("AG_TN",String(o.unserved[m]))}}}}catch(e){}}function a(m){for(var e in ADGEAR.templateApi){m[e]=ADGEAR.templateApi[e]}}function k(e){e.source_clicktracker=null;e.source_clicktracker_expects_encoded=false;e.source_clicktracker_is_encoded=false;e.source_clicktracker_is_double_encoded=false;if((typeof ADGEAR_SOURCE_CLICKTRACKER==="string")&&(String(ADGEAR_SOURCE_CLICKTRACKER).toLowerCase().match(/^http/))){e.source_clicktracker=ADGEAR_SOURCE_CLICKTRACKER}e.source_clicktracker_expects_encoded=(typeof ADGEAR_SOURCE_CLICKTRACKER_EXPECTS_ENCODED!=="undefined")&&ADGEAR_SOURCE_CLICKTRACKER_EXPECTS_ENCODED;e.source_clicktracker_is_encoded=(typeof ADGEAR_SOURCE_CLICKTRACKER_IS_ENCODED!=="undefined")&&ADGEAR_SOURCE_CLICKTRACKER_IS_ENCODED;e.source_clicktracker_is_double_encoded=(typeof ADGEAR_SOURCE_CLICKTRACKER_IS_DOUBLE_ENCODED!=="undefined")&&ADGEAR_SOURCE_CLICKTRACKER_IS_DOUBLE_ENCODED;ADGEAR_SOURCE_CLICKTRACKER=null;ADGEAR_SOURCE_CLICKTRACKER_EXPECTS_ENCODED=null;ADGEAR_SOURCE_CLICKTRACKER_IS_ENCODED=null;ADGEAR_SOURCE_CLICKTRACKER_IS_DOUBLE_ENCODED=null}function l(e){if(typeof OOBClickTrack==="string"){e.OOBClickTrack=OOBClickTrack}OOBClickTrack=null}if(("env" in i)&&("name" in i.env)){var j=ADGEAR.envs.config(i.env);if(!j){ADGEAR.lang.log("Unable to reference environment specified by AdUnit payload (name = "+String(i.env["name"])+"). Aborting rendering!");return false}i.env=j;c(i);g(i);k(i);l(i);a(i);try{h(i)}catch(f){ADGEAR.lang.log("Failed in executing ad rendering template '"+String(i.template)+"' - placement ID: "+String(i.placement_id)+", adunit ID: "+String(i.adunit_id)+" - in environment '"+String((j.config())["name"])+"'. Exception: "+String(f));if(d){try{d(i)}catch(b){ADGEAR.lang.log("Failed in executing backup rendering handler provided by '"+String(i.template)+"' - placement ID: "+String(i.placement_id)+", adunit ID: "+String(i.adunit_id)+" - in environment '"+String((j.config())["name"])+"'. Exception: "+String(b))}}return false}}return true};ADGEAR_ENV=ADGEAR.envs.config({name:"production",delivery:{http:{hostname:"d.adgear.com"},https:{hostname:"d.adgear.com"}},assets:{http:{hostname:"cdn.adgear.com",bucket:"a"},https:{hostname:"a.adgear.com",bucket:""}}});ADGEAR.lang.namespace("ADGEAR.tags");ADGEAR.lang.namespace("ADGEAR.env");ADGEAR.lang.namespace("ADGEAR.util");ADGEAR.lang.namespace("ADGEAR.delivery");ADGEAR.lang.namespace("ADGEAR.env.hints");ADGEAR.lang.namespace("ADGEAR.config");ADGEAR.config.delivery_hostname=(ADGEAR_ENV.config())["delivery"]["http"]["hostname"];ADGEAR.delivery.impression=function(b,a){ADGEAR.tags.script.embed({id:b})};ADGEAR.env.top_window=function(){return ADGEAR.browser.topWindow()};ADGEAR.env.qvars=function(){return ADGEAR.browser.currentQueryString().toHash()};ADGEAR.env.referrer=function(){return ADGEAR.browser.trueReferer()};ADGEAR.util.hash_to_querystring=function(a){return ADGEAR.QueryString(a).toString()};ADGEAR.env.add_load_listener=function(a){if(window.addEventListener){window.addEventListener("load",a,false)}else{if(document.addEventListener){document.addEventListener("load",a,false)}else{if(window.attachEvent){window.attachEvent("onload",a)}}}};ADGEAR.util.cache_bust_url=function(b){var c=b.indexOf("?");var a="";if(c<0){a="?"}else{if(c!=(b.length-1)){a="&"}}return(b+a+"AG_R="+String(Math.floor(Math.random()*100000000000000)))};ADGEAR.lang.singleton("ADGEAR.tags.preview",function(){return{decorateQueryString:function(c){var a=ADGEAR.browser.currentQueryString();var b=null;if(a!=null){if(((b=a.get("AG_PREVIEW_PLACEMENTS"))!=null)||((b=a.get("AG_FORCE_P_IDS"))!=null)){c.add("AG_FORCE_P_IDS",b);ADGEAR.lang.log("FORCE-PREVIEW: Attempting to force AdGear to preview PLACEMENTS: "+b)}if(((b=a.get("AG_PREVIEW_ADUNITS"))!=null)||((b=a.get("AG_FORCE_AD_IDS"))!=null)){c.add("AG_FORCE_AD_IDS",b);ADGEAR.lang.log("FORCE-PREVIEW: Attempting to force AdGear to preview ADUNITS: "+b)}}return c}}});ADGEAR.lang.singleton("ADGEAR.tags.script",function(){return{init:function(){},embed:function(d){var b;var a;try{b=ADGEAR.QueryString(ADGEAR.site_callbacks.variables())}catch(c){b=ADGEAR.QueryString({})}try{b=ADGEAR.tags.preview.decorateQueryString(b)}catch(c){}a=ADGEAR_ENV.deliveryUrl("/impressions/int/as="+String(d.id)+".mjs",{querystring:b});document.writeln('<script type="text/javascript" src="'+a+'"><\/script>');return true},universal:function(d){var c;var b;var a;try{c=ADGEAR.QueryString(ADGEAR.site_callbacks.variables())}catch(f){c=ADGEAR.QueryString({})}try{c=ADGEAR.tags.preview.decorateQueryString(c)}catch(f){}a=String(d.chip_key);if(!a.match(/^[a-zA-Z0-9]+$/)){a="0000"}for(var e=0;e<d.path.length;e++){c.add("AG_P"+String(e),String(d.path[e]))}b=ADGEAR_ENV.deliveryUrl("/impressions/uint/asc="+String(d.container_id)+"/f="+String(d.format_id)+"/chip="+encodeURIComponent(a)+".mjs",{querystring:c});document.writeln('<script type="text/javascript" src="'+b+'"><\/script>');return true}}});ADGEAR.lang.singleton("ADGEAR.tags.iframe",function(){return{init:function(){},embed:function(d){var b;var e="adgearIntIframe"+String(d.id);var a=ADGEAR_IFRAME_URL;try{b=ADGEAR.QueryString(ADGEAR.site_callbacks.variables())}catch(c){b=ADGEAR.QueryString({})}try{b=ADGEAR.tags.preview.decorateQueryString(b)}catch(c){}b.add("AG_ASID",String(d.id));b.add("AG_R",String(Math.floor(Math.random()*100000000000000)));a+="?"+b.toString();document.writeln('<iframe name="'+e+'" id="'+e+'" height="'+String(d.height)+'" width="'+String(d.width)+'" src="'+a+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>');return true}}});ADGEAR.lang.singleton("ADGEAR.tags.data",function(){return{init:function(){},embed:function(c){try{var b;var a=String(c.chip_key);if(document.getElementById(a)!=null){return false}b=document.createElement("iframe");b.name=a;b.id=a;b.style.visibility="hidden";b.style.width="1px";b.style.height="1px";document.getElementsByTagName("body")[0].appendChild(b);window.frames[a].location.replace(ADGEAR_ENV.assetUrl("/data/"+String(c.id)+".html",{cachebust:true}))}catch(d){return false}return true}}});ADGEAR.lang.singleton("ADGEAR.tags.conversion",function(){return{init:function(){},embed:function(d){try{var c;var a=String(d.chip_key);var b=ADGEAR.QueryString({});if(document.getElementById(a)!=null){return false}if(("revenue" in d)&&(d.revenue!=null)){b.add("AG_REV",String(d.revenue))}c=document.createElement("iframe");c.name=a;c.id=a;c.style.visibility="hidden";c.style.width="1px";c.style.height="1px";document.getElementsByTagName("body")[0].appendChild(c);window.frames[a].location.replace(ADGEAR_ENV.assetUrl("/conversions/"+String(d.id)+".html",{cachebust:true,querystring:b}))}catch(f){return false}return true}}});if((typeof ADGEAR_DONT_SAY_HELLO==="undefined")||!ADGEAR_DONT_SAY_HELLO){document.writeln('<script type="text/javascript" src="'+ADGEAR_ENV.helloUrl()+'"><\/script>')};