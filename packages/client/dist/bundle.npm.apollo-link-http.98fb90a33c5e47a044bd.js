(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{xcMk:function(e,t,n){"use strict";var r,o=n("iB/h"),i=n("IRnM"),a=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n},u=function(e){void 0===e&&(e={});var t=e.uri,n=void 0===t?"/graphql":t,r=e.fetch,a=e.includeExtensions,u=e.useGETForQueries,p=c(e,["uri","fetch","includeExtensions","useGETForQueries"]);Object(i.a)(r),r||(r=fetch);var f={http:{includeExtensions:a},options:p.fetchOptions,credentials:p.credentials,headers:p.headers};return new o.a(function(e){var t=Object(i.f)(e,n),a=e.getContext(),c={};if(a.clientAwareness){var p=a.clientAwareness,l=p.name,h=p.version;l&&(c["apollographql-client-name"]=l),h&&(c["apollographql-client-version"]=h)}var d,b=s({},c,a.headers),O={http:a.http,options:a.fetchOptions,credentials:a.credentials,headers:b},v=Object(i.e)(e,i.c,f,O),y=v.options,j=v.body;if(!y.signal){var w=Object(i.b)(),m=w.controller,x=w.signal;(d=m)&&(y.signal=x)}if(u&&!e.query.definitions.some(function(e){return"OperationDefinition"===e.kind&&"mutation"===e.operation})&&(y.method="GET"),"GET"===y.method){var g=function(e,t){var n=[],r=function(e,t){n.push(e+"="+encodeURIComponent(t))};"query"in t&&r("query",t.query);t.operationName&&r("operationName",t.operationName);if(t.variables){var o=void 0;try{o=Object(i.g)(t.variables,"Variables map")}catch(e){return{parseError:e}}r("variables",o)}if(t.extensions){var a=void 0;try{a=Object(i.g)(t.extensions,"Extensions map")}catch(e){return{parseError:e}}r("extensions",a)}var s="",c=e,u=e.indexOf("#");-1!==u&&(s=e.substr(u),c=e.substr(0,u));var p=-1===c.indexOf("?")?"?":"&";return{newURI:c+p+n.join("&")+s}}(t,j),E=g.newURI,q=g.parseError;if(q)return Object(o.d)(q);t=E}else try{y.body=Object(i.g)(j,"Payload")}catch(q){return Object(o.d)(q)}return new o.b(function(n){return r(t,y).then(function(t){return e.setContext({response:t}),t}).then(Object(i.d)(e)).then(function(e){return n.next(e),n.complete(),e}).catch(function(e){"AbortError"!==e.name&&(e.result&&e.result.errors&&e.result.data&&n.next(e.result),n.error(e))}),function(){d&&d.abort()}})})};var p=function(e){function t(t){return e.call(this,u(t).request)||this}return a(t,e),t}(o.a);n.d(t,"a",function(){return p})}}]);
//# sourceMappingURL=bundle.npm.apollo-link-http.98fb90a33c5e47a044bd.js.map