(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{ktN7:function(e,n,r){var t=r("VvTQ").parse;function a(e){return e.replace(/[\s,]+/g," ").trim()}var o={},i={};var c=!0;var s=!1;function l(e){var n=a(e);if(o[n])return o[n];var r=t(e,{experimentalFragmentVariables:s});if(!r||"Document"!==r.kind)throw new Error("Not a valid GraphQL document.");return r=function e(n,r){var t=Object.prototype.toString.call(n);if("[object Array]"===t)return n.map(function(n){return e(n,r)});if("[object Object]"!==t)throw new Error("Unexpected input.");r&&n.loc&&delete n.loc,n.loc&&(delete n.loc.startToken,delete n.loc.endToken);var a,o,i,c=Object.keys(n);for(a in c)c.hasOwnProperty(a)&&(o=n[c[a]],"[object Object]"!==(i=Object.prototype.toString.call(o))&&"[object Array]"!==i||(n[c[a]]=e(o,!0)));return n}(r=function(e){for(var n,r={},t=[],o=0;o<e.definitions.length;o++){var s=e.definitions[o];if("FragmentDefinition"===s.kind){var l=s.name.value,u=a((n=s.loc).source.body.substring(n.start,n.end));i.hasOwnProperty(l)&&!i[l][u]?(c&&console.warn("Warning: fragment with name "+l+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"),i[l][u]=!0):i.hasOwnProperty(l)||(i[l]={},i[l][u]=!0),r[u]||(r[u]=!0,t.push(s))}else t.push(s)}return e.definitions=t,e}(r),!1),o[n]=r,r}function u(){for(var e=Array.prototype.slice.call(arguments),n=e[0],r="string"==typeof n?n:n[0],t=1;t<e.length;t++)e[t]&&e[t].kind&&"Document"===e[t].kind?r+=e[t].loc.source.body:r+=e[t],r+=n[t];return l(r)}u.default=u,u.resetCaches=function(){o={},i={}},u.disableFragmentWarnings=function(){c=!1},u.enableExperimentalFragmentVariables=function(){s=!0},u.disableExperimentalFragmentVariables=function(){s=!1},e.exports=u}}]);
//# sourceMappingURL=bundle.npm.graphql-tag.c14dd8ab35e20f4e77d9.js.map