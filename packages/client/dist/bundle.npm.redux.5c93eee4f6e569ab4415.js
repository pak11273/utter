(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{aB4q:function(t,e,n){"use strict";n.r(e);var r=n("yzEV"),o=n("4DnI"),i={INIT:"@@redux/INIT"};function u(t,e,n){var a;if("function"==typeof e&&void 0===n&&(n=e,e=void 0),void 0!==n){if("function"!=typeof n)throw new Error("Expected the enhancer to be a function.");return n(u)(t,e)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var c=t,f=e,d=[],s=d,p=!1;function h(){s===d&&(s=d.slice())}function y(){return f}function l(t){if("function"!=typeof t)throw new Error("Expected listener to be a function.");var e=!0;return h(),s.push(t),function(){if(e){e=!1,h();var n=s.indexOf(t);s.splice(n,1)}}}function v(t){if(!Object(r.a)(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(p)throw new Error("Reducers may not dispatch actions.");try{p=!0,f=c(f,t)}finally{p=!1}for(var e=d=s,n=0;n<e.length;n++){(0,e[n])()}return t}return v({type:i.INIT}),(a={dispatch:v,subscribe:l,getState:y,replaceReducer:function(t){if("function"!=typeof t)throw new Error("Expected the nextReducer to be a function.");c=t,v({type:i.INIT})}})[o.a]=function(){var t,e=l;return(t={subscribe:function(t){if("object"!=typeof t)throw new TypeError("Expected the observer to be an object.");function n(){t.next&&t.next(y())}return n(),{unsubscribe:e(n)}}})[o.a]=function(){return this},t},a}function a(t,e){var n=e&&e.type;return"Given action "+(n&&'"'+n.toString()+'"'||"an action")+', reducer "'+t+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function c(t){for(var e=Object.keys(t),n={},r=0;r<e.length;r++){var o=e[r];0,"function"==typeof t[o]&&(n[o]=t[o])}var u=Object.keys(n);var c=void 0;try{!function(t){Object.keys(t).forEach(function(e){var n=t[e];if(void 0===n(void 0,{type:i.INIT}))throw new Error('Reducer "'+e+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===n(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+e+"\" returned undefined when probed with a random type. Don't try to handle "+i.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}(n)}catch(t){c=t}return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1];if(c)throw c;for(var r=!1,o={},i=0;i<u.length;i++){var f=u[i],d=n[f],s=t[f],p=d(s,e);if(void 0===p){var h=a(f,e);throw new Error(h)}o[f]=p,r=r||p!==s}return r?o:t}}function f(t,e){return function(){return e(t.apply(void 0,arguments))}}function d(t,e){if("function"==typeof t)return f(t,e);if("object"!=typeof t||null===t)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===t?"null":typeof t)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var n=Object.keys(t),r={},o=0;o<n.length;o++){var i=n[o],u=t[i];"function"==typeof u&&(r[i]=f(u,e))}return r}function s(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return 0===e.length?function(t){return t}:1===e.length?e[0]:e.reduce(function(t,e){return function(){return t(e.apply(void 0,arguments))}})}var p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function h(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return function(n,r,o){var i,u=t(n,r,o),a=u.dispatch,c={getState:u.getState,dispatch:function(t){return a(t)}};return i=e.map(function(t){return t(c)}),a=s.apply(void 0,i)(u.dispatch),p({},u,{dispatch:a})}}}n.d(e,"createStore",function(){return u}),n.d(e,"combineReducers",function(){return c}),n.d(e,"bindActionCreators",function(){return d}),n.d(e,"applyMiddleware",function(){return h}),n.d(e,"compose",function(){return s})}}]);
//# sourceMappingURL=bundle.npm.redux.5c93eee4f6e569ab4415.js.map