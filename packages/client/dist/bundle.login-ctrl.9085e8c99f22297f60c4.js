(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1248:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"default",function(){return LoginCtrl});var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(13),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(14),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(15),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(16),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(17),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),_containers__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(288),_login_view_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(1431),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;_&&_(module)}();var LoginCtrl=function(_PureComponent){function LoginCtrl(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this,LoginCtrl),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(LoginCtrl).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LoginCtrl,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LoginCtrl,[{key:"render",value:function(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_login_view_js__WEBPACK_IMPORTED_MODULE_7__.a,this.props),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_containers__WEBPACK_IMPORTED_MODULE_6__.c,{style:{width:"100%"}}))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),LoginCtrl}(react__WEBPACK_IMPORTED_MODULE_5__.PureComponent),reactHotLoader,leaveModule;reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&reactHotLoader.register(LoginCtrl,"LoginCtrl","/var/www/html/utter/packages/client/src/layouts/login/login-ctrl.js"),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;_&&_.register(LoginCtrl,"LoginCtrl","/var/www/html/utter/packages/client/src/layouts/login/login-ctrl.js")}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;_&&_(module)}()}.call(this,__webpack_require__(18)(module))},1367:function(_,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(1368);Object.keys(a).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return a[_]}})});var t=r(1369);Object.keys(t).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return t[_]}})});var o=r(1370);Object.keys(o).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return o[_]}})});var i=r(1371);Object.keys(i).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return i[_]}})});var n=r(1372);Object.keys(n).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return n[_]}})});var l=r(1373);Object.keys(l).forEach(function(_){"default"!==_&&"__esModule"!==_&&Object.defineProperty(e,_,{enumerable:!0,get:function(){return l[_]}})})},1368:function(_,e,r){"use strict";var a=r(50);Object.defineProperty(e,"__esModule",{value:!0}),e.renewConfirmationSchema=e.betaSignupSchema=e.signupSchema=e.loginSchema=e.changePasswordSchema=e.PasswordValidation=e.betaAccessSchema=e.maxChars=e.minChars=e.passwordNotLongEnough=e.emailNotLongEnough=e.invalidEmail=void 0;var t=a(r(1196)),o="email must be a valid email";e.invalidEmail=o;var i="email must be at least 3 characters";e.emailNotLongEnough=i;e.passwordNotLongEnough="password must be at least 8 characters";e.minChars="Must be a minimum of 3 characters";var n="Cannot exceed 255 characters";e.maxChars=n;var l=t.object().shape({key:t.string().required("A beta key is required")});e.betaAccessSchema=l;var s=t.string().min(8,"password must be at least 8 characters").max(255).matches(/[a-z]/,"One lowercase character is required.").matches(/[A-Z]/,"One uppercase character is required.").matches(/[a-zA-Z]+[^a-zA-Z\s]+/,"A number or special char (@,!,#, etc) is required.").required("Password is required");e.PasswordValidation=s;var u=t.object().shape({password:s,"password confirmation":t.string().oneOf([t.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});e.changePasswordSchema=u;var c=t.object().shape({"username or email":t.string().min(3,"invalid login").max(255,"invalid login").required("Username or Email is required"),password:s});e.loginSchema=c;var E=t.object().shape({username:t.string().min(3).max(255).required("Username is required"),email:t.string().min(3,i).max(255).email(o).required("Email is required"),password:s,"password confirmation":t.string().oneOf([t.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});e.signupSchema=E;var d=t.object().shape({email:t.string().min(3,i).max(255).email(o).required("Email is required"),firstName:t.string().min(1,"minimum of one character").max(255,n).required("A first name is required"),lastName:t.string().min(1,"minimum of one character").max(255,n).required("A last name is required"),linkedIn:t.string().max(255,n),whyLearning:t.string().max(1400,"maximum of 1400 characters"),nativeLang:t.string().max(255,n),currentlyLearning:t.string().max(255,n),howLongLearning:t.string().max(255,n),dayLearningHrs:t.string().max(255,n)});e.betaSignupSchema=d;var p=t.object().shape({email:t.string().min(3,i).max(255).email(o).required("Email is required")});e.renewConfirmationSchema=p},1369:function(_,e,r){"use strict";var a=r(50);Object.defineProperty(e,"__esModule",{value:!0}),e.contactSchema=void 0;var t=a(r(1196)),o=t.object().shape({name:t.string().max(255),subject:t.string().max(255),email:t.string().max(255).email("email must be a valid email"),message:t.string().max(3e3)});e.contactSchema=o},1370:function(_,e,r){"use strict";var a=r(50),t=r(5);Object.defineProperty(e,"__esModule",{value:!0}),e.courseSchema=e.courseCreateSchema=e.nameTooLong=e.descriptionTooLong=e.descriptionNotLongEnough=e.titleNotLongEnough=void 0;var o=t(r(9)),i=a(r(1196)),n="Course titles must be at least 10 characters";e.titleNotLongEnough=n;var l="Course description must be at least 100 characters";e.descriptionNotLongEnough=l;var s="Course description cannot exceed 350 characters";e.descriptionTooLong=s;var u="Course name cannot exceed 100 characters";e.nameTooLong=u;var c=i.object().shape((0,o.default)({title:i.string().min(10,n).max(100,u).required("A course title is required"),courseDescription:i.string().min(100,l).max(350,s).required("A course description is required"),topics:i.array().min(3,"Pick at least 3 tags").of(i.object().shape({label:i.string().required(),value:i.string().required()})),usingLang:i.array().min(1,"Pick at least 1 language").of(i.object().shape({label:i.string().required(),value:i.string().required()})).required("This field is required.")},"courseDescription",i));e.courseCreateSchema=c;var E=i.object().shape({title:i.string().required("A course title is required").min(10,n).max(100,u),courseDescription:i.string().min(100,l).max(350,s).required("A course description is required")});e.courseSchema=E},1371:function(_,e,r){"use strict";var a=r(50);Object.defineProperty(e,"__esModule",{value:!0}),e.levelSchema=void 0;var t=a(r(1196)),o=t.object().shape({level:t.number().typeError("Levels must be whole numbers.").max(1e3,"Courses are limited to 1000 levels.").moreThan(0,"Levels need to be more than 0").required("A level is required."),title:t.string().typeError("Titles must be letters.").max(100,"Titles are limited to 100 characters.").required()});e.levelSchema=o},1372:function(_,e,r){"use strict";var a=r(50);Object.defineProperty(e,"__esModule",{value:!0}),e.vocabularySchema=void 0;var t=a(r(1196)),o=t.object().shape({level:t.number().typeError("You must pick a level or create one.").moreThan(0,"Levels need to be more than 0").required("A level is required."),word:t.string().typeError("Words must be letters.").max(100,"Words are limited to 100 characters.").required(),translation:t.string().typeError("Translations must be letters.").max(100,"Translations are limited to 100 characters.").required()});e.vocabularySchema=o},1373:function(_,e,r){"use strict";var a=r(50);Object.defineProperty(e,"__esModule",{value:!0}),e.zoneCreateSchema=e.rezoneSchema=void 0;var t=a(r(1196)),o=t.object().shape({username:t.string().required("A username is required")});e.rezoneSchema=o;var i=t.object().shape({ageGroup:t.string().required("Age restrictions are required"),app:t.string().required("An app is required"),course:t.string().required("A course you subscribe to is required"),courseLevel:t.string().required("A course level is required"),zoneName:t.string().min(3,"Zone names must be at least 6 characters").max(40,"Zone names cannot exceed 20 characters").required("A zone name is required"),zoneDescription:t.string().min(30,"Zone descriptions must be at least 30 characters").max(110,"Zone descriptions cannot exceed 110 characters").required("A zone description is required")});e.zoneCreateSchema=i},1399:function(_,e,r){(_.exports=r(176)(!1)).push([_.i,".error-msg > div > p {\n\tcolor: #9F3A38;\n}\n",""])},1400:function(_,e,r){"use strict";(function(_){var a;r.d(e,"a",function(){return i}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule)&&a(_),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule;e&&e(_)}();var t,o,i=function(_){var e={};return _.forEach(function(_){e[_.path]=_.message}),e};(t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default)&&t.register(i,"normalizeErrors","/var/www/html/utter/packages/client/src/utils/normalize-errors.js"),(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule)&&o(_),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default;_&&_.register(i,"normalizeErrors","/var/www/html/utter/packages/client/src/utils/normalize-errors.js")}(),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule;e&&e(_)}()}).call(this,r(18)(_))},1407:function(_,e,r){var a=r(1399);"string"==typeof a&&(a=[[_.i,a,""]]);var t={hmr:!0,transform:void 0,insertInto:void 0},o=r(177)(a,t);a.locals&&(_.exports=a.locals),_.hot.accept(1399,function(){var e=r(1399);if("string"==typeof e&&(e=[[_.i,e,""]]),!function(_,e){var r,a=0;for(r in _){if(!e||_[r]!==e[r])return!1;a++}for(r in e)a--;return 0===a}(a.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");o(e)}),_.hot.dispose(function(){o()})},1431:function(module,__webpack_exports__,__webpack_require__){"use strict";(function(module){var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(13),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(14),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(15),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(16),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(17),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),react_router_dom__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1364),react_toastify__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(173),react_toastify__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_7__),react_toastify_dist_ReactToastify_min_css__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(1249),react_toastify_dist_ReactToastify_min_css__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(react_toastify_dist_ReactToastify_min_css__WEBPACK_IMPORTED_MODULE_8__),brownies__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(33),brownies__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(brownies__WEBPACK_IMPORTED_MODULE_9__),_forms_css__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(1407),_forms_css__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(_forms_css__WEBPACK_IMPORTED_MODULE_10__),_login_form__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1432),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;_&&_(module)}();var Login=function(_PureComponent){function Login(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this,Login),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Login).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Login,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Login,[{key:"componentDidMount",value:function(){if(this.props&&this.props.location){var _=this.props.location.state;if(_){var e=_.notification;e&&react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast[_.type||"info"](e,{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0})}this.props.history.replace("/login",{notification:null})}}},{key:"render",value:function(){if(brownies__WEBPACK_IMPORTED_MODULE_9__.cookies._uid)var _=react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.a,{to:"/"});else _=react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_login_form__WEBPACK_IMPORTED_MODULE_11__.a,null);return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment,null,_)}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),Login}(react__WEBPACK_IMPORTED_MODULE_5__.PureComponent),_default=Login,_default2=_default,reactHotLoader,leaveModule;__webpack_exports__.a=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&(reactHotLoader.register(Login,"Login","/var/www/html/utter/packages/client/src/layouts/login/login-view.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/layouts/login/login-view.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;_&&(_.register(Login,"Login","/var/www/html/utter/packages/client/src/layouts/login/login-view.js"),_.register(_default,"_default","/var/www/html/utter/packages/client/src/layouts/login/login-view.js"),_.register(_default2,"default","/var/www/html/utter/packages/client/src/layouts/login/login-view.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;_&&_(module)}()}).call(this,__webpack_require__(18)(module))},1432:function(module,__webpack_exports__,__webpack_require__){"use strict";(function(module){var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(62),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(41),_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(86),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(13),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(14),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(15),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(16),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(17),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__),react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__),react_apollo__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(80),react_router_dom__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(655),formik__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(172),lodash_isEmpty__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(289),lodash_isEmpty__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_12__),_utils_normalize_errors__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(1400),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(100),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14___default=__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(52),_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(43),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16___default=__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16__),brownies__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(33),brownies__WEBPACK_IMPORTED_MODULE_17___default=__webpack_require__.n(brownies__WEBPACK_IMPORTED_MODULE_17__),_utterzone_common__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(1367),_utterzone_common__WEBPACK_IMPORTED_MODULE_18___default=__webpack_require__.n(_utterzone_common__WEBPACK_IMPORTED_MODULE_18__),_graphql_mutations_user_mutations_js__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(175),_components__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(27),_assets_images_login_graphic_png__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(1433),_assets_images_login_graphic_png__WEBPACK_IMPORTED_MODULE_21___default=__webpack_require__.n(_assets_images_login_graphic_png__WEBPACK_IMPORTED_MODULE_21__),_styles_js__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(1434),_forms_css__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(1407),_forms_css__WEBPACK_IMPORTED_MODULE_23___default=__webpack_require__.n(_forms_css__WEBPACK_IMPORTED_MODULE_23__),enterModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule,enterModule&&enterModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).enterModule;_&&_(module)}();var LoginForm=function(_PureComponent){function LoginForm(){return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this,LoginForm),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(LoginForm).apply(this,arguments))}return _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(LoginForm,_PureComponent),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(LoginForm,[{key:"render",value:function(){var _=this.props,e=_.classes,r=_.handleSubmit,a=_.isSubmitting;return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__.u,{className:e.section},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14___default.a,{container:!0},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14___default.a,{item:!0,xs:12,sm:12,md:6,align:"center",className:e.leftSide},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__.m,{centered:!0,alt:"Explore a New World",margin:"0 0 40px 0",width:"470px",src:"".concat(_assets_images_login_graphic_png__WEBPACK_IMPORTED_MODULE_21___default.a)}),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{align:"center",variant:"h4",color:"inherit",gutterBottom:!0,noWrap:!0},"Explore a new world"),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{align:"center",variant:"h6",color:"inherit"},'"To have another language is to possess a second soul."'),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{align:"center",variant:"h6",color:"inherit",gutterBottom:!0,style:{margin:"0 0 50px 0"}},"—Charlemagne")),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14___default.a,{item:!0,xs:12,sm:12,md:6},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div",{className:e.formContainer},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form",{onSubmit:r},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div",{className:e.form},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{variant:"h4",color:"inherit",gutterBottom:!0,noWrap:!0},"Login"),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{component:"p",color:"inherit",noWrap:!0},"credentials"),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_11__.a,{name:"username or email",placeholder:"username or email",component:_components__WEBPACK_IMPORTED_MODULE_20__.g}),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{component:"p",color:"inherit",noWrap:!0},"password"),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_11__.a,{name:"password",placeholder:"password",autoComplete:"new-password",type:"password",component:_components__WEBPACK_IMPORTED_MODULE_20__.g}),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a,{className:e.forgot,color:"inherit",noWrap:!0},react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a",{href:"/forgot-password"}," Forgot Password? "))),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__.s,{className:e.button,type:"submit",variant:"contained",color:"primary",size:"large",loading:a,disabled:a},"submit"))))))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),LoginForm}(react__WEBPACK_IMPORTED_MODULE_8__.PureComponent),_default=Object(react_apollo__WEBPACK_IMPORTED_MODULE_9__.compose)(react_apollo__WEBPACK_IMPORTED_MODULE_9__.withApollo,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.a,Object(react_apollo__WEBPACK_IMPORTED_MODULE_9__.graphql)(_graphql_mutations_user_mutations_js__WEBPACK_IMPORTED_MODULE_19__.f),Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16__.withStyles)(_styles_js__WEBPACK_IMPORTED_MODULE_22__.a),Object(formik__WEBPACK_IMPORTED_MODULE_11__.d)({validationSchema:_utterzone_common__WEBPACK_IMPORTED_MODULE_18__.loginSchema,validateOnChange:!1,validateOnBlur:!1,mapPropsToValues:function(){return{"username or email":"",password:""}},handleSubmit:function(){var _=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _(e,r){var a,t,o,i,n;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return a=r.props,t=r.setErrors,o=r.setSubmitting,i=function(){var _=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _(){var r,t,o;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,a.mutate({variables:{identifier:e["username or email"],password:e.password}});case 2:if(r=_.sent,t=r.data.login.error,o=r.data.login.token,lodash_isEmpty__WEBPACK_IMPORTED_MODULE_12___default()(t)){_.next=7;break}return _.abrupt("return",Object(_utils_normalize_errors__WEBPACK_IMPORTED_MODULE_13__.a)(t));case 7:return _.abrupt("return",_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({},r.data.login,{token:o,error:t}));case 8:case"end":return _.stop()}},_)}));return function(){return _.apply(this,arguments)}}(),_.next=4,i(e);case 4:if(!(n=_.sent).user||n.user.confirmed){_.next=8;break}return a.history.push({pathname:"/renew-confirmation",state:"renewConfirmation"}),_.abrupt("return");case 8:if(n.token){_.next=13;break}return n.identifier&&(n["username or email"]=n.identifier),t(n),o(!1),_.abrupt("return");case 13:n.token&&(brownies__WEBPACK_IMPORTED_MODULE_17__.cookies._uid=n.token,brownies__WEBPACK_IMPORTED_MODULE_17__.session.user=n.user,brownies__WEBPACK_IMPORTED_MODULE_17__.local.notifications=n.user.requests,brownies__WEBPACK_IMPORTED_MODULE_17__.local.notified=!0,a.history.push({pathname:"/",state:"loadUserSession"}));case 14:case"end":return _.stop()}},_)}));return function(e,r){return _.apply(this,arguments)}}()}))(LoginForm),_default2=_default,reactHotLoader,leaveModule;__webpack_exports__.a=_default2,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default,reactHotLoader&&(reactHotLoader.register(LoginForm,"LoginForm","/var/www/html/utter/packages/client/src/layouts/login/login-form.js"),reactHotLoader.register(_default,"default","/var/www/html/utter/packages/client/src/layouts/login/login-form.js")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule,leaveModule&&leaveModule(module),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).default;_&&(_.register(LoginForm,"LoginForm","/var/www/html/utter/packages/client/src/layouts/login/login-form.js"),_.register(_default,"_default","/var/www/html/utter/packages/client/src/layouts/login/login-form.js"),_.register(_default2,"default","/var/www/html/utter/packages/client/src/layouts/login/login-form.js"))}(),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__(1)).leaveModule;_&&_(module)}()}).call(this,__webpack_require__(18)(module))},1433:function(_,e,r){_.exports=r.p+"bf14f6c92563ee62ae4e7bd250ca6cfa.png"},1434:function(_,e,r){"use strict";(function(_){var a;r.d(e,"a",function(){return i}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule)&&a(_),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).enterModule;e&&e(_)}();var t,o,i=function(){return{button:{right:"0px",bottom:"-60px",position:"absolute"},forgot:{position:"absolute",right:"0px",top:"13px"},form:{display:"flex",flexDirection:"column",position:"relative",height:"100%",margin:"0 auto",width:"100%"},formContainer:{margin:"0 auto",position:"relative",width:"260px"},leftSide:{display:"flex",flexDirection:"column",justifyContent:"center"},section:{justifyContent:"center",margin:"100px auto",maxWidth:1240}}};(t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default)&&t.register(i,"styles","/var/www/html/utter/packages/client/src/layouts/login/styles.js"),(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule)&&o(_),function(){var _=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).default;_&&_.register(i,"styles","/var/www/html/utter/packages/client/src/layouts/login/styles.js")}(),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(1)).leaveModule;e&&e(_)}()}).call(this,r(18)(_))}}]);