(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"3I0+":function(t,e,r){"use strict";r.r(e);var o=r("yOFf");r.d(e,"ObservableQuery",function(){return o.a});var n=r("fYNr");r.d(e,"NetworkStatus",function(){return n.a});var i=r("MZmi");r.d(e,"FetchType",function(){return i.a});var s=r("7ohL");r.d(e,"isApolloError",function(){return s.b}),r.d(e,"ApolloError",function(){return s.a});var a=r("CB5K");r.d(e,"ApolloClient",function(){return a.a}),e.default=a.a},"7ohL":function(t,e,r){"use strict";r.d(e,"b",function(){return n}),r.d(e,"a",function(){return s});var o=r("UNrv");function n(t){return t.hasOwnProperty("graphQLErrors")}var i=function(t){var e="";return Array.isArray(t.graphQLErrors)&&0!==t.graphQLErrors.length&&t.graphQLErrors.forEach(function(t){var r=t?t.message:"Error message not found.";e+="GraphQL error: "+r+"\n"}),t.networkError&&(e+="Network error: "+t.networkError.message+"\n"),e=e.replace(/\n$/,"")},s=function(t){function e(r){var o=r.graphQLErrors,n=r.networkError,s=r.errorMessage,a=r.extraInfo,u=t.call(this,s)||this;return u.graphQLErrors=o||[],u.networkError=n||null,u.message=s||i(u),u.extraInfo=a,u.__proto__=e.prototype,u}return o.b(e,t),e}(Error)},CB5K:function(t,e,r){"use strict";var o=r("UNrv"),n=r("iB/h"),i=r("KH6z"),s=r("tsAT"),a=r("YBHE"),u=r("ru8h"),c=r("u/bu"),l=r("cQN5"),h=r("MZmi"),y=r("yOFf"),p=r("fYNr"),f=function(){function t(t){var e=t.queryManager,r=t.ssrMode;this.inFlightQueries={},this.registeredQueries={},this.intervalQueries={},this.pollingTimers={},this.ssrMode=!1,this.queryManager=e,this.ssrMode=r||!1}return t.prototype.stop=function(){var t=this;Object.keys(this.registeredQueries).forEach(function(e){t.stopPollingQuery(e)}),Object.keys(this.intervalQueries).forEach(function(e){t.fetchQueriesOnInterval(+e)})},t.prototype.checkInFlight=function(t){var e=this.queryManager.queryStore.get(t);return e&&e.networkStatus!==p.a.ready&&e.networkStatus!==p.a.error},t.prototype.fetchQuery=function(t,e,r){var o=this;return new Promise(function(n,i){o.queryManager.fetchQuery(t,e,r).then(function(t){n(t)}).catch(function(t){i(t)})})},t.prototype.startPollingQuery=function(t,e,r){if(!t.pollInterval)throw new Error("Attempted to start a polling query without a polling interval.");return this.ssrMode?e:(this.registeredQueries[e]=t,r&&this.queryManager.addQueryListener(e,r),this.addQueryOnInterval(e,t),e)},t.prototype.stopPollingQuery=function(t){delete this.registeredQueries[t]},t.prototype.fetchQueriesOnInterval=function(t){var e=this;this.intervalQueries[t]=this.intervalQueries[t].filter(function(r){if(!e.registeredQueries.hasOwnProperty(r)||e.registeredQueries[r].pollInterval!==t)return!1;if(e.checkInFlight(r))return!0;var n=e.registeredQueries[r],i=o.a({},n);return i.fetchPolicy="network-only",e.fetchQuery(r,i,h.a.poll).catch(function(){}),!0}),0===this.intervalQueries[t].length&&(clearInterval(this.pollingTimers[t]),delete this.intervalQueries[t])},t.prototype.addQueryOnInterval=function(t,e){var r=this,o=e.pollInterval;if(!o)throw new Error("A poll interval is required to start polling query with id '"+t+"'.");this.intervalQueries.hasOwnProperty(o.toString())&&this.intervalQueries[o].length>0?this.intervalQueries[o].push(t):(this.intervalQueries[o]=[t],this.pollingTimers[o]=setInterval(function(){r.fetchQueriesOnInterval(o)},o))},t.prototype.registerPollingQuery=function(t){if(!t.pollInterval)throw new Error("Attempted to register a non-polling query with the scheduler.");return new y.a({scheduler:this,options:t})},t}(),d=r("7ohL"),v=r("aDcM"),b=function(){function t(){this.store={}}return t.prototype.getStore=function(){return this.store},t.prototype.get=function(t){return this.store[t]},t.prototype.initMutation=function(t,e,r){this.store[t]={mutation:e,variables:r||{},loading:!0,error:null}},t.prototype.markMutationError=function(t,e){var r=this.store[t];r&&(r.loading=!1,r.error=e)},t.prototype.markMutationResult=function(t){var e=this.store[t];e&&(e.loading=!1,e.error=null)},t.prototype.reset=function(){this.store={}},t}(),g=r("3pyI"),Q=function(){function t(){this.store={}}return t.prototype.getStore=function(){return this.store},t.prototype.get=function(t){return this.store[t]},t.prototype.initQuery=function(t){var e=this.store[t.queryId];if(e&&e.document!==t.document&&!Object(g.a)(e.document,t.document))throw new Error("Internal Error: may not update existing query string in store");var r,o=!1,n=null;t.storePreviousVariables&&e&&e.networkStatus!==p.a.loading&&(Object(g.a)(e.variables,t.variables)||(o=!0,n=e.variables)),r=o?p.a.setVariables:t.isPoll?p.a.poll:t.isRefetch?p.a.refetch:p.a.loading;var i=[];e&&e.graphQLErrors&&(i=e.graphQLErrors),this.store[t.queryId]={document:t.document,variables:t.variables,previousVariables:n,networkError:null,graphQLErrors:i,networkStatus:r,metadata:t.metadata},"string"==typeof t.fetchMoreForQueryId&&this.store[t.fetchMoreForQueryId]&&(this.store[t.fetchMoreForQueryId].networkStatus=p.a.fetchMore)},t.prototype.markQueryResult=function(t,e,r){this.store&&this.store[t]&&(this.store[t].networkError=null,this.store[t].graphQLErrors=e.errors&&e.errors.length?e.errors:[],this.store[t].previousVariables=null,this.store[t].networkStatus=p.a.ready,"string"==typeof r&&this.store[r]&&(this.store[r].networkStatus=p.a.ready))},t.prototype.markQueryError=function(t,e,r){this.store&&this.store[t]&&(this.store[t].networkError=e,this.store[t].networkStatus=p.a.error,"string"==typeof r&&this.markQueryResultClient(r,!0))},t.prototype.markQueryResultClient=function(t,e){this.store&&this.store[t]&&(this.store[t].networkError=null,this.store[t].previousVariables=null,this.store[t].networkStatus=e?p.a.ready:p.a.loading)},t.prototype.stopQuery=function(t){delete this.store[t]},t.prototype.reset=function(t){var e=this;this.store=Object.keys(this.store).filter(function(e){return t.indexOf(e)>-1}).reduce(function(t,r){return t[r]=o.a({},e.store[r],{networkStatus:p.a.loading}),t},{})},t}(),w=r("Y2VA"),m=function(){function t(t){var e=t.link,r=t.queryDeduplication,o=void 0!==r&&r,i=t.store,s=t.onBroadcast,u=void 0===s?function(){}:s,c=t.ssrMode,l=void 0!==c&&c,h=t.clientAwareness,y=void 0===h?{}:h;this.mutationStore=new b,this.queryStore=new Q,this.clientAwareness={},this.idCounter=1,this.queries=new Map,this.fetchQueryRejectFns=new Set,this.queryIdsByName={},this.link=e,this.deduplicator=n.a.from([new a.a,e]),this.queryDeduplication=o,this.dataStore=i,this.onBroadcast=u,this.clientAwareness=y,this.scheduler=new f({queryManager:this,ssrMode:l})}return t.prototype.stop=function(){this.scheduler.stop(),this.fetchQueryRejectFns.forEach(function(t){t(new Error("QueryManager stopped while query was in flight"))})},t.prototype.mutate=function(t){var e=this,r=t.mutation,i=t.variables,s=t.optimisticResponse,a=t.updateQueries,l=t.refetchQueries,h=void 0===l?[]:l,y=t.awaitRefetchQueries,p=void 0!==y&&y,f=t.update,v=t.errorPolicy,b=void 0===v?"none":v,g=t.fetchPolicy,Q=t.context,m=void 0===Q?{}:Q;if(!r)throw new Error("mutation option is required. You must specify your GraphQL document in the mutation option.");if(g&&"no-cache"!==g)throw new Error("fetchPolicy for mutations currently only supports the 'no-cache' policy");var q=this.generateQueryId(),k=this.dataStore.getCache();r=k.transformDocument(r),i=Object(u.a)({},Object(c.c)(Object(c.g)(r)),i),this.setQuery(q,function(){return{document:r}});var O=function(){var t={};return a&&Object.keys(a).forEach(function(r){return(e.queryIdsByName[r]||[]).forEach(function(o){t[o]={updater:a[r],query:e.queryStore.get(o)}})}),t};return this.mutationStore.initMutation(q,r,i),this.dataStore.markMutationInit({mutationId:q,document:r,variables:i||{},updateQueries:O(),update:f,optimisticResponse:s}),this.broadcastQueries(),new Promise(function(t,a){var u,c,l=e.buildOperationForLink(r,i,o.a({},m,{optimisticResponse:s}));Object(n.c)(e.link,l).subscribe({next:function(t){Object(w.a)(t)&&"none"===b?c=new d.a({graphQLErrors:t.errors}):(e.mutationStore.markMutationResult(q),"no-cache"!==g&&e.dataStore.markMutationResult({mutationId:q,result:t,document:r,variables:i||{},updateQueries:O(),update:f}),u=t)},error:function(t){e.mutationStore.markMutationError(q,t),e.dataStore.markMutationComplete({mutationId:q,optimisticResponse:s}),e.broadcastQueries(),e.setQuery(q,function(){return{document:void 0}}),a(new d.a({networkError:t}))},complete:function(){return function(){if(c&&e.mutationStore.markMutationError(q,c),e.dataStore.markMutationComplete({mutationId:q,optimisticResponse:s}),e.broadcastQueries(),c)return Promise.reject(c);"function"==typeof h&&(h=h(u));for(var t=[],r=0,o=h;r<o.length;r++){var n=o[r];if("string"!=typeof n){var i={query:n.query,variables:n.variables,fetchPolicy:"network-only"};n.context&&(i.context=n.context),t.push(e.query(i))}else{var a=e.refetchQueryByName(n);a&&t.push(a)}}return Promise.all(p?t:[]).then(function(){return e.setQuery(q,function(){return{document:void 0}}),"ignore"===b&&u&&Object(w.a)(u)&&delete u.errors,u})}().then(t,a)}})})},t.prototype.fetchQuery=function(t,e,r,o){var n,i=this,s=e.variables,a=void 0===s?{}:s,u=e.metadata,c=void 0===u?null:u,y=e.fetchPolicy,p=void 0===y?"cache-first":y,f=this.dataStore.getCache().transformDocument(e.query),v="network-only"===p||"no-cache"===p;if(r!==h.a.refetch&&"network-only"!==p&&"no-cache"!==p){var b=this.dataStore.getCache().diff({query:f,variables:a,returnPartialData:!0,optimistic:!1});v=!b.complete||"cache-and-network"===p,n=b.result}var g=v&&"cache-only"!==p&&"standby"!==p;Object(l.c)(["live"],f)&&(g=!0);var Q=this.generateRequestId(),w=this.updateQueryWatch(t,f,e);if(this.setQuery(t,function(){return{document:f,lastRequestId:Q,invalidated:!0,cancel:w}}),this.invalidate(!0,o),this.queryStore.initQuery({queryId:t,document:f,storePreviousVariables:g,variables:a,isPoll:r===h.a.poll,isRefetch:r===h.a.refetch,metadata:c,fetchMoreForQueryId:o}),this.broadcastQueries(),(!g||"cache-and-network"===p)&&(this.queryStore.markQueryResultClient(t,!g),this.invalidate(!0,t,o),this.broadcastQueries()),g){var m=this.fetchRequest({requestId:Q,queryId:t,document:f,options:e,fetchMoreForQueryId:o}).catch(function(e){if(Object(d.b)(e))throw e;var r=i.getQuery(t).lastRequestId;throw Q>=(r||1)&&(i.queryStore.markQueryError(t,e,o),i.invalidate(!0,t,o),i.broadcastQueries()),new d.a({networkError:e})});if("cache-and-network"!==p)return m;m.catch(function(){})}return Promise.resolve({data:n})},t.prototype.queryListenerForObserver=function(t,e,r){var o=this,n=!1;return function(i,a){if(o.invalidate(!1,t),i){var u=o.getQuery(t).observableQuery,c=u?u.options.fetchPolicy:e.fetchPolicy;if("standby"!==c){var l=u?u.options.errorPolicy:e.errorPolicy,h=u?u.getLastResult():null,y=u?u.getLastError():null,f=!a&&null!=i.previousVariables||"cache-only"===c||"cache-and-network"===c,v=Boolean(h&&i.networkStatus!==h.networkStatus),b=l&&(y&&y.graphQLErrors)!==i.graphQLErrors&&"none"!==l;if(!Object(p.b)(i.networkStatus)||v&&e.notifyOnNetworkStatusChange||f){if((!l||"none"===l)&&i.graphQLErrors&&i.graphQLErrors.length>0||i.networkError){var g=new d.a({graphQLErrors:i.graphQLErrors,networkError:i.networkError});if(n=!0,r.error)try{r.error(g)}catch(t){setTimeout(function(){throw t},0)}else setTimeout(function(){throw g},0),Object(s.d)()||console.info("An unhandled error was thrown because no error handler is registered for the query "+JSON.stringify(i.document));return}try{var Q=void 0,w=void 0;if(a)"no-cache"!==c&&o.setQuery(t,function(){return{newData:null}}),Q=a.result,w=!a.complete||!1;else if(h&&h.data&&!b)Q=h.data,w=!1;else{var m=o.getQuery(t).document,q=o.dataStore.getCache().diff({query:m,variables:i.previousVariables||i.variables,optimistic:!0});Q=q.result,w=!q.complete}var k=void 0;if(k=w&&"cache-only"!==c?{data:h&&h.data,loading:Object(p.b)(i.networkStatus),networkStatus:i.networkStatus,stale:!0}:{data:Q,loading:Object(p.b)(i.networkStatus),networkStatus:i.networkStatus,stale:!1},"all"===l&&i.graphQLErrors&&i.graphQLErrors.length>0&&(k.errors=i.graphQLErrors),r.next&&(n||!u||u.isDifferentFromLastResult(k)))try{r.next(k)}catch(t){setTimeout(function(){throw t},0)}n=!1}catch(t){return n=!0,void(r.error&&r.error(new d.a({networkError:t})))}}}}}},t.prototype.watchQuery=function(t,e){if(void 0===e&&(e=!0),"standby"===t.fetchPolicy)throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"');var r=Object(c.k)(t.query);if(r.variableDefinitions&&r.variableDefinitions.length){var n=Object(c.c)(r);t.variables=Object(u.a)({},n,t.variables)}void 0===t.notifyOnNetworkStatusChange&&(t.notifyOnNetworkStatusChange=!1);var i=o.a({},t);return new y.a({scheduler:this.scheduler,options:i,shouldSubscribe:e})},t.prototype.query=function(t){var e=this;if(!t.query)throw new Error("query option is required. You must specify your GraphQL document in the query option.");if("Document"!==t.query.kind)throw new Error('You must wrap the query string in a "gql" tag.');if(t.returnPartialData)throw new Error("returnPartialData option only supported on watchQuery.");if(t.pollInterval)throw new Error("pollInterval option only supported on watchQuery.");return new Promise(function(r,o){e.fetchQueryRejectFns.add(o),e.watchQuery(t,!1).result().then(r,o).then(function(){return e.fetchQueryRejectFns.delete(o)})})},t.prototype.generateQueryId=function(){var t=this.idCounter.toString();return this.idCounter++,t},t.prototype.stopQueryInStore=function(t){this.queryStore.stopQuery(t),this.invalidate(!0,t),this.broadcastQueries()},t.prototype.addQueryListener=function(t,e){this.setQuery(t,function(t){var r=t.listeners;return{listeners:(void 0===r?[]:r).concat([e]),invalidate:!1}})},t.prototype.updateQueryWatch=function(t,e,r){var o=this,n=this.getQuery(t).cancel;n&&n();return this.dataStore.getCache().watch({query:e,variables:r.variables,optimistic:!0,previousResult:function(){var e=null,r=o.getQuery(t).observableQuery;if(r){var n=r.getLastResult();n&&(e=n.data)}return e},callback:function(e){o.setQuery(t,function(){return{invalidated:!0,newData:e}})}})},t.prototype.addObservableQuery=function(t,e){this.setQuery(t,function(){return{observableQuery:e}});var r=Object(c.k)(e.options.query);if(r.name&&r.name.value){var o=r.name.value;this.queryIdsByName[o]=this.queryIdsByName[o]||[],this.queryIdsByName[o].push(e.queryId)}},t.prototype.removeObservableQuery=function(t){var e=this.getQuery(t),r=e.observableQuery,o=e.cancel;if(o&&o(),r){var n=Object(c.k)(r.options.query),i=n.name?n.name.value:null;this.setQuery(t,function(){return{observableQuery:null}}),i&&(this.queryIdsByName[i]=this.queryIdsByName[i].filter(function(t){return!(r.queryId===t)}))}},t.prototype.clearStore=function(){this.fetchQueryRejectFns.forEach(function(t){t(new Error("Store reset while query was in flight(not completed in link chain)"))});var t=[];return this.queries.forEach(function(e,r){e.observableQuery&&t.push(r)}),this.queryStore.reset(t),this.mutationStore.reset(),this.dataStore.reset()},t.prototype.resetStore=function(){var t=this;return this.clearStore().then(function(){return t.reFetchObservableQueries()})},t.prototype.reFetchObservableQueries=function(t){var e=this.getObservableQueryPromises(t);return this.broadcastQueries(),Promise.all(e)},t.prototype.startQuery=function(t,e,r){return this.addQueryListener(t,r),this.fetchQuery(t,e).catch(function(){}),t},t.prototype.startGraphQLSubscription=function(t){var e,r=this,o=t.query,i=!(t.fetchPolicy&&"no-cache"===t.fetchPolicy),s=this.dataStore.getCache().transformDocument(o),a=Object(u.a)({},Object(c.c)(Object(c.h)(o)),t.variables),l=[];return new v.a(function(t){if(l.push(t),1===l.length){var o={next:function(t){i&&(r.dataStore.markSubscriptionResult(t,s,a),r.broadcastQueries()),l.forEach(function(e){Object(w.a)(t)&&e.error?e.error(new d.a({graphQLErrors:t.errors})):e.next&&e.next(t)})},error:function(t){l.forEach(function(e){e.error&&e.error(t)})},complete:function(){l.forEach(function(t){t.complete&&t.complete()})}},u=r.buildOperationForLink(s,a);e=Object(n.c)(r.link,u).subscribe(o)}return function(){0===(l=l.filter(function(e){return e!==t})).length&&e&&e.unsubscribe()}})},t.prototype.stopQuery=function(t){this.stopQueryInStore(t),this.removeQuery(t)},t.prototype.removeQuery=function(t){this.getQuery(t).subscriptions.forEach(function(t){return t.unsubscribe()}),this.queries.delete(t)},t.prototype.getCurrentQueryResult=function(t,e){void 0===e&&(e=!0);var r=t.options,o=r.variables,n=r.query,i=t.getLastResult(),s=this.getQuery(t.queryId).newData;if(s&&s.complete)return{data:s.result,partial:!1};try{return{data:this.dataStore.getCache().read({query:n,variables:o,previousResult:i?i.data:void 0,optimistic:e}),partial:!1}}catch(t){return{data:{},partial:!0}}},t.prototype.getQueryWithPreviousResult=function(t){var e;if("string"==typeof t){var r=this.getQuery(t).observableQuery;if(!r)throw new Error("ObservableQuery with this id doesn't exist: "+t);e=r}else e=t;var o=e.options,n=o.variables,i=o.query;return{previousResult:this.getCurrentQueryResult(e,!1).data,variables:n,document:i}},t.prototype.broadcastQueries=function(){var t=this;this.onBroadcast(),this.queries.forEach(function(e,r){e.invalidated&&e.listeners&&e.listeners.filter(function(t){return!!t}).forEach(function(o){o(t.queryStore.get(r),e.newData)})})},t.prototype.getObservableQueryPromises=function(t){var e=this,r=[];return this.queries.forEach(function(o,n){var i=o.observableQuery;if(i){var s=i.options.fetchPolicy;i.resetLastResults(),"cache-only"===s||!t&&"standby"===s||r.push(i.refetch()),e.setQuery(n,function(){return{newData:null}}),e.invalidate(!0,n)}}),r},t.prototype.fetchRequest=function(t){var e,r,i,s=this,a=t.requestId,u=t.queryId,c=t.document,l=t.options,h=t.fetchMoreForQueryId,y=l.variables,f=l.context,v=l.errorPolicy,b=void 0===v?"none":v,g=l.fetchPolicy,Q=this.buildOperationForLink(c,y,o.a({},f,{forceFetch:!this.queryDeduplication}));return new Promise(function(t,o){s.fetchQueryRejectFns.add(i=o);var l=Object(n.c)(s.deduplicator,Q).subscribe({next:function(t){var n=s.getQuery(u).lastRequestId;if(a>=(n||1)){if("no-cache"!==g)try{s.dataStore.markQueryResult(t,c,y,h,"ignore"===b||"all"===b)}catch(t){return void o(t)}else s.setQuery(u,function(){return{newData:{result:t.data,complete:!0}}});s.queryStore.markQueryResult(u,t,h),s.invalidate(!0,u,h),s.broadcastQueries()}if(t.errors&&"none"===b)o(new d.a({graphQLErrors:t.errors}));else if("all"===b&&(r=t.errors),h||"no-cache"===g)e=t.data;else try{e=s.dataStore.getCache().read({variables:y,query:c,optimistic:!1})}catch(t){}},error:function(t){s.fetchQueryRejectFns.delete(o),s.setQuery(u,function(t){return{subscriptions:t.subscriptions.filter(function(t){return t!==l})}}),o(t)},complete:function(){s.fetchQueryRejectFns.delete(o),s.setQuery(u,function(t){return{subscriptions:t.subscriptions.filter(function(t){return t!==l})}}),t({data:e,errors:r,loading:!1,networkStatus:p.a.ready,stale:!1})}});s.setQuery(u,function(t){return{subscriptions:t.subscriptions.concat([l])}})}).catch(function(t){throw s.fetchQueryRejectFns.delete(i),t})},t.prototype.refetchQueryByName=function(t){var e=this,r=this.queryIdsByName[t];if(void 0!==r)return Promise.all(r.map(function(t){return e.getQuery(t).observableQuery}).filter(function(t){return!!t}).map(function(t){return t.refetch()}))},t.prototype.generateRequestId=function(){var t=this.idCounter;return this.idCounter++,t},t.prototype.getQuery=function(t){return this.queries.get(t)||{listeners:[],invalidated:!1,document:null,newData:null,lastRequestId:null,observableQuery:null,subscriptions:[]}},t.prototype.setQuery=function(t,e){var r=this.getQuery(t),n=o.a({},r,e(r));this.queries.set(t,n)},t.prototype.invalidate=function(t,e,r){e&&this.setQuery(e,function(){return{invalidated:t}}),r&&this.setQuery(r,function(){return{invalidated:t}})},t.prototype.buildOperationForLink=function(t,e,r){var n=this.dataStore.getCache();return{query:n.transformForLink?n.transformForLink(t):t,variables:e,operationName:Object(c.j)(t)||void 0,context:o.a({},r,{cache:n,getCacheKey:function(t){if(n.config)return n.config.dataIdFromObject(t);throw new Error("To use context.getCacheKey, you need to use a cache that has a configurable dataIdFromObject, like apollo-cache-inmemory.")},clientAwareness:this.clientAwareness})}},t}(),q=function(){function t(t){this.cache=t}return t.prototype.getCache=function(){return this.cache},t.prototype.markQueryResult=function(t,e,r,o,n){void 0===n&&(n=!1);var i=!Object(w.a)(t);n&&Object(w.a)(t)&&t.data&&(i=!0),!o&&i&&this.cache.write({result:t.data,dataId:"ROOT_QUERY",query:e,variables:r})},t.prototype.markSubscriptionResult=function(t,e,r){Object(w.a)(t)||this.cache.write({result:t.data,dataId:"ROOT_SUBSCRIPTION",query:e,variables:r})},t.prototype.markMutationInit=function(t){var e=this;if(t.optimisticResponse){var r;r="function"==typeof t.optimisticResponse?t.optimisticResponse(t.variables):t.optimisticResponse;this.cache.recordOptimisticTransaction(function(o){var n=e.cache;e.cache=o;try{e.markMutationResult({mutationId:t.mutationId,result:{data:r},document:t.document,variables:t.variables,updateQueries:t.updateQueries,update:t.update})}finally{e.cache=n}},t.mutationId)}},t.prototype.markMutationResult=function(t){var e=this;if(!Object(w.a)(t.result)){var r=[];r.push({result:t.result.data,dataId:"ROOT_MUTATION",query:t.document,variables:t.variables}),t.updateQueries&&Object.keys(t.updateQueries).filter(function(e){return t.updateQueries[e]}).forEach(function(o){var n=t.updateQueries[o],i=n.query,s=n.updater,a=e.cache.diff({query:i.document,variables:i.variables,returnPartialData:!0,optimistic:!1}),u=a.result;if(a.complete){var l=Object(w.b)(function(){return s(u,{mutationResult:t.result,queryName:Object(c.j)(i.document)||void 0,queryVariables:i.variables})});l&&r.push({result:l,dataId:"ROOT_QUERY",query:i.document,variables:i.variables})}}),this.cache.performTransaction(function(t){r.forEach(function(e){return t.write(e)})});var o=t.update;o&&this.cache.performTransaction(function(e){Object(w.b)(function(){return o(e,t.result)})})}},t.prototype.markMutationComplete=function(t){var e=t.mutationId;t.optimisticResponse&&this.cache.removeOptimistic(e)},t.prototype.markUpdateQueryResult=function(t,e,r){this.cache.write({result:r,dataId:"ROOT_QUERY",variables:e,query:t})},t.prototype.reset=function(){return this.cache.reset()},t}(),k=r("ohXw"),O=!1,S=function(){function t(t){var e=this;this.defaultOptions={},this.resetStoreCallbacks=[],this.clearStoreCallbacks=[],this.clientAwareness={};var r=t.link,o=t.cache,a=t.ssrMode,u=void 0!==a&&a,c=t.ssrForceFetchDelay,l=void 0===c?0:c,h=t.connectToDevTools,y=t.queryDeduplication,p=void 0===y||y,f=t.defaultOptions,d=t.name,v=t.version;if(!r||!o)throw new Error("\n        In order to initialize Apollo Client, you must specify link & cache properties on the config object.\n        This is part of the required upgrade when migrating from Apollo Client 1.0 to Apollo Client 2.0.\n        For more information, please visit:\n          https://www.apollographql.com/docs/react/basics/setup.html\n        to help you get started.\n      ");var b=new Map,g=new n.a(function(t,e){var r=b.get(t.query);return r||(r=Object(i.d)(t.query),b.set(t.query,r),b.set(r,r)),t.query=r,e(t)});this.link=g.concat(r),this.cache=o,this.store=new q(o),this.disableNetworkFetches=u||l>0,this.queryDeduplication=p,this.ssrMode=u,this.defaultOptions=f||{},l&&setTimeout(function(){return e.disableNetworkFetches=!1},l),this.watchQuery=this.watchQuery.bind(this),this.query=this.query.bind(this),this.mutate=this.mutate.bind(this),this.resetStore=this.resetStore.bind(this),this.reFetchObservableQueries=this.reFetchObservableQueries.bind(this);var Q=!Object(s.d)()&&"undefined"!=typeof window&&!window.__APOLLO_CLIENT__;(void 0===h?Q:h&&"undefined"!=typeof window)&&(window.__APOLLO_CLIENT__=this),O||Object(s.d)()||(O=!0,"undefined"!=typeof window&&window.document&&window.top===window.self&&void 0===window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__&&window.navigator&&window.navigator.userAgent&&window.navigator.userAgent.indexOf("Chrome")>-1&&console.debug("Download the Apollo DevTools for a better development experience: https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm")),this.version=k.version,d&&(this.clientAwareness.name=d),v&&(this.clientAwareness.version=v)}return t.prototype.stop=function(){this.queryManager&&this.queryManager.stop()},t.prototype.watchQuery=function(t){return this.defaultOptions.watchQuery&&(t=o.a({},this.defaultOptions.watchQuery,t)),!this.disableNetworkFetches||"network-only"!==t.fetchPolicy&&"cache-and-network"!==t.fetchPolicy||(t=o.a({},t,{fetchPolicy:"cache-first"})),this.initQueryManager().watchQuery(t)},t.prototype.query=function(t){if(this.defaultOptions.query&&(t=o.a({},this.defaultOptions.query,t)),"cache-and-network"===t.fetchPolicy)throw new Error("cache-and-network fetchPolicy can only be used with watchQuery");return this.disableNetworkFetches&&"network-only"===t.fetchPolicy&&(t=o.a({},t,{fetchPolicy:"cache-first"})),this.initQueryManager().query(t)},t.prototype.mutate=function(t){return this.defaultOptions.mutate&&(t=o.a({},this.defaultOptions.mutate,t)),this.initQueryManager().mutate(t)},t.prototype.subscribe=function(t){return this.initQueryManager().startGraphQLSubscription(t)},t.prototype.readQuery=function(t,e){return void 0===e&&(e=!1),this.initProxy().readQuery(t,e)},t.prototype.readFragment=function(t,e){return void 0===e&&(e=!1),this.initProxy().readFragment(t,e)},t.prototype.writeQuery=function(t){var e=this.initProxy().writeQuery(t);return this.initQueryManager().broadcastQueries(),e},t.prototype.writeFragment=function(t){var e=this.initProxy().writeFragment(t);return this.initQueryManager().broadcastQueries(),e},t.prototype.writeData=function(t){var e=this.initProxy().writeData(t);return this.initQueryManager().broadcastQueries(),e},t.prototype.__actionHookForDevTools=function(t){this.devToolsHookCb=t},t.prototype.__requestRaw=function(t){return Object(n.c)(this.link,t)},t.prototype.initQueryManager=function(){var t=this;return this.queryManager||(this.queryManager=new m({link:this.link,store:this.store,queryDeduplication:this.queryDeduplication,ssrMode:this.ssrMode,clientAwareness:this.clientAwareness,onBroadcast:function(){t.devToolsHookCb&&t.devToolsHookCb({action:{},state:{queries:t.queryManager?t.queryManager.queryStore.getStore():{},mutations:t.queryManager?t.queryManager.mutationStore.getStore():{}},dataWithOptimisticResults:t.cache.extract(!0)})}})),this.queryManager},t.prototype.resetStore=function(){var t=this;return Promise.resolve().then(function(){return t.queryManager?t.queryManager.clearStore():Promise.resolve(null)}).then(function(){return Promise.all(t.resetStoreCallbacks.map(function(t){return t()}))}).then(function(){return t.queryManager&&t.queryManager.reFetchObservableQueries?t.queryManager.reFetchObservableQueries():Promise.resolve(null)})},t.prototype.clearStore=function(){var t=this,e=this.queryManager;return Promise.resolve().then(function(){return Promise.all(t.clearStoreCallbacks.map(function(t){return t()}))}).then(function(){return e?e.clearStore():Promise.resolve(null)})},t.prototype.onResetStore=function(t){var e=this;return this.resetStoreCallbacks.push(t),function(){e.resetStoreCallbacks=e.resetStoreCallbacks.filter(function(e){return e!==t})}},t.prototype.onClearStore=function(t){var e=this;return this.clearStoreCallbacks.push(t),function(){e.clearStoreCallbacks=e.clearStoreCallbacks.filter(function(e){return e!==t})}},t.prototype.reFetchObservableQueries=function(t){return this.queryManager?this.queryManager.reFetchObservableQueries(t):Promise.resolve(null)},t.prototype.extract=function(t){return this.initProxy().extract(t)},t.prototype.restore=function(t){return this.initProxy().restore(t)},t.prototype.initProxy=function(){return this.proxy||(this.initQueryManager(),this.proxy=this.cache),this.proxy},t}();e.a=S},MZmi:function(t,e,r){"use strict";var o;r.d(e,"a",function(){return o}),function(t){t[t.normal=1]="normal",t[t.refetch=2]="refetch",t[t.poll=3]="poll"}(o||(o={}))},aDcM:function(t,e,r){"use strict";r.d(e,"a",function(){return s});var o=r("UNrv"),n=r("iB/h"),i=r("4DnI"),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o.b(e,t),e.prototype[i.default]=function(){return this},e.prototype["@@observable"]=function(){return this},e}(n.b)},fYNr:function(t,e,r){"use strict";var o;function n(t){return t<7}r.d(e,"a",function(){return o}),r.d(e,"b",function(){return n}),function(t){t[t.loading=1]="loading",t[t.setVariables=2]="setVariables",t[t.fetchMore=3]="fetchMore",t[t.refetch=4]="refetch",t[t.poll=6]="poll",t[t.ready=7]="ready",t[t.error=8]="error"}(o||(o={}))},ohXw:function(t,e){e.version="2.4.12"},yOFf:function(t,e,r){"use strict";r.d(e,"a",function(){return h});var o=r("UNrv"),n=r("Jcf3"),i=r("3pyI"),s=r("Y2VA"),a=r("fYNr"),u=r("aDcM"),c=r("7ohL"),l=r("MZmi"),h=function(t){function e(e){var r=e.scheduler,o=e.options,n=e.shouldSubscribe,i=void 0===n||n,s=t.call(this,function(t){return s.onSubscribe(t)})||this;return s.isCurrentlyPolling=!1,s.isTornDown=!1,s.options=o,s.variables=o.variables||{},s.queryId=r.queryManager.generateQueryId(),s.shouldSubscribe=i,s.scheduler=r,s.queryManager=r.queryManager,s.observers=[],s.subscriptionHandles=[],s}return o.b(e,t),e.prototype.result=function(){var t=this;return new Promise(function(e,r){var o,n={next:function(r){e(r),t.observers.some(function(t){return t!==n})||t.queryManager.removeQuery(t.queryId),setTimeout(function(){o.unsubscribe()},0)},error:function(t){r(t)}};o=t.subscribe(n)})},e.prototype.currentResult=function(){if(this.isTornDown)return{data:this.lastError?{}:this.lastResult?this.lastResult.data:{},error:this.lastError,loading:!1,networkStatus:a.a.error};var t,e,r=this.queryManager.queryStore.get(this.queryId);if(t=r,void 0===(e=this.options.errorPolicy)&&(e="none"),t&&(t.graphQLErrors&&t.graphQLErrors.length>0&&"none"===e||t.networkError))return{data:{},loading:!1,networkStatus:r.networkStatus,error:new c.a({graphQLErrors:r.graphQLErrors,networkError:r.networkError})};var i,s=this.queryManager.getCurrentQueryResult(this),u=s.data,l=s.partial,h=!r||r.networkStatus===a.a.loading,y="network-only"===this.options.fetchPolicy&&h||l&&"cache-only"!==this.options.fetchPolicy;i=r?r.networkStatus:y?a.a.loading:a.a.ready;var p={data:u,loading:Object(a.b)(i),networkStatus:i};return r&&r.graphQLErrors&&"all"===this.options.errorPolicy&&(p.errors=r.graphQLErrors),l||(this.lastResult=o.a({},p,{stale:!1}),this.lastResultSnapshot=Object(n.a)(this.lastResult)),o.a({},p,{partial:l})},e.prototype.isDifferentFromLastResult=function(t){var e=this.lastResultSnapshot;return!(e&&t&&e.networkStatus===t.networkStatus&&e.stale===t.stale&&Object(i.a)(e.data,t.data))},e.prototype.getLastResult=function(){return this.lastResult},e.prototype.getLastError=function(){return this.lastError},e.prototype.resetLastResults=function(){delete this.lastResult,delete this.lastResultSnapshot,delete this.lastError,this.isTornDown=!1},e.prototype.refetch=function(t){var e=this.options.fetchPolicy;if("cache-only"===e)return Promise.reject(new Error("cache-only fetchPolicy option should not be used together with query refetch."));Object(i.a)(this.variables,t)||(this.variables=Object.assign({},this.variables,t)),Object(i.a)(this.options.variables,this.variables)||(this.options.variables=Object.assign({},this.options.variables,this.variables));var r="network-only"===e||"no-cache"===e,n=o.a({},this.options,{fetchPolicy:r?e:"network-only"});return this.queryManager.fetchQuery(this.queryId,n,l.a.refetch).then(function(t){return t})},e.prototype.fetchMore=function(t){var e,r=this;if(!t.updateQuery)throw new Error("updateQuery option is required. This function defines how to update the query data with the new results.");return Promise.resolve().then(function(){var n=r.queryManager.generateQueryId();return(e=t.query?t:o.a({},r.options,t,{variables:Object.assign({},r.variables,t.variables)})).fetchPolicy="network-only",r.queryManager.fetchQuery(n,e,l.a.normal,r.queryId)}).then(function(o){return r.updateQuery(function(r){return t.updateQuery(r,{fetchMoreResult:o.data,variables:e.variables})}),o})},e.prototype.subscribeToMore=function(t){var e=this,r=this.queryManager.startGraphQLSubscription({query:t.document,variables:t.variables}).subscribe({next:function(r){t.updateQuery&&e.updateQuery(function(e,o){var n=o.variables;return t.updateQuery(e,{subscriptionData:r,variables:n})})},error:function(e){t.onError?t.onError(e):console.error("Unhandled GraphQL subscription error",e)}});return this.subscriptionHandles.push(r),function(){var t=e.subscriptionHandles.indexOf(r);t>=0&&(e.subscriptionHandles.splice(t,1),r.unsubscribe())}},e.prototype.setOptions=function(t){var e=this.options;this.options=Object.assign({},this.options,t),t.pollInterval?this.startPolling(t.pollInterval):0===t.pollInterval&&this.stopPolling();var r="network-only"!==e.fetchPolicy&&"network-only"===t.fetchPolicy||"cache-only"===e.fetchPolicy&&"cache-only"!==t.fetchPolicy||"standby"===e.fetchPolicy&&"standby"!==t.fetchPolicy||!1;return this.setVariables(this.options.variables,r,t.fetchResults)},e.prototype.setVariables=function(t,e,r){void 0===e&&(e=!1),void 0===r&&(r=!0),this.isTornDown=!1;var n=t||this.variables;return Object(i.a)(n,this.variables)&&!e?0!==this.observers.length&&r?this.result():new Promise(function(t){return t()}):(this.variables=n,this.options.variables=n,0===this.observers.length?new Promise(function(t){return t()}):this.queryManager.fetchQuery(this.queryId,o.a({},this.options,{variables:this.variables})).then(function(t){return t}))},e.prototype.updateQuery=function(t){var e=this.queryManager.getQueryWithPreviousResult(this.queryId),r=e.previousResult,o=e.variables,n=e.document,i=Object(s.b)(function(){return t(r,{variables:o})});i&&(this.queryManager.dataStore.markUpdateQueryResult(n,o,i),this.queryManager.broadcastQueries())},e.prototype.stopPolling=function(){this.isCurrentlyPolling&&(this.scheduler.stopPollingQuery(this.queryId),this.options.pollInterval=void 0,this.isCurrentlyPolling=!1)},e.prototype.startPolling=function(t){if("cache-first"===this.options.fetchPolicy||"cache-only"===this.options.fetchPolicy)throw new Error("Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.");this.isCurrentlyPolling&&(this.scheduler.stopPollingQuery(this.queryId),this.isCurrentlyPolling=!1),this.options.pollInterval=t,this.isCurrentlyPolling=!0,this.scheduler.startPollingQuery(this.options,this.queryId)},e.prototype.onSubscribe=function(t){var e=this;return t._subscription&&t._subscription._observer&&!t._subscription._observer.error&&(t._subscription._observer.error=function(t){console.error("Unhandled error",t.message,t.stack)}),this.observers.push(t),t.next&&this.lastResult&&t.next(this.lastResult),t.error&&this.lastError&&t.error(this.lastError),1===this.observers.length&&this.setUpQuery(),function(){e.observers=e.observers.filter(function(e){return e!==t}),0===e.observers.length&&e.tearDownQuery()}},e.prototype.setUpQuery=function(){var t=this;if(this.shouldSubscribe&&this.queryManager.addObservableQuery(this.queryId,this),this.options.pollInterval){if("cache-first"===this.options.fetchPolicy||"cache-only"===this.options.fetchPolicy)throw new Error("Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.");this.isCurrentlyPolling=!0,this.scheduler.startPollingQuery(this.options,this.queryId)}var e={next:function(e){t.lastResult=e,t.lastResultSnapshot=Object(n.a)(e),t.observers.forEach(function(t){return t.next&&t.next(e)})},error:function(e){t.lastError=e,t.observers.forEach(function(t){return t.error&&t.error(e)})}};this.queryManager.startQuery(this.queryId,this.options,this.queryManager.queryListenerForObserver(this.queryId,this.options,e))},e.prototype.tearDownQuery=function(){this.isTornDown=!0,this.isCurrentlyPolling&&(this.scheduler.stopPollingQuery(this.queryId),this.isCurrentlyPolling=!1),this.subscriptionHandles.forEach(function(t){return t.unsubscribe()}),this.subscriptionHandles=[],this.queryManager.removeObservableQuery(this.queryId),this.queryManager.stopQuery(this.queryId),this.observers=[]},e}(u.a)}}]);
//# sourceMappingURL=bundle.npm.apollo-client.92797428cc05827ee8ea.js.map