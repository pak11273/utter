(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"3skI":function(t,e,n){"use strict";e.__esModule=!0;var o=n("r0ML"),r=(u(o),u(n("cNRa"))),i=u(n("o4kt"));u(n("3s41"));function u(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var p=1073741823;e.default=function(t,e){var n,u,f="__create-react-context-"+(0,i.default)()+"__",l=function(t){function n(){var e,o,r,i;s(this,n);for(var u=arguments.length,a=Array(u),p=0;p<u;p++)a[p]=arguments[p];return e=o=c(this,t.call.apply(t,[this].concat(a))),o.emitter=(r=o.props.value,i=[],{on:function(t){i.push(t)},off:function(t){i=i.filter(function(e){return e!==t})},get:function(){return r},set:function(t,e){r=t,i.forEach(function(t){return t(r,e)})}}),c(o,e)}return a(n,t),n.prototype.getChildContext=function(){var t;return(t={})[f]=this.emitter,t},n.prototype.componentWillReceiveProps=function(t){if(this.props.value!==t.value){var n=this.props.value,o=t.value,r=void 0;((i=n)===(u=o)?0!==i||1/i==1/u:i!=i&&u!=u)?r=0:(r="function"==typeof e?e(n,o):p,0!=(r|=0)&&this.emitter.set(t.value,r))}var i,u},n.prototype.render=function(){return this.props.children},n}(o.Component);l.childContextTypes=((n={})[f]=r.default.object.isRequired,n);var h=function(e){function n(){var t,o;s(this,n);for(var r=arguments.length,i=Array(r),u=0;u<r;u++)i[u]=arguments[u];return t=o=c(this,e.call.apply(e,[this].concat(i))),o.state={value:o.getValue()},o.onUpdate=function(t,e){0!=((0|o.observedBits)&e)&&o.setState({value:o.getValue()})},c(o,t)}return a(n,e),n.prototype.componentWillReceiveProps=function(t){var e=t.observedBits;this.observedBits=null==e?p:e},n.prototype.componentDidMount=function(){this.context[f]&&this.context[f].on(this.onUpdate);var t=this.props.observedBits;this.observedBits=null==t?p:t},n.prototype.componentWillUnmount=function(){this.context[f]&&this.context[f].off(this.onUpdate)},n.prototype.getValue=function(){return this.context[f]?this.context[f].get():t},n.prototype.render=function(){return(t=this.props.children,Array.isArray(t)?t[0]:t)(this.state.value);var t},n}(o.Component);return h.contextTypes=((u={})[f]=r.default.object,u),{Provider:l,Consumer:h}},t.exports=e.default},PNOj:function(t,e,n){"use strict";e.__esModule=!0;var o=i(n("r0ML")),r=i(n("3skI"));function i(t){return t&&t.__esModule?t:{default:t}}e.default=o.default.createContext||r.default,t.exports=e.default}}]);
//# sourceMappingURL=bundle.npm.create-react-context.9da67d1726c564cd308a.js.map