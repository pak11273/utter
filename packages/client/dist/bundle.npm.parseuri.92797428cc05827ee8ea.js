(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{"8xVO":function(r,e){var t=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,s=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];r.exports=function(r){var e=r,o=r.indexOf("["),a=r.indexOf("]");-1!=o&&-1!=a&&(r=r.substring(0,o)+r.substring(o,a).replace(/:/g,";")+r.substring(a,r.length));for(var n=t.exec(r||""),i={},p=14;p--;)i[s[p]]=n[p]||"";return-1!=o&&-1!=a&&(i.source=e,i.host=i.host.substring(1,i.host.length-1).replace(/;/g,":"),i.authority=i.authority.replace("[","").replace("]","").replace(/;/g,":"),i.ipv6uri=!0),i}}}]);
//# sourceMappingURL=bundle.npm.parseuri.92797428cc05827ee8ea.js.map