(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{UjYn:function(e,n,r){"use strict";e.exports=function(){}},g4NU:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e};n.default=function(){function e(e){return function(n,r){var t=e.getRule(r);return t?t.selector:((0,u.default)(!1,"[JSS] Could not find the referenced rule %s in %s.",r,e.options.meta||e),r)}}var n=function(e){return-1!==e.indexOf("&")};function r(e,r){for(var t=r.split(l),o=e.split(l),i="",u=0;u<t.length;u++)for(var a=t[u],c=0;c<o.length;c++){var f=o[c];i&&(i+=", "),i+=n(f)?f.replace(s,a):a+" "+f}return i}function o(e,n,r){if(r)return t({},r,{index:r.index+1});var o=e.options.nestingLevel;return o=void 0===o?1:o+1,t({},e.options,{nestingLevel:o,index:n.indexOf(e)+1})}return{onProcessStyle:function(i,u){if("style"!==u.type)return i;var l=u.options.parent,s=void 0,c=void 0;for(var f in i){var d=n(f),v="@"===f[0];if(d||v){if(s=o(u,l,s),d){var p=r(f,u.selector);c||(c=e(l)),p=p.replace(a,c),l.addRule(p,i[f],t({},s,{selector:p}))}else v&&l.addRule(f,null,s).addRule(u.key,i[f],{selector:u.selector});delete i[f]}}return i}}};var o,i=r("UjYn"),u=(o=i)&&o.__esModule?o:{default:o};var l=/\s*,\s*/g,s=/&/g,a=/\$([\w-]+)/g}}]);
//# sourceMappingURL=bundle.npm.jss-nested.b9283a6c5ab923bd6a19.js.map