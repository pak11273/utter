(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"4Erw":function(t,o,r){"use strict";r.d(o,"e",function(){return i}),r.d(o,"c",function(){return e}),r.d(o,"b",function(){return f}),r.d(o,"f",function(){return a}),r.d(o,"g",function(){return p}),r.d(o,"a",function(){return b}),r.d(o,"d",function(){return m});var n=r("Nxtt"),i=function(t){var o=t.top,r=t.right,n=t.bottom,i=t.left;return{top:o,right:r,bottom:n,left:i,width:r-i,height:n-o,x:i,y:o,center:{x:(r+i)/2,y:(n+o)/2}}},e=function(t,o){return{top:t.top-o.top,left:t.left-o.left,bottom:t.bottom+o.bottom,right:t.right+o.right}},d=function(t,o){return{top:t.top+o.top,left:t.left+o.left,bottom:t.bottom-o.bottom,right:t.right-o.right}},g={top:0,right:0,bottom:0,left:0},f=function(t){var o=t.borderBox,r=t.margin,n=void 0===r?g:r,f=t.border,u=void 0===f?g:f,a=t.padding,p=void 0===a?g:a,b=i(e(o,n)),m=i(d(o,u)),c=i(d(m,p));return{marginBox:b,borderBox:i(o),paddingBox:m,contentBox:c,margin:n,border:u,padding:p}},u=function(t){var o=t.slice(0,-2);"px"!==t.slice(-2)&&Object(n.a)(!1);var r=Number(o);return isNaN(r)&&Object(n.a)(!1),r},a=function(t,o){var r,n,i=t.borderBox,e=t.border,d=t.margin,g=t.padding,u=(n=o,{top:(r=i).top+n.y,left:r.left+n.x,bottom:r.bottom+n.y,right:r.right+n.x});return f({borderBox:u,border:e,margin:d,padding:g})},p=function(t,o){return void 0===o&&(o={x:window.pageXOffset,y:window.pageYOffset}),a(t,o)},b=function(t,o){var r={top:u(o.marginTop),right:u(o.marginRight),bottom:u(o.marginBottom),left:u(o.marginLeft)},n={top:u(o.paddingTop),right:u(o.paddingRight),bottom:u(o.paddingBottom),left:u(o.paddingLeft)},i={top:u(o.borderTopWidth),right:u(o.borderRightWidth),bottom:u(o.borderBottomWidth),left:u(o.borderLeftWidth)};return f({borderBox:t,margin:r,padding:n,border:i})},m=function(t){var o=t.getBoundingClientRect(),r=window.getComputedStyle(t);return b(o,r)}}}]);
//# sourceMappingURL=bundle.npm.css-box-model.861eb569f40af7df7781.js.map