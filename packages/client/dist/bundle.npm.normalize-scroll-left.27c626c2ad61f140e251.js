(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{j5Tq:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,i=!("undefined"==typeof window||!window.document||!window.document.createElement);function n(){if(l)return l;if(!i||!window.document.body)return"indeterminate";var e=window.document.createElement("div");return e.appendChild(document.createTextNode("ABCD")),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),l="reverse",e.scrollLeft>0?l="default":(e.scrollLeft=1,0===e.scrollLeft&&(l="negative")),document.body.removeChild(e),l}t._setScrollType=function(e){l=e},t.detectScrollType=n,t.getNormalizedScrollLeft=function(e,t){var r=e.scrollLeft;if("rtl"!==t)return r;var l=n();if("indeterminate"===l)return Number.NaN;switch(l){case"negative":return e.scrollWidth-e.clientWidth+r;case"reverse":return e.scrollWidth-e.clientWidth-r}return r},t.setNormalizedScrollLeft=function(e,t,r){if("rtl"===r){var l=n();if("indeterminate"!==l)switch(l){case"negative":e.scrollLeft=e.clientWidth-e.scrollWidth+t;break;case"reverse":e.scrollLeft=e.scrollWidth-e.clientWidth-t;break;default:e.scrollLeft=t}}else e.scrollLeft=t}}}]);
//# sourceMappingURL=bundle.npm.normalize-scroll-left.27c626c2ad61f140e251.js.map