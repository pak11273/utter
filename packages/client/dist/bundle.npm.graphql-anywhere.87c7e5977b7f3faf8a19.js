(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{jPxk:function(e,t,n){!function(e,t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function n(e,t,n,r){return new(n||(n=Promise))(function(a,i){function o(e){try{l(r.next(e))}catch(e){i(e)}}function u(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){e.done?a(e.value):new n(function(t){t(e.value)}).then(o,u)}l((r=r.apply(e,t||[])).next())})}function r(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var a=Object.prototype.hasOwnProperty;function i(e,t){null!==t&&"object"==typeof t&&Object.keys(t).forEach(function(n){var r=t[n];a.call(e,n)?i(e[n],r):e[n]=r})}function o(e,a,l){return n(this,void 0,void 0,function(){var c,s,f,p,v,h=this;return r(this,function(d){switch(d.label){case 0:return c=l.fragmentMap,s=l.contextValue,f=l.variableValues,p={},v=function(e){return n(h,void 0,void 0,function(){var n,v,h,d,b;return r(this,function(r){switch(r.label){case 0:return t.shouldInclude(e,f)?t.isField(e)?[4,u(e,a,l)]:[3,2]:[2];case 1:return n=r.sent(),v=t.resultKeyNameFromField(e),void 0!==n&&(void 0===p[v]?p[v]=n:i(p[v],n)),[2];case 2:if(t.isInlineFragment(e))h=e;else if(!(h=c[e.name.value]))throw new Error("No fragment named "+e.name.value);return d=h.typeCondition.name.value,l.fragmentMatcher(a,d,s)?[4,o(h.selectionSet,a,l)]:[3,4];case 3:b=r.sent(),i(p,b),r.label=4;case 4:return[2]}})})},[4,Promise.all(e.selections.map(v))];case 1:return d.sent(),l.resultMapper?[2,l.resultMapper(p,a)]:[2,p]}})})}function u(e,a,i){return n(this,void 0,void 0,function(){var n,u,c,s,f,p,v;return r(this,function(r){switch(r.label){case 0:return n=i.variableValues,u=i.contextValue,c=i.resolver,s=e.name.value,f=t.argumentsObjectFromField(e,n),p={isLeaf:!e.selectionSet,resultKey:t.resultKeyNameFromField(e),directives:t.getDirectiveInfoFromField(e,n)},[4,c(s,a,f,u,p)];case 1:return v=r.sent(),e.selectionSet?null==v?[2,v]:Array.isArray(v)?[2,l(e,v,i)]:[2,o(e.selectionSet,v,i)]:[2,v]}})})}function l(e,t,n){return Promise.all(t.map(function(t){return null===t?null:Array.isArray(t)?l(e,t,n):o(e.selectionSet,t,n)}))}e.graphql=function(e,n,r,a,i,u){void 0===u&&(u={});var l=t.getMainDefinition(n),c=t.getFragmentDefinitions(n),s=t.createFragmentMap(c),f=u.resultMapper,p=u.fragmentMatcher||function(){return!0},v={fragmentMap:s,contextValue:a,variableValues:i,resultMapper:f,resolver:e,fragmentMatcher:p};return o(l.selectionSet,r,v)},Object.defineProperty(e,"__esModule",{value:!0})}(t,n("aNY/"))}}]);
//# sourceMappingURL=bundle.npm.graphql-anywhere.87c7e5977b7f3faf8a19.js.map