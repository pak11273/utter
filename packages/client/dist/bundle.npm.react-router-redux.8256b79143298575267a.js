(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{RdU0:function(t,n,o){"use strict";var r=o("r0ML"),e=o.n(r),i=o("cNRa"),a=o.n(i),c=o("y2d2"),u=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},s="@@router/LOCATION_CHANGE",p={location:null};function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=n.type,r=n.payload;return o===s?u({},t,{location:r}):t}function f(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}var h=function(t){function n(){var o,r;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);for(var e=arguments.length,i=Array(e),a=0;a<e;a++)i[a]=arguments[a];return o=r=f(this,t.call.apply(t,[this].concat(i))),r.handleLocationChange=function(t){r.store.dispatch({type:s,payload:t})},f(r,o)}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):t.__proto__=n)}(n,t),n.prototype.componentWillMount=function(){var t=this.props,n=t.store,o=t.history,r=t.isSSR;this.store=n||this.context.store,this.handleLocationChange(o.location),r||(this.unsubscribeFromHistory=o.listen(this.handleLocationChange))},n.prototype.componentWillUnmount=function(){this.unsubscribeFromHistory&&this.unsubscribeFromHistory()},n.prototype.render=function(){return e.a.createElement(c.a,this.props)},n}(r.Component);h.propTypes={store:a.a.object,history:a.a.object.isRequired,children:a.a.node,isSSR:a.a.bool},h.contextTypes={store:a.a.object};var y=h,d=(o("GYPC"),"@@router/CALL_HISTORY_METHOD");function b(t){return function(){for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return{type:d,payload:{method:t,args:o}}}}var v=b("push");b("replace"),b("go"),b("goBack"),b("goForward");function g(t){return function(){return function(n){return function(o){if(o.type!==d)return n(o);var r=o.payload,e=r.method,i=r.args;t[e].apply(t,i)}}}}o.d(n,"a",function(){return y}),o.d(n,"d",function(){return l}),o.d(n,"b",function(){return v}),o.d(n,"c",function(){return g})}}]);
//# sourceMappingURL=bundle.npm.react-router-redux.8256b79143298575267a.js.map