(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{OWgm:function(r,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(r){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])}return r},o=function(){return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return function(r,t){var e=[],n=!0,o=!1,i=void 0;try{for(var u,a=r[Symbol.iterator]();!(n=(u=a.next()).done)&&(e.push(u.value),!t||e.length!==t);n=!0);}catch(r){o=!0,i=r}finally{try{!n&&a.return&&a.return()}finally{if(o)throw i}}return e}(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(r){return function(t){var e=t.dispatch,i=t.getState;return function(t){return function(u){if("function"==typeof u)return u(e,i);var a=u.promise,c=u.type,f=u.types,p=function(r,t){var e={};for(var n in r)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}(u,["promise","type","types"]);if("socket"!==c||!a)return t(u);var y=o(f,3),s=y[0],l=y[1],v=y[2];return t(n({},p,{type:s})),a(r).then(function(r){return t(n({},p,{result:r,type:l}))}).catch(function(r){return t(n({},p,{error:r,type:v}))})}}}}}}]);
//# sourceMappingURL=bundle.npm.redux-socketio.5c93eee4f6e569ab4415.js.map