(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{Apzy:function(e,t,n){"use strict";function r(e){return e.replace(/^\s+|\s+$/g,"")}n.r(t);var o=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function a(e){console.warn("[react-ga]",e)}var i="REDACTED (Potential Email Address)";function c(e,t){return function(e){return/[^@]+@[^@]+/.test(e)}(e)?(a("This arg looks like an email address, redacting."),i):t?r(e).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,function(e,t,n){return t>0&&t+e.length!==n.length&&e.search(o)>-1&&":"!==n.charAt(t-2)&&("-"!==n.charAt(t+e.length)||"-"===n.charAt(t-1))&&n.charAt(t-1).search(/[^\s-]/)<0?e.toLowerCase():e.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)}):e}var l=function(e){var t,n,r,o,a,i,c,l="https://www.google-analytics.com/analytics.js";e&&e.gaAddress?l=e.gaAddress:e&&e.debug&&(l="https://www.google-analytics.com/analytics_debug.js"),t=window,n=document,r="script",o=l,a="ga",t.GoogleAnalyticsObject=a,t.ga=t.ga||function(){(t.ga.q=t.ga.q||[]).push(arguments)},t.ga.l=1*new Date,i=n.createElement(r),c=n.getElementsByTagName(r)[0],i.async=1,i.src=o,c.parentNode.insertBefore(i,c)};function u(e){console.info("[react-ga]",e)}var f=[],s={calls:f,ga:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];f.push(t.concat())},resetCalls:function(){f.length=0}},g=n("r0ML"),p=n.n(g),b=n("cNRa"),y=n.n(b);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k="_blank",A=1,S=function(e){function t(){var e,n,r,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];return r=this,o=(e=h(t)).call.apply(e,[this].concat(i)),n=!o||"object"!==d(o)&&"function"!=typeof o?O(r):o,j(O(O(n)),"handleClick",function(e){var r=n.props,o=r.target,a=r.eventLabel,i=r.to,c=r.onClick,l={label:a},u=o!==k,f=!(e.ctrlKey||e.shiftKey||e.metaKey||e.button===A);u&&f?(e.preventDefault(),t.trackLink(l,function(){window.location.href=i})):t.trackLink(l,function(){}),c&&c(e)}),n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,g["Component"]),n=t,(r=[{key:"render",value:function(){var e=this.props,t=e.to,n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){j(e,t,n[t])})}return e}({},v(e,["to"]),{href:t,onClick:this.handleClick});return this.props.target===k&&(n.rel="noopener noreferrer"),delete n.eventLabel,p.a.createElement("a",n)}}])&&m(n.prototype,r),o&&m(n,o),t}();function E(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e){return(T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function q(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}j(S,"trackLink",function(){a("ga tracking not enabled")}),j(S,"propTypes",{eventLabel:y.a.string.isRequired,target:y.a.string,to:y.a.string,onClick:y.a.func}),j(S,"defaultProps",{target:null,to:null,onClick:null}),n.d(t,"initialize",function(){return z}),n.d(t,"ga",function(){return R}),n.d(t,"set",function(){return M}),n.d(t,"send",function(){return F}),n.d(t,"pageview",function(){return G}),n.d(t,"modalview",function(){return K}),n.d(t,"timing",function(){return V}),n.d(t,"event",function(){return B}),n.d(t,"exception",function(){return Z}),n.d(t,"plugin",function(){return $}),n.d(t,"outboundLink",function(){return U}),n.d(t,"OutboundLink",function(){return H}),n.d(t,"testModeAPI",function(){return Q});var C=!1,x=!0,L=!1,N=!0,D=function(){var e;return L?s.ga.apply(s,arguments):"undefined"!=typeof window&&(window.ga?(e=window).ga.apply(e,arguments):a("ReactGA.initialize must be called first or GoogleAnalytics should be loaded manually"))};function I(e){return c(e,x)}function _(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=n[0];if("function"==typeof D){if("string"!=typeof o)return void a("ga command must be a string");!N&&Array.isArray(e)||D.apply(void 0,n),Array.isArray(e)&&e.forEach(function(e){D.apply(void 0,q(["".concat(e,".").concat(o)].concat(n.slice(1))))})}}function J(e,t){e?(t&&(t.debug&&!0===t.debug&&(C=!0),!1===t.titleCase&&(x=!1)),t&&t.gaOptions?D("create",e,t.gaOptions):D("create",e,"auto")):a("gaTrackingID is required in initialize()")}function z(e,t){if(t&&!0===t.testMode)L=!0;else{if("undefined"==typeof window)return!1;t&&!0===t.standardImplementation||l(t)}return N=!t||"boolean"!=typeof t.alwaysSendToDefaultTracker||t.alwaysSendToDefaultTracker,Array.isArray(e)?e.forEach(function(e){"object"===T(e)?J(e.trackingId,e):a("All configs must be an object")}):J(e,t),!0}function R(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.length>0&&(D.apply(void 0,t),C&&(u("called ga('arguments');"),u("with arguments: ".concat(JSON.stringify(t))))),window.ga}function M(e,t){e?"object"===T(e)?(0===Object.keys(e).length&&a("empty `fieldsObject` given to .set()"),_(t,"set",e),C&&(u("called ga('set', fieldsObject);"),u("with fieldsObject: ".concat(JSON.stringify(e))))):a("Expected `fieldsObject` arg to be an Object"):a("`fieldsObject` is required in .set()")}function F(e,t){_(t,"send",e),C&&(u("called ga('send', fieldObject);"),u("with fieldObject: ".concat(JSON.stringify(e))),u("with trackers: ".concat(JSON.stringify(t))))}function G(e,t,n){if(e){var o=r(e);if(""!==o){var i={};if(n&&(i.title=n),_(t,"send",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){P(e,t,n[t])})}return e}({hitType:"pageview",page:o},i)),C){u("called ga('send', 'pageview', path);");var c="";n&&(c=" and title: ".concat(n)),u("with path: ".concat(o).concat(c))}}else a("path cannot be an empty string in .pageview()")}else a("path is required in .pageview()")}function K(e,t){if(e){var n,o="/"===(n=r(e)).substring(0,1)?n.substring(1):n;if(""!==o){var i="/modal/".concat(o);_(t,"send","pageview",i),C&&(u("called ga('send', 'pageview', path);"),u("with path: ".concat(i)))}else a("modalName cannot be an empty string or a single / in .modalview()")}else a("modalName is required in .modalview(modalName)")}function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.category,n=e.variable,r=e.value,o=e.label,i=arguments.length>1?arguments[1]:void 0;if(t&&n&&r&&"number"==typeof r){var c={hitType:"timing",timingCategory:I(t),timingVar:I(n),timingValue:r};o&&(c.timingLabel=I(o)),F(c,i)}else a("args.category, args.variable AND args.value are required in timing() AND args.value has to be a number")}function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.category,n=e.action,r=e.label,o=e.value,i=e.nonInteraction,c=e.transport,l=E(e,["category","action","label","value","nonInteraction","transport"]),u=arguments.length>1?arguments[1]:void 0;if(t&&n){var f={hitType:"event",eventCategory:I(t),eventAction:I(n)};r&&(f.eventLabel=I(r)),void 0!==o&&("number"!=typeof o?a("Expected `args.value` arg to be a Number."):f.eventValue=o),void 0!==i&&("boolean"!=typeof i?a("`args.nonInteraction` must be a boolean."):f.nonInteraction=i),void 0!==c&&("string"!=typeof c?a("`args.transport` must be a string."):(-1===["beacon","xhr","image"].indexOf(c)&&a("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`"),f.transport=c)),Object.keys(l).filter(function(e){return"dimension"===e.substr(0,"dimension".length)}).forEach(function(e){f[e]=l[e]}),Object.keys(l).filter(function(e){return"metric"===e.substr(0,"metric".length)}).forEach(function(e){f[e]=l[e]}),F(f,u)}else a("args.category AND args.action are required in event()")}function Z(e,t){var n=e.description,r=e.fatal,o={hitType:"exception"};n&&(o.exDescription=I(n)),void 0!==r&&("boolean"!=typeof r?a("`args.fatal` must be a boolean."):o.exFatal=r),F(o,t)}var $={require:function(e,t){if(e){var n=r(e);if(""!==n)if(t){if("object"!==T(t))return void a("Expected `options` arg to be an Object");0===Object.keys(t).length&&a("Empty `options` given to .require()"),R("require",n,t),C&&u("called ga('require', '".concat(n,"', ").concat(JSON.stringify(t)))}else R("require",n),C&&u("called ga('require', '".concat(n,"');"));else a("`name` cannot be an empty string in .require()")}else a("`name` is required in .require()")},execute:function(e,t){var n,r;if(1==(arguments.length<=2?0:arguments.length-2)?n=arguments.length<=2?void 0:arguments[2]:(r=arguments.length<=2?void 0:arguments[2],n=arguments.length<=3?void 0:arguments[3]),"string"!=typeof e)a("Expected `pluginName` arg to be a String.");else if("string"!=typeof t)a("Expected `action` arg to be a String.");else{var o="".concat(e,":").concat(t);n=n||null,r&&n?(R(o,r,n),C&&(u("called ga('".concat(o,"');")),u('actionType: "'.concat(r,'" with payload: ').concat(JSON.stringify(n))))):n?(R(o,n),C&&(u("called ga('".concat(o,"');")),u("with payload: ".concat(JSON.stringify(n))))):(R(o),C&&u("called ga('".concat(o,"');")))}}};function U(e,t,n){if("function"==typeof t)if(e&&e.label){var r={hitType:"event",eventCategory:"Outbound",eventAction:"Click",eventLabel:I(e.label)},o=!1,i=setTimeout(function(){o=!0,t()},250);r.hitCallback=function(){clearTimeout(i),o||t()},F(r,n)}else a("args.label is required in outboundLink()");else a("hitCallback function is required")}S.origTrackLink=S.trackLink,S.trackLink=U;var H=S,Q=s;t.default={initialize:z,ga:R,set:M,send:F,pageview:G,modalview:K,timing:V,event:B,exception:Z,plugin:$,outboundLink:U,OutboundLink:H,testModeAPI:s}}}]);
//# sourceMappingURL=bundle.npm.react-ga.b9283a6c5ab923bd6a19.js.map