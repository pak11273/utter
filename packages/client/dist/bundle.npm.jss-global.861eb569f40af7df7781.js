(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{ZjIw:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.default=function(){return{onCreateRule:function(e,t,n){if(e===u)return new a(e,t,n);if("@"===e[0]&&e.substr(0,l.length)===l)return new c(e,t,n);var r=n.parent;r&&("global"!==r.type&&"global"!==r.options.parent.type||(n.global=!0));n.global&&(n.selector=e);return null},onProcessRule:function(e){if("style"!==e.type)return;(function(e){var t=e.options,n=e.style,o=n[u];if(!o)return;for(var s in o)t.sheet.addRule(s,o[s],r({},t,{selector:h(s,e.selector)}));delete n[u]})(e),function(e){var t=e.options,n=e.style;for(var o in n)if(o.substr(0,u.length)===u){var s=h(o.substr(u.length),e.selector);t.sheet.addRule(s,n[o],r({},t,{selector:s})),delete n[o]}}(e)}}};var s=n("gH3m");function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var u="@global",l="@global ",a=function(){function e(t,n,o){for(var u in i(this,e),this.type="global",this.key=t,this.options=o,this.rules=new s.RuleList(r({},o,{parent:this})),n)this.rules.add(u,n[u],{selector:u});this.rules.process()}return o(e,[{key:"getRule",value:function(e){return this.rules.get(e)}},{key:"addRule",value:function(e,t,n){var r=this.rules.add(e,t,n);return this.options.jss.plugins.onProcessRule(r),r}},{key:"indexOf",value:function(e){return this.rules.indexOf(e)}},{key:"toString",value:function(){return this.rules.toString()}}]),e}(),c=function(){function e(t,n,o){i(this,e),this.name=t,this.options=o;var s=t.substr(l.length);this.rule=o.jss.createRule(s,n,r({},o,{parent:this,selector:s}))}return o(e,[{key:"toString",value:function(e){return this.rule.toString(e)}}]),e}(),f=/\s*,\s*/g;function h(e,t){for(var n=e.split(f),r="",o=0;o<n.length;o++)r+=t+" "+n[o].trim(),n[o+1]&&(r+=", ");return r}}}]);
//# sourceMappingURL=bundle.npm.jss-global.861eb569f40af7df7781.js.map