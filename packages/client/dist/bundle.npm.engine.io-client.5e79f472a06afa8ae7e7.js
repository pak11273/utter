(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"+Hdd":function(e,t,s){var r=s("rubU"),o=s("6eBv"),i=s("O/Fo")("engine.io-client:socket"),n=s("sIYT"),a=s("EBzO"),p=s("8xVO"),c=s("K/XI");function h(e,t){if(!(this instanceof h))return new h(e,t);t=t||{},e&&"object"==typeof e&&(t=e,e=null),e?(e=p(e),t.hostname=e.host,t.secure="https"===e.protocol||"wss"===e.protocol,t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=p(t.host).host),this.secure=null!=t.secure?t.secure:"undefined"!=typeof location&&"https:"===location.protocol,t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.agent=t.agent||!1,this.hostname=t.hostname||("undefined"!=typeof location?location.hostname:"localhost"),this.port=t.port||("undefined"!=typeof location&&location.port?location.port:this.secure?443:80),this.query=t.query||{},"string"==typeof this.query&&(this.query=c.decode(this.query)),this.upgrade=!1!==t.upgrade,this.path=(t.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!t.forceJSONP,this.jsonp=!1!==t.jsonp,this.forceBase64=!!t.forceBase64,this.enablesXDR=!!t.enablesXDR,this.timestampParam=t.timestampParam||"t",this.timestampRequests=t.timestampRequests,this.transports=t.transports||["polling","websocket"],this.transportOptions=t.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=t.policyPort||843,this.rememberUpgrade=t.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=t.onlyBinaryUpgrades,this.perMessageDeflate=!1!==t.perMessageDeflate&&(t.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=t.pfx||null,this.key=t.key||null,this.passphrase=t.passphrase||null,this.cert=t.cert||null,this.ca=t.ca||null,this.ciphers=t.ciphers||null,this.rejectUnauthorized=void 0===t.rejectUnauthorized||t.rejectUnauthorized,this.forceNode=!!t.forceNode,this.isReactNative="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),("undefined"==typeof self||this.isReactNative)&&(t.extraHeaders&&Object.keys(t.extraHeaders).length>0&&(this.extraHeaders=t.extraHeaders),t.localAddress&&(this.localAddress=t.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}e.exports=h,h.priorWebsocketSuccess=!1,o(h.prototype),h.protocol=a.protocol,h.Socket=h,h.Transport=s("no1C"),h.transports=s("rubU"),h.parser=s("EBzO"),h.prototype.createTransport=function(e){i('creating transport "%s"',e);var t=function(e){var t={};for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);return t}(this.query);t.EIO=a.protocol,t.transport=e;var s=this.transportOptions[e]||{};return this.id&&(t.sid=this.id),new r[e]({query:t,socket:this,agent:s.agent||this.agent,hostname:s.hostname||this.hostname,port:s.port||this.port,secure:s.secure||this.secure,path:s.path||this.path,forceJSONP:s.forceJSONP||this.forceJSONP,jsonp:s.jsonp||this.jsonp,forceBase64:s.forceBase64||this.forceBase64,enablesXDR:s.enablesXDR||this.enablesXDR,timestampRequests:s.timestampRequests||this.timestampRequests,timestampParam:s.timestampParam||this.timestampParam,policyPort:s.policyPort||this.policyPort,pfx:s.pfx||this.pfx,key:s.key||this.key,passphrase:s.passphrase||this.passphrase,cert:s.cert||this.cert,ca:s.ca||this.ca,ciphers:s.ciphers||this.ciphers,rejectUnauthorized:s.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:s.perMessageDeflate||this.perMessageDeflate,extraHeaders:s.extraHeaders||this.extraHeaders,forceNode:s.forceNode||this.forceNode,localAddress:s.localAddress||this.localAddress,requestTimeout:s.requestTimeout||this.requestTimeout,protocols:s.protocols||void 0,isReactNative:this.isReactNative})},h.prototype.open=function(){var e;if(this.rememberUpgrade&&h.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))e="websocket";else{if(0===this.transports.length){var t=this;return void setTimeout(function(){t.emit("error","No transports available")},0)}e=this.transports[0]}this.readyState="opening";try{e=this.createTransport(e)}catch(e){return this.transports.shift(),void this.open()}e.open(),this.setTransport(e)},h.prototype.setTransport=function(e){i("setting transport %s",e.name);var t=this;this.transport&&(i("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=e,e.on("drain",function(){t.onDrain()}).on("packet",function(e){t.onPacket(e)}).on("error",function(e){t.onError(e)}).on("close",function(){t.onClose("transport close")})},h.prototype.probe=function(e){i('probing transport "%s"',e);var t=this.createTransport(e,{probe:1}),s=!1,r=this;function o(){if(r.onlyBinaryUpgrades){var o=!this.supportsBinary&&r.transport.supportsBinary;s=s||o}s||(i('probe transport "%s" opened',e),t.send([{type:"ping",data:"probe"}]),t.once("packet",function(o){if(!s)if("pong"===o.type&&"probe"===o.data){if(i('probe transport "%s" pong',e),r.upgrading=!0,r.emit("upgrading",t),!t)return;h.priorWebsocketSuccess="websocket"===t.name,i('pausing current transport "%s"',r.transport.name),r.transport.pause(function(){s||"closed"!==r.readyState&&(i("changing transport and sending upgrade packet"),l(),r.setTransport(t),t.send([{type:"upgrade"}]),r.emit("upgrade",t),t=null,r.upgrading=!1,r.flush())})}else{i('probe transport "%s" failed',e);var n=new Error("probe error");n.transport=t.name,r.emit("upgradeError",n)}}))}function n(){s||(s=!0,l(),t.close(),t=null)}function a(s){var o=new Error("probe error: "+s);o.transport=t.name,n(),i('probe transport "%s" failed because of error: %s',e,s),r.emit("upgradeError",o)}function p(){a("transport closed")}function c(){a("socket closed")}function u(e){t&&e.name!==t.name&&(i('"%s" works - aborting "%s"',e.name,t.name),n())}function l(){t.removeListener("open",o),t.removeListener("error",a),t.removeListener("close",p),r.removeListener("close",c),r.removeListener("upgrading",u)}h.priorWebsocketSuccess=!1,t.once("open",o),t.once("error",a),t.once("close",p),this.once("close",c),this.once("upgrading",u),t.open()},h.prototype.onOpen=function(){if(i("socket open"),this.readyState="open",h.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){i("starting upgrade probes");for(var e=0,t=this.upgrades.length;e<t;e++)this.probe(this.upgrades[e])}},h.prototype.onPacket=function(e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(i('socket receive: type "%s", data "%s"',e.type,e.data),this.emit("packet",e),this.emit("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emit("data",e.data),this.emit("message",e.data)}else i('packet received with socket readyState "%s"',this.readyState)},h.prototype.onHandshake=function(e){this.emit("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},h.prototype.onHeartbeat=function(e){clearTimeout(this.pingTimeoutTimer);var t=this;t.pingTimeoutTimer=setTimeout(function(){"closed"!==t.readyState&&t.onClose("ping timeout")},e||t.pingInterval+t.pingTimeout)},h.prototype.setPing=function(){var e=this;clearTimeout(e.pingIntervalTimer),e.pingIntervalTimer=setTimeout(function(){i("writing ping packet - expecting pong within %sms",e.pingTimeout),e.ping(),e.onHeartbeat(e.pingTimeout)},e.pingInterval)},h.prototype.ping=function(){var e=this;this.sendPacket("ping",function(){e.emit("ping")})},h.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},h.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(i("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},h.prototype.write=h.prototype.send=function(e,t,s){return this.sendPacket("message",e,t,s),this},h.prototype.sendPacket=function(e,t,s,r){if("function"==typeof t&&(r=t,t=void 0),"function"==typeof s&&(r=s,s=null),"closing"!==this.readyState&&"closed"!==this.readyState){(s=s||{}).compress=!1!==s.compress;var o={type:e,data:t,options:s};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}},h.prototype.close=function(){if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var e=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():t()}):this.upgrading?r():t()}function t(){e.onClose("forced close"),i("socket closing - telling transport to close"),e.transport.close()}function s(){e.removeListener("upgrade",s),e.removeListener("upgradeError",s),t()}function r(){e.once("upgrade",s),e.once("upgradeError",s)}return this},h.prototype.onError=function(e){i("socket error %j",e),h.priorWebsocketSuccess=!1,this.emit("error",e),this.onClose("transport error",e)},h.prototype.onClose=function(e,t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){i('socket close with reason: "%s"',e);clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",e,t),this.writeBuffer=[],this.prevBufferLen=0}},h.prototype.filterUpgrades=function(e){for(var t=[],s=0,r=e.length;s<r;s++)~n(this.transports,e[s])&&t.push(e[s]);return t}},"04tz":function(e,t,s){(function(t){var r=s("tTJ9"),o=s("II/P");e.exports=h;var i,n=/\n/g,a=/\\n/g;function p(){}function c(){return"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{}}function h(e){if(r.call(this,e),this.query=this.query||{},!i){var t=c();i=t.___eio=t.___eio||[]}this.index=i.length;var s=this;i.push(function(e){s.onData(e)}),this.query.j=this.index,"function"==typeof addEventListener&&addEventListener("beforeunload",function(){s.script&&(s.script.onerror=p)},!1)}o(h,r),h.prototype.supportsBinary=!1,h.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),r.prototype.doClose.call(this)},h.prototype.doPoll=function(){var e=this,t=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),t.async=!0,t.src=this.uri(),t.onerror=function(t){e.onError("jsonp poll error",t)};var s=document.getElementsByTagName("script")[0];s?s.parentNode.insertBefore(t,s):(document.head||document.body).appendChild(t),this.script=t,"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e),document.body.removeChild(e)},100)},h.prototype.doWrite=function(e,t){var s=this;if(!this.form){var r,o=document.createElement("form"),i=document.createElement("textarea"),p=this.iframeId="eio_iframe_"+this.index;o.className="socketio",o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",o.target=p,o.method="POST",o.setAttribute("accept-charset","utf-8"),i.name="d",o.appendChild(i),document.body.appendChild(o),this.form=o,this.area=i}function c(){h(),t()}function h(){if(s.iframe)try{s.form.removeChild(s.iframe)}catch(e){s.onError("jsonp polling iframe removal error",e)}try{var e='<iframe src="javascript:0" name="'+s.iframeId+'">';r=document.createElement(e)}catch(e){(r=document.createElement("iframe")).name=s.iframeId,r.src="javascript:0"}r.id=s.iframeId,s.form.appendChild(r),s.iframe=r}this.form.action=this.uri(),h(),e=e.replace(a,"\\\n"),this.area.value=e.replace(n,"\\n");try{this.form.submit()}catch(e){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===s.iframe.readyState&&c()}:this.iframe.onload=c}}).call(this,s("uKge"))},"0UYl":function(e,t,s){var r=s("1VP2"),o=s("tTJ9"),i=s("6eBv"),n=s("II/P"),a=s("O/Fo")("engine.io-client:polling-xhr");function p(){}function c(e){if(o.call(this,e),this.requestTimeout=e.requestTimeout,this.extraHeaders=e.extraHeaders,"undefined"!=typeof location){var t="https:"===location.protocol,s=location.port;s||(s=t?443:80),this.xd="undefined"!=typeof location&&e.hostname!==location.hostname||s!==e.port,this.xs=e.secure!==t}}function h(e){this.method=e.method||"GET",this.uri=e.uri,this.xd=!!e.xd,this.xs=!!e.xs,this.async=!1!==e.async,this.data=void 0!==e.data?e.data:null,this.agent=e.agent,this.isBinary=e.isBinary,this.supportsBinary=e.supportsBinary,this.enablesXDR=e.enablesXDR,this.requestTimeout=e.requestTimeout,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.extraHeaders=e.extraHeaders,this.create()}if(e.exports=c,e.exports.Request=h,n(c,o),c.prototype.supportsBinary=!0,c.prototype.request=function(e){return(e=e||{}).uri=this.uri(),e.xd=this.xd,e.xs=this.xs,e.agent=this.agent||!1,e.supportsBinary=this.supportsBinary,e.enablesXDR=this.enablesXDR,e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized,e.requestTimeout=this.requestTimeout,e.extraHeaders=this.extraHeaders,new h(e)},c.prototype.doWrite=function(e,t){var s="string"!=typeof e&&void 0!==e,r=this.request({method:"POST",data:e,isBinary:s}),o=this;r.on("success",t),r.on("error",function(e){o.onError("xhr post error",e)}),this.sendXhr=r},c.prototype.doPoll=function(){a("xhr poll");var e=this.request(),t=this;e.on("data",function(e){t.onData(e)}),e.on("error",function(e){t.onError("xhr poll error",e)}),this.pollXhr=e},i(h.prototype),h.prototype.create=function(){var e={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized;var t=this.xhr=new r(e),s=this;try{a("xhr open %s: %s",this.method,this.uri),t.open(this.method,this.uri,this.async);try{if(this.extraHeaders)for(var o in t.setDisableHeaderCheck&&t.setDisableHeaderCheck(!0),this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&t.setRequestHeader(o,this.extraHeaders[o])}catch(e){}if("POST"===this.method)try{this.isBinary?t.setRequestHeader("Content-type","application/octet-stream"):t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(e){}try{t.setRequestHeader("Accept","*/*")}catch(e){}"withCredentials"in t&&(t.withCredentials=!0),this.requestTimeout&&(t.timeout=this.requestTimeout),this.hasXDR()?(t.onload=function(){s.onLoad()},t.onerror=function(){s.onError(t.responseText)}):t.onreadystatechange=function(){if(2===t.readyState)try{var e=t.getResponseHeader("Content-Type");s.supportsBinary&&"application/octet-stream"===e&&(t.responseType="arraybuffer")}catch(e){}4===t.readyState&&(200===t.status||1223===t.status?s.onLoad():setTimeout(function(){s.onError(t.status)},0))},a("xhr data %s",this.data),t.send(this.data)}catch(e){return void setTimeout(function(){s.onError(e)},0)}"undefined"!=typeof document&&(this.index=h.requestsCount++,h.requests[this.index]=this)},h.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},h.prototype.onData=function(e){this.emit("data",e),this.onSuccess()},h.prototype.onError=function(e){this.emit("error",e),this.cleanup(!0)},h.prototype.cleanup=function(e){if(void 0!==this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=p:this.xhr.onreadystatechange=p,e)try{this.xhr.abort()}catch(e){}"undefined"!=typeof document&&delete h.requests[this.index],this.xhr=null}},h.prototype.onLoad=function(){var e;try{var t;try{t=this.xhr.getResponseHeader("Content-Type")}catch(e){}e="application/octet-stream"===t&&this.xhr.response||this.xhr.responseText}catch(e){this.onError(e)}null!=e&&this.onData(e)},h.prototype.hasXDR=function(){return"undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR},h.prototype.abort=function(){this.cleanup()},h.requestsCount=0,h.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",l);else if("function"==typeof addEventListener){var u="onpagehide"in self?"pagehide":"unload";addEventListener(u,l,!1)}function l(){for(var e in h.requests)h.requests.hasOwnProperty(e)&&h.requests[e].abort()}},"1VP2":function(e,t,s){var r=s("YCHo");e.exports=function(e){var t=e.xdomain,s=e.xscheme,o=e.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!t||r))return new XMLHttpRequest}catch(e){}try{if("undefined"!=typeof XDomainRequest&&!s&&o)return new XDomainRequest}catch(e){}if(!t)try{return new(self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(e){}}},"O/Fo":function(e,t,s){(function(r){function o(){var e;try{e=t.storage.debug}catch(e){}return!e&&void 0!==r&&"env"in r&&(e=Object({NODE_ENV:"production"}).DEBUG),e}(t=e.exports=s("YWAZ")).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var s=this.useColors;if(e[0]=(s?"%c":"")+this.namespace+(s?" %c":" ")+e[0]+(s?"%c ":" ")+"+"+t.humanize(this.diff),!s)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=o,t.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(o())}).call(this,s("TzVV"))},QdFa:function(e,t,s){(function(t){var r,o,i=s("no1C"),n=s("EBzO"),a=s("K/XI"),p=s("II/P"),c=s("YpWo"),h=s("O/Fo")("engine.io-client:websocket");if("undefined"!=typeof WebSocket)r=WebSocket;else if("undefined"!=typeof self)r=self.WebSocket||self.MozWebSocket;else try{o=s(0)}catch(e){}var u=r||o;function l(e){e&&e.forceBase64&&(this.supportsBinary=!1),this.perMessageDeflate=e.perMessageDeflate,this.usingBrowserWebSocket=r&&!e.forceNode,this.protocols=e.protocols,this.usingBrowserWebSocket||(u=o),i.call(this,e)}e.exports=l,p(l,i),l.prototype.name="websocket",l.prototype.supportsBinary=!0,l.prototype.doOpen=function(){if(this.check()){var e=this.uri(),t=this.protocols,s={agent:this.agent,perMessageDeflate:this.perMessageDeflate};s.pfx=this.pfx,s.key=this.key,s.passphrase=this.passphrase,s.cert=this.cert,s.ca=this.ca,s.ciphers=this.ciphers,s.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(s.headers=this.extraHeaders),this.localAddress&&(s.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket&&!this.isReactNative?t?new u(e,t):new u(e):new u(e,t,s)}catch(e){return this.emit("error",e)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},l.prototype.addEventListeners=function(){var e=this;this.ws.onopen=function(){e.onOpen()},this.ws.onclose=function(){e.onClose()},this.ws.onmessage=function(t){e.onData(t.data)},this.ws.onerror=function(t){e.onError("websocket error",t)}},l.prototype.write=function(e){var s=this;this.writable=!1;for(var r=e.length,o=0,i=r;o<i;o++)!function(e){n.encodePacket(e,s.supportsBinary,function(o){if(!s.usingBrowserWebSocket){var i={};if(e.options&&(i.compress=e.options.compress),s.perMessageDeflate)("string"==typeof o?t.byteLength(o):o.length)<s.perMessageDeflate.threshold&&(i.compress=!1)}try{s.usingBrowserWebSocket?s.ws.send(o):s.ws.send(o,i)}catch(e){h("websocket closed before onclose event")}--r||a()})}(e[o]);function a(){s.emit("flush"),setTimeout(function(){s.writable=!0,s.emit("drain")},0)}},l.prototype.onClose=function(){i.prototype.onClose.call(this)},l.prototype.doClose=function(){void 0!==this.ws&&this.ws.close()},l.prototype.uri=function(){var e=this.query||{},t=this.secure?"wss":"ws",s="";return this.port&&("wss"===t&&443!==Number(this.port)||"ws"===t&&80!==Number(this.port))&&(s=":"+this.port),this.timestampRequests&&(e[this.timestampParam]=c()),this.supportsBinary||(e.b64=1),(e=a.encode(e)).length&&(e="?"+e),t+"://"+(-1!==this.hostname.indexOf(":")?"["+this.hostname+"]":this.hostname)+s+this.path+e},l.prototype.check=function(){return!(!u||"__initialize"in u&&this.name===l.prototype.name)}}).call(this,s("LMID").Buffer)},YWAZ:function(e,t,s){function r(e){var s;function r(){if(r.enabled){var e=r,o=+new Date,i=o-(s||o);e.diff=i,e.prev=s,e.curr=o,s=o;for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];n[0]=t.coerce(n[0]),"string"!=typeof n[0]&&n.unshift("%O");var p=0;n[0]=n[0].replace(/%([a-zA-Z%])/g,function(s,r){if("%%"===s)return s;p++;var o=t.formatters[r];if("function"==typeof o){var i=n[p];s=o.call(e,i),n.splice(p,1),p--}return s}),t.formatArgs.call(e,n),(r.log||t.log||console.log.bind(console)).apply(e,n)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var s,r=0;for(s in e)r=(r<<5)-r+e.charCodeAt(s),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),r.destroy=o,"function"==typeof t.init&&t.init(r),t.instances.push(r),r}function o(){var e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}(t=e.exports=r.debug=r.default=r).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){var s;t.save(e),t.names=[],t.skips=[];var r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(s=0;s<o;s++)r[s]&&("-"===(e=r[s].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(s=0;s<t.instances.length;s++){var i=t.instances[s];i.enabled=t.enabled(i.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;var s,r;for(s=0,r=t.skips.length;s<r;s++)if(t.skips[s].test(e))return!1;for(s=0,r=t.names.length;s<r;s++)if(t.names[s].test(e))return!0;return!1},t.humanize=s("tV04"),t.instances=[],t.names=[],t.skips=[],t.formatters={}},no1C:function(e,t,s){var r=s("EBzO"),o=s("6eBv");function i(e){this.path=e.path,this.hostname=e.hostname,this.port=e.port,this.secure=e.secure,this.query=e.query,this.timestampParam=e.timestampParam,this.timestampRequests=e.timestampRequests,this.readyState="",this.agent=e.agent||!1,this.socket=e.socket,this.enablesXDR=e.enablesXDR,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.forceNode=e.forceNode,this.isReactNative=e.isReactNative,this.extraHeaders=e.extraHeaders,this.localAddress=e.localAddress}e.exports=i,o(i.prototype),i.prototype.onError=function(e,t){var s=new Error(e);return s.type="TransportError",s.description=t,this.emit("error",s),this},i.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},i.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},i.prototype.send=function(e){if("open"!==this.readyState)throw new Error("Transport not open");this.write(e)},i.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},i.prototype.onData=function(e){var t=r.decodePacket(e,this.socket.binaryType);this.onPacket(t)},i.prototype.onPacket=function(e){this.emit("packet",e)},i.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},rBuO:function(e,t,s){e.exports=s("+Hdd"),e.exports.parser=s("EBzO")},rubU:function(e,t,s){var r=s("1VP2"),o=s("0UYl"),i=s("04tz"),n=s("QdFa");t.polling=function(e){var t=!1,s=!1,n=!1!==e.jsonp;if("undefined"!=typeof location){var a="https:"===location.protocol,p=location.port;p||(p=a?443:80),t=e.hostname!==location.hostname||p!==e.port,s=e.secure!==a}if(e.xdomain=t,e.xscheme=s,"open"in new r(e)&&!e.forceJSONP)return new o(e);if(!n)throw new Error("JSONP disabled");return new i(e)},t.websocket=n},tTJ9:function(e,t,s){var r=s("no1C"),o=s("K/XI"),i=s("EBzO"),n=s("II/P"),a=s("YpWo"),p=s("O/Fo")("engine.io-client:polling");e.exports=h;var c=null!=new(s("1VP2"))({xdomain:!1}).responseType;function h(e){var t=e&&e.forceBase64;c&&!t||(this.supportsBinary=!1),r.call(this,e)}n(h,r),h.prototype.name="polling",h.prototype.doOpen=function(){this.poll()},h.prototype.pause=function(e){var t=this;function s(){p("paused"),t.readyState="paused",e()}if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(p("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){p("pre-pause polling complete"),--r||s()})),this.writable||(p("we are currently writing - waiting to pause"),r++,this.once("drain",function(){p("pre-pause writing complete"),--r||s()}))}else s()},h.prototype.poll=function(){p("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},h.prototype.onData=function(e){var t=this;p("polling got data %s",e);i.decodePayload(e,this.socket.binaryType,function(e,s,r){if("opening"===t.readyState&&t.onOpen(),"close"===e.type)return t.onClose(),!1;t.onPacket(e)}),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():p('ignoring poll - transport state "%s"',this.readyState))},h.prototype.doClose=function(){var e=this;function t(){p("writing close packet"),e.write([{type:"close"}])}"open"===this.readyState?(p("transport open - closing"),t()):(p("transport not open - deferring close"),this.once("open",t))},h.prototype.write=function(e){var t=this;this.writable=!1;var s=function(){t.writable=!0,t.emit("drain")};i.encodePayload(e,this.supportsBinary,function(e){t.doWrite(e,s)})},h.prototype.uri=function(){var e=this.query||{},t=this.secure?"https":"http",s="";return!1!==this.timestampRequests&&(e[this.timestampParam]=a()),this.supportsBinary||e.sid||(e.b64=1),e=o.encode(e),this.port&&("https"===t&&443!==Number(this.port)||"http"===t&&80!==Number(this.port))&&(s=":"+this.port),e.length&&(e="?"+e),t+"://"+(-1!==this.hostname.indexOf(":")?"["+this.hostname+"]":this.hostname)+s+this.path+e}},tV04:function(e,t){var s=1e3,r=60*s,o=60*r,i=24*o,n=365.25*i;function a(e,t,s){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+s:Math.ceil(e/t)+" "+s+"s"}e.exports=function(e,t){t=t||{};var p,c=typeof e;if("string"===c&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!t)return;var a=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*n;case"days":case"day":case"d":return a*i;case"hours":case"hour":case"hrs":case"hr":case"h":return a*o;case"minutes":case"minute":case"mins":case"min":case"m":return a*r;case"seconds":case"second":case"secs":case"sec":case"s":return a*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}(e);if("number"===c&&!1===isNaN(e))return t.long?a(p=e,i,"day")||a(p,o,"hour")||a(p,r,"minute")||a(p,s,"second")||p+" ms":function(e){if(e>=i)return Math.round(e/i)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=s)return Math.round(e/s)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}}}]);
//# sourceMappingURL=bundle.npm.engine.io-client.5e79f472a06afa8ae7e7.js.map