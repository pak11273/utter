(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{LYlz:function(e,a,t){"use strict";(function(e){t.d(a,"a",function(){return n}),t.d(a,"b",function(){return c}),t.d(a,"d",function(){return i}),t.d(a,"c",function(){return d});var l,r=t("ktN7"),o=t.n(r);(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule)&&l(e),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule;a&&a(e)}();const n=o.a`
  query getVocabularies($levelId: ID) {
    getVocabularies(levelId: $levelId) {
      vocabulary {
        _id
        audioUrl
        gender
        level
        translation
        word
      }
    }
  }
`,c=o.a`
  mutation vocabularyCreate(
    $audioUrl: String
    $gender: String
    $level: Int
    $levelId: ID
    $word: String
    $translation: String
  ) {
    vocabularyCreate(
      input: {
        audioUrl: $audioUrl
        gender: $gender
        level: $level
        levelId: $levelId
        word: $word
        translation: $translation
      }
    ) {
      vocabulary {
        levelId
        _id
        word
      }
      errors {
        message
      }
    }
  }
`,i=o.a`
  mutation vocabularyUpdate($_id: ID, $word: String) {
    vocabularyUpdate(input: {_id: $_id, word: $word}) {
      vocabulary {
        levelId
        _id
        word
      }
      errors {
        message
      }
    }
  }
`,d=o.a`
  mutation vocabularyDelete($_id: ID) {
    vocabularyDelete(_id: $_id) {
      vocabulary {
        _id
      }
      errors {
        path
        message
      }
    }
  }
`;var s,u;(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default)&&(s.register(n,"GET_VOCABULARIES","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"),s.register(c,"VOCABULARY_CREATE","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"),s.register(i,"VOCABULARY_UPDATE","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"),s.register(d,"VOCABULARY_DELETE","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js")),(u=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule)&&u(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default;e&&(e.register(n,"GET_VOCABULARIES","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"),e.register(c,"VOCABULARY_CREATE","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"),e.register(i,"VOCABULARY_UPDATE","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"),e.register(d,"VOCABULARY_DELETE","/var/www/html/utter/packages/client/src/layouts/vocabulary/xhr.js"))}(),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule;a&&a(e)}()}).call(this,t("Ua1F")(e))},PEVq:function(e,a,t){"use strict";t.r(a),function(e){var l,r=t("r0ML"),o=t.n(r),n=t("3aTW"),c=t("18K1"),i=t("sMZn"),d=t.n(i),s=t("l+3i"),u=t.n(s),v=t("yinr"),f=t.n(v),g=t("8VBE"),w=t.n(g),b=t("Nk2r"),p=t.n(b),y=t("FYi0"),m=t.n(y),h=t("N2Es"),H=t.n(h),L=t("eF0v"),G=t.n(L),E=t("yIe5"),x=t.n(E),D=t("ketZ"),j=t.n(D),k=t("Ugr7"),C=t.n(k),A=t("vxHz"),I=t.n(A),Q=t("QbUP"),U=t.n(Q),_=t("ctQ7"),M=t.n(_),$=t("qvsH"),S=t("Macc"),P=t.n(S),T=t("LYlz"),V=t("ftb+"),R=t("YAPa"),B=t("e+cM");(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule)&&l(e),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule;a&&a(e)}();const O=e=>{const[a,t]=Object(r.useState)({audioBlob:"",data:[],female:!1,formErrors:{errors:[]},gender:null,globalLevels:[],labelWidth:0,level:0,male:!1,modalGender:"",modalLevel:"",modalWord:"",modalTranslation:"",modalAudio:"",openAudioModal:!1,openDeleteModal:!1,secure_url:"",value:"level",word:"",translation:""}),{levels:l}=c.session,{classes:n}=e;return Object(r.useEffect)(()=>{0!==l.length&&e.client.query({query:T.a,variables:{levelId:l[0]._id}}).then(e=>{c.session.vocabularies=e.data.getVocabularies.vocabularies,t({...a,data:e.data.getVocabularies.vocabularies})}).catch(e=>console.log("err: ",e))},[]),o.a.createElement("form",{className:n.root,onSubmit:()=>{}},o.a.createElement(j.a,{className:n.hero,container:!0,justify:"center",direction:"column"},o.a.createElement(I.a,{className:n.header,elevation:1},o.a.createElement(M.a,{className:n.headerBody,variant:"h4",align:"center",gutterBottom:!0},"Course Vocabulary"))),o.a.createElement("main",{className:n.content},o.a.createElement(j.a,{container:!0,spacing:24},o.a.createElement(j.a,{item:!0,xs:12,style:{display:"flex",flexDirection:"column",alignItems:"center"}}),o.a.createElement(j.a,{item:!0,xs:12,align:"center"},o.a.createElement("div",{style:{maxWidth:"100%"}},o.a.createElement(P.a,{components:{Toolbar:e=>o.a.createElement(B.f,{flexdirection:"row",padding:"30px"},o.a.createElement(R.a,null),o.a.createElement(S.MTableToolbar,e))},icons:{Add:()=>o.a.createElement(d.a,null),Check:()=>o.a.createElement(u.a,null),Clear:()=>o.a.createElement(f.a,null),ResetSearch:()=>o.a.createElement(f.a,null),Delete:()=>o.a.createElement(m.a,null),Edit:()=>o.a.createElement(H.a,null),Filter:()=>o.a.createElement(G.a,null),FirstPage:()=>o.a.createElement(x.a,null),LastPage:()=>o.a.createElement(C.a,null),NextPage:()=>o.a.createElement(p.a,null),PreviousPage:()=>o.a.createElement(w.a,null),Search:()=>o.a.createElement(U.a,null)},columns:[{title:"level",field:"level",readonly:!0},{title:"word",field:"word"},{title:"translation",field:"translation"},{title:"audio",field:"audio"},{title:"gender",field:"gender"}],data:a.data,actions:[],options:{actionsColumnIndex:-1,filtering:!0,pageSize:10,showTitle:!1,sorting:!1,rowStyle:e=>{if(e.vocabulary%2)return{backgroundColor:"#f2f2f2"}}},editable:{onRowAdd:l=>new Promise((e,r)=>{setTimeout(()=>{console.log("resolve: ",e),console.log("reject: ",r);const{data:o}=a;o.push(l),t({...a,data:o}),e(l)},1e3)}).then(a=>{console.log("res: ",a),e.client.mutate({mutation:T.b,variables:{audioUrl:a.audio,gender:a.gender,levelId:a.levelId,word:a.word,translation:a.translation}})}).catch(e=>console.log("err: ",e)),onRowUpdate:l=>new Promise((e,r)=>{setTimeout(()=>{console.log("reject: ",r);var{data:o}=a;const n=o.findIndex(e=>e._id===l._id);o[n]=l,t({...a,data:o}),e(l)},1e3)}).then(a=>{console.log("res: ",a),e.client.mutate({mutation:T.d,variables:{_id:a._id,vocabulary:+a.vocabulary,title:a.title}})}).catch(e=>console.log("err: ",e)),onRowDelete:l=>new Promise((e,r)=>{setTimeout(()=>{console.log("reject: ",r);const{data:o}=a,n=o.indexOf(l);o.splice(n,1),t({...a,data:o}),e(l)},1e3)}).then(a=>{e.client.mutate({mutation:T.c,variables:{_id:a._id}})}).catch(e=>console.log("err: ",e))}}))))))},Y=Object(n.f)(Object($.withStyles)(V.a)(O)),N=Y;var z,F;a.default=N,(z=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default)&&(z.register(O,"VocabularysUpdate","/var/www/html/utter/packages/client/src/layouts/vocabulary/containers/vocabulary-update.js"),z.register(Y,"default","/var/www/html/utter/packages/client/src/layouts/vocabulary/containers/vocabulary-update.js")),(F=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule)&&F(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default;e&&(e.register(O,"VocabularysUpdate","/var/www/html/utter/packages/client/src/layouts/vocabulary/containers/vocabulary-update.js"),e.register(Y,"_default","/var/www/html/utter/packages/client/src/layouts/vocabulary/containers/vocabulary-update.js"),e.register(N,"default","/var/www/html/utter/packages/client/src/layouts/vocabulary/containers/vocabulary-update.js"))}(),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule;a&&a(e)}()}.call(this,t("Ua1F")(e))},YAPa:function(e,a,t){"use strict";(function(e){t.d(a,"a",function(){return g});var l,r=t("r0ML"),o=t.n(r),n=t("18K1"),c=t("e+cM"),i=t("yPKP"),d=t.n(i),s=t("h3zv"),u=t.n(s),v=t("ctQ7"),f=t.n(v);(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule)&&l(e),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule;a&&a(e)}();const g=()=>{const[e,a]=Object(r.useState)({level:""}),{levels:t}=n.session,l=t.map(e=>e.level);console.log("options: ",l);return o.a.createElement(c.f,{flexdirection:"row"},o.a.createElement(f.a,{style:{paddingRight:"10px"},variant:"h6",align:"center"},"Choose a Level:"),o.a.createElement(u.a,{value:e.level,onChange:t=>{a({...e,[t.target.name]:t.target.value}),n.session.level=+t.target.value,console.log("session: ",n.session.level)},inputProps:{id:"level",name:"level"}},l.map(e=>o.a.createElement(d.a,{key:e,value:e},e))))};var w,b;(w=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default)&&w.register(g,"LevelSelect","/var/www/html/utter/packages/client/src/layouts/vocabulary/components/level-select.js"),(b=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule)&&b(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default;e&&e.register(g,"LevelSelect","/var/www/html/utter/packages/client/src/layouts/vocabulary/components/level-select.js")}(),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule;a&&a(e)}()}).call(this,t("Ua1F")(e))},"ftb+":function(e,a,t){"use strict";(function(e){var l;t.d(a,"a",function(){return r}),(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule)&&l(e),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).enterModule;a&&a(e)}();const r=e=>({actions:{display:"flex",justifyContent:"center",height:"100%",width:"100%"},addButton:{alignItems:"center",display:"flex",height:"100%",justifyContent:"center"},content:{alignItems:"center",display:"flex",flexGrow:1,justifyContent:"center",padding:3*e.spacing.unit},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},editHeader:{alignItems:"center",display:"flex",fontSize:2*e.spacing.unit,fontWeight:400,height:"100%",justifyContent:"center",minHeight:"40px",width:"100%"},errorClass:{boxShadow:`0px 0px 2px 1px ${e.palette.error.main}`,backgroundColor:"white"},errors:{color:e.palette.error.main},formControl:{fontSize:"30px",textAlign:"center"},level:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},title:{alignItems:"center",display:"flex",height:"100%",paddingLeft:"10px",width:"100%"},header:{fontSize:3*e.spacing.unit,fontWeight:400,height:"100%",minHeight:"40px",width:"100%"},headerBody:{padding:"40px"},hero:{padding:" 0 24px "},heroUnit:{backgroundColor:e.palette.background.paper},heroContent:{margin:"0 auto",padding:`${8*e.spacing.unit}px 0 ${6*e.spacing.unit}px`},inputHeader:{background:"white",minHeight:"40px"},list:{margin:"0 auto"},root:{margin:"0 auto",width:"100%"},text:{color:"white"}});var o,n;(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default)&&(o.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/styles.js"),o.register(r,"styles","/var/www/html/utter/packages/client/src/layouts/styles.js")),(n=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule)&&n(e),function(){var e=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).default;e&&(e.register(240,"drawerWidth","/var/www/html/utter/packages/client/src/layouts/styles.js"),e.register(r,"styles","/var/www/html/utter/packages/client/src/layouts/styles.js"))}(),function(){var a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:t("DQwH")).leaveModule;a&&a(e)}()}).call(this,t("Ua1F")(e))}}]);
//# sourceMappingURL=bundle.vocabulary.27c626c2ad61f140e251.js.map