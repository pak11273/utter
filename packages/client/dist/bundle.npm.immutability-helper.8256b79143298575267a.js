(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{El27:function(t,e,n){var r=n("m/ml"),o=Object.prototype.hasOwnProperty,a=Array.prototype.splice,c=Object.prototype.toString,u=function(t){return c.call(t).slice(8,-1)},i=Object.assign||function(t,e){return p(e).forEach(function(n){o.call(e,n)&&(t[n]=e[n])}),t},p="function"==typeof Object.getOwnPropertySymbols?function(t){return Object.keys(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.keys(t)};function s(t){if(Array.isArray(t))return i(t.constructor(t.length),t);if("Map"===u(t))return new Map(t);if("Set"===u(t))return new Set(t);if(t&&"object"==typeof t){var e=Object.getPrototypeOf(t);return i(Object.create(e),t)}return t}function f(){var t=i({},y);return e.extend=function(e,n){t[e]=n},e.isEquals=function(t,e){return t===e},e;function e(n,a){"function"==typeof a&&(a={$apply:a}),Array.isArray(n)&&Array.isArray(a)||r(!Array.isArray(a),"update(): You provided an invalid spec to update(). The spec may not contain an array except as the value of $set, $push, $unshift, $splice or any custom command allowing an array value."),r("object"==typeof a&&null!==a,"update(): You provided an invalid spec to update(). The spec and every included key path must be plain objects containing one of the following commands: %s.",Object.keys(t).join(", "));var c=n;return p(a).forEach(function(r){if(o.call(t,r)){var i=n===c;c=t[r](a[r],c,a,n),i&&e.isEquals(c,n)&&(c=n)}else{var p="Map"===u(n)?e(n.get(r),a[r]):e(n[r],a[r]),f="Map"===u(c)?c.get(r):c[r];e.isEquals(p,f)&&(void 0!==p||o.call(n,r))||(c===n&&(c=s(n)),"Map"===u(c)?c.set(r,p):c[r]=p)}}),c}}var y={$push:function(t,e,n){return d(e,n,"$push"),t.length?e.concat(t):e},$unshift:function(t,e,n){return d(e,n,"$unshift"),t.length?t.concat(e):e},$splice:function(t,e,n,o){return function(t,e){r(Array.isArray(t),"Expected $splice target to be an array; got %s",t),h(e.$splice)}(e,n),t.forEach(function(t){h(t),e===o&&t.length&&(e=s(o)),a.apply(e,t)}),e},$set:function(t,e,n){return function(t){r(1===Object.keys(t).length,"Cannot have more than one key in an object with $set")}(n),t},$toggle:function(t,e){g(t,"$toggle");var n=t.length?s(e):e;return t.forEach(function(t){n[t]=!e[t]}),n},$unset:function(t,e,n,r){return g(t,"$unset"),t.forEach(function(t){Object.hasOwnProperty.call(e,t)&&(e===r&&(e=s(r)),delete e[t])}),e},$add:function(t,e,n,r){return b(e,"$add"),g(t,"$add"),"Map"===u(e)?t.forEach(function(t){var n=t[0],o=t[1];e===r&&e.get(n)!==o&&(e=s(r)),e.set(n,o)}):t.forEach(function(t){e!==r||e.has(t)||(e=s(r)),e.add(t)}),e},$remove:function(t,e,n,r){return b(e,"$remove"),g(t,"$remove"),t.forEach(function(t){e===r&&e.has(t)&&(e=s(r)),e.delete(t)}),e},$merge:function(t,e,n,o){var a,c;return a=e,r((c=t)&&"object"==typeof c,"update(): $merge expects a spec of type 'object'; got %s",c),r(a&&"object"==typeof a,"update(): $merge expects a target of type 'object'; got %s",a),p(t).forEach(function(n){t[n]!==e[n]&&(e===o&&(e=s(o)),e[n]=t[n])}),e},$apply:function(t,e){var n;return r("function"==typeof(n=t),"update(): expected spec of $apply to be a function; got %s.",n),t(e)}},l=f();function d(t,e,n){r(Array.isArray(t),"update(): expected target of %s to be an array; got %s.",n,t),g(e[n],n)}function g(t,e){r(Array.isArray(t),"update(): expected spec of %s to be an array; got %s. Did you forget to wrap your parameter in an array?",e,t)}function h(t){r(Array.isArray(t),"update(): expected spec of $splice to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?",t)}function b(t,e){var n=u(t);r("Map"===n||"Set"===n,"update(): %s expects a target of type Set or Map; got %s",e,n)}t.exports=l,t.exports.default=l,t.exports.newContext=f}}]);
//# sourceMappingURL=bundle.npm.immutability-helper.8256b79143298575267a.js.map