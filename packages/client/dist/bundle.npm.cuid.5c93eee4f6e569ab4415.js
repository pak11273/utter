(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{"15vk":function(t,n,e){var r=e("BmKs"),i="object"==typeof window?window:self,o=Object.keys(i).length,s=r(((navigator.mimeTypes?navigator.mimeTypes.length:0)+navigator.userAgent.length).toString(36)+o.toString(36),4);t.exports=function(){return s}},BmKs:function(t,n){t.exports=function(t,n){var e="000000000"+t;return e.substr(e.length-n)}},xCc1:function(t,n,e){var r=e("15vk"),i=e("BmKs"),o=0,s=4,u=36,c=Math.pow(u,s);function g(){return i((Math.random()*c<<0).toString(u),s)}function a(){return o=o<c?o:0,++o-1}function f(){return"c"+(new Date).getTime().toString(u)+i(a().toString(u),s)+r()+(g()+g())}f.slug=function(){var t=(new Date).getTime().toString(36),n=a().toString(36).slice(-4),e=r().slice(0,1)+r().slice(-1),i=g().slice(-2);return t.slice(-2)+n+e+i},f.isCuid=function(t){return"string"==typeof t&&!!t.startsWith("c")},f.isSlug=function(t){if("string"!=typeof t)return!1;var n=t.length;return n>=7&&n<=10},f.fingerprint=r,t.exports=f}}]);
//# sourceMappingURL=bundle.npm.cuid.5c93eee4f6e569ab4415.js.map