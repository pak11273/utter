(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"k/eM":function(e,n,t){var r=t("qGV1").parse;function a(e){return e.replace(/[\s,]+/g," ").trim()}var i={},o={};var c=!0;var u=!1;function s(e){var n=a(e);if(i[n])return i[n];var t=r(e,{experimentalFragmentVariables:u});if(!t||"Document"!==t.kind)throw new Error("Not a valid GraphQL document.");return t=function e(n,t){var r=Object.prototype.toString.call(n);if("[object Array]"===r)return n.map(function(n){return e(n,t)});if("[object Object]"!==r)throw new Error("Unexpected input.");t&&n.loc&&delete n.loc,n.loc&&(delete n.loc.startToken,delete n.loc.endToken);var a,i,o,c=Object.keys(n);for(a in c)c.hasOwnProperty(a)&&(i=n[c[a]],"[object Object]"!==(o=Object.prototype.toString.call(i))&&"[object Array]"!==o||(n[c[a]]=e(i,!0)));return n}(t=function(e){for(var n,t={},r=[],i=0;i<e.definitions.length;i++){var u=e.definitions[i];if("FragmentDefinition"===u.kind){var s=u.name.value,l=a((n=u.loc).source.body.substring(n.start,n.end));o.hasOwnProperty(s)&&!o[s][l]?(c&&console.warn("Warning: fragment with name "+s+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"),o[s][l]=!0):o.hasOwnProperty(s)||(o[s]={},o[s][l]=!0),t[l]||(t[l]=!0,r.push(u))}else r.push(u)}return e.definitions=r,e}(t),!1),i[n]=t,t}function l(){for(var e=Array.prototype.slice.call(arguments),n=e[0],t="string"==typeof n?n:n[0],r=1;r<e.length;r++)e[r]&&e[r].kind&&"Document"===e[r].kind?t+=e[r].loc.source.body:t+=e[r],t+=n[r];return s(t)}l.default=l,l.resetCaches=function(){i={},o={}},l.disableFragmentWarnings=function(){c=!1},l.enableExperimentalFragmentVariables=function(){u=!0},l.disableExperimentalFragmentVariables=function(){u=!1},e.exports=l},ktN7:function(e,n,t){var r=t("VvTQ").parse;function a(e){return e.replace(/[\s,]+/g," ").trim()}var i={},o={};var c=!0;var u=!1;function s(e){var n=a(e);if(i[n])return i[n];var t=r(e,{experimentalFragmentVariables:u});if(!t||"Document"!==t.kind)throw new Error("Not a valid GraphQL document.");return t=function e(n,t){var r=Object.prototype.toString.call(n);if("[object Array]"===r)return n.map(function(n){return e(n,t)});if("[object Object]"!==r)throw new Error("Unexpected input.");t&&n.loc&&delete n.loc,n.loc&&(delete n.loc.startToken,delete n.loc.endToken);var a,i,o,c=Object.keys(n);for(a in c)c.hasOwnProperty(a)&&(i=n[c[a]],"[object Object]"!==(o=Object.prototype.toString.call(i))&&"[object Array]"!==o||(n[c[a]]=e(i,!0)));return n}(t=function(e){for(var n,t={},r=[],i=0;i<e.definitions.length;i++){var u=e.definitions[i];if("FragmentDefinition"===u.kind){var s=u.name.value,l=a((n=u.loc).source.body.substring(n.start,n.end));o.hasOwnProperty(s)&&!o[s][l]?(c&&console.warn("Warning: fragment with name "+s+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"),o[s][l]=!0):o.hasOwnProperty(s)||(o[s]={},o[s][l]=!0),t[l]||(t[l]=!0,r.push(u))}else r.push(u)}return e.definitions=r,e}(t),!1),i[n]=t,t}function l(){for(var e=Array.prototype.slice.call(arguments),n=e[0],t="string"==typeof n?n:n[0],r=1;r<e.length;r++)e[r]&&e[r].kind&&"Document"===e[r].kind?t+=e[r].loc.source.body:t+=e[r],t+=n[r];return s(t)}l.default=l,l.resetCaches=function(){i={},o={}},l.disableFragmentWarnings=function(){c=!1},l.enableExperimentalFragmentVariables=function(){u=!0},l.disableExperimentalFragmentVariables=function(){u=!1},e.exports=l},qGV1:function(e,n,t){"use strict";t.r(n);var r="function"==typeof Symbol?Symbol.for("nodejs.util.inspect.custom"):void 0;function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=10,o=2;function c(e,n){switch(a(e)){case"string":return JSON.stringify(e);case"function":return e.name?"[function ".concat(e.name,"]"):"[function]";case"object":return function(e,n){if(-1!==n.indexOf(e))return"[Circular]";var t=[].concat(n,[e]);if(e){var a=function(e){var n=e[String(r)];if("function"==typeof n)return n;if("function"==typeof e.inspect)return e.inspect}(e);if(a){var u=a.call(e);if(u!==e)return"string"==typeof u?u:c(u,t)}else if(Array.isArray(e))return function(e,n){if(0===e.length)return"[]";if(n.length>o)return"[Array]";for(var t=Math.min(i,e.length),r=e.length-t,a=[],u=0;u<t;++u)a.push(c(e[u],n));1===r?a.push("... 1 more item"):r>1&&a.push("... ".concat(r," more items"));return"["+a.join(", ")+"]"}(e,t);return function(e,n){var t=Object.keys(e);if(0===t.length)return"{}";if(n.length>o)return"["+function(e){var n=Object.prototype.toString.call(e).replace(/^\[object /,"").replace(/]$/,"");if("Object"===n&&"function"==typeof e.constructor){var t=e.constructor.name;if("string"==typeof t)return t}return n}(e)+"]";return"{ "+t.map(function(t){var r=c(e[t],n);return t+": "+r}).join(", ")+" }"}(e,t)}return String(e)}(e,n);default:return String(e)}}function u(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.prototype.toString;e.prototype.toJSON=n,e.prototype.inspect=n,r&&(e.prototype[r]=n)}function s(e,n){if(!e)throw new Error(n)}var l,f=function(e,n,t){this.body=e,this.name=n||"GraphQL request",this.locationOffset=t||{line:1,column:1},this.locationOffset.line>0||s(0,"line in locationOffset is 1-indexed and must be positive"),this.locationOffset.column>0||s(0,"column in locationOffset is 1-indexed and must be positive")};function E(e,n){for(var t,r=/\r\n|[\n\r]/g,a=1,i=n+1;(t=r.exec(e.body))&&t.index<n;)a+=1,i=n+1-(t.index+t[0].length);return{line:a,column:i}}function d(e,n){var t=e.locationOffset.column-1,r=v(t)+e.body,a=n.line-1,i=e.locationOffset.line-1,o=n.line+i,c=1===n.line?t:0,u=n.column+c,s=r.split(/\r\n|[\n\r]/g);return"".concat(e.name," (").concat(o,":").concat(u,")\n")+function(e){var n=e.filter(function(e){e[0];var n=e[1];return void 0!==n}),t=0,r=!0,a=!1,i=void 0;try{for(var o,c=n[Symbol.iterator]();!(r=(o=c.next()).done);r=!0){var u=o.value,s=u[0];t=Math.max(t,s.length)}}catch(e){a=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw i}}return n.map(function(e){var n,r=e[0],a=e[1];return v(t-(n=r).length)+n+a}).join("\n")}([["".concat(o-1,": "),s[a-1]],["".concat(o,": "),s[a]],["",v(u-1)+"^"],["".concat(o+1,": "),s[a+1]]])}function v(e){return Array(e+1).join(" ")}function N(e,n,t,r,a,i,o){var c=Array.isArray(n)?0!==n.length?n:void 0:n?[n]:void 0,u=t;if(!u&&c){var s=c[0];u=s&&s.loc&&s.loc.source}var l,f=r;!f&&c&&(f=c.reduce(function(e,n){return n.loc&&e.push(n.loc.start),e},[])),f&&0===f.length&&(f=void 0),r&&t?l=r.map(function(e){return E(t,e)}):c&&(l=c.reduce(function(e,n){return n.loc&&e.push(E(n.loc.source,n.loc.start)),e},[]));var d=o||i&&i.extensions;Object.defineProperties(this,{message:{value:e,enumerable:!0,writable:!0},locations:{value:l||void 0,enumerable:Boolean(l)},path:{value:a||void 0,enumerable:Boolean(a)},nodes:{value:c||void 0},source:{value:u||void 0},positions:{value:f||void 0},originalError:{value:i},extensions:{value:d||void 0,enumerable:Boolean(d)}}),i&&i.stack?Object.defineProperty(this,"stack",{value:i.stack,writable:!0,configurable:!0}):Error.captureStackTrace?Error.captureStackTrace(this,N):Object.defineProperty(this,"stack",{value:Error().stack,writable:!0,configurable:!0})}function I(e,n,t){return new N("Syntax Error: ".concat(t),void 0,e,[n])}function T(e){for(var n=e.split(/\r\n|[\n\r]/g),t=null,r=1;r<n.length;r++){var a=n[r],i=h(a);if(i<a.length&&(null===t||i<t)&&0===(t=i))break}if(t)for(var o=1;o<n.length;o++)n[o]=n[o].slice(t);for(;n.length>0&&p(n[0]);)n.shift();for(;n.length>0&&p(n[n.length-1]);)n.pop();return n.join("\n")}function h(e){for(var n=0;n<e.length&&(" "===e[n]||"\t"===e[n]);)n++;return n}function p(e){return h(e)===e.length}function A(e,n){var t=new y(_.SOF,0,0,0,0,null);return{source:e,options:n,lastToken:t,token:t,line:1,lineStart:0,advance:O,lookahead:m}}function O(){return this.lastToken=this.token,this.token=this.lookahead()}function m(){var e=this.token;if(e.kind!==_.EOF)do{e=e.next||(e.next=R(this,e))}while(e.kind===_.COMMENT);return e}l=f,"function"==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(l.prototype,Symbol.toStringTag,{get:function(){return this.constructor.name}}),N.prototype=Object.create(Error.prototype,{constructor:{value:N},name:{value:"GraphQLError"},toString:{value:function(){return function(e){var n=[];if(e.nodes){var t=!0,r=!1,a=void 0;try{for(var i,o=e.nodes[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var c=i.value;c.loc&&n.push(d(c.loc.source,E(c.loc.source,c.loc.start)))}}catch(e){r=!0,a=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw a}}}else if(e.source&&e.locations){var u=e.source,s=!0,l=!1,f=void 0;try{for(var v,N=e.locations[Symbol.iterator]();!(s=(v=N.next()).done);s=!0){var I=v.value;n.push(d(u,I))}}catch(e){l=!0,f=e}finally{try{s||null==N.return||N.return()}finally{if(l)throw f}}}return 0===n.length?e.message:[e.message].concat(n).join("\n\n")+"\n"}(this)}}});var _=Object.freeze({SOF:"<SOF>",EOF:"<EOF>",BANG:"!",DOLLAR:"$",AMP:"&",PAREN_L:"(",PAREN_R:")",SPREAD:"...",COLON:":",EQUALS:"=",AT:"@",BRACKET_L:"[",BRACKET_R:"]",BRACE_L:"{",PIPE:"|",BRACE_R:"}",NAME:"Name",INT:"Int",FLOAT:"Float",STRING:"String",BLOCK_STRING:"BlockString",COMMENT:"Comment"});function k(e){var n=e.value;return n?"".concat(e.kind,' "').concat(n,'"'):e.kind}function y(e,n,t,r,a,i,o){this.kind=e,this.start=n,this.end=t,this.line=r,this.column=a,this.value=o,this.prev=i,this.next=null}function C(e){return isNaN(e)?_.EOF:e<127?JSON.stringify(String.fromCharCode(e)):'"\\u'.concat(("00"+e.toString(16).toUpperCase()).slice(-4),'"')}function R(e,n){var t=e.source,r=t.body,a=r.length,i=function(e,n,t){var r=e.length,a=n;for(;a<r;){var i=e.charCodeAt(a);if(9===i||32===i||44===i||65279===i)++a;else if(10===i)++a,++t.line,t.lineStart=a;else{if(13!==i)break;10===e.charCodeAt(a+1)?a+=2:++a,++t.line,t.lineStart=a}}return a}(r,n.end,e),o=e.line,c=1+i-e.lineStart;if(i>=a)return new y(_.EOF,a,a,o,c,n);var u=r.charCodeAt(i);switch(u){case 33:return new y(_.BANG,i,i+1,o,c,n);case 35:return function(e,n,t,r,a){var i,o=e.body,c=n;do{i=o.charCodeAt(++c)}while(!isNaN(i)&&(i>31||9===i));return new y(_.COMMENT,n,c,t,r,a,o.slice(n+1,c))}(t,i,o,c,n);case 36:return new y(_.DOLLAR,i,i+1,o,c,n);case 38:return new y(_.AMP,i,i+1,o,c,n);case 40:return new y(_.PAREN_L,i,i+1,o,c,n);case 41:return new y(_.PAREN_R,i,i+1,o,c,n);case 46:if(46===r.charCodeAt(i+1)&&46===r.charCodeAt(i+2))return new y(_.SPREAD,i,i+3,o,c,n);break;case 58:return new y(_.COLON,i,i+1,o,c,n);case 61:return new y(_.EQUALS,i,i+1,o,c,n);case 64:return new y(_.AT,i,i+1,o,c,n);case 91:return new y(_.BRACKET_L,i,i+1,o,c,n);case 93:return new y(_.BRACKET_R,i,i+1,o,c,n);case 123:return new y(_.BRACE_L,i,i+1,o,c,n);case 124:return new y(_.PIPE,i,i+1,o,c,n);case 125:return new y(_.BRACE_R,i,i+1,o,c,n);case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90:case 95:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 106:case 107:case 108:case 109:case 110:case 111:case 112:case 113:case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:return function(e,n,t,r,a){var i=e.body,o=i.length,c=n+1,u=0;for(;c!==o&&!isNaN(u=i.charCodeAt(c))&&(95===u||u>=48&&u<=57||u>=65&&u<=90||u>=97&&u<=122);)++c;return new y(_.NAME,n,c,t,r,a,i.slice(n,c))}(t,i,o,c,n);case 45:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return function(e,n,t,r,a,i){var o=e.body,c=t,u=n,s=!1;45===c&&(c=o.charCodeAt(++u));if(48===c){if((c=o.charCodeAt(++u))>=48&&c<=57)throw I(e,u,"Invalid number, unexpected digit after 0: ".concat(C(c),"."))}else u=g(e,u,c),c=o.charCodeAt(u);46===c&&(s=!0,c=o.charCodeAt(++u),u=g(e,u,c),c=o.charCodeAt(u));69!==c&&101!==c||(s=!0,43!==(c=o.charCodeAt(++u))&&45!==c||(c=o.charCodeAt(++u)),u=g(e,u,c));return new y(s?_.FLOAT:_.INT,n,u,r,a,i,o.slice(n,u))}(t,i,u,o,c,n);case 34:return 34===r.charCodeAt(i+1)&&34===r.charCodeAt(i+2)?function(e,n,t,r,a,i){var o=e.body,c=n+3,u=c,s=0,l="";for(;c<o.length&&!isNaN(s=o.charCodeAt(c));){if(34===s&&34===o.charCodeAt(c+1)&&34===o.charCodeAt(c+2))return l+=o.slice(u,c),new y(_.BLOCK_STRING,n,c+3,t,r,a,T(l));if(s<32&&9!==s&&10!==s&&13!==s)throw I(e,c,"Invalid character within String: ".concat(C(s),"."));10===s?(++c,++i.line,i.lineStart=c):13===s?(10===o.charCodeAt(c+1)?c+=2:++c,++i.line,i.lineStart=c):92===s&&34===o.charCodeAt(c+1)&&34===o.charCodeAt(c+2)&&34===o.charCodeAt(c+3)?(l+=o.slice(u,c)+'"""',u=c+=4):++c}throw I(e,c,"Unterminated string.")}(t,i,o,c,n,e):function(e,n,t,r,a){var i=e.body,o=n+1,c=o,u=0,s="";for(;o<i.length&&!isNaN(u=i.charCodeAt(o))&&10!==u&&13!==u;){if(34===u)return s+=i.slice(c,o),new y(_.STRING,n,o+1,t,r,a,s);if(u<32&&9!==u)throw I(e,o,"Invalid character within String: ".concat(C(u),"."));if(++o,92===u){switch(s+=i.slice(c,o-1),u=i.charCodeAt(o)){case 34:s+='"';break;case 47:s+="/";break;case 92:s+="\\";break;case 98:s+="\b";break;case 102:s+="\f";break;case 110:s+="\n";break;case 114:s+="\r";break;case 116:s+="\t";break;case 117:var l=(f=i.charCodeAt(o+1),E=i.charCodeAt(o+2),d=i.charCodeAt(o+3),v=i.charCodeAt(o+4),S(f)<<12|S(E)<<8|S(d)<<4|S(v));if(l<0)throw I(e,o,"Invalid character escape sequence: "+"\\u".concat(i.slice(o+1,o+5),"."));s+=String.fromCharCode(l),o+=4;break;default:throw I(e,o,"Invalid character escape sequence: \\".concat(String.fromCharCode(u),"."))}c=++o}}var f,E,d,v;throw I(e,o,"Unterminated string.")}(t,i,o,c,n)}throw I(t,i,function(e){if(e<32&&9!==e&&10!==e&&13!==e)return"Cannot contain the invalid character ".concat(C(e),".");if(39===e)return"Unexpected single quote character ('), did you mean to use a double quote (\")?";return"Cannot parse the unexpected character ".concat(C(e),".")}(u))}function g(e,n,t){var r=e.body,a=n,i=t;if(i>=48&&i<=57){do{i=r.charCodeAt(++a)}while(i>=48&&i<=57);return a}throw I(e,a,"Invalid number, expected digit but got: ".concat(C(i),"."))}function S(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:-1}u(y,function(){return{kind:this.kind,value:this.value,line:this.line,column:this.column}});var b=Object.freeze({NAME:"Name",DOCUMENT:"Document",OPERATION_DEFINITION:"OperationDefinition",VARIABLE_DEFINITION:"VariableDefinition",SELECTION_SET:"SelectionSet",FIELD:"Field",ARGUMENT:"Argument",FRAGMENT_SPREAD:"FragmentSpread",INLINE_FRAGMENT:"InlineFragment",FRAGMENT_DEFINITION:"FragmentDefinition",VARIABLE:"Variable",INT:"IntValue",FLOAT:"FloatValue",STRING:"StringValue",BOOLEAN:"BooleanValue",NULL:"NullValue",ENUM:"EnumValue",LIST:"ListValue",OBJECT:"ObjectValue",OBJECT_FIELD:"ObjectField",DIRECTIVE:"Directive",NAMED_TYPE:"NamedType",LIST_TYPE:"ListType",NON_NULL_TYPE:"NonNullType",SCHEMA_DEFINITION:"SchemaDefinition",OPERATION_TYPE_DEFINITION:"OperationTypeDefinition",SCALAR_TYPE_DEFINITION:"ScalarTypeDefinition",OBJECT_TYPE_DEFINITION:"ObjectTypeDefinition",FIELD_DEFINITION:"FieldDefinition",INPUT_VALUE_DEFINITION:"InputValueDefinition",INTERFACE_TYPE_DEFINITION:"InterfaceTypeDefinition",UNION_TYPE_DEFINITION:"UnionTypeDefinition",ENUM_TYPE_DEFINITION:"EnumTypeDefinition",ENUM_VALUE_DEFINITION:"EnumValueDefinition",INPUT_OBJECT_TYPE_DEFINITION:"InputObjectTypeDefinition",DIRECTIVE_DEFINITION:"DirectiveDefinition",SCHEMA_EXTENSION:"SchemaExtension",SCALAR_TYPE_EXTENSION:"ScalarTypeExtension",OBJECT_TYPE_EXTENSION:"ObjectTypeExtension",INTERFACE_TYPE_EXTENSION:"InterfaceTypeExtension",UNION_TYPE_EXTENSION:"UnionTypeExtension",ENUM_TYPE_EXTENSION:"EnumTypeExtension",INPUT_OBJECT_TYPE_EXTENSION:"InputObjectTypeExtension"}),L=Object.freeze({QUERY:"QUERY",MUTATION:"MUTATION",SUBSCRIPTION:"SUBSCRIPTION",FIELD:"FIELD",FRAGMENT_DEFINITION:"FRAGMENT_DEFINITION",FRAGMENT_SPREAD:"FRAGMENT_SPREAD",INLINE_FRAGMENT:"INLINE_FRAGMENT",VARIABLE_DEFINITION:"VARIABLE_DEFINITION",SCHEMA:"SCHEMA",SCALAR:"SCALAR",OBJECT:"OBJECT",FIELD_DEFINITION:"FIELD_DEFINITION",ARGUMENT_DEFINITION:"ARGUMENT_DEFINITION",INTERFACE:"INTERFACE",UNION:"UNION",ENUM:"ENUM",ENUM_VALUE:"ENUM_VALUE",INPUT_OBJECT:"INPUT_OBJECT",INPUT_FIELD_DEFINITION:"INPUT_FIELD_DEFINITION"});function F(e,n){var t="string"==typeof e?new f(e):e;if(!(t instanceof f))throw new TypeError("Must provide Source. Received: ".concat(c(t,[])));return function(e){var n=e.token;return{kind:b.DOCUMENT,definitions:Ce(e,_.SOF,B,_.EOF),loc:Te(e,n)}}(A(t,n||{}))}function w(e,n){var t=A("string"==typeof e?new f(e):e,n||{});Ae(t,_.SOF);var r=H(t,!1);return Ae(t,_.EOF),r}function D(e,n){var t=A("string"==typeof e?new f(e):e,n||{});Ae(t,_.SOF);var r=ne(t);return Ae(t,_.EOF),r}function P(e){var n=Ae(e,_.NAME);return{kind:b.NAME,value:n.value,loc:Te(e,n)}}function B(e){if(pe(e,_.NAME))switch(e.token.value){case"query":case"mutation":case"subscription":case"fragment":return M(e);case"schema":case"scalar":case"type":case"interface":case"union":case"enum":case"input":case"directive":return re(e);case"extend":return function(e){var n=e.lookahead();if(n.kind===_.NAME)switch(n.value){case"schema":return function(e){var n=e.token;me(e,"extend"),me(e,"schema");var t=Z(e,!0),r=pe(e,_.BRACE_L)?Ce(e,_.BRACE_L,oe,_.BRACE_R):[];if(0===t.length&&0===r.length)throw ke(e);return{kind:b.SCHEMA_EXTENSION,directives:t,operationTypes:r,loc:Te(e,n)}}(e);case"scalar":return function(e){var n=e.token;me(e,"extend"),me(e,"scalar");var t=P(e),r=Z(e,!0);if(0===r.length)throw ke(e);return{kind:b.SCALAR_TYPE_EXTENSION,name:t,directives:r,loc:Te(e,n)}}(e);case"type":return function(e){var n=e.token;me(e,"extend"),me(e,"type");var t=P(e),r=ce(e),a=Z(e,!0),i=ue(e);if(0===r.length&&0===a.length&&0===i.length)throw ke(e);return{kind:b.OBJECT_TYPE_EXTENSION,name:t,interfaces:r,directives:a,fields:i,loc:Te(e,n)}}(e);case"interface":return function(e){var n=e.token;me(e,"extend"),me(e,"interface");var t=P(e),r=Z(e,!0),a=ue(e);if(0===r.length&&0===a.length)throw ke(e);return{kind:b.INTERFACE_TYPE_EXTENSION,name:t,directives:r,fields:a,loc:Te(e,n)}}(e);case"union":return function(e){var n=e.token;me(e,"extend"),me(e,"union");var t=P(e),r=Z(e,!0),a=Ee(e);if(0===r.length&&0===a.length)throw ke(e);return{kind:b.UNION_TYPE_EXTENSION,name:t,directives:r,types:a,loc:Te(e,n)}}(e);case"enum":return function(e){var n=e.token;me(e,"extend"),me(e,"enum");var t=P(e),r=Z(e,!0),a=de(e);if(0===r.length&&0===a.length)throw ke(e);return{kind:b.ENUM_TYPE_EXTENSION,name:t,directives:r,values:a,loc:Te(e,n)}}(e);case"input":return function(e){var n=e.token;me(e,"extend"),me(e,"input");var t=P(e),r=Z(e,!0),a=Ne(e);if(0===r.length&&0===a.length)throw ke(e);return{kind:b.INPUT_OBJECT_TYPE_EXTENSION,name:t,directives:r,fields:a,loc:Te(e,n)}}(e)}throw ke(e,n)}(e)}else{if(pe(e,_.BRACE_L))return M(e);if(ae(e))return re(e)}throw ke(e)}function M(e){if(pe(e,_.NAME))switch(e.token.value){case"query":case"mutation":case"subscription":return U(e);case"fragment":return function(e){var n=e.token;if(me(e,"fragment"),e.options.experimentalFragmentVariables)return{kind:b.FRAGMENT_DEFINITION,name:Q(e),variableDefinitions:j(e),typeCondition:(me(e,"on"),te(e)),directives:Z(e,!1),selectionSet:Y(e),loc:Te(e,n)};return{kind:b.FRAGMENT_DEFINITION,name:Q(e),typeCondition:(me(e,"on"),te(e)),directives:Z(e,!1),selectionSet:Y(e),loc:Te(e,n)}}(e)}else if(pe(e,_.BRACE_L))return U(e);throw ke(e)}function U(e){var n=e.token;if(pe(e,_.BRACE_L))return{kind:b.OPERATION_DEFINITION,operation:"query",name:void 0,variableDefinitions:[],directives:[],selectionSet:Y(e),loc:Te(e,n)};var t,r=x(e);return pe(e,_.NAME)&&(t=P(e)),{kind:b.OPERATION_DEFINITION,operation:r,name:t,variableDefinitions:j(e),directives:Z(e,!1),selectionSet:Y(e),loc:Te(e,n)}}function x(e){var n=Ae(e,_.NAME);switch(n.value){case"query":return"query";case"mutation":return"mutation";case"subscription":return"subscription"}throw ke(e,n)}function j(e){return pe(e,_.PAREN_L)?Ce(e,_.PAREN_L,V,_.PAREN_R):[]}function V(e){var n=e.token;return{kind:b.VARIABLE_DEFINITION,variable:G(e),type:(Ae(e,_.COLON),ne(e)),defaultValue:Oe(e,_.EQUALS)?H(e,!0):void 0,directives:Z(e,!0),loc:Te(e,n)}}function G(e){var n=e.token;return Ae(e,_.DOLLAR),{kind:b.VARIABLE,name:P(e),loc:Te(e,n)}}function Y(e){var n=e.token;return{kind:b.SELECTION_SET,selections:Ce(e,_.BRACE_L,J,_.BRACE_R),loc:Te(e,n)}}function J(e){return pe(e,_.SPREAD)?function(e){var n=e.token;Ae(e,_.SPREAD);var t=_e(e,"on");if(!t&&pe(e,_.NAME))return{kind:b.FRAGMENT_SPREAD,name:Q(e),directives:Z(e,!1),loc:Te(e,n)};return{kind:b.INLINE_FRAGMENT,typeCondition:t?te(e):void 0,directives:Z(e,!1),selectionSet:Y(e),loc:Te(e,n)}}(e):function(e){var n,t,r=e.token,a=P(e);Oe(e,_.COLON)?(n=a,t=P(e)):t=a;return{kind:b.FIELD,alias:n,name:t,arguments:q(e,!1),directives:Z(e,!1),selectionSet:pe(e,_.BRACE_L)?Y(e):void 0,loc:Te(e,r)}}(e)}function q(e,n){var t=n?X:K;return pe(e,_.PAREN_L)?Ce(e,_.PAREN_L,t,_.PAREN_R):[]}function K(e){var n=e.token,t=P(e);return Ae(e,_.COLON),{kind:b.ARGUMENT,name:t,value:H(e,!1),loc:Te(e,n)}}function X(e){var n=e.token;return{kind:b.ARGUMENT,name:P(e),value:(Ae(e,_.COLON),z(e)),loc:Te(e,n)}}function Q(e){if("on"===e.token.value)throw ke(e);return P(e)}function H(e,n){var t=e.token;switch(t.kind){case _.BRACKET_L:return function(e,n){var t=e.token,r=n?z:$;return{kind:b.LIST,values:ye(e,_.BRACKET_L,r,_.BRACKET_R),loc:Te(e,t)}}(e,n);case _.BRACE_L:return function(e,n){var t=e.token;return{kind:b.OBJECT,fields:ye(e,_.BRACE_L,function(){return function(e,n){var t=e.token,r=P(e);return Ae(e,_.COLON),{kind:b.OBJECT_FIELD,name:r,value:H(e,n),loc:Te(e,t)}}(e,n)},_.BRACE_R),loc:Te(e,t)}}(e,n);case _.INT:return e.advance(),{kind:b.INT,value:t.value,loc:Te(e,t)};case _.FLOAT:return e.advance(),{kind:b.FLOAT,value:t.value,loc:Te(e,t)};case _.STRING:case _.BLOCK_STRING:return W(e);case _.NAME:return"true"===t.value||"false"===t.value?(e.advance(),{kind:b.BOOLEAN,value:"true"===t.value,loc:Te(e,t)}):"null"===t.value?(e.advance(),{kind:b.NULL,loc:Te(e,t)}):(e.advance(),{kind:b.ENUM,value:t.value,loc:Te(e,t)});case _.DOLLAR:if(!n)return G(e)}throw ke(e)}function W(e){var n=e.token;return e.advance(),{kind:b.STRING,value:n.value,block:n.kind===_.BLOCK_STRING,loc:Te(e,n)}}function z(e){return H(e,!0)}function $(e){return H(e,!1)}function Z(e,n){for(var t=[];pe(e,_.AT);)t.push(ee(e,n));return t}function ee(e,n){var t=e.token;return Ae(e,_.AT),{kind:b.DIRECTIVE,name:P(e),arguments:q(e,n),loc:Te(e,t)}}function ne(e){var n,t=e.token;return Oe(e,_.BRACKET_L)?(n=ne(e),Ae(e,_.BRACKET_R),n={kind:b.LIST_TYPE,type:n,loc:Te(e,t)}):n=te(e),Oe(e,_.BANG)?{kind:b.NON_NULL_TYPE,type:n,loc:Te(e,t)}:n}function te(e){var n=e.token;return{kind:b.NAMED_TYPE,name:P(e),loc:Te(e,n)}}function re(e){var n=ae(e)?e.lookahead():e.token;if(n.kind===_.NAME)switch(n.value){case"schema":return function(e){var n=e.token;me(e,"schema");var t=Z(e,!0),r=Ce(e,_.BRACE_L,oe,_.BRACE_R);return{kind:b.SCHEMA_DEFINITION,directives:t,operationTypes:r,loc:Te(e,n)}}(e);case"scalar":return function(e){var n=e.token,t=ie(e);me(e,"scalar");var r=P(e),a=Z(e,!0);return{kind:b.SCALAR_TYPE_DEFINITION,description:t,name:r,directives:a,loc:Te(e,n)}}(e);case"type":return function(e){var n=e.token,t=ie(e);me(e,"type");var r=P(e),a=ce(e),i=Z(e,!0),o=ue(e);return{kind:b.OBJECT_TYPE_DEFINITION,description:t,name:r,interfaces:a,directives:i,fields:o,loc:Te(e,n)}}(e);case"interface":return function(e){var n=e.token,t=ie(e);me(e,"interface");var r=P(e),a=Z(e,!0),i=ue(e);return{kind:b.INTERFACE_TYPE_DEFINITION,description:t,name:r,directives:a,fields:i,loc:Te(e,n)}}(e);case"union":return function(e){var n=e.token,t=ie(e);me(e,"union");var r=P(e),a=Z(e,!0),i=Ee(e);return{kind:b.UNION_TYPE_DEFINITION,description:t,name:r,directives:a,types:i,loc:Te(e,n)}}(e);case"enum":return function(e){var n=e.token,t=ie(e);me(e,"enum");var r=P(e),a=Z(e,!0),i=de(e);return{kind:b.ENUM_TYPE_DEFINITION,description:t,name:r,directives:a,values:i,loc:Te(e,n)}}(e);case"input":return function(e){var n=e.token,t=ie(e);me(e,"input");var r=P(e),a=Z(e,!0),i=Ne(e);return{kind:b.INPUT_OBJECT_TYPE_DEFINITION,description:t,name:r,directives:a,fields:i,loc:Te(e,n)}}(e);case"directive":return function(e){var n=e.token,t=ie(e);me(e,"directive"),Ae(e,_.AT);var r=P(e),a=le(e);me(e,"on");var i=function(e){Oe(e,_.PIPE);var n=[];do{n.push(Ie(e))}while(Oe(e,_.PIPE));return n}(e);return{kind:b.DIRECTIVE_DEFINITION,description:t,name:r,arguments:a,locations:i,loc:Te(e,n)}}(e)}throw ke(e,n)}function ae(e){return pe(e,_.STRING)||pe(e,_.BLOCK_STRING)}function ie(e){if(ae(e))return W(e)}function oe(e){var n=e.token,t=x(e);Ae(e,_.COLON);var r=te(e);return{kind:b.OPERATION_TYPE_DEFINITION,operation:t,type:r,loc:Te(e,n)}}function ce(e){var n=[];if(_e(e,"implements")){Oe(e,_.AMP);do{n.push(te(e))}while(Oe(e,_.AMP)||e.options.allowLegacySDLImplementsInterfaces&&pe(e,_.NAME))}return n}function ue(e){return e.options.allowLegacySDLEmptyFields&&pe(e,_.BRACE_L)&&e.lookahead().kind===_.BRACE_R?(e.advance(),e.advance(),[]):pe(e,_.BRACE_L)?Ce(e,_.BRACE_L,se,_.BRACE_R):[]}function se(e){var n=e.token,t=ie(e),r=P(e),a=le(e);Ae(e,_.COLON);var i=ne(e),o=Z(e,!0);return{kind:b.FIELD_DEFINITION,description:t,name:r,arguments:a,type:i,directives:o,loc:Te(e,n)}}function le(e){return pe(e,_.PAREN_L)?Ce(e,_.PAREN_L,fe,_.PAREN_R):[]}function fe(e){var n=e.token,t=ie(e),r=P(e);Ae(e,_.COLON);var a,i=ne(e);Oe(e,_.EQUALS)&&(a=z(e));var o=Z(e,!0);return{kind:b.INPUT_VALUE_DEFINITION,description:t,name:r,type:i,defaultValue:a,directives:o,loc:Te(e,n)}}function Ee(e){var n=[];if(Oe(e,_.EQUALS)){Oe(e,_.PIPE);do{n.push(te(e))}while(Oe(e,_.PIPE))}return n}function de(e){return pe(e,_.BRACE_L)?Ce(e,_.BRACE_L,ve,_.BRACE_R):[]}function ve(e){var n=e.token,t=ie(e),r=P(e),a=Z(e,!0);return{kind:b.ENUM_VALUE_DEFINITION,description:t,name:r,directives:a,loc:Te(e,n)}}function Ne(e){return pe(e,_.BRACE_L)?Ce(e,_.BRACE_L,fe,_.BRACE_R):[]}function Ie(e){var n=e.token,t=P(e);if(L.hasOwnProperty(t.value))return t;throw ke(e,n)}function Te(e,n){if(!e.options.noLocation)return new he(n,e.lastToken,e.source)}function he(e,n,t){this.start=e.start,this.end=n.end,this.startToken=e,this.endToken=n,this.source=t}function pe(e,n){return e.token.kind===n}function Ae(e,n){var t=e.token;if(t.kind===n)return e.advance(),t;throw I(e.source,t.start,"Expected ".concat(n,", found ").concat(k(t)))}function Oe(e,n){var t=e.token;if(t.kind===n)return e.advance(),t}function me(e,n){var t=e.token;if(t.kind===_.NAME&&t.value===n)return e.advance(),t;throw I(e.source,t.start,'Expected "'.concat(n,'", found ').concat(k(t)))}function _e(e,n){var t=e.token;if(t.kind===_.NAME&&t.value===n)return e.advance(),t}function ke(e,n){var t=n||e.token;return I(e.source,t.start,"Unexpected ".concat(k(t)))}function ye(e,n,t,r){Ae(e,n);for(var a=[];!Oe(e,r);)a.push(t(e));return a}function Ce(e,n,t,r){Ae(e,n);for(var a=[t(e)];!Oe(e,r);)a.push(t(e));return a}t.d(n,"parse",function(){return F}),t.d(n,"parseValue",function(){return w}),t.d(n,"parseType",function(){return D}),t.d(n,"parseConstValue",function(){return z}),t.d(n,"parseTypeReference",function(){return ne}),t.d(n,"parseNamedType",function(){return te}),u(he,function(){return{start:this.start,end:this.end}})}}]);
//# sourceMappingURL=bundle.npm.graphql-tag.f70448e17bea625e7a77.js.map