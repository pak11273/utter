(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{"6ZJy":function(e,t,n){"use strict";var r=n("iLe6").get,i=Object.create(null),s=[],u=[];function a(e,t){if(!e)throw new Error(t||"assertion failure")}function l(e,t,n){this.parents=new Set,this.childValues=new Map,this.dirtyChildren=null,o(this,e,t,n),++l.count}function o(e,t,n,r){e.fn=t,e.key=n,e.args=r,e.value=i,e.dirty=!0,e.subscribe=null,e.unsubscribe=null,e.recomputing=!1,e.reportOrphan=null}t.POOL_TARGET_SIZE=100,l.count=0,l.acquire=function(e,t,n){var r=u.pop();return r?(o(r,e,t,n),r):new l(e,t,n)},t.Entry=l;var c=l.prototype;function h(e){var t=e.reportOrphan;return"function"==typeof t&&0===e.parents.size&&!0===t(e)}function f(e){e.parents.forEach(function(t){y(t,e)})}function d(e){e.parents.forEach(function(t){v(t,e)})}function p(e){return e.dirty||e.dirtyChildren&&e.dirtyChildren.size}function y(e,t){if(a(e.childValues.has(t)),a(p(t)),e.dirtyChildren){if(e.dirtyChildren.has(t))return}else e.dirtyChildren=s.pop()||new Set;e.dirtyChildren.add(t),f(e)}function v(e,t){var n=e.childValues;a(n.has(t)),a(!p(t));var r=n.get(t);r===i?n.set(t,t.value):r!==t.value&&e.setDirty(),w(e,t),p(e)||d(e)}function w(e,n){var r=e.dirtyChildren;r&&(r.delete(n),0===r.size&&(s.length<t.POOL_TARGET_SIZE&&s.push(r),e.dirtyChildren=null))}function m(e){a(!e.recomputing,"already recomputing"),e.recomputing=!0;var t=E(e),n=r(),i=n.currentParentEntry;n.currentParentEntry=e;var s=!0;try{e.value=e.fn.apply(null,e.args),s=!1}finally{e.recomputing=!1,a(n.currentParentEntry===e),n.currentParentEntry=i,s||!function(e){if("function"==typeof e.subscribe)try{C(e),e.unsubscribe=e.subscribe.apply(null,e.args)}catch(t){return e.setDirty(),!1}return!0}(e)?e.setDirty():function(e){e.dirty=!1,p(e)||d(e)}(e)}return t.forEach(h),e.value}c.recompute=function(){if(function(e){var t=r().currentParentEntry;if(t)return e.parents.add(t),t.childValues.has(e)||t.childValues.set(e,i),p(e)?y(t,e):v(t,e),t}(this)||!h(this))return function e(t){if(t.dirty)return m(t);if(p(t)&&(t.dirtyChildren.forEach(function(n){a(t.childValues.has(n));try{e(n)}catch(e){t.setDirty()}}),t.dirty))return m(t);a(t.value!==i);return t.value}(this)},c.setDirty=function(){this.dirty||(this.dirty=!0,this.value=i,f(this),C(this))},c.dispose=function(){var e=this;E(e).forEach(h),C(e),e.parents.forEach(function(t){t.setDirty(),g(t,e)}),function(e){a(0===e.parents.size),a(0===e.childValues.size),a(null===e.dirtyChildren),u.length<t.POOL_TARGET_SIZE&&u.push(e)}(e)};var b=[];function E(e){var t=b;return e.childValues.size>0&&(t=[],e.childValues.forEach(function(n,r){g(e,r),t.push(r)})),a(null===e.dirtyChildren),t}function g(e,t){t.parents.delete(e),e.childValues.delete(t),w(e,t)}function C(e){var t=e.unsubscribe;"function"==typeof t&&(e.unsubscribe=null,t())}},BEAX:function(e,t,n){"use strict";function r(e){this.map=new Map,this.newest=null,this.oldest=null,this.max=e&&e.max,this.dispose=e&&e.dispose}t.Cache=r;var i=r.prototype;function s(e,t){var n=e.map.get(t);if(n&&n!==e.newest){var r=n.older,i=n.newer;i&&(i.older=r),r&&(r.newer=i),n.older=e.newest,n.older.newer=n,n.newer=null,e.newest=n,n===e.oldest&&(e.oldest=i)}return n}i.has=function(e){return this.map.has(e)},i.get=function(e){var t=s(this,e);return t&&t.value},i.set=function(e,t){var n=s(this,e);return n?n.value=t:(n={key:e,value:t,newer:null,older:this.newest},this.newest&&(this.newest.newer=n),this.newest=n,this.oldest=this.oldest||n,this.map.set(e,n),n.value)},i.clean=function(){if("number"==typeof this.max)for(;this.oldest&&this.map.size>this.max;)this.delete(this.oldest.key)},i.delete=function(e){var t=this.map.get(e);return!!t&&(t===this.newest&&(this.newest=t.older),t===this.oldest&&(this.oldest=t.newer),t.newer&&(t.newer.older=t.older),t.older&&(t.older.newer=t.newer),this.map.delete(e),"function"==typeof this.dispose&&this.dispose(e,t.value),!0)}},SFvQ:function(e,t,n){"use strict";var r=n("BEAX").Cache,i=n("DaQ8").tuple,s=n("6ZJy").Entry,u=n("iLe6").get;t.defaultMakeCacheKey=i,t.wrap=function(e,t){var n=!!(t=function(e){return"function"!=typeof(e=e||Object.create(null)).makeCacheKey&&(e.makeCacheKey=i),"number"!=typeof e.max&&(e.max=Math.pow(2,16)),e}(t)).disposable,a=new r({max:t.max,dispose:function(e,t){t.dispose()}});function l(e){if(n)return a.delete(e.key),!0}function o(){if(!n||u().currentParentEntry){var r=t.makeCacheKey.apply(null,arguments);if(!r)return e.apply(null,arguments);for(var i=[],o=arguments.length;o--;)i[o]=arguments[o];var c=a.get(r);c?c.args=i:(a.set(r,c=s.acquire(e,r,i)),c.subscribe=t.subscribe,n&&(c.reportOrphan=l));var h=c.recompute();return a.set(r,c),0===c.parents.size&&a.clean(),n?void 0:h}}return o.dirty=function(){var e=t.makeCacheKey.apply(null,arguments);e&&a.has(e)&&a.get(e).setDirty()},o}},iLe6:function(e,t,n){"use strict";(function(e){var n=new function(){};function r(){return n}try{var i=e["eriuqer".split("").reverse().join("")]("fibers");r=function(){return i.current||n}}catch(e){}t.get=function(){var e=r();return e._optimism_local||(e._optimism_local=Object.create(null))}}).call(this,n("Fs+f")(e))}}]);
//# sourceMappingURL=bundle.npm.optimism.8dd242d341c8d48fdaae.js.map