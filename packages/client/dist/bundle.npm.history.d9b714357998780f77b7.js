(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{Rl4o:function(n,t,e){"use strict";t.__esModule=!0;t.canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement),t.addEventListener=function(n,t,e){return n.addEventListener?n.addEventListener(t,e,!1):n.attachEvent("on"+t,e)},t.removeEventListener=function(n,t,e){return n.removeEventListener?n.removeEventListener(t,e,!1):n.detachEvent("on"+t,e)},t.getConfirmation=function(n,t){return t(window.confirm(n))},t.supportsHistory=function(){var n=window.navigator.userAgent;return(-1===n.indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},t.supportsPopStateOnHashChange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},t.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},t.isExtraneousPopstateEvent=function(n){return void 0===n.state&&-1===navigator.userAgent.indexOf("CriOS")}},ap8c:function(n,t,e){"use strict";t.__esModule=!0;var o,a=e("qsDA"),i=(o=a)&&o.__esModule?o:{default:o};t.default=function(){var n=null,t=[];return{setPrompt:function(t){return(0,i.default)(null==n,"A history supports only one prompt at a time"),n=t,function(){n===t&&(n=null)}},confirmTransitionTo:function(t,e,o,a){if(null!=n){var r="function"==typeof n?n(t,e):n;"string"==typeof r?"function"==typeof o?o(r,a):((0,i.default)(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),a(!0)):a(!1!==r)}else a(!0)},appendListener:function(n){var e=!0,o=function(){e&&n.apply(void 0,arguments)};return t.push(o),function(){e=!1,t=t.filter(function(n){return n!==o})}},notifyListeners:function(){for(var n=arguments.length,e=Array(n),o=0;o<n;o++)e[o]=arguments[o];t.forEach(function(n){return n.apply(void 0,e)})}}}},bmN0:function(n,t,e){"use strict";var o=e("qsDA"),a=e.n(o),i=e("m/ml"),r=e.n(i),s=e("SnHU"),c=e("fTOb"),u=function(n){return"/"===n.charAt(0)?n:"/"+n},h=function(n){return"/"===n.charAt(0)?n.substr(1):n},f=function(n,t){return new RegExp("^"+t+"(\\/|\\?|#|$)","i").test(n)},d=function(n,t){return f(n,t)?n.substr(t.length):n},l=function(n){return"/"===n.charAt(n.length-1)?n.slice(0,-1):n},p=function(n){var t=n.pathname,e=n.search,o=n.hash,a=t||"/";return e&&"?"!==e&&(a+="?"===e.charAt(0)?e:"?"+e),o&&"#"!==o&&(a+="#"===o.charAt(0)?o:"#"+o),a},v=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},g=function(n,t,e,o){var a=void 0;"string"==typeof n?(a=function(n){var t=n||"/",e="",o="",a=t.indexOf("#");-1!==a&&(o=t.substr(a),t=t.substr(0,a));var i=t.indexOf("?");return-1!==i&&(e=t.substr(i),t=t.substr(0,i)),{pathname:t,search:"?"===e?"":e,hash:"#"===o?"":o}}(n)).state=t:(void 0===(a=v({},n)).pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(n){throw n instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):n}return e&&(a.key=e),o?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=Object(s.default)(a.pathname,o.pathname)):a.pathname=o.pathname:a.pathname||(a.pathname="/"),a},m=function(n,t){return n.pathname===t.pathname&&n.search===t.search&&n.hash===t.hash&&n.key===t.key&&Object(c.default)(n.state,t.state)},y=function(){var n=null,t=[];return{setPrompt:function(t){return a()(null==n,"A history supports only one prompt at a time"),n=t,function(){n===t&&(n=null)}},confirmTransitionTo:function(t,e,o,i){if(null!=n){var r="function"==typeof n?n(t,e):n;"string"==typeof r?"function"==typeof o?o(r,i):(a()(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),i(!0)):i(!1!==r)}else i(!0)},appendListener:function(n){var e=!0,o=function(){e&&n.apply(void 0,arguments)};return t.push(o),function(){e=!1,t=t.filter(function(n){return n!==o})}},notifyListeners:function(){for(var n=arguments.length,e=Array(n),o=0;o<n;o++)e[o]=arguments[o];t.forEach(function(n){return n.apply(void 0,e)})}}},w=!("undefined"==typeof window||!window.document||!window.document.createElement),b=function(n,t,e){return n.addEventListener?n.addEventListener(t,e,!1):n.attachEvent("on"+t,e)},O=function(n,t,e){return n.removeEventListener?n.removeEventListener(t,e,!1):n.detachEvent("on"+t,e)},P=function(n,t){return t(window.confirm(n))},E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},k=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},x=function(){try{return window.history.state||{}}catch(n){return{}}},L=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r()(w,"Browser history needs a DOM");var t,e=window.history,o=(-1===(t=window.navigator.userAgent).indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history,i=!(-1===window.navigator.userAgent.indexOf("Trident")),s=n.forceRefresh,c=void 0!==s&&s,h=n.getUserConfirmation,v=void 0===h?P:h,m=n.keyLength,L=void 0===m?6:m,A=n.basename?l(u(n.basename)):"",S=function(n){var t=n||{},e=t.key,o=t.state,i=window.location,r=i.pathname+i.search+i.hash;return a()(!A||f(r,A),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+r+'" to begin with "'+A+'".'),A&&(r=d(r,A)),g(r,o,e)},T=function(){return Math.random().toString(36).substr(2,L)},H=y(),U=function(n){k(V,n),V.length=e.length,H.notifyListeners(V.location,V.action)},j=function(n){(function(n){return void 0===n.state&&-1===navigator.userAgent.indexOf("CriOS")})(n)||C(S(n.state))},M=function(){C(S(x()))},R=!1,C=function(n){R?(R=!1,U()):H.confirmTransitionTo(n,"POP",v,function(t){t?U({action:"POP",location:n}):_(n)})},_=function(n){var t=V.location,e=I.indexOf(t.key);-1===e&&(e=0);var o=I.indexOf(n.key);-1===o&&(o=0);var a=e-o;a&&(R=!0,D(a))},B=S(x()),I=[B.key],q=function(n){return A+p(n)},D=function(n){e.go(n)},F=0,Y=function(n){1===(F+=n)?(b(window,"popstate",j),i&&b(window,"hashchange",M)):0===F&&(O(window,"popstate",j),i&&O(window,"hashchange",M))},Q=!1,V={length:e.length,action:"POP",location:B,createHref:q,push:function(n,t){a()(!("object"===(void 0===n?"undefined":E(n))&&void 0!==n.state&&void 0!==t),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var i=g(n,t,T(),V.location);H.confirmTransitionTo(i,"PUSH",v,function(n){if(n){var t=q(i),r=i.key,s=i.state;if(o)if(e.pushState({key:r,state:s},null,t),c)window.location.href=t;else{var u=I.indexOf(V.location.key),h=I.slice(0,-1===u?0:u+1);h.push(i.key),I=h,U({action:"PUSH",location:i})}else a()(void 0===s,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=t}})},replace:function(n,t){a()(!("object"===(void 0===n?"undefined":E(n))&&void 0!==n.state&&void 0!==t),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var i=g(n,t,T(),V.location);H.confirmTransitionTo(i,"REPLACE",v,function(n){if(n){var t=q(i),r=i.key,s=i.state;if(o)if(e.replaceState({key:r,state:s},null,t),c)window.location.replace(t);else{var u=I.indexOf(V.location.key);-1!==u&&(I[u]=i.key),U({action:"REPLACE",location:i})}else a()(void 0===s,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(t)}})},go:D,goBack:function(){return D(-1)},goForward:function(){return D(1)},block:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=H.setPrompt(n);return Q||(Y(1),Q=!0),function(){return Q&&(Q=!1,Y(-1)),t()}},listen:function(n){var t=H.appendListener(n);return Y(1),function(){Y(-1),t()}}};return V},A=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},S={hashbang:{encodePath:function(n){return"!"===n.charAt(0)?n:"!/"+h(n)},decodePath:function(n){return"!"===n.charAt(0)?n.substr(1):n}},noslash:{encodePath:h,decodePath:u},slash:{encodePath:u,decodePath:u}},T=function(){var n=window.location.href,t=n.indexOf("#");return-1===t?"":n.substring(t+1)},H=function(n){var t=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,t>=0?t:0)+"#"+n)},U=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r()(w,"Hash history needs a DOM");var t=window.history,e=-1===window.navigator.userAgent.indexOf("Firefox"),o=n.getUserConfirmation,i=void 0===o?P:o,s=n.hashType,c=void 0===s?"slash":s,h=n.basename?l(u(n.basename)):"",v=S[c],E=v.encodePath,k=v.decodePath,x=function(){var n=k(T());return a()(!h||f(n,h),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+n+'" to begin with "'+h+'".'),h&&(n=d(n,h)),g(n)},L=y(),U=function(n){A(W,n),W.length=t.length,L.notifyListeners(W.location,W.action)},j=!1,M=null,R=function(){var n=T(),t=E(n);if(n!==t)H(t);else{var e=x(),o=W.location;if(!j&&m(o,e))return;if(M===p(e))return;M=null,C(e)}},C=function(n){j?(j=!1,U()):L.confirmTransitionTo(n,"POP",i,function(t){t?U({action:"POP",location:n}):_(n)})},_=function(n){var t=W.location,e=D.lastIndexOf(p(t));-1===e&&(e=0);var o=D.lastIndexOf(p(n));-1===o&&(o=0);var a=e-o;a&&(j=!0,F(a))},B=T(),I=E(B);B!==I&&H(I);var q=x(),D=[p(q)],F=function(n){a()(e,"Hash history go(n) causes a full page reload in this browser"),t.go(n)},Y=0,Q=function(n){1===(Y+=n)?b(window,"hashchange",R):0===Y&&O(window,"hashchange",R)},V=!1,W={length:t.length,action:"POP",location:q,createHref:function(n){return"#"+E(h+p(n))},push:function(n,t){a()(void 0===t,"Hash history cannot push state; it is ignored");var e=g(n,void 0,void 0,W.location);L.confirmTransitionTo(e,"PUSH",i,function(n){if(n){var t=p(e),o=E(h+t);if(T()!==o){M=t,function(n){window.location.hash=n}(o);var i=D.lastIndexOf(p(W.location)),r=D.slice(0,-1===i?0:i+1);r.push(t),D=r,U({action:"PUSH",location:e})}else a()(!1,"Hash history cannot PUSH the same path; a new entry will not be added to the history stack"),U()}})},replace:function(n,t){a()(void 0===t,"Hash history cannot replace state; it is ignored");var e=g(n,void 0,void 0,W.location);L.confirmTransitionTo(e,"REPLACE",i,function(n){if(n){var t=p(e),o=E(h+t);T()!==o&&(M=t,H(o));var a=D.indexOf(p(W.location));-1!==a&&(D[a]=t),U({action:"REPLACE",location:e})}})},go:F,goBack:function(){return F(-1)},goForward:function(){return F(1)},block:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=L.setPrompt(n);return V||(Q(1),V=!0),function(){return V&&(V=!1,Q(-1)),t()}},listen:function(n){var t=L.appendListener(n);return Q(1),function(){Q(-1),t()}}};return W},j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},M=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},R=function(n,t,e){return Math.min(Math.max(n,t),e)},C=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.getUserConfirmation,e=n.initialEntries,o=void 0===e?["/"]:e,i=n.initialIndex,r=void 0===i?0:i,s=n.keyLength,c=void 0===s?6:s,u=y(),h=function(n){M(w,n),w.length=w.entries.length,u.notifyListeners(w.location,w.action)},f=function(){return Math.random().toString(36).substr(2,c)},d=R(r,0,o.length-1),l=o.map(function(n){return g(n,void 0,"string"==typeof n?f():n.key||f())}),v=p,m=function(n){var e=R(w.index+n,0,w.entries.length-1),o=w.entries[e];u.confirmTransitionTo(o,"POP",t,function(n){n?h({action:"POP",location:o,index:e}):h()})},w={length:l.length,action:"POP",location:l[d],index:d,entries:l,createHref:v,push:function(n,e){a()(!("object"===(void 0===n?"undefined":j(n))&&void 0!==n.state&&void 0!==e),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var o=g(n,e,f(),w.location);u.confirmTransitionTo(o,"PUSH",t,function(n){if(n){var t=w.index+1,e=w.entries.slice(0);e.length>t?e.splice(t,e.length-t,o):e.push(o),h({action:"PUSH",location:o,index:t,entries:e})}})},replace:function(n,e){a()(!("object"===(void 0===n?"undefined":j(n))&&void 0!==n.state&&void 0!==e),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var o=g(n,e,f(),w.location);u.confirmTransitionTo(o,"REPLACE",t,function(n){n&&(w.entries[w.index]=o,h({action:"REPLACE",location:o}))})},go:m,goBack:function(){return m(-1)},goForward:function(){return m(1)},canGo:function(n){var t=w.index+n;return t>=0&&t<w.entries.length},block:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return u.setPrompt(n)},listen:function(n){return u.appendListener(n)}};return w};e.d(t,"a",function(){return L}),e.d(t,"b",function(){return U}),e.d(t,"d",function(){return C}),e.d(t,"c",function(){return g}),e.d(t,"f",function(){return m}),e.d(t,"e",function(){return p})},gQjb:function(n,t,e){"use strict";t.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},a=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},i=f(e("qsDA")),r=f(e("m/ml")),s=e("ybmQ"),c=e("qVbF"),u=f(e("ap8c")),h=e("Rl4o");function f(n){return n&&n.__esModule?n:{default:n}}var d=function(){try{return window.history.state||{}}catch(n){return{}}};t.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,r.default)(h.canUseDOM,"Browser history needs a DOM");var t=window.history,e=(0,h.supportsHistory)(),f=!(0,h.supportsPopStateOnHashChange)(),l=n.forceRefresh,p=void 0!==l&&l,v=n.getUserConfirmation,g=void 0===v?h.getConfirmation:v,m=n.keyLength,y=void 0===m?6:m,w=n.basename?(0,c.stripTrailingSlash)((0,c.addLeadingSlash)(n.basename)):"",b=function(n){var t=n||{},e=t.key,o=t.state,a=window.location,r=a.pathname+a.search+a.hash;return(0,i.default)(!w||(0,c.hasBasename)(r,w),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+r+'" to begin with "'+w+'".'),w&&(r=(0,c.stripBasename)(r,w)),(0,s.createLocation)(r,o,e)},O=function(){return Math.random().toString(36).substr(2,y)},P=(0,u.default)(),E=function(n){a(_,n),_.length=t.length,P.notifyListeners(_.location,_.action)},k=function(n){(0,h.isExtraneousPopstateEvent)(n)||A(b(n.state))},x=function(){A(b(d()))},L=!1,A=function(n){L?(L=!1,E()):P.confirmTransitionTo(n,"POP",g,function(t){t?E({action:"POP",location:n}):S(n)})},S=function(n){var t=_.location,e=H.indexOf(t.key);-1===e&&(e=0);var o=H.indexOf(n.key);-1===o&&(o=0);var a=e-o;a&&(L=!0,j(a))},T=b(d()),H=[T.key],U=function(n){return w+(0,c.createPath)(n)},j=function(n){t.go(n)},M=0,R=function(n){1===(M+=n)?((0,h.addEventListener)(window,"popstate",k),f&&(0,h.addEventListener)(window,"hashchange",x)):0===M&&((0,h.removeEventListener)(window,"popstate",k),f&&(0,h.removeEventListener)(window,"hashchange",x))},C=!1,_={length:t.length,action:"POP",location:T,createHref:U,push:function(n,a){(0,i.default)(!("object"===(void 0===n?"undefined":o(n))&&void 0!==n.state&&void 0!==a),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var r=(0,s.createLocation)(n,a,O(),_.location);P.confirmTransitionTo(r,"PUSH",g,function(n){if(n){var o=U(r),a=r.key,s=r.state;if(e)if(t.pushState({key:a,state:s},null,o),p)window.location.href=o;else{var c=H.indexOf(_.location.key),u=H.slice(0,-1===c?0:c+1);u.push(r.key),H=u,E({action:"PUSH",location:r})}else(0,i.default)(void 0===s,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=o}})},replace:function(n,a){(0,i.default)(!("object"===(void 0===n?"undefined":o(n))&&void 0!==n.state&&void 0!==a),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var r=(0,s.createLocation)(n,a,O(),_.location);P.confirmTransitionTo(r,"REPLACE",g,function(n){if(n){var o=U(r),a=r.key,s=r.state;if(e)if(t.replaceState({key:a,state:s},null,o),p)window.location.replace(o);else{var c=H.indexOf(_.location.key);-1!==c&&(H[c]=r.key),E({action:"REPLACE",location:r})}else(0,i.default)(void 0===s,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(o)}})},go:j,goBack:function(){return j(-1)},goForward:function(){return j(1)},block:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=P.setPrompt(n);return C||(R(1),C=!0),function(){return C&&(C=!1,R(-1)),t()}},listen:function(n){var t=P.appendListener(n);return R(1),function(){R(-1),t()}}};return _}},qVbF:function(n,t,e){"use strict";t.__esModule=!0;t.addLeadingSlash=function(n){return"/"===n.charAt(0)?n:"/"+n},t.stripLeadingSlash=function(n){return"/"===n.charAt(0)?n.substr(1):n};var o=t.hasBasename=function(n,t){return new RegExp("^"+t+"(\\/|\\?|#|$)","i").test(n)};t.stripBasename=function(n,t){return o(n,t)?n.substr(t.length):n},t.stripTrailingSlash=function(n){return"/"===n.charAt(n.length-1)?n.slice(0,-1):n},t.parsePath=function(n){var t=n||"/",e="",o="",a=t.indexOf("#");-1!==a&&(o=t.substr(a),t=t.substr(0,a));var i=t.indexOf("?");return-1!==i&&(e=t.substr(i),t=t.substr(0,i)),{pathname:t,search:"?"===e?"":e,hash:"#"===o?"":o}},t.createPath=function(n){var t=n.pathname,e=n.search,o=n.hash,a=t||"/";return e&&"?"!==e&&(a+="?"===e.charAt(0)?e:"?"+e),o&&"#"!==o&&(a+="#"===o.charAt(0)?o:"#"+o),a}},qsDA:function(n,t,e){"use strict";n.exports=function(){}},ybmQ:function(n,t,e){"use strict";t.__esModule=!0,t.locationsAreEqual=t.createLocation=void 0;var o=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},a=s(e("SnHU")),i=s(e("fTOb")),r=e("qVbF");function s(n){return n&&n.__esModule?n:{default:n}}t.createLocation=function(n,t,e,i){var s=void 0;"string"==typeof n?(s=(0,r.parsePath)(n)).state=t:(void 0===(s=o({},n)).pathname&&(s.pathname=""),s.search?"?"!==s.search.charAt(0)&&(s.search="?"+s.search):s.search="",s.hash?"#"!==s.hash.charAt(0)&&(s.hash="#"+s.hash):s.hash="",void 0!==t&&void 0===s.state&&(s.state=t));try{s.pathname=decodeURI(s.pathname)}catch(n){throw n instanceof URIError?new URIError('Pathname "'+s.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):n}return e&&(s.key=e),i?s.pathname?"/"!==s.pathname.charAt(0)&&(s.pathname=(0,a.default)(s.pathname,i.pathname)):s.pathname=i.pathname:s.pathname||(s.pathname="/"),s},t.locationsAreEqual=function(n,t){return n.pathname===t.pathname&&n.search===t.search&&n.hash===t.hash&&n.key===t.key&&(0,i.default)(n.state,t.state)}}}]);
//# sourceMappingURL=bundle.npm.history.d9b714357998780f77b7.js.map