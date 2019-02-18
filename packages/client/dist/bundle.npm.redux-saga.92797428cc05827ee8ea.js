(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{DE1q:function(n,t,e){"use strict";e.d(t,"a",function(){return i}),e.d(t,"d",function(){return a}),e.d(t,"b",function(){return f}),e.d(t,"c",function(){return d}),e.d(t,"e",function(){return g});var r=e("GT59"),o=e("JJ4Z"),c=e("ddto"),u=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},i={type:"@@redux-saga/CHANNEL_END"},a=function(n){return n&&"@@redux-saga/CHANNEL_END"===n.type};function f(){var n=[];return{subscribe:function(t){return n.push(t),function(){return Object(r.t)(n,t)}},emit:function(t){for(var e=n.slice(),r=0,o=e.length;r<o;r++)e[r](t)}}}var l="invalid buffer passed to channel factory function",s="Saga was provided with an undefined action";function d(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.a.none(),e=arguments[2];arguments.length>2&&Object(r.g)(e,r.n.func,"Invalid match function passed to eventChannel");var c=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.a.fixed(),t=!1,e=[];function c(){if(t&&e.length)throw Object(r.m)("Cannot have a closed channel with pending takers");if(e.length&&!n.isEmpty())throw Object(r.m)("Cannot have pending takers with non empty buffer")}return Object(r.g)(n,r.n.buffer,l),{take:function(o){c(),Object(r.g)(o,r.n.func,"channel.take's callback must be a function"),t&&n.isEmpty()?o(i):n.isEmpty()?(e.push(o),o.cancel=function(){return Object(r.t)(e,o)}):o(n.take())},put:function(o){if(c(),Object(r.g)(o,r.n.notUndef,s),!t){if(!e.length)return n.put(o);for(var u=0;u<e.length;u++){var i=e[u];if(!i[r.b]||i[r.b](o))return e.splice(u,1),i(o)}}},flush:function(e){c(),Object(r.g)(e,r.n.func,"channel.flush' callback must be a function"),t&&n.isEmpty()?e(i):e(n.flush())},close:function(){if(c(),!t&&(t=!0,e.length)){var n=e;e=[];for(var r=0,o=n.length;r<o;r++)n[r](i)}},get __takers__(){return e},get __closed__(){return t}}}(t),u=function(){c.__closed__||(f&&f(),c.close())},f=n(function(n){a(n)?u():e&&!e(n)||c.put(n)});if(c.__closed__&&f(),!r.n.func(f))throw new Error("in eventChannel: subscribe should return a function to unsubscribe");return{take:c.take,flush:c.flush,close:u}}function g(n){var t=d(function(t){return n(function(n){n[r.c]?t(n):Object(c.a)(function(){return t(n)})})});return u({},t,{take:function(n,e){arguments.length>1&&(Object(r.g)(e,r.n.func,"channel.take's matcher argument must be a function"),n[r.b]=e),t.take(n)}})}},EBxJ:function(n,t,e){"use strict";var r=e("GT59"),o={done:!0,value:void 0},c={};function u(n){return r.n.channel(n)?"channel":Array.isArray(n)?String(n.map(function(n){return String(n)})):String(n)}function i(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"iterator",u=void 0,i=t;function a(t,e){if(i===c)return o;if(e)throw i=c,e;u&&u(t);var r=n[i](),a=r[0],f=r[1],l=r[2];return u=l,(i=a)===c?o:f}return Object(r.q)(a,function(n){return a(null,n)},e,!0)}var a=e("QLva"),f=e("DE1q");function l(n,t){for(var e=arguments.length,r=Array(e>2?e-2:0),o=2;o<e;o++)r[o-2]=arguments[o];var l={done:!1,value:Object(a.i)(n)},s=void 0,d=function(n){return s=n};return i({q1:function(){return["q2",l,d]},q2:function(){return s===f.a?[c]:["q1",(n=s,{done:!1,value:a.f.apply(void 0,[t].concat(r,[n]))})];var n}},"q1","takeEvery("+u(n)+", "+t.name+")")}function s(n,t){for(var e=arguments.length,r=Array(e>2?e-2:0),o=2;o<e;o++)r[o-2]=arguments[o];var l={done:!1,value:Object(a.i)(n)},s=function(n){return{done:!1,value:a.f.apply(void 0,[t].concat(r,[n]))}},d=function(n){return{done:!1,value:Object(a.e)(n)}},g=void 0,v=void 0,h=function(n){return g=n},b=function(n){return v=n};return i({q1:function(){return["q2",l,b]},q2:function(){return v===f.a?[c]:g?["q3",d(g)]:["q1",s(v),h]},q3:function(){return["q1",s(v),h]}},"q1","takeLatest("+u(n)+", "+t.name+")")}var d=e("JJ4Z");function g(n,t,e){for(var o=arguments.length,l=Array(o>3?o-3:0),s=3;s<o;s++)l[s-3]=arguments[s];var g=void 0,v=void 0,h={done:!1,value:Object(a.a)(t,d.a.sliding(1))},b={done:!1,value:Object(a.d)(r.j,n)},p=function(n){return g=n},y=function(n){return v=n};return i({q1:function(){return["q2",h,y]},q2:function(){return["q3",{done:!1,value:Object(a.i)(v)},p]},q3:function(){return g===f.a?[c]:["q4",(n=g,{done:!1,value:a.f.apply(void 0,[e].concat(l,[n]))})];var n},q4:function(){return["q2",b]}},"q1","throttle("+u(t)+", "+e.name+")")}e.d(t,"a",function(){return l}),e.d(t,"b",function(){return s}),e.d(t,"c",function(){return g})},FDR4:function(n,t,e){"use strict";var r=e("GT59"),o=e("DE1q"),c=e("ddto"),u=e("QLva"),i=e("JJ4Z"),a=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n};var l="proc first argument (Saga function result) must be an iterator",s={toString:function(){return"@@redux-saga/CHANNEL_END"}},d={toString:function(){return"@@redux-saga/TASK_CANCEL"}},g={wildcard:function(){return r.o},default:function(n){return"symbol"===(void 0===n?"undefined":f(n))?function(t){return t.type===n}:function(t){return t.type===String(n)}},array:function(n){return function(t){return n.some(function(n){return v(n)(t)})}},predicate:function(n){return function(t){return n(t)}}};function v(n){return("*"===n?g.wildcard:r.n.array(n)?g.array:r.n.stringableFunc(n)?g.default:r.n.func(n)?g.predicate:g.default)(n)}var h=function(n){return{fn:n}};function b(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return r.r},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r.r,f=arguments.length>3&&void 0!==arguments[3]?arguments[3]:r.r,g=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},p=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},y=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,m=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"anonymous",j=arguments[8];Object(r.g)(n,r.n.iterator,l);var O=Object(r.k)(M,Object(r.w)("[...effects]","all([...effects])")),E=p.sagaMonitor,k=p.logger,w=p.onError,C=k||r.p,_=function(n){var t=n.sagaStack;!t&&n.stack&&(t=-1!==n.stack.split("\n")[0].indexOf(n.message)?n.stack:"Error: "+n.message+"\n"+n.stack),C("error","uncaught at "+m,t||n.message||n)},S=Object(o.e)(t),x=Object.create(g);L.cancel=r.r;var A=function(n,t,e,o){var c,u;return e._deferredEnd=null,(c={})[r.e]=!0,c.id=n,c.name=t,"done",(u={}).done=u.done||{},u.done.get=function(){if(e._deferredEnd)return e._deferredEnd.promise;var n=Object(r.i)();return e._deferredEnd=n,e._isRunning||(e._error?n.reject(e._error):n.resolve(e._result)),n.promise},c.cont=o,c.joiners=[],c.cancel=R,c.isRunning=function(){return e._isRunning},c.isCancelled=function(){return e._isCancelled},c.isAborted=function(){return e._isAborted},c.result=function(){return e._result},c.error=function(){return e._error},c.setContext=function(n){Object(r.g)(n,r.n.object,Object(r.h)("task",n)),r.s.assign(x,n)},function(n,t){for(var e in t){var r=t[e];r.configurable=r.enumerable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,e,r)}}(c,u),c}(y,m,n,j),T={name:m,cancel:function(){T.isRunning&&!T.isCancelled&&(T.isCancelled=!0,L(d))},isRunning:!0},q=function(n,t,e){var o=[],c=void 0,u=!1;function i(n){f(),e(n,!0)}function a(n){o.push(n),n.cont=function(a,f){u||(Object(r.t)(o,n),n.cont=r.r,f?i(a):(n===t&&(c=a),o.length||(u=!0,e(c))))}}function f(){u||(u=!0,o.forEach(function(n){n.cont=r.r,n.cancel()}),o=[])}return a(t),{addTask:a,cancelAll:f,abort:i,getTasks:function(){return o},taskNames:function(){return o.map(function(n){return n.name})}}}(0,T,N);function R(){n._isRunning&&!n._isCancelled&&(n._isCancelled=!0,q.cancelAll(),N(d))}return j&&(j.cancel=R),n._isRunning=!0,L(),A;function L(t,e){if(!T.isRunning)throw new Error("Trying to resume an already finished generator");try{var o=void 0;e?o=n.throw(t):t===d?(T.isCancelled=!0,L.cancel(),o=r.n.func(n.return)?n.return(d):{done:!0,value:d}):o=t===s?r.n.func(n.return)?n.return():{done:!0}:n.next(t),o.done?(T.isMainRunning=!1,T.cont&&T.cont(o.value)):U(o.value,y,"",L)}catch(n){T.isCancelled&&_(n),T.isMainRunning=!1,T.cont(n,!0)}}function N(t,e){n._isRunning=!1,S.close(),e?(t instanceof Error&&Object.defineProperty(t,"sagaStack",{value:"at "+m+" \n "+(t.sagaStack||t.stack),configurable:!0}),A.cont||(t instanceof Error&&w?w(t):_(t)),n._error=t,n._isAborted=!0,n._deferredEnd&&n._deferredEnd.reject(t)):(n._result=t,n._deferredEnd&&n._deferredEnd.resolve(t)),A.cont&&A.cont(t,e),A.joiners.forEach(function(n){return n.cb(t,e)}),A.joiners=null}function U(n,l){var g=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",b=arguments[3],p=Object(r.v)();E&&E.effectTriggered({effectId:p,parentEffectId:l,label:g,effect:n});var y=void 0;function j(n,t){y||(y=!0,b.cancel=r.r,E&&(t?E.effectRejected(p,n):E.effectResolved(p,n)),b(n,t))}j.cancel=r.r,b.cancel=function(){if(!y){y=!0;try{j.cancel()}catch(n){_(n)}j.cancel=r.r,E&&E.effectCancelled(p)}};var k=void 0;return r.n.promise(n)?J(n,j):r.n.helper(n)?I(h(n),p,j):r.n.iterator(n)?P(n,p,m,j):r.n.array(n)?O(n,p,j):(k=u.c.take(n))?function(n,t){var e=n.channel,r=n.pattern,c=n.maybe;e=e||S;var u=function(n){return n instanceof Error?t(n,!0):Object(o.d)(n)&&!c?t(s):t(n)};try{e.take(u,v(r))}catch(n){return t(n,!0)}t.cancel=u.cancel}(k,j):(k=u.c.put(n))?function(n,t){var o=n.channel,u=n.action,i=n.resolve;Object(c.a)(function(){var n=void 0;try{n=(o?o.put:e)(u)}catch(n){if(o||i)return t(n,!0);_(n)}if(!i||!r.n.promise(n))return t(n);J(n,t)})}(k,j):(k=u.c.all(n))?M(k,p,j):(k=u.c.race(n))?function(n,t,e){var c=void 0,u=Object.keys(n),i={};u.forEach(function(t){var f=function(i,f){if(!c)if(f)e.cancel(),e(i,!0);else if(!Object(o.d)(i)&&i!==s&&i!==d){var l;e.cancel(),c=!0;var g=((l={})[t]=i,l);e(r.n.array(n)?[].slice.call(a({},g,{length:u.length})):g)}};f.cancel=r.r,i[t]=f}),e.cancel=function(){c||(c=!0,u.forEach(function(n){return i[n].cancel()}))},u.forEach(function(e){c||U(n[e],t,e,i[e])})}(k,p,j):(k=u.c.call(n))?function(n,t,e){var o=n.context,c=n.fn,u=n.args,i=void 0;try{i=c.apply(o,u)}catch(n){return e(n,!0)}return r.n.promise(i)?J(i,e):r.n.iterator(i)?P(i,t,c.name,e):e(i)}(k,p,j):(k=u.c.cps(n))?function(n,t){var e=n.context,o=n.fn,c=n.args;try{var u=function(n,e){return r.n.undef(n)?t(e):t(n,!0)};o.apply(e,c.concat(u)),u.cancel&&(t.cancel=function(){return u.cancel()})}catch(n){return t(n,!0)}}(k,j):(k=u.c.fork(n))?I(k,p,j):(k=u.c.join(n))?function(n,t){if(n.isRunning()){var e={task:A,cb:t};t.cancel=function(){return Object(r.t)(n.joiners,e)},n.joiners.push(e)}else n.isAborted()?t(n.error(),!0):t(n.result())}(k,j):(k=u.c.cancel(n))?function(n,t){n===r.d&&(n=A);n.isRunning()&&n.cancel();t()}(k,j):(k=u.c.select(n))?function(n,t){var e=n.selector,r=n.args;try{var o=e.apply(void 0,[f()].concat(r));t(o)}catch(n){t(n,!0)}}(k,j):(k=u.c.actionChannel(n))?function(n,e){var r=n.pattern,c=n.buffer,u=v(r);u.pattern=r,e(Object(o.c)(t,c||i.a.fixed(),u))}(k,j):(k=u.c.flush(n))?function(n,t){n.flush(t)}(k,j):(k=u.c.cancelled(n))?function(n,t){t(!!T.isCancelled)}(0,j):(k=u.c.getContext(n))?function(n,t){t(x[n])}(k,j):(k=u.c.setContext(n))?function(n,t){r.s.assign(x,n),t()}(k,j):j(n)}function J(n,t){var e=n[r.a];r.n.func(e)?t.cancel=e:r.n.func(n.abort)&&(t.cancel=function(){return n.abort()}),n.then(t,function(n){return t(n,!0)})}function P(n,r,o,c){b(n,t,e,f,x,p,r,o,c)}function I(n,o,u){var i=n.context,a=n.fn,l=n.args,s=n.detached,d=function(n){var t=n.context,e=n.fn,o=n.args;if(r.n.iterator(e))return e;var c,u,i=void 0,a=void 0;try{i=e.apply(t,o)}catch(n){a=n}return r.n.iterator(i)?i:a?Object(r.q)(function(){throw a}):Object(r.q)((c=void 0,u={done:!1,value:i},function(n){return c?{done:!0,value:n}:(c=!0,u)}))}({context:i,fn:a,args:l});try{Object(c.c)();var g=b(d,t,e,f,x,p,o,a.name,s?null:r.r);s?u(g):d._isRunning?(q.addTask(g),u(g)):d._error?q.abort(d._error):u(g)}finally{Object(c.b)()}}function M(n,t,e){var c=Object.keys(n);if(!c.length)return e(r.n.array(n)?[]:{});var u=0,i=void 0,f={},l={};c.forEach(function(t){var g=function(l,g){i||(g||Object(o.d)(l)||l===s||l===d?(e.cancel(),e(l,g)):(f[t]=l,++u===c.length&&(i=!0,e(r.n.array(n)?r.f.from(a({},f,{length:c.length})):f))))};g.cancel=r.r,l[t]=g}),e.cancel=function(){i||(i=!0,c.forEach(function(n){return l[n].cancel()}))},c.forEach(function(e){return U(n[e],t,e,l[e])})}}var p="runSaga(storeInterface, saga, ...args): saga argument must be a Generator function!";e("EBxJ"),e("FkTg"),t.a=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.context,e=void 0===t?{}:t,c=function(n,t){var e={};for(var r in n)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e}(n,["context"]),u=c.sagaMonitor,i=c.logger,a=c.onError;if(r.n.func(c))throw new Error("Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead");if(i&&!r.n.func(i))throw new Error("`options.logger` passed to the Saga middleware is not a function!");if(a&&!r.n.func(a))throw new Error("`options.onError` passed to the Saga middleware is not a function!");if(c.emitter&&!r.n.func(c.emitter))throw new Error("`options.emitter` passed to the Saga middleware is not a function!");function f(n){var t=n.getState,l=n.dispatch,s=Object(o.b)();return s.emit=(c.emitter||r.l)(s.emit),f.run=function(n,t){for(var e=arguments.length,o=Array(e>2?e-2:0),c=2;c<e;c++)o[c-2]=arguments[c];var u=void 0;r.n.iterator(n)?(u=n,n=t):(Object(r.g)(t,r.n.func,p),u=t.apply(void 0,o),Object(r.g)(u,r.n.iterator,p));var i=n,a=i.subscribe,f=i.dispatch,l=i.getState,s=i.context,d=i.sagaMonitor,g=i.logger,v=i.onError,h=Object(r.v)();d&&(d.effectTriggered=d.effectTriggered||r.r,d.effectResolved=d.effectResolved||r.r,d.effectRejected=d.effectRejected||r.r,d.effectCancelled=d.effectCancelled||r.r,d.actionDispatched=d.actionDispatched||r.r,d.effectTriggered({effectId:h,root:!0,parentEffectId:0,effect:{root:!0,saga:t,args:o}}));var y=b(u,a,Object(r.x)(f),l,s,{sagaMonitor:d,logger:g,onError:v},h,t.name);return d&&d.effectResolved(h,y),y}.bind(null,{context:e,subscribe:s.subscribe,dispatch:l,getState:t,sagaMonitor:u,logger:i,onError:a}),function(n){return function(t){u&&u.actionDispatched&&u.actionDispatched(t);var e=n(t);return s.emit(t),e}}}return f.run=function(){throw new Error("Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware")},f.setContext=function(n){Object(r.g)(n,r.n.object,Object(r.h)("sagaMiddleware",n)),r.s.assign(e,n)},f}},FkTg:function(n,t,e){"use strict";var r=e("QLva"),o=e("EBxJ");function c(n,t){for(var e=arguments.length,c=Array(e>2?e-2:0),u=2;u<e;u++)c[u-2]=arguments[u];return r.f.apply(void 0,[o.b,n,t].concat(c))}e.d(t,"d",function(){return r.g}),e.d(t,"a",function(){return r.b}),e.d(t,"b",function(){return r.d}),e.d(t,"c",function(){return r.f}),e.d(t,"e",function(){return r.h}),e.d(t,"f",function(){return c})},GT59:function(n,t,e){"use strict";e.d(t,"u",function(){return c}),e.d(t,"e",function(){return u}),e.d(t,"b",function(){return a}),e.d(t,"a",function(){return f}),e.d(t,"c",function(){return l}),e.d(t,"d",function(){return s}),e.d(t,"o",function(){return g}),e.d(t,"r",function(){return v}),e.d(t,"l",function(){return h}),e.d(t,"g",function(){return b}),e.d(t,"n",function(){return m}),e.d(t,"s",function(){return j}),e.d(t,"t",function(){return O}),e.d(t,"f",function(){return E}),e.d(t,"i",function(){return k}),e.d(t,"j",function(){return w}),e.d(t,"v",function(){return _}),e.d(t,"q",function(){return A}),e.d(t,"p",function(){return T}),e.d(t,"k",function(){return q}),e.d(t,"w",function(){return R}),e.d(t,"m",function(){return L}),e.d(t,"h",function(){return N}),e.d(t,"x",function(){return U});var r=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},c=function(n){return"@@redux-saga/"+n},u=c("TASK"),i=c("HELPER"),a=c("MATCH"),f=c("CANCEL_PROMISE"),l=c("SAGA_ACTION"),s=c("SELF_CANCELLATION"),d=function(n){return function(){return n}},g=d(!0),v=function(){},h=function(n){return n};function b(n,t,e){if(!t(n))throw T("error","uncaught at check",e),new Error(e)}var p=Object.prototype.hasOwnProperty;function y(n,t){return m.notUndef(n)&&p.call(n,t)}var m={undef:function(n){return null==n},notUndef:function(n){return null!=n},func:function(n){return"function"==typeof n},number:function(n){return"number"==typeof n},string:function(n){return"string"==typeof n},array:Array.isArray,object:function(n){return n&&!m.array(n)&&"object"===(void 0===n?"undefined":o(n))},promise:function(n){return n&&m.func(n.then)},iterator:function(n){return n&&m.func(n.next)&&m.func(n.throw)},iterable:function(n){return n&&m.func(Symbol)?m.func(n[Symbol.iterator]):m.array(n)},task:function(n){return n&&n[u]},observable:function(n){return n&&m.func(n.subscribe)},buffer:function(n){return n&&m.func(n.isEmpty)&&m.func(n.take)&&m.func(n.put)},pattern:function(n){return n&&(m.string(n)||"symbol"===(void 0===n?"undefined":o(n))||m.func(n)||m.array(n))},channel:function(n){return n&&m.func(n.take)&&m.func(n.close)},helper:function(n){return n&&n[i]},stringableFunc:function(n){return m.func(n)&&y(n,"toString")}},j={assign:function(n,t){for(var e in t)y(t,e)&&(n[e]=t[e])}};function O(n,t){var e=n.indexOf(t);e>=0&&n.splice(e,1)}var E={from:function(n){var t=Array(n.length);for(var e in n)y(n,e)&&(t[e]=n[e]);return t}};function k(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=r({},n),e=new Promise(function(n,e){t.resolve=n,t.reject=e});return t.promise=e,t}function w(n){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e=void 0,r=new Promise(function(r){e=setTimeout(function(){return r(t)},n)});return r[f]=function(){return clearTimeout(e)},r}function C(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(){return++n}}var _=C(),S=function(n){throw n},x=function(n){return{value:n,done:!0}};function A(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:S,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments[3],o={name:e,next:n,throw:t,return:x};return r&&(o[i]=!0),"undefined"!=typeof Symbol&&(o[Symbol.iterator]=function(){return o}),o}function T(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";"undefined"==typeof window?console.log("redux-saga "+n+": "+t+"\n"+(e&&e.stack||e)):console[n](t,e)}function q(n,t){return function(){return n.apply(void 0,arguments)}}var R=function(n,t){return n+" has been deprecated in favor of "+t+", please update your code"},L=function(n){return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: "+n+"\n")},N=function(n,t){return(n?n+".":"")+"setContext(props): argument "+t+" is not a plain object"},U=function(n){return function(t){return n(Object.defineProperty(t,l,{value:!0}))}}},JJ4Z:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var r=e("GT59"),o="Channel's Buffer overflow!",c=1,u=3,i=4,a={isEmpty:r.o,put:r.r,take:r.r};function f(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments[1],e=new Array(n),r=0,a=0,f=0,l=function(t){e[a]=t,a=(a+1)%n,r++},s=function(){if(0!=r){var t=e[f];return e[f]=null,r--,f=(f+1)%n,t}},d=function(){for(var n=[];r;)n.push(s());return n};return{isEmpty:function(){return 0==r},put:function(s){if(r<n)l(s);else{var g=void 0;switch(t){case c:throw new Error(o);case u:e[a]=s,f=a=(a+1)%n;break;case i:g=2*n,e=d(),r=e.length,a=e.length,f=0,e.length=g,n=g,l(s)}}},take:s,flush:d}}var l={none:function(){return a},fixed:function(n){return f(n,c)},dropping:function(n){return f(n,2)},sliding:function(n){return f(n,u)},expanding:function(n){return f(n,i)}}},QLva:function(n,t,e){"use strict";e.d(t,"i",function(){return E}),e.d(t,"g",function(){return k}),e.d(t,"b",function(){return w}),e.d(t,"d",function(){return _}),e.d(t,"f",function(){return S}),e.d(t,"e",function(){return x}),e.d(t,"h",function(){return A}),e.d(t,"a",function(){return T}),e.d(t,"c",function(){return R});var r=e("GT59"),o=Object(r.u)("IO"),c="TAKE",u="PUT",i="ALL",a="RACE",f="CALL",l="CPS",s="FORK",d="JOIN",g="CANCEL",v="SELECT",h="ACTION_CHANNEL",b="CANCELLED",p="FLUSH",y="GET_CONTEXT",m="SET_CONTEXT",j="\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)",O=function(n,t){var e;return(e={})[o]=!0,e[n]=t,e};function E(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"*";if(arguments.length&&Object(r.g)(arguments[0],r.n.notUndef,"take(patternOrChannel): patternOrChannel is undefined"),r.n.pattern(n))return O(c,{pattern:n});if(r.n.channel(n))return O(c,{channel:n});throw new Error("take(patternOrChannel): argument "+String(n)+" is not valid channel or a valid pattern")}E.maybe=function(){var n=E.apply(void 0,arguments);return n[c].maybe=!0,n};E.maybe;function k(n,t){return arguments.length>1?(Object(r.g)(n,r.n.notUndef,"put(channel, action): argument channel is undefined"),Object(r.g)(n,r.n.channel,"put(channel, action): argument "+n+" is not a valid channel"),Object(r.g)(t,r.n.notUndef,"put(channel, action): argument action is undefined")):(Object(r.g)(n,r.n.notUndef,"put(action): argument action is undefined"),t=n,n=null),O(u,{channel:n,action:t})}function w(n){return O(i,n)}function C(n,t,e){Object(r.g)(t,r.n.notUndef,n+": argument fn is undefined");var o=null;if(r.n.array(t)){var c=t;o=c[0],t=c[1]}else if(t.fn){var u=t;o=u.context,t=u.fn}return o&&r.n.string(t)&&r.n.func(o[t])&&(t=o[t]),Object(r.g)(t,r.n.func,n+": argument "+t+" is not a function"),{context:o,fn:t,args:e}}function _(n){for(var t=arguments.length,e=Array(t>1?t-1:0),r=1;r<t;r++)e[r-1]=arguments[r];return O(f,C("call",n,e))}function S(n){for(var t=arguments.length,e=Array(t>1?t-1:0),r=1;r<t;r++)e[r-1]=arguments[r];return O(s,C("fork",n,e))}function x(){for(var n=arguments.length,t=Array(n),e=0;e<n;e++)t[e]=arguments[e];if(t.length>1)return w(t.map(function(n){return x(n)}));var o=t[0];return 1===t.length&&(Object(r.g)(o,r.n.notUndef,"cancel(task): argument task is undefined"),Object(r.g)(o,r.n.task,"cancel(task): argument "+o+" is not a valid Task object "+j)),O(g,o||r.d)}function A(n){for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return 0===arguments.length?n=r.l:(Object(r.g)(n,r.n.notUndef,"select(selector,[...]): argument selector is undefined"),Object(r.g)(n,r.n.func,"select(selector,[...]): argument "+n+" is not a function")),O(v,{selector:n,args:e})}function T(n,t){return Object(r.g)(n,r.n.notUndef,"actionChannel(pattern,...): argument pattern is undefined"),arguments.length>1&&(Object(r.g)(t,r.n.notUndef,"actionChannel(pattern, buffer): argument buffer is undefined"),Object(r.g)(t,r.n.buffer,"actionChannel(pattern, buffer): argument "+t+" is not a valid buffer")),O(h,{pattern:n,buffer:t})}k.resolve=function(){var n=k.apply(void 0,arguments);return n[u].resolve=!0,n},k.sync=Object(r.k)(k.resolve,Object(r.w)("put.sync","put.resolve"));var q=function(n){return function(t){return t&&t[o]&&t[n]}},R={take:q(c),put:q(u),all:q(i),race:q(a),call:q(f),cps:q(l),fork:q(s),join:q(d),cancel:q(g),select:q(v),actionChannel:q(h),cancelled:q(b),flush:q(p),getContext:q(y),setContext:q(m)}},ddto:function(n,t,e){"use strict";e.d(t,"a",function(){return u}),e.d(t,"c",function(){return i}),e.d(t,"b",function(){return f});var r=[],o=0;function c(n){try{i(),n()}finally{a()}}function u(n){r.push(n),o||(i(),f())}function i(){o++}function a(){o--}function f(){a();for(var n=void 0;!o&&void 0!==(n=r.shift());)c(n)}}}]);
//# sourceMappingURL=bundle.npm.redux-saga.92797428cc05827ee8ea.js.map