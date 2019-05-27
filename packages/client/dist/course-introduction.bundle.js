(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1672:function(e,r,t){"use strict";t.r(r),function(e){var a,n=t(82),o=t.n(n),i=t(112),s=t.n(i),c=t(66),u=t.n(c),l=t(123),d=t.n(l),m=t(8),g=t.n(m),p=t(0),f=t.n(p),h=t(437),b=t(1707),v=t(178),w=t(144),y=t.n(w),E=t(101),x=t.n(E),q=t(125),j=t.n(q),L=t(47),S=t.n(L),_=t(41),k=t(315),C=t.n(k),O=t(7),H=t.n(O),A=t(180),G=t.n(A),I=t(43),M=t(44),P=t.n(M),T=t(92),N=t(24),B=t(444),D=t(567),U=t(1719);function z(){var e=g()(["\n  mutation unsubscribe($courseId: String!) {\n    unsubscribe(courseId: $courseId)\n  }\n"]);return z=function(){return e},e}function W(){var e=g()(["\n  mutation subscribe($courseId: String!) {\n    subscribe(courseId: $courseId) {\n      _id\n      title\n    }\n  }\n"]);return W=function(){return e},e}(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).enterModule)&&a(e),function(){var r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).enterModule;r&&r(e)}();var R,Z,$=P()(W()),J=P()(z()),Q=function(e){var r=I.session.user,t=I.session.course,a=e.classes,n=e.client,i=Object(p.useState)({formErrors:{errors:[]},courseId:t._id,courseDescription:t.courseDescription,name:"",email:"",loading:!1,subscribed:!1,submittedName:"",submittedEmail:"",title:t.title}),c=d()(i,2),l=c[0],m=c[1];Object(p.useEffect)(function(){I.session.user&&I.session.user.subscriptions.find(function(e){return e._id===I.session.course._id})&&m(u()({},l,{subscribed:!0}))},[l]);var g=function(){var e=I.session.course,r=I.session.user;r.subscriptions.push({_id:e._id,title:e.title}),I.session.user=r},w=function(){var r=s()(o.a.mark(function r(t){var a,n;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t.preventDefault(),r.next=3,b.courseSchema.validate(l).catch(function(e){if(e)return console.log("err: ",e),m(u()({},l,{formErrors:{errors:e}})),console.log("state: ",l),e});case 3:if(a=r.sent,!C()(a.errors)){r.next=11;break}return m(u()({},l,{loading:!0})),r.next=8,e.client.mutate({mutation:D.b,variables:{_id:l.courseId,title:l.title,courseDescription:l.courseDescription},refetchQueries:[{query:B.b,variables:{usingLang:"",teachingLang:""}}]});case 8:(n=r.sent)&&(console.log("updated: ",n),I.session.course=n.data.courseUpdate,v.toast.success("Your changes were saved.",{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0})),m(u()({},l,{formErrors:{errors:["hi"]},loading:!1}));case 11:case"end":return r.stop()}},r)}));return function(e){return r.apply(this,arguments)}}(),E=H()({errorClass:"courseDescription"===l.formErrors.path&&!C()(l.formErrors.errors)}),q=H()({errorClass:"title"===l.formErrors.path&&!C()(l.formErrors.errors)});return f.a.createElement(T.c,{query:B.a,variables:{_id:t._id}},function(e){var o=e.loading,i=e.error;return o?f.a.createElement(x.a,{container:!0,alignContent:"center",justify:"center",style:{height:"300px"}},f.a.createElement(y.a,{style:{color:"grey"}})):i?(console.log("err: ",i),f.a.createElement(x.a,null,f.a.createElement("p",null,i.graphQLErrors.map(function(e,r){var t=e.message;return f.a.createElement("p",{style:{fontSize:"1.3em",color:"red",margin:"30px",padding:"30px",textAlign:"center"},key:r},t)})))):f.a.createElement("form",{onSubmit:w},f.a.createElement(h.a,null,f.a.createElement("meta",{charset:"utf-8"}),f.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),f.a.createElement("meta",{name:"description",content:"Affordable language learning"}),f.a.createElement("meta",{name:"author",content:"Isaac Pak"}),f.a.createElement("title",null,"Utterzone | Course Introduction"),f.a.createElement("link",{rel:"canonical",href:"https://utter.zone/course/course-introduction"})),f.a.createElement(x.a,{className:a.hero,container:!0,justify:"center",direction:"column"},f.a.createElement(j.a,{className:a.header,elevation:1},f.a.createElement(S.a,{className:a.headerBody,variant:"h4",align:"center",gutterBottom:!0},"Course Introduction"))),f.a.createElement("main",{className:a.content},f.a.createElement(x.a,{container:!0,spacing:24},f.a.createElement(x.a,{item:!0,xs:12,style:{display:"flex",flexDirection:"column",alignItems:"center"}},f.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},f.a.createElement(N.m,{margin:"40px",src:t.courseImage}))),f.a.createElement(x.a,{item:!0,xs:12,align:"center"},f.a.createElement(T.b,{mutation:$,onCompleted:g},function(e,r){var a=r.loading;return f.a.createElement(N.s,{loading:a,disabled:a,color:!0===l.subscribed?"secondary":"primary",variant:"contained",onClick:function(){l.subscribed&&(n.mutate({mutation:J,variables:{courseId:t._id}}),m(u()({},l,{subscribed:!1})),function(){var e=I.session.user,r=e.subscriptions.filter(function(e){return e._id!==I.session.course._id});e.subscriptions=r,I.session.user=e}()),l.subscribed||(e({variables:{courseId:t._id}}),m(u()({},l,{subscribed:!0})))},size:"large"},f.a.createElement(S.a,null,l.subscribed?"unsubscribe":"subscribe"))})),f.a.createElement(x.a,{item:!0,xs:12},f.a.createElement(S.a,{variant:"h6",align:"left",gutterBottom:!0},"General Information"),f.a.createElement(G.a,{className:"".concat(a[q]," ").concat(a.inputHeader),fullWidth:!0,disabled:l.loading,label:"Course Title",margin:"normal",name:"title",onChange:function(e){return m(u()({},l,{title:e.target.value}))},placeholder:"And it's title here.",type:"text",variant:"outlined",value:l.title}),"title"===l.formErrors.path&&f.a.createElement("div",{style:{color:"#f44336"}},l.formErrors.errors[0]),f.a.createElement(G.a,{className:"".concat(a[E]," ").concat(a.inputHeader),disabled:l.loading,fullWidth:!0,name:"courseDescription",label:"Course Description",type:"text",onChange:function(e){return m(u()({},l,{courseDescription:e.target.value}))},margin:"normal",multiline:!0,variant:"outlined",rowsMax:"12",value:l.courseDescription}),"courseDescription"===l.formErrors.path&&f.a.createElement("div",{style:{color:"#f44336"}},l.formErrors.errors[0])),f.a.createElement(x.a,{item:!0,xs:12},f.a.createElement(S.a,{variant:"h6",align:"left",gutterBottom:!0},"Course Details"),f.a.createElement(S.a,{variant:"body1",align:"left",gutterBottom:!0},"Course Author:"," ",f.a.createElement("span",{style:{fontWeight:900}},t.owner.username)),f.a.createElement(S.a,{variant:"body1",align:"left",gutterBottom:!0},"Resource:"," ",f.a.createElement("span",{style:{fontWeight:900}},t.resource||"none")),f.a.createElement(S.a,{variant:"body1",align:"left",gutterBottom:!0},"Using Language:"," ",f.a.createElement("span",{style:{fontWeight:900}},t.usingLang)),f.a.createElement(S.a,{variant:"body1",align:"left",gutterBottom:!0},"Teaching Language:"," ",f.a.createElement("span",{style:{fontWeight:900}},t.teachingLang))),f.a.createElement(x.a,{container:!0,style:{margin:"50px auto"}},f.a.createElement(N.c,{roles:r&&r.roles,perform:"course:update-introduction",id:r&&r.username,matchingID:t.owner.username,yes:function(){return f.a.createElement(x.a,{item:!0,xs:12,align:"center"},f.a.createElement(N.s,{variant:"contained",loading:l.loading,disabled:l.loading,type:"submit",color:"secondary"},"Save Changes"))},no:function(){return null}})))))})},V=Object(T.d)(T.f,Object(_.withStyles)(U.a))(Q),X=V;r.default=X,(R=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).default)&&(R.register($,"SUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),R.register(J,"UNSUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),R.register(Q,"CourseIntroduction","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),R.register(V,"default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js")),(Z=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).leaveModule)&&Z(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).default;e&&(e.register(z,"_templateObject2","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(W,"_templateObject","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register($,"SUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(J,"UNSUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(Q,"CourseIntroduction","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(V,"_default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(X,"default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"))}(),function(){var r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).leaveModule;r&&r(e)}()}.call(this,t(14)(e))},1707:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t(1708);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(r,e,{enumerable:!0,get:function(){return a[e]}})});var n=t(1709);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(r,e,{enumerable:!0,get:function(){return n[e]}})});var o=t(1710);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(r,e,{enumerable:!0,get:function(){return o[e]}})});var i=t(1711);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(r,e,{enumerable:!0,get:function(){return i[e]}})});var s=t(1712);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(r,e,{enumerable:!0,get:function(){return s[e]}})});var c=t(1713);Object.keys(c).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(r,e,{enumerable:!0,get:function(){return c[e]}})})},1708:function(e,r,t){"use strict";var a=t(42);Object.defineProperty(r,"__esModule",{value:!0}),r.renewConfirmationSchema=r.betaSignupSchema=r.signupSchema=r.loginSchema=r.changePasswordSchema=r.PasswordValidation=r.betaAccessSchema=r.maxChars=r.minChars=r.passwordNotLongEnough=r.emailNotLongEnough=r.invalidEmail=void 0;var n=a(t(1614)),o="email must be a valid email";r.invalidEmail=o;var i="email must be at least 3 characters";r.emailNotLongEnough=i;r.passwordNotLongEnough="password must be at least 8 characters";r.minChars="Must be a minimum of 3 characters";var s="Cannot exceed 255 characters";r.maxChars=s;var c=n.object().shape({key:n.string().required("A beta key is required")});r.betaAccessSchema=c;var u=n.string().min(8,"password must be at least 8 characters").max(255).matches(/[a-z]/,"One lowercase character is required.").matches(/[A-Z]/,"One uppercase character is required.").matches(/[a-zA-Z]+[^a-zA-Z\s]+/,"A number or special char (@,!,#, etc) is required.").required("Password is required");r.PasswordValidation=u;var l=n.object().shape({password:u,"password confirmation":n.string().oneOf([n.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});r.changePasswordSchema=l;var d=n.object().shape({"username or email":n.string().min(3,"invalid login").max(255,"invalid login").required("Username or Email is required"),password:u});r.loginSchema=d;var m=n.object().shape({username:n.string().min(3).max(255).required("Username is required"),email:n.string().min(3,i).max(255).email(o).required("Email is required"),password:u,"password confirmation":n.string().oneOf([n.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});r.signupSchema=m;var g=n.object().shape({email:n.string().min(3,i).max(255).email(o).required("Email is required"),firstName:n.string().min(1,"minimum of one character").max(255,s).required("A first name is required"),lastName:n.string().min(1,"minimum of one character").max(255,s).required("A last name is required"),linkedIn:n.string().max(255,s),whyLearning:n.string().max(1400,"maximum of 1400 characters"),nativeLang:n.string().max(255,s),currentlyLearning:n.string().max(255,s),howLongLearning:n.string().max(255,s),dayLearningHrs:n.string().max(255,s)});r.betaSignupSchema=g;var p=n.object().shape({email:n.string().min(3,i).max(255).email(o).required("Email is required")});r.renewConfirmationSchema=p},1709:function(e,r,t){"use strict";var a=t(42);Object.defineProperty(r,"__esModule",{value:!0}),r.contactSchema=void 0;var n=a(t(1614)),o=n.object().shape({name:n.string().max(255),subject:n.string().max(255),email:n.string().max(255).email("email must be a valid email"),message:n.string().max(3e3)});r.contactSchema=o},1710:function(e,r,t){"use strict";var a=t(42),n=t(2);Object.defineProperty(r,"__esModule",{value:!0}),r.courseSchema=r.courseCreateSchema=r.nameTooLong=r.descriptionTooLong=r.descriptionNotLongEnough=r.titleNotLongEnough=void 0;var o=n(t(9)),i=a(t(1614)),s="Course titles must be at least 10 characters";r.titleNotLongEnough=s;var c="Course description must be at least 100 characters";r.descriptionNotLongEnough=c;var u="Course description cannot exceed 350 characters";r.descriptionTooLong=u;var l="Course name cannot exceed 100 characters";r.nameTooLong=l;var d=i.object().shape((0,o.default)({title:i.string().min(10,s).max(100,l).required("A course title is required"),courseDescription:i.string().min(100,c).max(350,u).required("A course description is required"),topics:i.array().min(3,"Pick at least 3 tags").of(i.object().shape({label:i.string().required(),value:i.string().required()})),usingLang:i.array().min(1,"Pick at least 1 language").of(i.object().shape({label:i.string().required(),value:i.string().required()})).required("This field is required.")},"courseDescription",i));r.courseCreateSchema=d;var m=i.object().shape({title:i.string().required("A course title is required").min(10,s).max(100,l),courseDescription:i.string().min(100,c).max(350,u).required("A course description is required")});r.courseSchema=m},1711:function(e,r,t){"use strict";var a=t(42);Object.defineProperty(r,"__esModule",{value:!0}),r.levelSchema=void 0;var n=a(t(1614)),o=n.object().shape({level:n.number().typeError("Levels must be whole numbers.").max(1e3,"Courses are limited to 1000 levels.").moreThan(0,"Levels need to be more than 0").required("A level is required."),title:n.string().typeError("Titles must be letters.").max(100,"Titles are limited to 100 characters.").required()});r.levelSchema=o},1712:function(e,r,t){"use strict";var a=t(42);Object.defineProperty(r,"__esModule",{value:!0}),r.vocabularySchema=void 0;var n=a(t(1614)),o=n.object().shape({level:n.number().typeError("You must pick a level or create one.").moreThan(0,"Levels need to be more than 0").required("A level is required."),word:n.string().typeError("Words must be letters.").max(100,"Words are limited to 100 characters.").required(),translation:n.string().typeError("Translations must be letters.").max(100,"Translations are limited to 100 characters.").required()});r.vocabularySchema=o},1713:function(e,r,t){"use strict";var a=t(42);Object.defineProperty(r,"__esModule",{value:!0}),r.zoneCreateSchema=r.rezoneSchema=void 0;var n=a(t(1614)),o=n.object().shape({username:n.string().required("A username is required")});r.rezoneSchema=o;var i=n.object().shape({ageGroup:n.string().required("Age restrictions are required"),app:n.string().required("An app is required"),course:n.string().required("A course you subscribe to is required"),courseLevel:n.string().required("A course level is required"),zoneName:n.string().min(3,"Zone names must be at least 6 characters").max(40,"Zone names cannot exceed 20 characters").required("A zone name is required"),zoneDescription:n.string().min(30,"Zone descriptions must be at least 30 characters").max(110,"Zone descriptions cannot exceed 110 characters").required("A zone description is required")});r.zoneCreateSchema=i},1719:function(e,r,t){"use strict";(function(e){t.d(r,"a",function(){return c});var a,n=t(21),o=t.n(n);(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).enterModule)&&a(e),function(){var r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).enterModule;r&&r(e)}();var i,s,c=function(e){return{card:{minHeight:"240px",display:"flex",flexDirection:"column"},cardGrid:{padding:"".concat(8*e.spacing.unit,"px 0")},cardMedia:{paddingTop:"56.25%","&:hover":{cursor:"pointer"}},cardUsername:{whiteSpace:"nowrap",width:"200px",overflow:"hidden",textOverflow:"ellipsis"},content:{flexGrow:1,padding:3*e.spacing.unit,width:"100%"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},editButton:{color:"white",backgroundColor:"#ff7f7e","&:hover":{backgroundColor:"#c56564"}},errorClass:{boxShadow:"0px 0px 2px 1px ".concat(e.palette.error.main),backgroundColor:"white"},errors:{color:e.palette.error.main},formControl:{margin:e.spacing.unit,minWidth:120},gridActions:{display:"flex",justifyContent:"space-between"},gridTitle:{height:"40px",lineHeight:"1em",overflow:"hidden",textOverflow:"ellipsis",wordBreak:"break-word"},header:{fontSize:3*e.spacing.unit,fontWeight:400,height:"100%",minHeight:"40px",width:"100%"},headerBody:{padding:"40px"},hero:{padding:"0 24px "},heroUnit:{},heroContent:{margin:"0 auto",padding:"".concat(16*e.spacing.unit,"px 0 0 0")},heroButtons:{marginTop:4*e.spacing.unit},icon:{marginRight:2*e.spacing.unit},inputHeader:{background:"white",minHeight:"40px"},layout:o()({width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(1240+3*e.spacing.unit*2),{width:1240,marginLeft:"auto",marginRight:"auto"}),root:{alignItems:"flex-start",flexDirection:"row",display:"flex",flexGrow:1,width:"100%"},selectEmpty:{marginTop:2*e.spacing.unit},searchField:{marginTop:"7px"},showMore:{position:"absolute",bottom:-50,left:"50%",webkitTransform:"translateX(-50%)",transform:"translateX(-50%)"}}};(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).default)&&(i.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/courses/styles.js"),i.register(c,"styles","/var/www/html/utter/packages/client/src/layouts/courses/styles.js")),(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).leaveModule)&&s(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).default;e&&(e.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/courses/styles.js"),e.register(c,"styles","/var/www/html/utter/packages/client/src/layouts/courses/styles.js"))}(),function(){var r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t(1)).leaveModule;r&&r(e)}()}).call(this,t(14)(e))}}]);