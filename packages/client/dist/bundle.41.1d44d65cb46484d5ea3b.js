(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1087:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"default",function(){return ChangePasswordCtrl});var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(26),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(27),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(28),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(29),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(30),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),_change_password_view_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1453),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;e&&e(module)}();var ChangePasswordCtrl=function(_PureComponent){function ChangePasswordCtrl(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this,ChangePasswordCtrl),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ChangePasswordCtrl).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ChangePasswordCtrl,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ChangePasswordCtrl,[{key:"render",value:function(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_change_password_view_js__WEBPACK_IMPORTED_MODULE_6__.a,{token:this.props.match.params.token})}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),ChangePasswordCtrl}(react__WEBPACK_IMPORTED_MODULE_5__.PureComponent),reactHotLoader,leaveModule;reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&reactHotLoader.register(ChangePasswordCtrl,"ChangePasswordCtrl","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-ctrl.js"),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;e&&e.register(ChangePasswordCtrl,"ChangePasswordCtrl","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-ctrl.js")}(),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;e&&e(module)}()}.call(this,__webpack_require__(14)(module))},1119:function(e,_,r){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var a=r(1123);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(_,e,{enumerable:!0,get:function(){return a[e]}})});var t=r(1125);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(_,e,{enumerable:!0,get:function(){return t[e]}})});var o=r(1126);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(_,e,{enumerable:!0,get:function(){return o[e]}})});var s=r(1127);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(_,e,{enumerable:!0,get:function(){return s[e]}})});var n=r(1128);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(_,e,{enumerable:!0,get:function(){return n[e]}})});var i=r(1129);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(_,e,{enumerable:!0,get:function(){return i[e]}})})},1123:function(e,_,r){"use strict";var a=r(40);Object.defineProperty(_,"__esModule",{value:!0}),_.renewConfirmationSchema=_.betaSignupSchema=_.signupSchema=_.loginSchema=_.changePasswordSchema=_.PasswordValidation=_.betaAccessSchema=_.maxChars=_.minChars=_.passwordNotLongEnough=_.emailNotLongEnough=_.invalidEmail=void 0;var t=a(r(1115)),o="email must be a valid email";_.invalidEmail=o;var s="email must be at least 3 characters";_.emailNotLongEnough=s;_.passwordNotLongEnough="password must be at least 8 characters";_.minChars="Must be a minimum of 3 characters";var n="Cannot exceed 255 characters";_.maxChars=n;var i=t.object().shape({key:t.string().required("A beta key is required")});_.betaAccessSchema=i;var l=t.string().min(8,"password must be at least 8 characters").max(255).matches(/[a-z]/,"One lowercase character is required.").matches(/[A-Z]/,"One uppercase character is required.").matches(/[a-zA-Z]+[^a-zA-Z\s]+/,"A number or special char (@,!,#, etc) is required.").required("Password is required");_.PasswordValidation=l;var c=t.object().shape({password:l,"password confirmation":t.string().oneOf([t.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});_.changePasswordSchema=c;var u=t.object().shape({"username or email":t.string().min(3,"invalid login").max(255,"invalid login").required("Username or Email is required"),password:l});_.loginSchema=u;var d=t.object().shape({username:t.string().min(3).max(255).required("Username is required"),email:t.string().min(3,s).max(255).email(o).required("Email is required"),password:l,"password confirmation":t.string().oneOf([t.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});_.signupSchema=d;var E=t.object().shape({email:t.string().min(3,s).max(255).email(o).required("Email is required"),firstName:t.string().min(1,"minimum of one character").max(255,n).required("A first name is required"),lastName:t.string().min(1,"minimum of one character").max(255,n).required("A last name is required"),linkedIn:t.string().max(255,n),whyLearning:t.string().max(1400,"maximum of 1400 characters"),nativeLang:t.string().max(255,n),currentlyLearning:t.string().max(255,n),howLongLearning:t.string().max(255,n),dayLearningHrs:t.string().max(255,n)});_.betaSignupSchema=E;var m=t.object().shape({email:t.string().min(3,s).max(255).email(o).required("Email is required")});_.renewConfirmationSchema=m},1125:function(e,_,r){"use strict";var a=r(40);Object.defineProperty(_,"__esModule",{value:!0}),_.contactSchema=void 0;var t=a(r(1115)),o=t.object().shape({name:t.string().max(255),subject:t.string().max(255),email:t.string().max(255).email("email must be a valid email"),message:t.string().max(3e3)});_.contactSchema=o},1126:function(e,_,r){"use strict";var a=r(40),t=r(2);Object.defineProperty(_,"__esModule",{value:!0}),_.courseSchema=_.courseCreateSchema=_.nameTooLong=_.descriptionTooLong=_.descriptionNotLongEnough=_.titleNotLongEnough=void 0;var o=t(r(9)),s=a(r(1115)),n="Course titles must be at least 10 characters";_.titleNotLongEnough=n;var i="Course description must be at least 100 characters";_.descriptionNotLongEnough=i;var l="Course description cannot exceed 350 characters";_.descriptionTooLong=l;var c="Course name cannot exceed 100 characters";_.nameTooLong=c;var u=s.object().shape((0,o.default)({title:s.string().min(10,n).max(100,c).required("A course title is required"),courseDescription:s.string().min(100,i).max(350,l).required("A course description is required"),topics:s.array().min(3,"Pick at least 3 tags").of(s.object().shape({label:s.string().required(),value:s.string().required()})),usingLang:s.array().min(1,"Pick at least 1 language").of(s.object().shape({label:s.string().required(),value:s.string().required()})).required("This field is required.")},"courseDescription",s));_.courseCreateSchema=u;var d=s.object().shape({title:s.string().required("A course title is required").min(10,n).max(100,c),courseDescription:s.string().min(100,i).max(350,l).required("A course description is required")});_.courseSchema=d},1127:function(e,_,r){"use strict";var a=r(40);Object.defineProperty(_,"__esModule",{value:!0}),_.levelSchema=void 0;var t=a(r(1115)),o=t.object().shape({level:t.number().typeError("Levels must be whole numbers.").max(1e3,"Courses are limited to 1000 levels.").moreThan(0,"Levels need to be more than 0").required("A level is required."),title:t.string().typeError("Titles must be letters.").max(100,"Titles are limited to 100 characters.").required()});_.levelSchema=o},1128:function(e,_,r){"use strict";var a=r(40);Object.defineProperty(_,"__esModule",{value:!0}),_.vocabularySchema=void 0;var t=a(r(1115)),o=t.object().shape({level:t.number().typeError("You must pick a level or create one.").moreThan(0,"Levels need to be more than 0").required("A level is required."),word:t.string().typeError("Words must be letters.").max(100,"Words are limited to 100 characters.").required(),translation:t.string().typeError("Translations must be letters.").max(100,"Translations are limited to 100 characters.").required()});_.vocabularySchema=o},1129:function(e,_,r){"use strict";var a=r(40);Object.defineProperty(_,"__esModule",{value:!0}),_.zoneCreateSchema=_.rezoneSchema=void 0;var t=a(r(1115)),o=t.object().shape({username:t.string().required("A username is required")});_.rezoneSchema=o;var s=t.object().shape({ageGroup:t.string().required("Age restrictions are required"),app:t.string().required("An app is required"),course:t.string().required("A course you subscribe to is required"),courseLevel:t.string().required("A course level is required"),zoneName:t.string().min(3,"Zone names must be at least 6 characters").max(40,"Zone names cannot exceed 20 characters").required("A zone name is required"),zoneDescription:t.string().min(30,"Zone descriptions must be at least 30 characters").max(110,"Zone descriptions cannot exceed 110 characters").required("A zone description is required")});_.zoneCreateSchema=s},1309:function(e,_,r){(e.exports=r(300)(!1)).push([e.i,".error-msg > div > p {\n\tcolor: #9F3A38;\n}\n",""])},1453:function(e,_,r){"use strict";(function(e){var a,t=r(0),o=r.n(t),s=r(1454);function n(e){var _=e.token,r=e.submit;return o.a.createElement(o.a.Fragment,null,o.a.createElement(s.a,{submit:r,token:_}))}(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule)&&a(e),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule;_&&_(e)}();var i,l,c=n,u=c;_.a=u,(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default)&&(i.register(n,"changePassword","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-view.js"),i.register(c,"default","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-view.js")),(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule)&&l(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default;e&&(e.register(n,"changePassword","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-view.js"),e.register(c,"_default","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-view.js"),e.register(u,"default","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-view.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule;_&&_(e)}()}).call(this,r(14)(e))},1454:function(module,__webpack_exports__,__webpack_require__){"use strict";(function(module){var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(94),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(27),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(28),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(29),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(30),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__),react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__),react_apollo__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(79),react_router_dom__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(596),formik__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(130),_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(62),_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(102),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_12__),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(51),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(46),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14___default=__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__),react_toastify__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(131),react_toastify__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_15__),_utterzone_common__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(1119),_utterzone_common__WEBPACK_IMPORTED_MODULE_16___default=__webpack_require__.n(_utterzone_common__WEBPACK_IMPORTED_MODULE_16__),_components__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(24),_graphql_mutations_user_mutations_js__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(309),_forms_css__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(1455),_forms_css__WEBPACK_IMPORTED_MODULE_19___default=__webpack_require__.n(_forms_css__WEBPACK_IMPORTED_MODULE_19__),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;e&&e(module)}();var styles=function(){return{section:{justifyContent:"center",margin:"50px auto 100px",maxWidth:1240}}},ChangePasswordForm=function(_PureComponent){function ChangePasswordForm(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this,ChangePasswordForm),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ChangePasswordForm).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(ChangePasswordForm,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ChangePasswordForm,[{key:"render",value:function(){var e=this.props,_=e.classes,r=e.handleSubmit;return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__.u,{className:_.section},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_12___default.a,{container:!0},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_12___default.a,{item:!0,xs:12,sm:12,md:6,align:"center"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__.m,{alt:"Visiting People",margin:"0 0 40px 0",src:"https://media.swncdn.com/cms/CW/faith/31429-speaking-in-front-of-crowd-1200.jpg"}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,noWrap:!0},"Education increases life opportunities."),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,style:{margin:"0 0 50px 0"}},'"The great aim of education is not knowledge but action."'),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,style:{margin:"0 0 50px 0"}},"—Herbert Spencer")),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_12___default.a,{item:!0,xs:12,sm:12,md:6,align:"center"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("form",{onSubmit:r,style:{position:"relative"}},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__.v,{margin:"70px"}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,noWrap:!0},"Change Password"),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_10__.a,{name:"password",placeholder:"password",autoComplete:"new-password",type:"password",component:_components__WEBPACK_IMPORTED_MODULE_17__.g}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_10__.a,{name:"password confirmation",placeholder:"password confirmation",type:"password",component:_components__WEBPACK_IMPORTED_MODULE_17__.g}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default.a,{color:"inherit",floated:"right",fontSize:"1.5rem",style:{margin:"30px 0 0 0"},type:"submit"},"Submit")))))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),ChangePasswordForm}(react__WEBPACK_IMPORTED_MODULE_7__.PureComponent),_default=Object(react_apollo__WEBPACK_IMPORTED_MODULE_8__.f)(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.a)(Object(formik__WEBPACK_IMPORTED_MODULE_10__.d)({validationSchema:_utterzone_common__WEBPACK_IMPORTED_MODULE_16__.changePasswordSchema,validateOnChange:!1,validateOnBlur:!1,mapPropsToValues:function(){return{password:"","password confirmation":""}},handleSubmit:function(){var e=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function e(_,r){var a,t,o;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.props,console.log("values: ",_),console.log("prps: ",a),e.next=5,a.client.mutate({mutation:_graphql_mutations_user_mutations_js__WEBPACK_IMPORTED_MODULE_18__.d,variables:{password:_.password,passwordConfirmation:_["password confirmation"],token:a.token}});case 5:t=e.sent,o=function(){react_toastify__WEBPACK_IMPORTED_MODULE_15__.toast.success("Password change successful.  Try logging in with your new password.",{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0}),a.history.push("/login")},t.data.changePasswor&&t.data.changePassword.error?(react_toastify__WEBPACK_IMPORTED_MODULE_15__.toast.warn(t.data.changePassword.error[0].message,{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0}),a.history.push("/forgot-password")):o();case 8:case"end":return e.stop()}},e)}));return function(_,r){return e.apply(this,arguments)}}()})(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__.withStyles)(styles)(ChangePasswordForm)))),_default2=_default,reactHotLoader,leaveModule;__webpack_exports__.a=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&(reactHotLoader.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js"),reactHotLoader.register(ChangePasswordForm,"ChangePasswordForm","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;e&&(e.register(styles,"styles","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js"),e.register(ChangePasswordForm,"ChangePasswordForm","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js"),e.register(_default,"_default","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js"),e.register(_default2,"default","/var/www/html/utter/packages/client/src/layouts/change_password/change-password-form.js"))}(),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;e&&e(module)}()}).call(this,__webpack_require__(14)(module))},1455:function(e,_,r){var a=r(1309);"string"==typeof a&&(a=[[e.i,a,""]]);var t={hmr:!0,transform:void 0,insertInto:void 0},o=r(301)(a,t);a.locals&&(e.exports=a.locals),e.hot.accept(1309,function(){var _=r(1309);if("string"==typeof _&&(_=[[e.i,_,""]]),!function(e,_){var r,a=0;for(r in e){if(!_||e[r]!==_[r])return!1;a++}for(r in _)a--;return 0===a}(a.locals,_.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");o(_)}),e.hot.dispose(function(){o()})}}]);