(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{Zvp9:function(e,r,t){"use strict";var n=Array.isArray,i=Object.keys,o=Object.prototype.hasOwnProperty,f="undefined"!=typeof Element;e.exports=function(e,r){try{return function e(r,t){if(r===t)return!0;if(r&&t&&"object"==typeof r&&"object"==typeof t){var a,c,s,u=n(r),p=n(t);if(u&&p){if((c=r.length)!=t.length)return!1;for(a=c;0!=a--;)if(!e(r[a],t[a]))return!1;return!0}if(u!=p)return!1;var g=r instanceof Date,l=t instanceof Date;if(g!=l)return!1;if(g&&l)return r.getTime()==t.getTime();var m=r instanceof RegExp,h=t instanceof RegExp;if(m!=h)return!1;if(m&&h)return r.toString()==t.toString();var w=i(r);if((c=w.length)!==i(t).length)return!1;for(a=c;0!=a--;)if(!o.call(t,w[a]))return!1;if(f&&r instanceof Element&&t instanceof Element)return r===t;for(a=c;0!=a--;)if(!("_owner"===(s=w[a])&&r.$$typeof||e(r[s],t[s])))return!1;return!0}return r!=r&&t!=t}(e,r)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}}}}]);
//# sourceMappingURL=bundle.npm.react-fast-compare.86e7028a52aec3b8f5c9.js.map