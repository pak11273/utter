(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{TnsT:function(t,o,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function e(t){return null!==t&&"object"===(void 0===t?"undefined":r(t))&&(t&&"function"==typeof t.then)}n.d(o,"a",function(){return f});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=Object.assign||function(t){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){return function(t,o){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,o){var n=[],r=!0,e=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!o||n.length!==o);r=!0);}catch(t){e=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(e)throw i}}return n}(t,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),y=["PENDING","FULFILLED","REJECTED"];function f(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.promiseTypeSuffixes||y,n=t.promiseTypeSeparator||"_";return function(t){var r=t.dispatch;return function(t){return function(y){if(!y.payload)return t(y);if(!e(y.payload)&&!e(y.payload.promise))return t(y);var f=y.type,p=y.payload,l=y.meta,c=u(o,3),d=c[0],s=c[1],v=c[2],b=function(t,o){return a({type:[f,o?v:s].join(n)},null==t?{}:{payload:t},void 0!==l?{meta:l}:{},o?{error:!0}:{})},m=void 0,h=void 0;e(y.payload)||"object"!==i(y.payload)?(m=p,h=void 0):(m=p.promise,h=p.data),t(a({type:[f,d].join(n)},void 0!==h?{payload:h}:{},void 0!==l?{meta:l}:{}));return m.then(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,o=b(t,!1);return r(o),{value:t,action:o}},function(t){var o=b(t,!0);throw r(o),t})}}}}}}]);
//# sourceMappingURL=bundle.npm.redux-promise-middleware.664556236babc03ca9d0.js.map