(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{UkNT:function(e,n,t){"use strict";var r=t("Mo3Q"),o=t.n(r).a;t("UNrv"),t("3HLU");var i,u=t("scFH"),s=(i=function(e,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)},function(e,n){function t(){this.constructor=e}i(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),c=function(){return(c=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)};var a=function(e){function n(n,t){var r=e.call(this,n)||this;return r.link=t,r}return s(n,e),n}(Error);function f(e){return e.request.length<=1}function p(e,n){var t=c({},e);return Object.defineProperty(n,"setContext",{enumerable:!1,value:function(e){t=c({},t,"function"==typeof e?e(t):e)}}),Object.defineProperty(n,"getContext",{enumerable:!1,value:function(){return c({},t)}}),Object.defineProperty(n,"toKey",{enumerable:!1,value:function(){return function(e){return Object(u.a)(e.query)+"|"+JSON.stringify(e.variables)+"|"+e.operationName}(n)}}),n}var l=function(e,n){return n?n(e):o.of()},y=function(e){return"function"==typeof e?new w(e):e},h=function(){return new w(function(e,n){return o.of()})},v=function(e){return 0===e.length?h():e.map(y).reduce(function(e,n){return e.concat(n)})},b=function(e,n,t){void 0===t&&(t=new w(l));var r=y(n),i=y(t);return f(r)&&f(i)?new w(function(n){return e(n)?r.request(n)||o.of():i.request(n)||o.of()}):new w(function(n,t){return e(n)?r.request(n,t)||o.of():i.request(n,t)||o.of()})},d=function(e,n){var t=y(e);if(f(t))return console.warn(new a("You are calling concat on a terminating link, which will have no effect",t)),t;var r=y(n);return f(r)?new w(function(e){return t.request(e,function(e){return r.request(e)||o.of()})||o.of()}):new w(function(e,n){return t.request(e,function(e){return r.request(e,n)||o.of()})||o.of()})},w=function(){function e(e){e&&(this.request=e)}return e.prototype.split=function(n,t,r){return void 0===r&&(r=new e(l)),this.concat(b(n,t,r))},e.prototype.concat=function(e){return d(this,e)},e.prototype.request=function(e,n){throw new Error("request is not implemented")},e.empty=h,e.from=v,e.split=b,e.execute=m,e}();function m(e,n){return e.request(p(n.context,function(e){var n={variables:e.variables||{},extensions:e.extensions||{},operationName:e.operationName,query:e.query};return n.operationName||(n.operationName="string"!=typeof n.query?n.query.definitions.filter(function(e){return"OperationDefinition"===e.kind&&e.name}).map(function(e){return e.name.value})[0]||null:""),n}(function(e){for(var n=["query","operationName","variables","extensions","context"],t=0,r=Object.keys(e);t<r.length;t++){var o=r[t];if(n.indexOf(o)<0)throw new Error("illegal argument: "+o)}return e}(n))))||o.of()}t.d(n,"a",function(){return E});var O=t("1GLD"),g={generateHash:function(e){return O().update(Object(u.a)(e)).digest("hex")},disable:function(e){var n=e.graphQLErrors,t=e.operation;if(n&&n.some(function(e){return"PersistedQueryNotSupported"===e.message}))return!0;var r=t.getContext().response;return!(!r||!r.status||400!==r.status&&500!==r.status)},useGETForHashedQueries:!1};function q(e){return"OperationDefinition"===e.kind&&"mutation"===e.operation}var x=Object.prototype.hasOwnProperty,j="function"==typeof Symbol?Symbol.for("__createPersistedQueryLink_hashes"):"__createPersistedQueryLink_hashes",k=0,E=function(e){void 0===e&&(e={});var n=Object.assign({},g,e),t=n.generateHash,r=n.disable,i=n.useGETForHashedQueries,u=!0,s="forLink"+k++;function c(e){if(!e||"object"!=typeof e)return t(e);x.call(e,j)||Object.defineProperty(e,j,{value:Object.create(null),enumerable:!1});var n=e[j];return x.call(n,s)?n[s]:n[s]=t(e)}return new w(function(e,n){if(!n)throw new Error("PersistedQueryLink cannot be the last link in the chain.");var t,s=e.query;if(u)try{e.extensions.persistedQuery={version:1,sha256Hash:c(s)}}catch(e){t=e}return new o(function(o){if(!t){var s,c,a=!1,f=!1,p=function(t,o){var i=t.response,p=t.networkError;if(!a&&(i&&i.errors||p)){a=!0;var y={response:i,networkError:p,operation:e,graphQLErrors:i?i.errors:void 0};if(u=!r(y),i&&i.errors&&i.errors.some(function(e){return"PersistedQueryNotFound"===e.message})||!u)return s&&s.unsubscribe(),e.setContext({http:{includeQuery:!0,includeExtensions:u}}),f&&e.setContext({fetchOptions:c}),void(s=n(e).subscribe(l))}o()},l={next:function(e){p({response:e},function(){return o.next(e)})},error:function(e){p({networkError:e},function(){return o.error(e)})},complete:o.complete.bind(o)};return e.setContext({http:{includeQuery:!u,includeExtensions:u}}),i&&u&&function(e){return!e.query.definitions.some(q)}(e)&&(e.setContext(function(e){var n=e.fetchOptions,t=void 0===n?{}:n;return c=t,{fetchOptions:Object.assign({},t,{method:"GET"})}}),f=!0),s=n(e).subscribe(l),function(){s&&s.unsubscribe()}}o.error(t)})})}}}]);
//# sourceMappingURL=bundle.npm.apollo-link-persisted-queries.442ecb74993e55ee6a5f.js.map