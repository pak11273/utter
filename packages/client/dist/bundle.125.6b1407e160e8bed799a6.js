(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{ID01:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("OvAC"),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("r0ML"),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),react_helmet_async__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("h815"),_containers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("ynM+"),_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("yVZo"),_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("ketZ"),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__),_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("vxHz"),_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("ctQ7"),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("qvsH"),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__),brownies__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("18K1"),brownies__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(brownies__WEBPACK_IMPORTED_MODULE_9__),react_apollo__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("3aTW"),graphql_tag__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("ktN7"),graphql_tag__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_11__),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule;_&&_(module)}();const COURSE_UPDATE=graphql_tag__WEBPACK_IMPORTED_MODULE_11___default.a`
  mutation courseUpdate($input: CourseUpdated!) {
    courseUpdate(input: $input) {
      id
      courseMode
    }
  }
`,styles=_=>({content:{flexGrow:1,padding:3*_.spacing.unit},courseMode:{fontSize:3*_.spacing.unit,marginRight:"20px",paddingLeft:"20px",color:"orange"},dangerZone:{color:"red",padding:"16px"},heroUnit:{backgroundColor:_.palette.background.paper},heroContent:{maxWidth:600,margin:"0 auto",padding:`${8*_.spacing.unit}px 0 ${6*_.spacing.unit}px`},heroButtons:{marginTop:4*_.spacing.unit},root:{maxWidth:900,margin:"0 auto",width:"100%"}});class CourseSettings extends react__WEBPACK_IMPORTED_MODULE_1__.Component{constructor(..._){super(..._),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this,"state",{name:"",email:"",open:!1,submittedName:"",submittedEmail:""}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this,"handleChange",(_,{name:e,value:t})=>this.setState({[e]:t})),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this,"handlePublish",async()=>{const _=await this.props.mutate({input:"live"});console.log("result: ",_)}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this,"handleDeleteModalOpen",()=>{this.setState({open:!0})}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this,"handleDeleteModalClose",()=>{this.setState({open:!1})}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this,"handleSubmit",()=>{const{name:_,email:e}=this.state;this.setState({submittedName:_,submittedEmail:e})})}render(){const{classes:_}=this.props,{course:e}=brownies__WEBPACK_IMPORTED_MODULE_9__.session;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form",{className:_.root,onSubmit:this.handleSubmit},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_2__.a,null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta",{charset:"utf-8"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta",{name:"description",content:"Affordable language learning"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta",{name:"author",content:"Isaac Pak"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title",null,"Utterzone | Settings"),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link",{rel:"canonical",href:"https://utter.zone/settings"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a,{className:_.hero,container:!0,justify:"center",direction:"column"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6___default.a,{className:_.header,elevation:1},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default.a,{className:_.headerBody,variant:"h4",align:"center",gutterBottom:!0},"Course Settings"))),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main",{className:_.content},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a,{container:!0,spacing:24},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a,{item:!0,xs:12,style:{backgroundColor:"#3e3e3e"}},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default.a,{variant:"h6",align:"left",className:_.dangerZone,gutterBottom:!0},"Danger Zone"),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default.a,{variant:"outlined",onClick:this.handleDeleteModalOpen,style:{backgroundColor:"red",color:"white",margin:"12px"}},"Delete Course"),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_containers__WEBPACK_IMPORTED_MODULE_3__.a,{course:e,open:this.state.open,onClose:this.handleDeleteModalClose})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a,{item:!0,xs:12},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",margin:"50px 0"}})))))}__reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}const withGraphql=Object(react_apollo__WEBPACK_IMPORTED_MODULE_10__.e)(COURSE_UPDATE)(CourseSettings),_default=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__.withStyles)(styles)(withGraphql),_default2=_default;var reactHotLoader,leaveModule;__webpack_exports__.default=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default,reactHotLoader&&(reactHotLoader.register(COURSE_UPDATE,"COURSE_UPDATE","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),reactHotLoader.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),reactHotLoader.register(CourseSettings,"CourseSettings","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),reactHotLoader.register(withGraphql,"withGraphql","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default;_&&(_.register(COURSE_UPDATE,"COURSE_UPDATE","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),_.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),_.register(CourseSettings,"CourseSettings","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),_.register(withGraphql,"withGraphql","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),_.register(_default,"_default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"),_.register(_default2,"default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-settings.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule;_&&_(module)}()}.call(this,__webpack_require__("Ua1F")(module))}}]);
//# sourceMappingURL=bundle.125.6b1407e160e8bed799a6.js.map