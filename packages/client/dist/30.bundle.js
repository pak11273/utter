(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1677:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"default",function(){return ForgotPasswordCtrl});var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(27),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(28),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(29),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(30),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(31),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),_utterzone_connector__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1733),_utterzone_connector__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_utterzone_connector__WEBPACK_IMPORTED_MODULE_6__),_forgot_password_view_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(1762),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;_&&_(module)}();var ForgotPasswordCtrl=function(_PureComponent){function ForgotPasswordCtrl(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this,ForgotPasswordCtrl),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ForgotPasswordCtrl).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ForgotPasswordCtrl,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ForgotPasswordCtrl,[{key:"render",value:function(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_utterzone_connector__WEBPACK_IMPORTED_MODULE_6__.ForgotPasswordConnector,null,function(_){var e=_.submit;return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_forgot_password_view_js__WEBPACK_IMPORTED_MODULE_7__.a,{submit:e})}))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),ForgotPasswordCtrl}(react__WEBPACK_IMPORTED_MODULE_5__.PureComponent),reactHotLoader,leaveModule;reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&reactHotLoader.register(ForgotPasswordCtrl,"ForgotPasswordCtrl","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-ctrl.js"),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;_&&_.register(ForgotPasswordCtrl,"ForgotPasswordCtrl","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-ctrl.js")}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;_&&_(module)}()}.call(this,__webpack_require__(14)(module))},1717:function(_,e,r){_.exports=r.p+"4ce4df9bfd01dfba14d95ee2b4e036c8.png"},1721:function(_,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.normalizeErrors=void 0;e.normalizeErrors=function(_){var e={};return _.forEach(function(_){e[_.path]=_.message}),e}},1733:function(_,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1734);Object.keys(t).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return t[_]}})});var a=r(1735);Object.keys(a).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return a[_]}})});var o=r(1736);Object.keys(o).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return o[_]}})})},1734:function(_,e,r){"use strict";var t=r(1621),a=r(1615);Object.defineProperty(e,"__esModule",{value:!0}),e.LevelsConnector=e.L=void 0;var o=a(r(1622)),l=a(r(1623)),n=a(r(1624)),u=a(r(1625)),s=a(r(1626)),i=a(r(1627)),c=a(r(1628)),E=a(r(818)),d=a(r(1629)),p=a(r(1630)),P=t(r(819)),f=r(1631),M=a(r(1632)),b=r(1721);function O(){var _=(0,o.default)(["\n  mutation levelCreate(\n    $levelName: String!\n    $levelImage: String\n    $levelDescription: String\n    $levelMode: String\n    $teachingLang: String\n    $usingLang: String\n  ) {\n    levelCreate(\n      input: {\n        levelName: $levelName\n        levelImage: $levelImage\n        levelDescription: $levelDescription\n        levelMode: $levelMode\n        teachingLang: $teachingLang\n        usingLang: $usingLang\n      }\n    ) {\n      _id\n      levelName\n      levelAuthor {\n        username\n      }\n      levelDescription\n      levelMode\n    }\n  }\n"]);return O=function(){return _},_}var m=function(_){function e(){var _,r,t;(0,u.default)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return r=(0,i.default)(this,(_=(0,c.default)(e)).call.apply(_,[this].concat(o))),(0,p.default)((0,E.default)(r),"submit",(t=(0,n.default)(l.default.mark(function _(e){var t,a;return l.default.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.prev=0,_.next=3,r.props.mutate({variables:{levelName:e.levelName,levelDescription:e.levelDescription,levelImage:e.levelImage,levelMode:e.levelMode,teachingLang:e.teachingLang,usingLang:e.usingLang}});case 3:if(t=_.sent,!(a=t.data)){_.next=7;break}return _.abrupt("return",a);case 7:if(!error){_.next=9;break}return _.abrupt("return",(0,b.normalizeErrors)(error));case 9:_.next=14;break;case 11:_.prev=11,_.t0=_.catch(0),console.log("err: ",_.t0);case 14:return _.abrupt("return",null);case 15:case"end":return _.stop()}},_,null,[[0,11]])})),function(_){return t.apply(this,arguments)})),r}return(0,d.default)(e,_),(0,s.default)(e,[{key:"render",value:function(){return this.props.children({submit:this.submit})}}]),e}(P.PureComponent);e.L=m;var D=(0,M.default)(O()),w=(0,f.graphql)(D)(m);e.LevelsConnector=w},1735:function(_,e,r){"use strict";var t=r(1621),a=r(1615);Object.defineProperty(e,"__esModule",{value:!0}),e.ForgotPasswordConnector=e.F=void 0;var o=a(r(1622)),l=a(r(1623)),n=a(r(1624)),u=a(r(1625)),s=a(r(1626)),i=a(r(1627)),c=a(r(1628)),E=a(r(818)),d=a(r(1629)),p=a(r(1630)),P=r(1631),f=t(r(819)),M=a(r(1632));r(1721),a(r(315));function b(){var _=(0,o.default)(["\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n"]);return b=function(){return _},_}var O=function(_){function e(){var _,r,t;(0,u.default)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return r=(0,i.default)(this,(_=(0,c.default)(e)).call.apply(_,[this].concat(o))),(0,p.default)((0,E.default)(r),"submit",(t=(0,n.default)(l.default.mark(function _(e){var t;return l.default.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.prev=0,_.next=3,r.props.mutate({variables:{email:e.email}});case 3:return t=_.sent,t.data.forgotPassword,_.abrupt("return",null);case 8:_.prev=8,_.t0=_.catch(0),console.log("err: ",_.t0);case 11:case"end":return _.stop()}},_,null,[[0,8]])})),function(_){return t.apply(this,arguments)})),r}return(0,d.default)(e,_),(0,s.default)(e,[{key:"render",value:function(){return this.props.children({submit:this.submit})}}]),e}(f.PureComponent);e.F=O;var m=(0,M.default)(b()),D=(0,P.graphql)(m)(O);e.ForgotPasswordConnector=D},1736:function(_,e,r){"use strict";var t=r(1615);Object.defineProperty(e,"__esModule",{value:!0}),e.history=void 0;var a=(0,t(r(1647)).default)();e.history=a},1762:function(_,e,r){"use strict";(function(_){var t,a=r(0),o=r.n(a),l=r(1705),n=r(43),u=r(1763);function s(_){var e=_.submit;if(n.cookies._uid)var r=o.a.createElement(l.a,{to:"/"});else r=o.a.createElement(u.a,{submit:e});return o.a.createElement(o.a.Fragment,null,r)}(t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule)&&t(_),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule;e&&e(_)}();var i,c,E=s,d=E;e.a=d,(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default)&&(i.register(s,"forgotPassword","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-view.js"),i.register(E,"default","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-view.js")),(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule)&&c(_),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default;_&&(_.register(s,"forgotPassword","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-view.js"),_.register(E,"_default","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-view.js"),_.register(d,"default","/var/www/html/utter/packages/client/src/layouts/forgot_password/forgot-password-view.js"))}(),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule;e&&e(_)}()}).call(this,r(14)(_))},1763:function(module,__webpack_exports__,__webpack_require__){"use strict";(function(module){var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(82),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(112),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(27),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(28),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(29),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(30),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(31),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__),react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__),react_router_dom__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(817),formik__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(177),_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(59),_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(101),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(41),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(47),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__),_components__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(24),_assets_images_walk_around2_png__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(1717),_assets_images_walk_around2_png__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(_assets_images_walk_around2_png__WEBPACK_IMPORTED_MODULE_15__),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;_&&_(module)}();var styles=function(){return{section:{justifyContent:"center",margin:"50px auto 100px",maxWidth:1240}}},ForgotPasswordForm=function(_PureComponent){function ForgotPasswordForm(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this,ForgotPasswordForm),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ForgotPasswordForm).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(ForgotPasswordForm,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ForgotPasswordForm,[{key:"render",value:function(){var _=this.props,e=_.classes,r=_.handleSubmit;return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_14__.u,{className:e.section},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11___default.a,{container:!0},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11___default.a,{item:!0,xs:12,sm:12,md:6,align:"center",className:e.leftSide},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_14__.m,{centered:!0,alt:"Visiting People",margin:"0 0 40px 0",src:"".concat(_assets_images_walk_around2_png__WEBPACK_IMPORTED_MODULE_15___default.a)}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,noWrap:!0},"Studies show bilingual people are smarter than the average."),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,style:{margin:"0 0 50px 0"}},'"Knowledge of language is the doorway to wisdom."'),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,style:{margin:"0 0 50px 0"}},"—Roger Bacon")),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11___default.a,{item:!0,xs:12,sm:12,md:6,align:"center"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("form",{onSubmit:r,style:{position:"relative"}},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_14__.v,{margin:"70px"}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,noWrap:!0},"Enter your email address below"),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_9__.a,{name:"email",placeholder:"email address",component:_components__WEBPACK_IMPORTED_MODULE_14__.g}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a,{style:{margin:"40px"},fontSize:"1.5rem",type:"submit"},"Reset Password")))))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),ForgotPasswordForm}(react__WEBPACK_IMPORTED_MODULE_7__.PureComponent),_default=Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.a)(Object(formik__WEBPACK_IMPORTED_MODULE_9__.d)({mapPropsToValues:function(){return{email:""}},handleSubmit:function(){var _=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _(e,r){var t,a;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return t=r.props,a=function(){t.history.push("/a/reset-password",{announcement:"Please check your email to reset your password."})},_.next=4,t.submit(e);case 4:_.sent||a();case 6:case"end":return _.stop()}},_)}));return function(e,r){return _.apply(this,arguments)}}()})(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__.withStyles)(styles)(ForgotPasswordForm))),_default2=_default,reactHotLoader,leaveModule;__webpack_exports__.a=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&(reactHotLoader.register(styles,"styles","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js"),reactHotLoader.register(ForgotPasswordForm,"ForgotPasswordForm","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;_&&(_.register(styles,"styles","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js"),_.register(ForgotPasswordForm,"ForgotPasswordForm","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js"),_.register(_default,"_default","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js"),_.register(_default2,"default","/var/www/html/utter/packages/client/src/containers/forms/forgot-password-form.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;_&&_(module)}()}).call(this,__webpack_require__(14)(module))}}]);