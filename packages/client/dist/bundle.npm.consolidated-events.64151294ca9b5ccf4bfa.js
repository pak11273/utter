(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"7jRp":function(e,n,t){"use strict";t.d(n,"a",function(){return v});var r=!("undefined"==typeof window||!window.document||!window.document.createElement);var i=void 0;function s(){return void 0===i&&(i=function(){if(!r)return!1;if(!window.addEventListener||!window.removeEventListener||!Object.defineProperty)return!1;var e=!1;try{var n=Object.defineProperty({},"passive",{get:function(){e=!0}}),t=function(){};window.addEventListener("testPassiveEventSupport",t,n),window.removeEventListener("testPassiveEventSupport",t,n)}catch(e){}return e}()),i}function d(e){e.handlers===e.nextHandlers&&(e.nextHandlers=e.handlers.slice())}function a(e){this.target=e,this.events={}}a.prototype.getEventHandlers=function(){return function(e,n){var t,r=String(e)+" "+String((t=n)?!0===t?100:(t.capture<<0)+(t.passive<<1)+(t.once<<2):0);return this.events[r]||(this.events[r]={handlers:[],handleEvent:void 0},this.events[r].nextHandlers=this.events[r].handlers),this.events[r]}}(),a.prototype.handleEvent=function(){return function(e,n,t){var r=this.getEventHandlers(e,n);r.handlers=r.nextHandlers,r.handlers.forEach(function(e){e&&e(t)})}}(),a.prototype.add=function(){return function(e,n,t){var r=this,i=this.getEventHandlers(e,t);d(i),0===i.nextHandlers.length&&(i.handleEvent=this.handleEvent.bind(this,e,t),this.target.addEventListener(e,i.handleEvent,t)),i.nextHandlers.push(n);var s=!0;return function(){if(s){s=!1,d(i);var a=i.nextHandlers.indexOf(n);i.nextHandlers.splice(a,1),0===i.nextHandlers.length&&(r.target&&r.target.removeEventListener(e,i.handleEvent,t),i.handleEvent=void 0)}}}}();var o="__consolidated_events_handlers__";function v(e,n,t,r){e[o]||(e[o]=new a(e));var i=function(e){if(e)return s()?e:!!e.capture}(r);return e[o].add(n,t,i)}}}]);
//# sourceMappingURL=bundle.npm.consolidated-events.64151294ca9b5ccf4bfa.js.map