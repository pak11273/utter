(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Rl4o:function(t,n,e){"use strict";n.__esModule=!0;n.canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement),n.addEventListener=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent("on"+n,e)},n.removeEventListener=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent("on"+n,e)},n.getConfirmation=function(t,n){return n(window.confirm(t))},n.supportsHistory=function(){var t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},n.supportsPopStateOnHashChange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},n.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},n.isExtraneousPopstateEvent=function(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")}},ap8c:function(t,n,e){"use strict";n.__esModule=!0;var o,a=e("qsDA"),r=(o=a)&&o.__esModule?o:{default:o};n.default=function(){var t=null,n=[];return{setPrompt:function(n){return(0,r.default)(null==t,"A history supports only one prompt at a time"),t=n,function(){t===n&&(t=null)}},confirmTransitionTo:function(n,e,o,a){if(null!=t){var i="function"==typeof t?t(n,e):t;"string"==typeof i?"function"==typeof o?o(i,a):((0,r.default)(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),a(!0)):a(!1!==i)}else a(!0)},appendListener:function(t){var e=!0,o=function(){e&&t.apply(void 0,arguments)};return n.push(o),function(){e=!1,n=n.filter(function(t){return t!==o})}},notifyListeners:function(){for(var t=arguments.length,e=Array(t),o=0;o<t;o++)e[o]=arguments[o];n.forEach(function(t){return t.apply(void 0,e)})}}}},bmN0:function(t,n,e){"use strict";var o=e("qsDA"),a=e.n(o),r=e("m/ml"),i=e.n(r),s=e("SnHU"),c=e("fTOb"),u=function(t){return"/"===t.charAt(0)?t:"/"+t},h=function(t,n){return new RegExp("^"+n+"(\\/|\\?|#|$)","i").test(t)},f=function(t,n){return h(t,n)?t.substr(n.length):t},d=function(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t},l=function(t){var n=t.pathname,e=t.search,o=t.hash,a=n||"/";return e&&"?"!==e&&(a+="?"===e.charAt(0)?e:"?"+e),o&&"#"!==o&&(a+="#"===o.charAt(0)?o:"#"+o),a},p=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},v=function(t,n,e,o){var a=void 0;"string"==typeof t?(a=function(t){var n=t||"/",e="",o="",a=n.indexOf("#");-1!==a&&(o=n.substr(a),n=n.substr(0,a));var r=n.indexOf("?");return-1!==r&&(e=n.substr(r),n=n.substr(0,r)),{pathname:n,search:"?"===e?"":e,hash:"#"===o?"":o}}(t)).state=n:(void 0===(a=p({},t)).pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==n&&void 0===a.state&&(a.state=n));try{a.pathname=decodeURI(a.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return e&&(a.key=e),o?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=Object(s.default)(a.pathname,o.pathname)):a.pathname=o.pathname:a.pathname||(a.pathname="/"),a},m=function(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash&&t.key===n.key&&Object(c.default)(t.state,n.state)},y=function(){var t=null,n=[];return{setPrompt:function(n){return a()(null==t,"A history supports only one prompt at a time"),t=n,function(){t===n&&(t=null)}},confirmTransitionTo:function(n,e,o,r){if(null!=t){var i="function"==typeof t?t(n,e):t;"string"==typeof i?"function"==typeof o?o(i,r):(a()(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),r(!0)):r(!1!==i)}else r(!0)},appendListener:function(t){var e=!0,o=function(){e&&t.apply(void 0,arguments)};return n.push(o),function(){e=!1,n=n.filter(function(t){return t!==o})}},notifyListeners:function(){for(var t=arguments.length,e=Array(t),o=0;o<t;o++)e[o]=arguments[o];n.forEach(function(t){return t.apply(void 0,e)})}}},w=!("undefined"==typeof window||!window.document||!window.document.createElement),g=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent("on"+n,e)},b=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent("on"+n,e)},O=function(t,n){return n(window.confirm(t))},k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},A=function(){try{return window.history.state||{}}catch(t){return{}}},L=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i()(w,"Browser history needs a DOM");var n,e=window.history,o=(-1===(n=window.navigator.userAgent).indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history,r=!(-1===window.navigator.userAgent.indexOf("Trident")),s=t.forceRefresh,c=void 0!==s&&s,p=t.getUserConfirmation,m=void 0===p?O:p,L=t.keyLength,P=void 0===L?6:L,S=t.basename?d(u(t.basename)):"",x=function(t){var n=t||{},e=n.key,o=n.state,r=window.location,i=r.pathname+r.search+r.hash;return a()(!S||h(i,S),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+i+'" to begin with "'+S+'".'),S&&(i=f(i,S)),v(i,o,e)},T=function(){return Math.random().toString(36).substr(2,P)},j=y(),U=function(t){E(V,t),V.length=e.length,j.notifyListeners(V.location,V.action)},M=function(t){(function(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")})(t)||C(x(t.state))},R=function(){C(x(A()))},H=!1,C=function(t){H?(H=!1,U()):j.confirmTransitionTo(t,"POP",m,function(n){n?U({action:"POP",location:t}):_(t)})},_=function(t){var n=V.location,e=q.indexOf(n.key);-1===e&&(e=0);var o=q.indexOf(t.key);-1===o&&(o=0);var a=e-o;a&&(H=!0,F(a))},B=x(A()),q=[B.key],D=function(t){return S+l(t)},F=function(t){e.go(t)},I=0,Y=function(t){1===(I+=t)?(g(window,"popstate",M),r&&g(window,"hashchange",R)):0===I&&(b(window,"popstate",M),r&&b(window,"hashchange",R))},Q=!1,V={length:e.length,action:"POP",location:B,createHref:D,push:function(t,n){a()(!("object"===(void 0===t?"undefined":k(t))&&void 0!==t.state&&void 0!==n),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var r=v(t,n,T(),V.location);j.confirmTransitionTo(r,"PUSH",m,function(t){if(t){var n=D(r),i=r.key,s=r.state;if(o)if(e.pushState({key:i,state:s},null,n),c)window.location.href=n;else{var u=q.indexOf(V.location.key),h=q.slice(0,-1===u?0:u+1);h.push(r.key),q=h,U({action:"PUSH",location:r})}else a()(void 0===s,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=n}})},replace:function(t,n){a()(!("object"===(void 0===t?"undefined":k(t))&&void 0!==t.state&&void 0!==n),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var r=v(t,n,T(),V.location);j.confirmTransitionTo(r,"REPLACE",m,function(t){if(t){var n=D(r),i=r.key,s=r.state;if(o)if(e.replaceState({key:i,state:s},null,n),c)window.location.replace(n);else{var u=q.indexOf(V.location.key);-1!==u&&(q[u]=r.key),U({action:"REPLACE",location:r})}else a()(void 0===s,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(n)}})},go:F,goBack:function(){return F(-1)},goForward:function(){return F(1)},block:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=j.setPrompt(t);return Q||(Y(1),Q=!0),function(){return Q&&(Q=!1,Y(-1)),n()}},listen:function(t){var n=j.appendListener(t);return Y(1),function(){Y(-1),n()}}};return V};Object.assign,"function"==typeof Symbol&&Symbol.iterator,Object.assign;e.d(n,"a",function(){return L}),e.d(n,"b",function(){return v}),e.d(n,"c",function(){return m})},gQjb:function(t,n,e){"use strict";n.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},r=f(e("qsDA")),i=f(e("m/ml")),s=e("ybmQ"),c=e("qVbF"),u=f(e("ap8c")),h=e("Rl4o");function f(t){return t&&t.__esModule?t:{default:t}}var d=function(){try{return window.history.state||{}}catch(t){return{}}};n.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,i.default)(h.canUseDOM,"Browser history needs a DOM");var n=window.history,e=(0,h.supportsHistory)(),f=!(0,h.supportsPopStateOnHashChange)(),l=t.forceRefresh,p=void 0!==l&&l,v=t.getUserConfirmation,m=void 0===v?h.getConfirmation:v,y=t.keyLength,w=void 0===y?6:y,g=t.basename?(0,c.stripTrailingSlash)((0,c.addLeadingSlash)(t.basename)):"",b=function(t){var n=t||{},e=n.key,o=n.state,a=window.location,i=a.pathname+a.search+a.hash;return(0,r.default)(!g||(0,c.hasBasename)(i,g),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+i+'" to begin with "'+g+'".'),g&&(i=(0,c.stripBasename)(i,g)),(0,s.createLocation)(i,o,e)},O=function(){return Math.random().toString(36).substr(2,w)},k=(0,u.default)(),E=function(t){a(_,t),_.length=n.length,k.notifyListeners(_.location,_.action)},A=function(t){(0,h.isExtraneousPopstateEvent)(t)||S(b(t.state))},L=function(){S(b(d()))},P=!1,S=function(t){P?(P=!1,E()):k.confirmTransitionTo(t,"POP",m,function(n){n?E({action:"POP",location:t}):x(t)})},x=function(t){var n=_.location,e=j.indexOf(n.key);-1===e&&(e=0);var o=j.indexOf(t.key);-1===o&&(o=0);var a=e-o;a&&(P=!0,M(a))},T=b(d()),j=[T.key],U=function(t){return g+(0,c.createPath)(t)},M=function(t){n.go(t)},R=0,H=function(t){1===(R+=t)?((0,h.addEventListener)(window,"popstate",A),f&&(0,h.addEventListener)(window,"hashchange",L)):0===R&&((0,h.removeEventListener)(window,"popstate",A),f&&(0,h.removeEventListener)(window,"hashchange",L))},C=!1,_={length:n.length,action:"POP",location:T,createHref:U,push:function(t,a){(0,r.default)(!("object"===(void 0===t?"undefined":o(t))&&void 0!==t.state&&void 0!==a),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var i=(0,s.createLocation)(t,a,O(),_.location);k.confirmTransitionTo(i,"PUSH",m,function(t){if(t){var o=U(i),a=i.key,s=i.state;if(e)if(n.pushState({key:a,state:s},null,o),p)window.location.href=o;else{var c=j.indexOf(_.location.key),u=j.slice(0,-1===c?0:c+1);u.push(i.key),j=u,E({action:"PUSH",location:i})}else(0,r.default)(void 0===s,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=o}})},replace:function(t,a){(0,r.default)(!("object"===(void 0===t?"undefined":o(t))&&void 0!==t.state&&void 0!==a),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var i=(0,s.createLocation)(t,a,O(),_.location);k.confirmTransitionTo(i,"REPLACE",m,function(t){if(t){var o=U(i),a=i.key,s=i.state;if(e)if(n.replaceState({key:a,state:s},null,o),p)window.location.replace(o);else{var c=j.indexOf(_.location.key);-1!==c&&(j[c]=i.key),E({action:"REPLACE",location:i})}else(0,r.default)(void 0===s,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(o)}})},go:M,goBack:function(){return M(-1)},goForward:function(){return M(1)},block:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=k.setPrompt(t);return C||(H(1),C=!0),function(){return C&&(C=!1,H(-1)),n()}},listen:function(t){var n=k.appendListener(t);return H(1),function(){H(-1),n()}}};return _}},qVbF:function(t,n,e){"use strict";n.__esModule=!0;n.addLeadingSlash=function(t){return"/"===t.charAt(0)?t:"/"+t},n.stripLeadingSlash=function(t){return"/"===t.charAt(0)?t.substr(1):t};var o=n.hasBasename=function(t,n){return new RegExp("^"+n+"(\\/|\\?|#|$)","i").test(t)};n.stripBasename=function(t,n){return o(t,n)?t.substr(n.length):t},n.stripTrailingSlash=function(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t},n.parsePath=function(t){var n=t||"/",e="",o="",a=n.indexOf("#");-1!==a&&(o=n.substr(a),n=n.substr(0,a));var r=n.indexOf("?");return-1!==r&&(e=n.substr(r),n=n.substr(0,r)),{pathname:n,search:"?"===e?"":e,hash:"#"===o?"":o}},n.createPath=function(t){var n=t.pathname,e=t.search,o=t.hash,a=n||"/";return e&&"?"!==e&&(a+="?"===e.charAt(0)?e:"?"+e),o&&"#"!==o&&(a+="#"===o.charAt(0)?o:"#"+o),a}},qsDA:function(t,n,e){"use strict";t.exports=function(){}},ybmQ:function(t,n,e){"use strict";n.__esModule=!0,n.locationsAreEqual=n.createLocation=void 0;var o=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},a=s(e("SnHU")),r=s(e("fTOb")),i=e("qVbF");function s(t){return t&&t.__esModule?t:{default:t}}n.createLocation=function(t,n,e,r){var s=void 0;"string"==typeof t?(s=(0,i.parsePath)(t)).state=n:(void 0===(s=o({},t)).pathname&&(s.pathname=""),s.search?"?"!==s.search.charAt(0)&&(s.search="?"+s.search):s.search="",s.hash?"#"!==s.hash.charAt(0)&&(s.hash="#"+s.hash):s.hash="",void 0!==n&&void 0===s.state&&(s.state=n));try{s.pathname=decodeURI(s.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+s.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return e&&(s.key=e),r?s.pathname?"/"!==s.pathname.charAt(0)&&(s.pathname=(0,a.default)(s.pathname,r.pathname)):s.pathname=r.pathname:s.pathname||(s.pathname="/"),s},n.locationsAreEqual=function(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash&&t.key===n.key&&(0,r.default)(t.state,n.state)}}}]);
//# sourceMappingURL=bundle.npm.history.6b1407e160e8bed799a6.js.map