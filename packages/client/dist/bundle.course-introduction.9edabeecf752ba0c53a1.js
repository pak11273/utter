(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"+EG4":function(e,t,a){"use strict";var r=a("jxvI");Object.defineProperty(t,"__esModule",{value:!0}),t.contactSchema=void 0;var n=r(a("vrZp")),o=n.object().shape({name:n.string().max(255),subject:n.string().max(255),email:n.string().max(255).email("email must be a valid email"),message:n.string().max(3e3)});t.contactSchema=o},"+LZS":function(e,t,a){"use strict";var r=a("jxvI"),n=a("u0ku");Object.defineProperty(t,"__esModule",{value:!0}),t.courseSchema=t.courseCreateSchema=t.nameTooLong=t.descriptionTooLong=t.descriptionNotLongEnough=t.titleNotLongEnough=void 0;var o=n(a("qtOx")),s=r(a("vrZp")),i="Course titles must be at least 10 characters";t.titleNotLongEnough=i;var l="Course description must be at least 100 characters";t.descriptionNotLongEnough=l;var c="Course description cannot exceed 350 characters";t.descriptionTooLong=c;var u="Course name cannot exceed 100 characters";t.nameTooLong=u;var d=s.object().shape((0,o.default)({title:s.string().min(10,i).max(100,u).required("A course title is required"),courseDescription:s.string().min(100,l).max(350,c).required("A course description is required"),topics:s.array().min(3,"Pick at least 3 tags").of(s.object().shape({label:s.string().required(),value:s.string().required()})),usingLang:s.array().min(1,"Pick at least 1 language").of(s.object().shape({label:s.string().required(),value:s.string().required()})).required("This field is required.")},"courseDescription",s));t.courseCreateSchema=d;var m=s.object().shape({title:s.string().required("A course title is required").min(10,i).max(100,u),courseDescription:s.string().min(100,l).max(350,c).required("A course description is required")});t.courseSchema=m},"38+B":function(e,t,a){"use strict";var r=a("jxvI");Object.defineProperty(t,"__esModule",{value:!0}),t.vocabularySchema=void 0;var n=r(a("vrZp")),o=n.object().shape({level:n.number().typeError("You must pick a level or create one.").moreThan(0,"Levels need to be more than 0").required("A level is required."),word:n.string().typeError("Words must be letters.").max(100,"Words are limited to 100 characters.").required(),translation:n.string().typeError("Translations must be letters.").max(100,"Translations are limited to 100 characters.").required()});t.vocabularySchema=o},"4pgM":function(e,t){function a(e,t){var a=e.length,r=new Array(a),n={},o=a,s=function(e){for(var t=new Map,a=0,r=e.length;a<r;a++){var n=e[a];t.has(n[0])||t.set(n[0],new Set),t.has(n[1])||t.set(n[1],new Set),t.get(n[0]).add(n[1])}return t}(t),i=function(e){for(var t=new Map,a=0,r=e.length;a<r;a++)t.set(e[a],a);return t}(e);for(t.forEach(function(e){if(!i.has(e[0])||!i.has(e[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});o--;)n[o]||l(e[o],o,new Set);return r;function l(e,t,o){if(o.has(e)){var c;try{c=", node was:"+JSON.stringify(e)}catch(e){c=""}throw new Error("Cyclic dependency"+c)}if(!i.has(e))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(e));if(!n[t]){n[t]=!0;var u=s.get(e)||new Set;if(t=(u=Array.from(u)).length){o.add(e);do{var d=u[--t];l(d,i.get(d),o)}while(t);o.delete(e)}r[--a]=e}}}e.exports=function(e){return a(function(e){for(var t=new Set,a=0,r=e.length;a<r;a++){var n=e[a];t.add(n[0]),t.add(n[1])}return Array.from(t)}(e),e)},e.exports.array=a},"5Hmi":function(e,t,a){"use strict";a.r(t),function(e){var r,n=a("r0ML"),o=a.n(n),s=a("h815"),i=a("9tfQ"),l=a("dYXW"),c=a("20mP"),u=a.n(c),d=a("MDtM"),m=a.n(d),p=a("eb1K"),g=a.n(p),f=a("7xQW"),h=a("Q33P"),w=a.n(h),b=a("Pc05"),v=a.n(b),y=a("D1hW"),_=a.n(y),E=a("18K1"),H=a("ktN7"),L=a.n(H),x=a("3aTW"),k=a("e+cM"),G=a("iZLL");(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule)&&r(e),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule;t&&t(e)}();const D=L.a`
  query getCourse($_id: String!) {
    getCourse(_id: $_id) {
      _id
      title
      courseDescription
    }
  }
`,C=L.a`
  mutation subscribe($courseId: String!) {
    subscribe(courseId: $courseId) {
      _id
      title
    }
  }
`,z=L.a`
  mutation unsubscribe($courseId: String!) {
    unsubscribe(courseId: $courseId)
  }
`,j=L.a`
  mutation courseUpdate($_id: ID, $title: String, $courseDescription: String) {
    courseUpdate(
      input: {_id: $_id, title: $title, courseDescription: $courseDescription}
    ) {
      courseDescription
      courseImage
      courseMode
      title
      _id
      levels {
        _id
        level
      }
      owner {
        _id
        username
      }
      resource
      subscribers
      teachingLang
      usingLang
    }
  }
`,S=e=>{const{user:t,course:a}=E.session,{classes:r,client:c}=e,[d,p]=Object(n.useState)({formErrors:{errors:[]},courseId:a._id,courseDescription:a.courseDescription,name:"",email:"",loading:!1,subscribed:!1,submittedName:"",submittedEmail:"",title:a.title});Object(n.useEffect)(()=>{E.session.user&&E.session.user.subscriptions.find(e=>e._id===E.session.course._id)&&p({...d,subscribed:!0})},[d]);const f=()=>{const{course:e,user:t}=E.session,a=t;a.subscriptions.push({_id:e._id,title:e.title}),E.session.user=a},h=async t=>{t.preventDefault();const a=await i.courseSchema.validate(d).catch(e=>{if(e)return console.log("err: ",e),p({...d,formErrors:{errors:e}}),console.log("state: ",d),e});if(w()(a.errors)){p({...d,loading:!0});const t=await e.client.mutate({mutation:j,variables:{_id:d.courseId,title:d.title,courseDescription:d.courseDescription}});t&&(console.log("updated: ",t),E.session.course=t.data.courseUpdate,l.toast.success("Your changes were saved.",{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0})),p({...d,formErrors:{errors:["hi"]},loading:!1})}},b=v()({errorClass:"courseDescription"===d.formErrors.path&&!w()(d.formErrors.errors)}),y=v()({errorClass:"title"===d.formErrors.path&&!w()(d.formErrors.errors)});return o.a.createElement(x.c,{query:D,variables:{_id:a._id}},({loading:e,error:n})=>e?o.a.createElement(m.a,{container:!0,alignContent:"center",justify:"center",style:{height:"300px"}},o.a.createElement(u.a,{style:{color:"grey"}})):n?(console.log("err: ",n),o.a.createElement(m.a,null,o.a.createElement("p",null,n.graphQLErrors.map(({message:e},t)=>o.a.createElement("p",{style:{fontSize:"1.3em",color:"red",margin:"30px",padding:"30px",textAlign:"center"},key:t},e))))):o.a.createElement("form",{onSubmit:h},o.a.createElement(s.a,null,o.a.createElement("meta",{charset:"utf-8"}),o.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),o.a.createElement("meta",{name:"description",content:"Affordable language learning"}),o.a.createElement("meta",{name:"author",content:"Isaac Pak"}),o.a.createElement("title",null,"Utterzone | Course Introduction"),o.a.createElement("link",{rel:"canonical",href:"https://utter.zone/course/course-introduction"})),o.a.createElement("div",{className:r.heroUnit},o.a.createElement("div",{className:r.heroContent},o.a.createElement(m.a,{container:!0,justify:"center",direction:"column"},o.a.createElement(g.a,{variant:"h4",align:"center",gutterBottom:!0}," ","Introduction"," ")))),o.a.createElement("main",{className:r.content},o.a.createElement(m.a,{container:!0,spacing:24},o.a.createElement(m.a,{item:!0,xs:12,style:{display:"flex",flexDirection:"column",alignItems:"center"}},o.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},o.a.createElement(k.l,{margin:"40px",src:a.courseImage}))),o.a.createElement(m.a,{item:!0,xs:12,align:"center"},o.a.createElement(x.b,{mutation:C,onCompleted:f},(e,{loading:t})=>o.a.createElement(k.r,{loading:t,disabled:t,color:!0===d.subscribed?"secondary":"primary",variant:"contained",onClick:()=>{d.subscribed&&(c.mutate({mutation:z,variables:{courseId:a._id}}),p({...d,subscribed:!1}),(()=>{const{user:e}=E.session,t=e.subscriptions.filter(e=>e._id!==E.session.course._id);e.subscriptions=t,E.session.user=e})()),d.subscribed||(e({variables:{courseId:a._id}}),p({...d,subscribed:!0}))},size:"large"},o.a.createElement(g.a,null,d.subscribed?"unsubscribe":"subscribe")))),o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement(g.a,{variant:"h6",align:"left",gutterBottom:!0},"General Information"),o.a.createElement(_.a,{className:`${r[y]} ${r.inputHeader}`,fullWidth:!0,disabled:d.loading,label:"Course Title",margin:"normal",name:"title",onChange:e=>p({...d,title:e.target.value}),placeholder:"And it's title here.",type:"text",variant:"outlined",value:d.title}),"title"===d.formErrors.path&&o.a.createElement("div",{style:{color:"#f44336"}},d.formErrors.errors[0]),o.a.createElement(_.a,{className:`${r[b]} ${r.inputHeader}`,disabled:d.loading,fullWidth:!0,name:"courseDescription",label:"Course Description",type:"text",onChange:e=>p({...d,courseDescription:e.target.value}),margin:"normal",multiline:!0,variant:"outlined",rowsMax:"12",value:d.courseDescription}),"courseDescription"===d.formErrors.path&&o.a.createElement("div",{style:{color:"#f44336"}},d.formErrors.errors[0])),o.a.createElement(m.a,{item:!0,xs:12},o.a.createElement(g.a,{variant:"h6",align:"left",gutterBottom:!0},"Course Details"),o.a.createElement(g.a,{variant:"body1",align:"left",gutterBottom:!0},"Course Author:"," ",o.a.createElement("span",{style:{fontWeight:900}},a.owner.username)),o.a.createElement(g.a,{variant:"body1",align:"left",gutterBottom:!0},"Resource:"," ",o.a.createElement("span",{style:{fontWeight:900}},a.resource||"none")),o.a.createElement(g.a,{variant:"body1",align:"left",gutterBottom:!0},"Using Language:"," ",o.a.createElement("span",{style:{fontWeight:900}},a.usingLang)),o.a.createElement(g.a,{variant:"body1",align:"left",gutterBottom:!0},"Teaching Language:"," ",o.a.createElement("span",{style:{fontWeight:900}},a.teachingLang))),o.a.createElement(m.a,{container:!0,style:{margin:"50px auto"}},o.a.createElement(k.c,{roles:t.roles,perform:"course:update-introduction",id:t.username,matchingID:a.owner.username,yes:()=>o.a.createElement(m.a,{item:!0,xs:12,align:"center"},o.a.createElement(k.r,{variant:"contained",loading:d.loading,disabled:d.loading,type:"submit",color:"secondary"},"Save Changes")),no:()=>null}))))))},M=Object(x.d)(x.f,Object(f.withStyles)(G.a))(S),N=M;var O,q;t.default=N,(O=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default)&&(O.register(D,"GET_COURSE","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),O.register(C,"SUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),O.register(z,"UNSUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),O.register(j,"COURSE_UPDATE","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),O.register(S,"CourseIntroduction","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),O.register(M,"default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js")),(q=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule)&&q(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default;e&&(e.register(D,"GET_COURSE","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(C,"SUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(z,"UNSUBSCRIBE_MUTATION","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(j,"COURSE_UPDATE","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(S,"CourseIntroduction","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(M,"_default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"),e.register(N,"default","/var/www/html/utter/packages/client/src/layouts/courses/containers/course-introduction.js"))}(),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule;t&&t(e)}()}.call(this,a("Ua1F")(e))},"6csj":function(e,t,a){"use strict";(function(e){var r;(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule)&&r(e),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule;t&&t(e)}();const n=[{value:"Brain Storm",label:"Brain Storm",className:"appHeader",disabled:!1},{value:"Chat",label:"General Chat",className:"appHeader",disabled:!1}],o=n;var s,i;t.a=o,(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default)&&s.register(n,"default","/var/www/html/utter/packages/client/src/data/appData.js"),(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule)&&i(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default;e&&(e.register(n,"_default","/var/www/html/utter/packages/client/src/data/appData.js"),e.register(o,"default","/var/www/html/utter/packages/client/src/data/appData.js"))}(),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule;t&&t(e)}()}).call(this,a("Ua1F")(e))},"7YX4":function(e,t,a){"use strict";(function(e){var r;a.d(t,"a",function(){return n}),(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule)&&r(e),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule;t&&t(e)}();const n=e=>({actions:{display:"flex",justifyContent:"flex-end"},appBar:{zIndex:e.zIndex.drawer+1},card2:{height:"370px",maxWidth:"300px",display:"flex",flexDirection:"column"},card:{backgroundColor:"red",minHeight:"240px",maxHeight:"240px",display:"flex",flexDirection:"column"},cardDescription:{height:"70px",lineHeight:"1em",overflow:"auto",wordBreak:"break-all"},cardGrid:{padding:`${8*e.spacing.unit}px 0`},cardMedia:{paddingTop:"56.25%","&:hover":{cursor:"pointer"}},cardContent:{flexGrow:1},cardTitle:{height:"54px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},cardTitle2:{height:"52px",lineHeight:"1.2em",overflow:"hidden",wordBreak:"break-word"},cardUsername:{whiteSpace:"nowrap",width:"200px",overflow:"hidden",textOverflow:"ellipsis"},content:{flexGrow:1,padding:3*e.spacing.unit},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},formControl:{margin:e.spacing.unit,minWidth:120},heading:{color:"white"},heroUnit:{backgroundColor:e.palette.background.paper},heroUnitZoneCreate:{backgroundColor:"#502bae"},heroContentZoneCreate:{maxWidth:960,margin:"0 auto",padding:`${8*e.spacing.unit}px ${6*e.spacing.unit}px ${6*e.spacing.unit}px`},heroContent:{margin:"0 auto",padding:`${8*e.spacing.unit}px 0 ${6*e.spacing.unit}px`},heroButtons:{marginTop:4*e.spacing.unit},layout:{width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit,[e.breakpoints.up(1240+3*e.spacing.unit*2)]:{width:1240,marginLeft:"auto",marginRight:"auto"}},root:{display:"flex",flexGrow:1,width:"100%"},rootZoneCreate:{maxWidth:960,margin:"0 auto"},saveButton:{margin:"50px"},select:{width:"80% !important",margin:"10px auto !important"},selectEmpty:{marginTop:2*e.spacing.unit},searchField:{marginTop:"7px"},showMore:{position:"absolute",bottom:-50,left:"50%",webkitTransform:"translateX(-50%)",transform:"translateX(-50%)",whiteSpace:"nowrap"},subHeading:{color:"black",marginTop:"40px",position:"relative"}});var o,s;(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default)&&(o.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/zones/styles.js"),o.register(n,"styles","/var/www/html/utter/packages/client/src/layouts/zones/styles.js")),(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule)&&s(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default;e&&(e.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/zones/styles.js"),e.register(n,"styles","/var/www/html/utter/packages/client/src/layouts/zones/styles.js"))}(),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule;t&&t(e)}()}).call(this,a("Ua1F")(e))},"9tfQ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Yrs3");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var n=a("+EG4");Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var o=a("+LZS");Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var s=a("uRA1");Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return s[e]}})});var i=a("38+B");Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})});var l=a("SA3D");Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})})},SA3D:function(e,t,a){"use strict";var r=a("jxvI");Object.defineProperty(t,"__esModule",{value:!0}),t.zoneCreateSchema=void 0;var n=r(a("vrZp")),o=n.object().shape({app:n.string().required("An app is required"),course:n.string().required("A course you subscribe to is required"),courseLevel:n.string().required("A course level is required"),ageGroup:n.string().required("Age restrictions are required"),zoneName:n.string().min(3,"Zone names must be at least 6 characters").max(40,"Zone names cannot exceed 20 characters").required("A zone name is required"),zoneDescription:n.string().min(30,"Zone descriptions must be at least 30 characters").max(110,"Zone descriptions cannot exceed 110 characters").required("A zone description is required")});t.zoneCreateSchema=o},TuDy:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"default",function(){return ZoneCtrl});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("r0ML"),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_zones_create_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("Yg3t"),enterModule,reactHotLoader,leaveModule;enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule,enterModule&&enterModule(module),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).enterModule;e&&e(module)}();class ZoneCtrl extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent{render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_zones_create_js__WEBPACK_IMPORTED_MODULE_1__.a,null)}__reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default,reactHotLoader&&reactHotLoader.register(ZoneCtrl,"ZoneCtrl","/var/www/html/utter/packages/client/src/layouts/zones/containers/zone-controller.js"),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule,leaveModule&&leaveModule(module),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).default;e&&e.register(ZoneCtrl,"ZoneCtrl","/var/www/html/utter/packages/client/src/layouts/zones/containers/zone-controller.js")}(),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("DQwH")).leaveModule;e&&e(module)}()}.call(this,__webpack_require__("Ua1F")(module))},Yg3t:function(e,t,a){"use strict";(function(e){var r,n=a("8VmE"),o=a.n(n),s=a("r0ML"),i=a.n(s),l=a("h815"),c=a("FbNb"),u=a("MDtM"),d=a.n(u),m=a("eb1K"),p=a.n(m),g=a("7xQW"),f=a("3aTW"),h=a("dYXW"),w=a("hycj"),b=a("xPkE"),v=a("9tfQ"),y=a("6csj"),_=a("e+cM"),E=a("rf6I"),H=a("18K1"),L=a("7YX4");(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule)&&r(e),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule;t&&t(e)}();const x=b.b.div`
  font-size: 0.8rem;
  position: absolute;
  right: 2%;
  top: 6px;

  @media (min-width: 330px) {
    right: 10%;
  }

  @media (min-width: 640px) {
    right: 2%;
  }

  @media (min-width: 740px) {
    right: 10%;
  }
`,k=Object(b.b)(_.v)`
  display: none;
  font-size: 0.6rem;
  padding: 0 0 0 10px;

  @media (min-width: 640px) {
    display: ${e=>e.display640};
  }
`,G=e=>{const t=H.session.user&&H.session.user.subscriptions?H.session.user.subscriptions.map(e=>({value:e._id,label:e.title})):[{}],{classes:a,handleSubmit:r,isSubmitting:n}=e,{zoneName:s,zoneDescription:c}=e.values;return i.a.createElement(i.a.Fragment,null,i.a.createElement("form",{className:a.rootZoneCreate,onSubmit:r},i.a.createElement(l.a,null,i.a.createElement("meta",{charset:"utf-8"}),i.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),i.a.createElement("meta",{name:"description",content:"Create a zone and practice speaking a new language!"}),i.a.createElement("meta",{name:"author",content:"Isaac Pak"}),i.a.createElement("title",null,"Utterzone | Create a Zone"),i.a.createElement("link",{rel:"canonical",href:"https://utterzone.com/zone/create"})),i.a.createElement("div",{className:a.heroUnitZoneCreate},i.a.createElement("div",{className:a.heroContentZoneCreate},i.a.createElement(d.a,{container:!0,justify:"center",direction:"column"},i.a.createElement(p.a,{align:"center",variant:"h4",className:a.heading,gutterBottom:!0},"Host a Zone"),i.a.createElement(p.a,{align:"center",variant:"h6",className:a.heading,gutterBottom:!0},"Create a zone where you and others can practice speaking on focused subjects that will help build your level of fluency in speaking your new language.")))),i.a.createElement("main",{className:a.content},i.a.createElement(d.a,{container:!0,spacing:24},i.a.createElement(d.a,{item:!0,xs:12},i.a.createElement(p.a,{align:"left",variant:"h6",className:a.subHeading,gutterBottom:!0},"Zone Name",i.a.createElement(k,{display640:"inline-block"},"(3-40 chars.)"),i.a.createElement(x,null,s.length)),i.a.createElement(w.a,{fullWidth:!0,id:"outlined-search",name:"zoneName",label:"Zone Name",type:"text",className:a.searchField,component:_.f,margin:"normal",variant:"outlined"}),i.a.createElement(p.a,{align:"left",variant:"h6",className:a.subHeading,gutterBottom:!0},"Zone Description",i.a.createElement(k,{display640:"inline-block"}," ","(30-110 chars.)"),i.a.createElement(x,null,c.length)),i.a.createElement(w.a,{fullWidth:!0,id:"outlined-search",name:"zoneDescription",label:"Zone Description",type:"text",className:a.searchField,component:_.h,margin:"normal",variant:"outlined"})),i.a.createElement(d.a,{item:!0,xs:12},i.a.createElement(p.a,{align:"left",variant:"h6",className:a.subHeading,gutterBottom:!0},"Apps"),i.a.createElement(w.a,o()({name:"app",type:"text",options:y.a,component:_.g},e))),i.a.createElement(d.a,{item:!0,xs:12},i.a.createElement(p.a,{align:"left",variant:"h6",className:a.subHeading,gutterBottom:!0},"Subscribed Courses"),i.a.createElement(w.a,o()({name:"course",type:"text",component:_.g},e,{options:t})),i.a.createElement(p.a,{align:"left",variant:"h6",className:a.subHeading,gutterBottom:!0},"Set Level"),i.a.createElement("p",{style:{padding:"10px"}},"Apps will use the course information from this level."),i.a.createElement(w.a,{name:"courseLevel",type:"text",component:_.f,style:{width:"80px"}})),i.a.createElement(d.a,{item:!0,xs:12},i.a.createElement(p.a,{align:"left",variant:"h6",className:a.subHeading,gutterBottom:!0},"Age Restrictions"),i.a.createElement("p",{style:{padding:"10px"}},"Pick an appropriate age setting or a specific age demographic. Conversations are still not to involve any sexual misconduct or vulgar behaviour. Account bans/suspensions are duly enforced."),i.a.createElement(w.a,o()({name:"ageGroup",type:"text",component:_.g},e,{options:[{value:"any age",label:"any age",className:"ageHeader",disabled:!1},{value:"ages 0-2",label:"ages 0-2",className:"ageHeader",disabled:!1},{value:"ages 3+",label:"ages 3+",className:"ageHeader",disabled:!1},{value:"ages 7+",label:"ages 7+",className:"ageHeader",disabled:!1},{value:"ages 12+",label:"ages 12+",className:"ageHeader",disabled:!1},{value:"ages 16+",label:"ages 16+",className:"ageHeader",disabled:!1},{value:"ages 18+",label:"ages 18+",className:"ageHeader",disabled:!1},{value:"ages 18+",label:"ages 18+",className:"ageHeader",disabled:!1},{value:"ages 30+",label:"ages 30+",className:"ageHeader",disabled:!1},{value:"ages 40+",label:"ages 40+",className:"ageHeader",disabled:!1},{value:"ages 50+",label:"ages 50+",className:"ageHeader",disabled:!1},{value:"ages 60+",label:"ages 60+",className:"ageHeader",disabled:!1}]}))),i.a.createElement(d.a,{item:!0,xs:12,align:"center"},i.a.createElement(_.r,{variant:"contained",color:"secondary",type:"submit",size:"large",loading:n,disabled:n},"Create Zone"))))))},D=Object(f.d)(Object(f.e)(E.b,{name:"zoneCreate"}),c.a,Object(w.b)({validationSchema:v.zoneCreateSchema,validateOnChange:!1,validateOnBlur:!1,mapPropsToValues:()=>({ageGroup:"",app:"",appLevel:1,course:"",courseLevel:"",owner:H.session.user._id,zoneName:"",zoneDescription:""}),handleSubmit:async(e,{props:t,setErrors:a})=>{console.log("values: ",e);const r=await t.zoneCreate({variables:{ageGroup:e.ageGroup,app:e.app,appLevel:e.appLevel,course:e.course,courseLevel:e.courseLevel,owner:e.owner,zoneName:e.zoneName,zoneDescription:e.zoneDescription}});r?((e=>{H.session.zone=e.data.zoneCreate,t.history.push({pathname:`/zone/${e.data.zoneCreate._id}`,state:{zoneId:e.data.zoneCreate._id}})})(r),h.toast.success("You have successfully created a zone.",{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0})):(a(r.ZONE_CREATE_MUTATION.errors),h.toast.success("Something went wrong. Could not create a zone.",{className:"toasty",bodyClassName:"toasty-body",hideProgressBar:!0}))}}),Object(g.withStyles)(L.a))(G),C=D;var z,j;t.a=C,(z=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default)&&(z.register(x,"DisplayCount","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),z.register(k,"StyledSpan","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),z.register(G,"ZoneCreate","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),z.register(D,"default","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js")),(j=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule)&&j(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default;e&&(e.register(x,"DisplayCount","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),e.register(k,"StyledSpan","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),e.register(G,"ZoneCreate","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),e.register(D,"_default","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"),e.register(C,"default","/var/www/html/utter/packages/client/src/layouts/zones/containers/zones-create.js"))}(),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule;t&&t(e)}()}).call(this,a("Ua1F")(e))},Yrs3:function(e,t,a){"use strict";var r=a("jxvI");Object.defineProperty(t,"__esModule",{value:!0}),t.signupSchema=t.loginSchema=t.changePasswordSchema=t.PasswordValidation=t.passwordNotLongEnough=t.emailNotLongEnough=t.invalidEmail=void 0;var n=r(a("vrZp"));t.invalidEmail="email must be a valid email";t.emailNotLongEnough="email must be at least 3 characters";t.passwordNotLongEnough="password must be at least 8 characters";var o=n.string().min(8,"password must be at least 8 characters").max(255).matches(/[a-z]/,"One lowercase character is required.").matches(/[A-Z]/,"One uppercase character is required.").matches(/[a-zA-Z]+[^a-zA-Z\s]+/,"A number or special char (@,!,#, etc) is required.").required("Password is required");t.PasswordValidation=o;var s=n.object().shape({password:o,"password confirmation":n.string().oneOf([n.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});t.changePasswordSchema=s;var i=n.object().shape({"username or email":n.string().min(3,"invalid login").max(255,"invalid login").required("Username or Email is required"),password:o});t.loginSchema=i;var l=n.object().shape({username:n.string().min(3).max(255).required("Username is required"),email:n.string().min(3,"email must be at least 3 characters").max(255).email("email must be a valid email").required("Email is required"),password:o,"password confirmation":n.string().oneOf([n.ref("password"),null],"Passwords do not match").required("Password confirmation is required")});t.signupSchema=l},iZLL:function(e,t,a){"use strict";(function(e){var r;a.d(t,"a",function(){return n}),(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule)&&r(e),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule;t&&t(e)}();const n=e=>({actions:{display:"flex",justifyContent:"flex-end"},appBar:{zIndex:e.zIndex.drawer+1},card:{minHeight:"240px",display:"flex",flexDirection:"column"},cardGrid:{padding:`${8*e.spacing.unit}px 0`},cardMedia:{paddingTop:"56.25%","&:hover":{cursor:"pointer"}},cardContent:{flexGrow:1},cardTitle:{height:"54px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},cardUsername:{whiteSpace:"nowrap",width:"200px",overflow:"hidden",textOverflow:"ellipsis"},content:{flexGrow:1,padding:3*e.spacing.unit,width:"100%"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},errorClass:{boxShadow:`0px 0px 2px 1px ${e.palette.error.main}`,backgroundColor:"white"},errors:{color:e.palette.error.main},formControl:{margin:e.spacing.unit,minWidth:120},gridActions:{display:"flex",justifyContent:"space-between"},gridTitle:{height:"40px",lineHeight:"1em",overflow:"hidden",textOverflow:"ellipsis",wordBreak:"break-word"},heroUnit:{},heroContent:{margin:"0 auto",padding:`${16*e.spacing.unit}px 0 0 0`},heroButtons:{marginTop:4*e.spacing.unit},inputHeader:{background:"white",minHeight:"40px"},layout:{width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit,[e.breakpoints.up(1240+3*e.spacing.unit*2)]:{width:1240,marginLeft:"auto",marginRight:"auto"}},root:{display:"flex",flexGrow:1,width:"100%"},selectEmpty:{marginTop:2*e.spacing.unit},searchField:{marginTop:"7px"},showMore:{position:"absolute",bottom:-50,left:"50%",webkitTransform:"translateX(-50%)",transform:"translateX(-50%)"}});var o,s;(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default)&&(o.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/courses/styles.js"),o.register(n,"styles","/var/www/html/utter/packages/client/src/layouts/courses/styles.js")),(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule)&&s(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default;e&&(e.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/courses/styles.js"),e.register(n,"styles","/var/www/html/utter/packages/client/src/layouts/courses/styles.js"))}(),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule;t&&t(e)}()}).call(this,a("Ua1F")(e))},rf6I:function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return s}),a.d(t,"b",function(){return i});var r,n=a("ktN7"),o=a.n(n);(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule)&&r(e),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).enterModule;t&&t(e)}();const s=o.a`
  query getZones(
    $app: String
    $subscriptions: String
    $cursor: String
    $searchInput: String
    $selectionBox: String
    $teachingLang: String!
    $usingLang: String!
  ) {
    getZones(
      input: {
        app: $app
        subscriptions: $subscriptions
        cursor: $cursor
        searchInput: $searchInput
        selectionBox: $selectionBox
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      cursor
      more
      zones {
        ageGroup
        app
        zoneCourse {
          title
          usingLang
          teachingLang
        }
        course {
          _id
        }
        courseLevel
        _id
        owner {
          _id
        }
        ownerCourse {
          _id
          username
        }
        teachingLang
        usingLang
        zoneDescription
        zoneImage
        zoneName
      }
    }
  }
`,i=o.a`
  mutation zoneCreate(
    $ageGroup: String!
    $app: String
    $course: String
    $courseLevel: String
    $owner: String!
    $zoneName: String!
    $zoneDescription: String
    $teachingLang: String
    $usingLang: String
  ) {
    zoneCreate(
      input: {
        ageGroup: $ageGroup
        app: $app
        course: $course
        courseLevel: $courseLevel
        owner: $owner
        zoneName: $zoneName
        zoneDescription: $zoneDescription
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      _id
      app
      courseLevel
      ageGroup
      zoneName
      zoneDescription
      owner {
        username
      }
    }
  }
`;var l,c;(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default)&&(l.register(s,"GET_ZONES","/var/www/html/utter/packages/client/src/layouts/zones/zone-queries.js"),l.register(i,"ZONE_CREATE_MUTATION","/var/www/html/utter/packages/client/src/layouts/zones/zone-queries.js")),(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule)&&c(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).default;e&&(e.register(s,"GET_ZONES","/var/www/html/utter/packages/client/src/layouts/zones/zone-queries.js"),e.register(i,"ZONE_CREATE_MUTATION","/var/www/html/utter/packages/client/src/layouts/zones/zone-queries.js"))}(),function(){var t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:a("DQwH")).leaveModule;t&&t(e)}()}).call(this,a("Ua1F")(e))},uRA1:function(e,t,a){"use strict";var r=a("jxvI");Object.defineProperty(t,"__esModule",{value:!0}),t.levelSchema=void 0;var n=r(a("vrZp")),o=n.object().shape({level:n.number().typeError("Levels must be whole numbers.").max(1e3,"Courses are limited to 1000 levels.").moreThan(0,"Levels need to be more than 0").required("A level is required."),title:n.string().typeError("Titles must be letters.").max(100,"Titles are limited to 100 characters.").required()});t.levelSchema=o},ySrW:function(e,t,a){"use strict";function r(e){this._maxSize=e,this.clear()}r.prototype.clear=function(){this._size=0,this._values={}},r.prototype.get=function(e){return this._values[e]},r.prototype.set=function(e,t){return this._size>=this._maxSize&&this.clear(),this._values.hasOwnProperty(e)||this._size++,this._values[e]=t};var n=/[^.^\]^[]+|(?=\[\]|\.\.)/g,o=/^\d+$/,s=/^\d/,i=/[~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/g,l=/^\s*(['"]?)(.*?)(\1)\s*$/,c=!1,u=new r(512),d=new r(512),m=new r(512);try{new Function("")}catch(e){c=!0}function p(e){return u.get(e)||u.set(e,g(e).map(function(e){return e.replace(l,"$2")}))}function g(e){return e.match(n)}function f(e,t,a){return"string"==typeof t&&(a=t,t=!1),a=a||"data",(e=e||"")&&"["!==e.charAt(0)&&(e="."+e),t?function(e,t){var a,r=t,n=g(e);return h(n,function(e,t,n,o,s){a=o===s.length-1,r+=(e=t||n?"["+e+"]":"."+e)+(a?")":" || {})")}),new Array(n.length+1).join("(")+r}(e,a):a+e}function h(e,t,a){var r,n,o,s,i=e.length;for(n=0;n<i;n++)(r=e[n])&&(b(r)&&(r='"'+r+'"'),o=!(s=w(r))&&/^\d+$/.test(r),t.call(a,r,s,o,n,e))}function w(e){return"string"==typeof e&&e&&-1!==["'",'"'].indexOf(e.charAt(0))}function b(e){return!w(e)&&(function(e){return e.match(s)&&!e.match(o)}(e)||function(e){return i.test(e)}(e))}e.exports={Cache:r,expr:f,split:g,normalizePath:p,setter:c?function(e){var t=p(e);return function(e,a){return function(e,t,a){var r=0,n=e.length;for(;r<n-1;)t=t[e[r++]];t[e[r]]=a}(t,e,a)}}:function(e){return d.get(e)||d.set(e,new Function("data, value",f(e,"data")+" = value"))},getter:c?function(e,t){var a=p(e);return function(e){return function(e,t,a){var r=0,n=e.length;for(;r<n;){if(null==a&&t)return;a=a[e[r++]]}return a}(a,t,e)}}:function(e,t){var a=e+"_"+t;return m.get(a)||m.set(a,new Function("data","return "+f(e,t,"data")))},join:function(e){return e.reduce(function(e,t){return e+(w(t)||o.test(t)?"["+t+"]":(e?".":"")+t)},"")},forEach:function(e,t,a){h(g(e),t,a)}}}}]);
//# sourceMappingURL=bundle.course-introduction.9edabeecf752ba0c53a1.js.map