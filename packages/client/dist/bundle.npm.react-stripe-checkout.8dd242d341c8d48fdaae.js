(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{SMAE:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},i=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),r=l(o("r0ML")),a=l(o("cNRa"));function l(e){return e&&e.__esModule?e:{default:e}}function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var d=!1,p=!1,u=!1,c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.onScriptLoaded=function(){t.stripeHandler||(t.stripeHandler=StripeCheckout.configure({key:o.props.stripeKey}),o.hasPendingClick&&o.showStripeDialog())},o.onScriptError=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];o.hideLoadingDialog(),o.props.onScriptError&&o.props.onScriptError.apply(o,t)},o.onClosed=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];o._isMounted&&o.setState({open:!1}),o.props.closed&&o.props.closed.apply(o,t)},o.onOpened=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];o.setState({open:!0}),o.props.opened&&o.props.opened.apply(o,t)},o.getConfig=function(){return["token","image","name","description","amount","locale","currency","panelLabel","zipCode","shippingAddress","billingAddress","email","allowRememberMe","bitcoin","alipay","alipayReusable"].reduce(function(e,t){return n({},e,o.props.hasOwnProperty(t)&&s({},t,o.props[t]))},{opened:o.onOpened,closed:o.onClosed})},o.onClick=function(){if(!o.props.disabled)if(u)try{throw new Error("Tried to call onClick, but StripeCheckout failed to load")}catch(e){}else t.stripeHandler?o.showStripeDialog():(o.showLoadingDialog(),o.hasPendingClick=!0)},o.handleOnMouseDown=function(){o.setState({buttonActive:!0})},o.handleOnMouseUp=function(){o.setState({buttonActive:!1})},o.state={open:!1,buttonActive:!1},o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),i(t,[{key:"componentDidMount",value:function(){var e=this;if(this._isMounted=!0,!p&&!d){d=!0;var t,o,n=document.createElement("script");"function"==typeof this.props.onScriptTagCreated&&this.props.onScriptTagCreated(n),n.src="https://checkout.stripe.com/checkout.js",n.async=1,this.loadPromise=(t=!1,o=new Promise(function(t,o){n.onload=function(){p=!0,d=!1,t(),e.onScriptLoaded()},n.onerror=function(t){u=!0,d=!1,o(t),e.onScriptError(t)}}),{promise:new Promise(function(e,n){o.then(function(){return t?n({isCanceled:!0}):e()}),o.catch(function(e){return n(t?{isCanceled:!0}:e)})}),cancel:function(){t=!0}}),this.loadPromise.promise.then(this.onScriptLoaded).catch(this.onScriptError),document.body.appendChild(n)}}},{key:"componentDidUpdate",value:function(){d||this.updateStripeHandler()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.loadPromise&&this.loadPromise.cancel(),t.stripeHandler&&this.state.open&&t.stripeHandler.close()}},{key:"updateStripeHandler",value:function(){t.stripeHandler&&!this.props.reconfigureOnUpdate||(t.stripeHandler=StripeCheckout.configure({key:this.props.stripeKey}))}},{key:"showLoadingDialog",value:function(){if(this.props.showLoadingDialog){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];this.props.showLoadingDialog.apply(this,t)}}},{key:"hideLoadingDialog",value:function(){if(this.props.hideLoadingDialog){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];this.props.hideLoadingDialog.apply(this,t)}}},{key:"showStripeDialog",value:function(){this.hideLoadingDialog(),t.stripeHandler.open(this.getConfig())}},{key:"renderDefaultStripeButton",value:function(){return r.default.createElement("button",n({},s({},this.props.triggerEvent,this.onClick),{className:this.props.className,onMouseDown:this.handleOnMouseDown,onFocus:this.handleOnMouseDown,onMouseUp:this.handleOnMouseUp,onMouseOut:this.handleOnMouseUp,onBlur:this.handleOnMouseUp,style:n({},{overflow:"hidden",display:"inline-block",background:"linear-gradient(#28a0e5,#015e94)",border:0,padding:1,textDecoration:"none",borderRadius:5,boxShadow:"0 1px 0 rgba(0,0,0,0.2)",cursor:"pointer",visibility:"visible",userSelect:"none"},this.state.buttonActive&&{background:"#005d93"},this.props.style)}),r.default.createElement("span",{style:n({},{backgroundImage:"linear-gradient(#7dc5ee,#008cdd 85%,#30a2e4)",fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif',fontSize:14,position:"relative",padding:"0 12px",display:"block",height:30,lineHeight:"30px",color:"#fff",fontWeight:"bold",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25)",textShadow:"0 -1px 0 rgba(0,0,0,0.25)",borderRadius:4},this.state.buttonActive&&{color:"#eee",boxShadow:"inset 0 1px 0 rgba(0,0,0,0.1)",backgroundImage:"linear-gradient(#008cdd,#008cdd 85%,#239adf)"},this.props.textStyle)},this.props.label))}},{key:"renderDisabledButton",value:function(){return r.default.createElement("button",{disabled:!0,style:{background:"rgba(0,0,0,0.2)",overflow:"hidden",display:"inline-block",border:0,padding:1,textDecoration:"none",borderRadius:5,userSelect:"none"}},r.default.createElement("span",{style:{boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25)",fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif',fontSize:14,position:"relative",padding:"0 12px",display:"block",height:30,lineHeight:"30px",borderRadius:4,color:"#999",background:"#f8f9fa",textShadow:"0 1px 0 rgba(255,255,255,0.5)"}},this.props.label))}},{key:"render",value:function(){!0!==this.props.desktopShowModal||this.state.open?!1===this.props.desktopShowModal&&this.state.open&&t.stripeHandler.close():this.onClick();var e=this.props.ComponentClass;return this.props.children?r.default.createElement(e,n({},s({},this.props.triggerEvent,this.onClick),{children:this.props.children})):this.props.disabled?this.renderDisabledButton():this.renderDefaultStripeButton()}}]),t}();c.defaultProps={className:"StripeCheckout",label:"Pay With Card",locale:"auto",ComponentClass:"span",reconfigureOnUpdate:!1,triggerEvent:"onClick"},c.propTypes={desktopShowModal:a.default.bool,triggerEvent:a.default.oneOf(["onClick","onTouchTap","onTouchStart"]),label:a.default.string,style:a.default.object,textStyle:a.default.object,disabled:a.default.bool,ComponentClass:a.default.string,showLoadingDialog:a.default.func,hideLoadingDialog:a.default.func,onScriptError:a.default.func,onScriptTagCreated:a.default.func,reconfigureOnUpdate:a.default.bool,stripeKey:a.default.string.isRequired,token:a.default.func.isRequired,name:a.default.string,description:a.default.string,image:a.default.string,amount:a.default.number,locale:a.default.oneOf(["auto","zh","da","nl","en","fr","de","it","ja","no","es","sv"]),currency:a.default.oneOf(["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BIF","BMD","BND","BOB","BRL","BSD","BWP","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CVE","CZK","DJF","DKK","DOP","DZD","EEK","EGP","ETB","EUR","FJD","FKP","GBP","GEL","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","ISK","JMD","JPY","KES","KGS","KHR","KMF","KRW","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","MAD","MDL","MGA","MKD","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SZL","THB","TJS","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VND","VUV","WST","XAF","XCD","XOF","XPF","YER","ZAR","ZMW"]),panelLabel:a.default.string,zipCode:a.default.bool,billingAddress:a.default.bool,shippingAddress:a.default.bool,email:a.default.string,allowRememberMe:a.default.bool,bitcoin:a.default.bool,alipay:a.default.oneOf(["auto",!0,!1]),alipayReusable:a.default.bool,opened:a.default.func,closed:a.default.func},c._isMounted=!1,t.default=c}}]);
//# sourceMappingURL=bundle.npm.react-stripe-checkout.8dd242d341c8d48fdaae.js.map