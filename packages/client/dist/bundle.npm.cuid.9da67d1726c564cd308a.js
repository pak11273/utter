(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"15vk":function(t,n,e){var r=e("BmKs"),i="object"==typeof window?window:self,o=Object.keys(i).length,s=r(((navigator.mimeTypes?navigator.mimeTypes.length:0)+navigator.userAgent.length).toString(36)+o.toString(36),4);t.exports=function(){return s}},BmKs:function(t,n){t.exports=function(t,n){var e="000000000"+t;return e.substr(e.length-n)}},MiOu:function(t,n){var e,r=window.crypto||window.msCrypto;if(r){var i=Math.pow(2,32)-1;e=function(){return Math.abs(r.getRandomValues(new Uint32Array(1))[0]/i)}}else e=Math.random;t.exports=e},xCc1:function(t,n,e){var r=e("15vk"),i=e("BmKs"),o=e("MiOu"),s=0,u=4,a=36,c=Math.pow(a,u);function g(){return i((o()*c<<0).toString(a),u)}function f(){return s=s<c?s:0,++s-1}function p(){return"c"+(new Date).getTime().toString(a)+i(f().toString(a),u)+r()+(g()+g())}p.slug=function(){var t=(new Date).getTime().toString(36),n=f().toString(36).slice(-4),e=r().slice(0,1)+r().slice(-1),i=g().slice(-2);return t.slice(-2)+n+e+i},p.isCuid=function(t){return"string"==typeof t&&!!t.startsWith("c")},p.isSlug=function(t){if("string"!=typeof t)return!1;var n=t.length;return n>=7&&n<=10},p.fingerprint=r,t.exports=p}}]);
//# sourceMappingURL=bundle.npm.cuid.9da67d1726c564cd308a.js.map