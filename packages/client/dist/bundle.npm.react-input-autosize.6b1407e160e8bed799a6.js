(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{krKo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=i("r0ML"),s=l(r),u=l(i("cNRa"));function l(t){return t&&t.__esModule?t:{default:t}}var a={position:"absolute",top:0,left:0,visibility:"hidden",height:0,overflow:"scroll",whiteSpace:"pre"},p=["extraWidth","injectStyles","inputClassName","inputRef","inputStyle","minWidth","onAutosize","placeholderIsMinWidth"],d=function(t,e){e.style.fontSize=t.fontSize,e.style.fontFamily=t.fontFamily,e.style.fontWeight=t.fontWeight,e.style.fontStyle=t.fontStyle,e.style.letterSpacing=t.letterSpacing,e.style.textTransform=t.textTransform},f=!("undefined"==typeof window||!window.navigator)&&/MSIE |Trident\/|Edge\//.test(window.navigator.userAgent),c=function(){return f?"_"+Math.random().toString(36).substr(2,12):void 0},h=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.inputRef=function(t){i.input=t,"function"==typeof i.props.inputRef&&i.props.inputRef(t)},i.placeHolderSizerRef=function(t){i.placeHolderSizer=t},i.sizerRef=function(t){i.sizer=t},i.state={inputWidth:t.minWidth,inputId:t.id||c()},i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r.Component),o(e,[{key:"componentDidMount",value:function(){this.mounted=!0,this.copyInputStyles(),this.updateInputWidth()}},{key:"componentWillReceiveProps",value:function(t){var e=t.id;e!==this.props.id&&this.setState({inputId:e||c()})}},{key:"componentDidUpdate",value:function(t,e){e.inputWidth!==this.state.inputWidth&&"function"==typeof this.props.onAutosize&&this.props.onAutosize(this.state.inputWidth),this.updateInputWidth()}},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"copyInputStyles",value:function(){if(this.mounted&&window.getComputedStyle){var t=this.input&&window.getComputedStyle(this.input);t&&(d(t,this.sizer),this.placeHolderSizer&&d(t,this.placeHolderSizer))}}},{key:"updateInputWidth",value:function(){if(this.mounted&&this.sizer&&void 0!==this.sizer.scrollWidth){var t=void 0;t=this.props.placeholder&&(!this.props.value||this.props.value&&this.props.placeholderIsMinWidth)?Math.max(this.sizer.scrollWidth,this.placeHolderSizer.scrollWidth)+2:this.sizer.scrollWidth+2,(t+="number"===this.props.type&&void 0===this.props.extraWidth?16:parseInt(this.props.extraWidth)||0)<this.props.minWidth&&(t=this.props.minWidth),t!==this.state.inputWidth&&this.setState({inputWidth:t})}}},{key:"getInput",value:function(){return this.input}},{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"select",value:function(){this.input.select()}},{key:"renderStyles",value:function(){var t=this.props.injectStyles;return f&&t?s.default.createElement("style",{dangerouslySetInnerHTML:{__html:"input#"+this.state.inputId+"::-ms-clear {display: none;}"}}):null}},{key:"render",value:function(){var t=[this.props.defaultValue,this.props.value,""].reduce(function(t,e){return null!=t?t:e}),e=n({},this.props.style);e.display||(e.display="inline-block");var i=n({boxSizing:"content-box",width:this.state.inputWidth+"px"},this.props.inputStyle),o=function(t,e){var i={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n]);return i}(this.props,[]);return function(t){p.forEach(function(e){return delete t[e]})}(o),o.className=this.props.inputClassName,o.id=this.state.inputId,o.style=i,s.default.createElement("div",{className:this.props.className,style:e},this.renderStyles(),s.default.createElement("input",n({},o,{ref:this.inputRef})),s.default.createElement("div",{ref:this.sizerRef,style:a},t),this.props.placeholder?s.default.createElement("div",{ref:this.placeHolderSizerRef,style:a},this.props.placeholder):null)}}]),e}();h.propTypes={className:u.default.string,defaultValue:u.default.any,extraWidth:u.default.oneOfType([u.default.number,u.default.string]),id:u.default.string,injectStyles:u.default.bool,inputClassName:u.default.string,inputRef:u.default.func,inputStyle:u.default.object,minWidth:u.default.oneOfType([u.default.number,u.default.string]),onAutosize:u.default.func,onChange:u.default.func,placeholder:u.default.string,placeholderIsMinWidth:u.default.bool,style:u.default.object,value:u.default.any},h.defaultProps={minWidth:1,injectStyles:!0},e.default=h}}]);
//# sourceMappingURL=bundle.npm.react-input-autosize.6b1407e160e8bed799a6.js.map