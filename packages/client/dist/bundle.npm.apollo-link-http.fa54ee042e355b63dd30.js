(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"M/w7":function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n("UNrv"),i=n("KeHV"),o=n("e0vG"),a=n("eRYG"),s=function(e){void 0===e&&(e={});var t=e.uri,n=void 0===t?"/graphql":t,s=e.fetch,c=e.includeExtensions,u=e.useGETForQueries,l=Object(r.e)(e,["uri","fetch","includeExtensions","useGETForQueries"]);Object(a.a)(s),s||(s=fetch);var p={http:{includeExtensions:c},options:l.fetchOptions,credentials:l.credentials,headers:l.headers};return new i.a(function(e){var t=Object(a.f)(e,n),c=e.getContext(),l={};if(c.clientAwareness){var d=c.clientAwareness,f=d.name,h=d.version;f&&(l["apollographql-client-name"]=f),h&&(l["apollographql-client-version"]=h)}var b,v=Object(r.a)({},l,c.headers),O={http:c.http,options:c.fetchOptions,credentials:c.credentials,headers:v},j=Object(a.e)(e,a.c,p,O),m=j.options,w=j.body;if(!m.signal){var x=Object(a.b)(),E=x.controller,g=x.signal;(b=E)&&(m.signal=g)}if(u&&!e.query.definitions.some(function(e){return"OperationDefinition"===e.kind&&"mutation"===e.operation})&&(m.method="GET"),"GET"===m.method){var y=function(e,t){var n=[],r=function(e,t){n.push(e+"="+encodeURIComponent(t))};"query"in t&&r("query",t.query);t.operationName&&r("operationName",t.operationName);if(t.variables){var i=void 0;try{i=Object(a.g)(t.variables,"Variables map")}catch(e){return{parseError:e}}r("variables",i)}if(t.extensions){var o=void 0;try{o=Object(a.g)(t.extensions,"Extensions map")}catch(e){return{parseError:e}}r("extensions",o)}var s="",c=e,u=e.indexOf("#");-1!==u&&(s=e.substr(u),c=e.substr(0,u));var l=-1===c.indexOf("?")?"?":"&";return{newURI:c+l+n.join("&")+s}}(t,w),q=y.newURI,G=y.parseError;if(G)return Object(i.c)(G);t=q}else try{m.body=Object(a.g)(w,"Payload")}catch(G){return Object(i.c)(G)}return new o.a(function(n){return s(t,m).then(function(t){return e.setContext({response:t}),t}).then(Object(a.d)(e)).then(function(e){return n.next(e),n.complete(),e}).catch(function(e){"AbortError"!==e.name&&(e.result&&e.result.errors&&e.result.data&&n.next(e.result),n.error(e))}),function(){b&&b.abort()}})})};var c=function(e){function t(t){return e.call(this,s(t).request)||this}return Object(r.c)(t,e),t}(i.a)}}]);
//# sourceMappingURL=bundle.npm.apollo-link-http.fa54ee042e355b63dd30.js.map