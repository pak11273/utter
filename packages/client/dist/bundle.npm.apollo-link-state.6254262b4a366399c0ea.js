(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"54pe":function(t,e,r){"use strict";var n=r("iB/h"),o=r("cQN5"),a=r("u/bu"),i=r("jPxk"),c=r("scFH"),u=r("KH6z"),f={test:function(t){return"client"===t.name.value},remove:!0},s=new Map;r.d(e,"a",function(){return d});var p,v=(p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},function(t,e){function r(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),l=i.graphql,d=function(t){void 0===t&&(t={resolvers:{},defaults:{}});var e=t.defaults,r=t.cache,i=t.typeDefs,p=t.fragmentMatcher;return r&&e&&r.writeData({data:e}),new(function(d){function y(){return null!==d&&d.apply(this,arguments)||this}return v(y,d),y.prototype.writeDefaults=function(){r&&e&&r.writeData({data:e})},y.prototype.request=function(r,v){if(void 0===v&&(v=function(){return n.b.of({data:{}})}),i){var d=function(t){return(Array.isArray(t)?t:[t]).map(function(t){return"string"==typeof t?t:Object(c.a)(t)}).map(function(t){return t.trim()}).join("\n")}(i);r.setContext(function(t){var e=t.schemas;return{schemas:(void 0===e?[]:e).concat([{definition:d,directives:"directive @client on FIELD"}])}})}if(!Object(o.c)(["client"],r.query))return v(r);var y,b="function"==typeof t.resolvers?t.resolvers():t.resolvers,h=function(t){var e=s.get(t);if(e)return e;Object(a.a)(t);var r=Object(u.e)([f],t);return s.set(t,r),r}(r.query),w=r.query,m=(y=(Object(a.f)(w)||{}).operation).charAt(0).toUpperCase()+y.slice(1)||"Query",_=function(t,r,n,o,a){void 0===r&&(r={});var i=a.resultKey,c=r[i],u=r[t],f=i!==t;if(void 0!==c||void 0!==u)return c||u;var s=b[r.__typename||m];if(s){var p=s[t];if(p)return p(r,n,o,a)}return(f?c:u)||(e||{})[t]};h&&(r.query=h);var j=h&&v?v(r):n.b.of({data:{}});return new n.b(function(t){var e=!1,n=!1;j.subscribe({next:function(o){var a=o.data,i=o.errors,c=t.error.bind(t),u=r.getContext();n=!0,l(_,w,a,u,r.variables,{fragmentMatcher:p}).then(function(r){t.next({data:r,errors:i}),e&&t.complete(),n=!1}).catch(c)},error:t.error.bind(t),complete:function(){n||t.complete(),e=!0}})})},y}(n.a))}}}]);
//# sourceMappingURL=bundle.npm.apollo-link-state.6254262b4a366399c0ea.js.map