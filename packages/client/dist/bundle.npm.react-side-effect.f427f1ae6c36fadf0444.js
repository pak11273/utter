(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{YpkM:function(t,e,n){"use strict";function o(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var r=n("r0ML"),i=o(r),p=o(n("C3ic")),c=o(n("CwCo"));t.exports=function(t,e,n){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(o){if("function"!=typeof o)throw new Error("Expected WrappedComponent to be a React component.");var u=[],f=void 0;function a(){f=t(u.map(function(t){return t.props})),s.canUseDOM?e(f):n&&(f=n(f))}var s=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.peek=function(){return f},e.rewind=function(){if(e.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=f;return f=void 0,u=[],t},e.prototype.shouldComponentUpdate=function(t){return!c(t,this.props)},e.prototype.componentWillMount=function(){u.push(this),a()},e.prototype.componentDidUpdate=function(){a()},e.prototype.componentWillUnmount=function(){var t=u.indexOf(this);u.splice(t,1),a()},e.prototype.render=function(){return i.createElement(o,this.props)},e}(r.Component);return s.displayName="SideEffect("+function(t){return t.displayName||t.name||"Component"}(o)+")",s.canUseDOM=p.canUseDOM,s}}}}]);
//# sourceMappingURL=bundle.npm.react-side-effect.f427f1ae6c36fadf0444.js.map