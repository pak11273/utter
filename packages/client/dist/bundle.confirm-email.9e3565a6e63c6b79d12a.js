(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{z6Ad:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("NthX"),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("fFdx"),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("SDJZ"),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("NToG"),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("K4DB"),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("+IV6"),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__),_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("T1e2"),_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("eef+"),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("OvAC"),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__),react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("r0ML"),react__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__),react_helmet_async__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("h815"),react_apollo__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("3aTW"),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("ctQ7"),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12__),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("qvsH"),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__),_components__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("e+cM"),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule;_&&_(module)}();var styles=function(_){return{root:{backgroundColor:"black",height:"100%"},text:{color:"white"},masthead:_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()({padding:1*_.spacing.unit,margin:"auto",maxWidth:900},"@media (max-width:770px)",{flexDirection:"column"}),section:_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()({padding:1*_.spacing.unit,height:"100vh",maxWidth:900},"@media (max-width:770px)",{flexDirection:"column"})}},ConfirmEmail=function(_Component){function ConfirmEmail(){var _,e;_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this,ConfirmEmail);for(var t=arguments.length,r=new Array(t),a=0;a<t;a++)r[a]=arguments[a];return e=_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this,(_=_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ConfirmEmail)).call.apply(_,[this].concat(r))),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(e),"state",{confirmation:""}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(e),"componentDidMount",_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _(){var t,r,a;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:"https://api.utterzone.com",t=new AbortController,t.signal,r=fetch("".concat("https://api.utterzone.com","/api/users/confirm/").concat(e.props.match.params.token)),a=setTimeout(function(){return t.abort()},5e3),r.then(function(){var _=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _(t){return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.t0=e,_.next=3,t.text();case 3:_.t1=_.sent,_.t2={confirmation:_.t1},_.t0.setState.call(_.t0,_.t2),clearTimeout(a);case 7:case"end":return _.stop()}},_)}));return function(e){return _.apply(this,arguments)}}());case 2:case"end":return _.stop()}},_)}))),e}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ConfirmEmail,_Component),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ConfirmEmail,[{key:"render",value:function(){var _=this.props.classes,e=this.state.confirmation;return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_9___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_10__.a,null,react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("meta",{charset:"utf-8"}),react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("meta",{name:"author",content:"Isaac Pak"}),react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("title",null,"Utterzone | Confirm Email"),react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("link",{rel:"canonical",href:"https://utterzone/confirm-email"})),react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_14__.e,{className:_.root},react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_14__.u,{className:_.section},react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_12___default.a,{variant:"h6",align:"center",className:_.text,gutterBottom:!0},e))))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),ConfirmEmail}(react__WEBPACK_IMPORTED_MODULE_9__.Component),_default=Object(react_apollo__WEBPACK_IMPORTED_MODULE_11__.d)(react_apollo__WEBPACK_IMPORTED_MODULE_11__.f,Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__.withStyles)(styles))(ConfirmEmail),_default2=_default,reactHotLoader,leaveModule;__webpack_exports__.default=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default,reactHotLoader&&(reactHotLoader.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/confirm-email.js"),reactHotLoader.register(ConfirmEmail,"ConfirmEmail","/var/www/html/utter/packages/client/src/layouts/confirm-email.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/layouts/confirm-email.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default;_&&(_.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/confirm-email.js"),_.register(ConfirmEmail,"ConfirmEmail","/var/www/html/utter/packages/client/src/layouts/confirm-email.js"),_.register(_default,"_default","/var/www/html/utter/packages/client/src/layouts/confirm-email.js"),_.register(_default2,"default","/var/www/html/utter/packages/client/src/layouts/confirm-email.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule;_&&_(module)}()}.call(this,__webpack_require__("Ua1F")(module))}}]);
//# sourceMappingURL=bundle.confirm-email.9e3565a6e63c6b79d12a.js.map