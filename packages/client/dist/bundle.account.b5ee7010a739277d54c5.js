(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{Qc1O:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("r0ML"),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_helmet_async__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("h815"),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("ctQ7"),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("qvsH"),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__),_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("e+cM"),_containers__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("ynM+"),react_apollo__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("3aTW"),graphql_tag__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("ktN7"),graphql_tag__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_7__),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule;_&&_(module)}();const ME_QUERY=graphql_tag__WEBPACK_IMPORTED_MODULE_7___default.a`
  {
    me {
      _id
      email
    }
  }
`,styles=_=>({root:{backgroundColor:"black",height:"100%"},text:{color:"white"},masthead:{padding:1*_.spacing.unit,margin:"auto",maxWidth:900,"@media (max-width:770px)":{flexDirection:"column"}},section:{padding:1*_.spacing.unit,margin:"0 auto 100px",maxWidth:900,"@media (max-width:770px)":{flexDirection:"column"}}});class About extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){const{classes:_}=this.props;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__.a,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{charset:"utf-8"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{name:"description",content:"We aim to make the world a better place with communication."}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{name:"author",content:"Isaac Pak"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title",null,"Utterzone | About"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link",{rel:"canonical",href:"https://utter.zone/account"})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.e,{className:_.root},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers__WEBPACK_IMPORTED_MODULE_5__.d,{className:_.masthead,background:'url("https://s.hswstatic.com/gif/brain-1.jpg") #000 no-repeat center/contain',height:"400px",width:"300px"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_6__.c,{query:ME_QUERY},({data:e,loading:t})=>t?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,"...loading"):e?e.me?e.me?(console.log("dat: ",e),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,e.me.email)):void 0:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,"No user data"):react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.t,{className:_.section},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a,{variant:"h4",align:"center",className:_.text,component:"p",gutterBottom:!0},"undefined"))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers__WEBPACK_IMPORTED_MODULE_5__.b,null)))}__reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}const _default=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__.withStyles)(styles)(About),_default2=_default;var reactHotLoader,leaveModule;__webpack_exports__.default=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default,reactHotLoader&&(reactHotLoader.register(ME_QUERY,"ME_QUERY","/var/www/html/utter/packages/client/src/layouts/account.js"),reactHotLoader.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/account.js"),reactHotLoader.register(About,"About","/var/www/html/utter/packages/client/src/layouts/account.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/layouts/account.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default;_&&(_.register(ME_QUERY,"ME_QUERY","/var/www/html/utter/packages/client/src/layouts/account.js"),_.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/account.js"),_.register(About,"About","/var/www/html/utter/packages/client/src/layouts/account.js"),_.register(_default,"_default","/var/www/html/utter/packages/client/src/layouts/account.js"),_.register(_default2,"default","/var/www/html/utter/packages/client/src/layouts/account.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule;_&&_(module)}()}.call(this,__webpack_require__("Ua1F")(module))}}]);
//# sourceMappingURL=bundle.account.b5ee7010a739277d54c5.js.map