(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{qW1s:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var i=n("dysU");function r(e){return{kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GeneratedClientQuery"},selectionSet:a(e)}]}}function a(e){if("number"==typeof e||"boolean"==typeof e||"string"==typeof e||null==e)return null;if(Array.isArray(e))return a(e[0]);var t=[];return Object.keys(e).forEach(function(n){var i={kind:"Field",name:{kind:"Name",value:n},selectionSet:a(e[n])||void 0};t.push(i)}),{kind:"SelectionSet",selections:t}}var o,u={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:null,variableDefinitions:null,directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",alias:null,name:{kind:"Name",value:"__typename"},arguments:[],directives:[],selectionSet:null}]}}]},d=function(){function e(){}return e.prototype.transformDocument=function(e){return e},e.prototype.transformForLink=function(e){return e},e.prototype.readQuery=function(e,t){return void 0===t&&(t=!1),this.read({query:e.query,variables:e.variables,optimistic:t})},e.prototype.readFragment=function(e,t){return void 0===t&&(t=!1),this.read({query:Object(i.j)(e.fragment,e.fragmentName),variables:e.variables,rootId:e.id,optimistic:t})},e.prototype.writeQuery=function(e){this.write({dataId:"ROOT_QUERY",result:e.data,query:e.query,variables:e.variables})},e.prototype.writeFragment=function(e){this.write({dataId:e.id,result:e.data,variables:e.variables,query:Object(i.j)(e.fragment,e.fragmentName)})},e.prototype.writeData=function(e){var t,n,i=e.id,o=e.data;if(void 0!==i){var d=null;try{d=this.read({rootId:i,optimistic:!1,query:u})}catch(e){}var s=d&&d.__typename||"__ClientData",l=Object.assign({__typename:s},o);this.writeFragment({id:i,fragment:(t=l,n=s,{kind:"Document",definitions:[{kind:"FragmentDefinition",typeCondition:{kind:"NamedType",name:{kind:"Name",value:n||"__FakeType"}},name:{kind:"Name",value:"GeneratedClientQuery"},selectionSet:a(t)}]}),data:l})}else this.writeQuery({query:r(o),data:o})},e}();o||(o={})}}]);
//# sourceMappingURL=bundle.npm.apollo-cache.61421cffb0919904856a.js.map