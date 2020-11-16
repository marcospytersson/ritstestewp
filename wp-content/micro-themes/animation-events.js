!function(){"use strict";var e=0,r={};function n(t){if(!t)throw new Error("No options passed to MTWaypoint constructor");if(!t.element)throw new Error("No element option passed to MTWaypoint constructor");if(!t.handler)throw new Error("No handler option passed to MTWaypoint constructor");this.key="waypoint-"+e,this.options=n.Adapter.extend({},n.defaults,t),this.element=this.options.element,this.adapter=new n.Adapter(this.element),this.callback=t.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=n.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=n.Context.findOrCreateByElement(this.options.context),n.offsetAliases[this.options.offset]&&(this.options.offset=n.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),r[this.key]=this,e+=1}n.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},n.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},n.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete r[this.key]},n.prototype.disable=function(){return this.enabled=!1,this},n.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},n.prototype.next=function(){return this.group.next(this)},n.prototype.previous=function(){return this.group.previous(this)},n.invokeAll=function(t){var e=[];for(var n in r)e.push(r[n]);for(var i=0,o=e.length;i<o;i++)e[i][t]()},n.destroyAll=function(){n.invokeAll("destroy")},n.disableAll=function(){n.invokeAll("disable")},n.enableAll=function(){for(var t in n.Context.refreshAll(),r)r[t].enabled=!0;return this},n.refreshAll=function(){n.Context.refreshAll()},n.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},n.viewportWidth=function(){return document.documentElement.clientWidth},n.adapters=[],n.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},n.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.MTWaypoint=n}(),function(){"use strict";function e(t){window.setTimeout(t,1e3/60)}var n=0,i={},v=window.MTWaypoint,t=window.onload;function o(t){this.element=t,this.Adapter=v.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,n+=1,v.windowContext||(v.windowContext=!0,v.windowContext=new o(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}o.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},o.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),n=this.element==this.element.window;t&&e&&!n&&(this.adapter.off(".waypoints"),delete i[this.key])},o.prototype.createThrottledResizeHandler=function(){var t=this;function e(){t.handleResize(),t.didResize=!1}this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,v.requestAnimationFrame(e))})},o.prototype.createThrottledScrollHandler=function(){var t=this;function e(){t.handleScroll(),t.didScroll=!1}this.adapter.on("scroll.waypoints",function(){t.didScroll&&!v.isTouch||(t.didScroll=!0,v.requestAnimationFrame(e))})},o.prototype.handleResize=function(){v.Context.refreshAll()},o.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var i=e[n],o=i.newScroll>i.oldScroll?i.forward:i.backward;for(var r in this.waypoints[n]){var s,a,l=this.waypoints[n][r];null!==l.triggerPoint&&(s=i.oldScroll<l.triggerPoint,a=i.newScroll>=l.triggerPoint,(s&&a||!s&&!a)&&(l.queueTrigger(o),t[l.group.id]=l.group))}}for(var h in t)t[h].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},o.prototype.innerHeight=function(){return this.element==this.element.window?v.viewportHeight():this.adapter.innerHeight()},o.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},o.prototype.innerWidth=function(){return this.element==this.element.window?v.viewportWidth():this.adapter.innerWidth()},o.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var i=0,o=t.length;i<o;i++)t[i].destroy()},o.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),i={};for(var o in this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var r=t[o];for(var s in this.waypoints[o]){var a,l,h,c,p=this.waypoints[o][s],d=p.options.offset,u=p.triggerPoint,f=0,w=null==u;p.element!==p.element.window&&(f=p.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(p):"string"==typeof d&&(d=parseFloat(d),-1<p.options.offset.indexOf("%")&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,p.triggerPoint=Math.floor(f+a-d),l=u<r.oldScroll,h=p.triggerPoint>=r.oldScroll,c=!l&&!h,!w&&(l&&h)?(p.queueTrigger(r.backward),i[p.group.id]=p.group):(!w&&c||w&&r.oldScroll>=p.triggerPoint)&&(p.queueTrigger(r.forward),i[p.group.id]=p.group)}}return v.requestAnimationFrame(function(){for(var t in i)i[t].flushTriggers()}),this},o.findOrCreateByElement=function(t){return o.findByElement(t)||new o(t)},o.refreshAll=function(){for(var t in i)i[t].refresh()},o.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){t&&t(),o.refreshAll()},v.requestAnimationFrame=function(t){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e).call(window,t)},v.Context=o}(),function(){"use strict";function s(t,e){return t.triggerPoint-e.triggerPoint}function a(t,e){return e.triggerPoint-t.triggerPoint}var e={vertical:{},horizontal:{}},n=window.MTWaypoint;function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),e[this.axis][this.name]=this}i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var t in this.triggerQueues){var e=this.triggerQueues[t],n="up"===t||"left"===t;e.sort(n?a:s);for(var i=0,o=e.length;i<o;i+=1){var r=e[i];!r.options.continuous&&i!==e.length-1||r.trigger([t])}}this.clearTriggerQueues()},i.prototype.next=function(t){this.waypoints.sort(s);var e=n.Adapter.inArray(t,this.waypoints);return e===this.waypoints.length-1?null:this.waypoints[e+1]},i.prototype.previous=function(t){this.waypoints.sort(s);var e=n.Adapter.inArray(t,this.waypoints);return e?this.waypoints[e-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);-1<e&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return e[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";var t=window.MTWaypoint;function i(t){return t===t.window}function o(t){return i(t)?t:t.defaultView}function e(t){this.element=t,this.handlers={}}e.prototype.innerHeight=function(){return i(this.element)?this.element.innerHeight:this.element.clientHeight},e.prototype.innerWidth=function(){return i(this.element)?this.element.innerWidth:this.element.clientWidth},e.prototype.off=function(t,e){function n(t,e,n){for(var i=0,o=e.length-1;i<o;i++){var r=e[i];n&&n!==r||t.removeEventListener(r)}}var i=t.split("."),o=i[0],r=i[1],s=this.element;if(r&&this.handlers[r]&&o)n(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var a in this.handlers)n(s,this.handlers[a][o]||[],e),this.handlers[a][o]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])n(s,this.handlers[r][l],e);this.handlers[r]={}}},e.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,e=o(this.element.ownerDocument),n={top:0,left:0};return this.element.getBoundingClientRect&&(n=this.element.getBoundingClientRect()),null===e&&(e=window),{top:n.top+e.pageYOffset-t.clientTop,left:n.left+e.pageXOffset-t.clientLeft}},e.prototype.on=function(t,e){var n=t.split("."),i=n[0],o=n[1]||"__default",r=this.handlers[o]=this.handlers[o]||{};(r[i]=r[i]||[]).push(e),this.element.addEventListener(i,e)},e.prototype.outerHeight=function(t){var e,n=this.innerHeight();return t&&!i(this.element)&&(e=window.getComputedStyle(this.element),n+=parseInt(e.marginTop,10),n+=parseInt(e.marginBottom,10)),n},e.prototype.outerWidth=function(t){var e,n=this.innerWidth();return t&&!i(this.element)&&(e=window.getComputedStyle(this.element),n+=parseInt(e.marginLeft,10),n+=parseInt(e.marginRight,10)),n},e.prototype.scrollLeft=function(){var t=o(this.element);return t?t.pageXOffset:this.element.scrollLeft},e.prototype.scrollTop=function(){var t=o(this.element);return t?t.pageYOffset:this.element.scrollTop},e.extend=function(){var t=Array.prototype.slice.call(arguments);for(var e=1,n=t.length;e<n;e++)!function(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}(t[0],t[e]);return t[0]},e.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},e.isEmptyObject=function(t){for(var e in t)return!1;return!0},t.adapters.push({name:"noframework",Adapter:e}),t.Adapter=e}(),function(){"use strict";function t(){}var i=window.MTWaypoint;function e(t){this.options=i.Adapter.extend({},e.defaults,t),this.axis=this.options.horizontal?"horizontal":"vertical",this.waypoints=[],this.element=this.options.element,this.createMTWaypoints()}e.prototype.createMTWaypoints=function(){for(var t={vertical:[{down:"enter",up:"exited",offset:"100%"},{down:"entered",up:"exit",offset:"bottom-in-view"},{down:"exit",up:"entered",offset:0},{down:"exited",up:"enter",offset:function(){return-this.adapter.outerHeight()}}],horizontal:[{right:"enter",left:"exited",offset:"100%"},{right:"entered",left:"exit",offset:"right-in-view"},{right:"exit",left:"entered",offset:0},{right:"exited",left:"enter",offset:function(){return-this.adapter.outerWidth()}}]},e=0,n=t[this.axis].length;e<n;e++){var i=t[this.axis][e];this.createMTWaypoint(i)}},e.prototype.createMTWaypoint=function(t){var e,n=this;this.waypoints.push(new i({context:this.options.context,element:this.options.element,enabled:this.options.enabled,handler:function(t){n.options[e[t]].call(n,t)},offset:(e=t).offset,horizontal:this.options.horizontal}))},e.prototype.destroy=function(){for(var t=0,e=this.waypoints.length;t<e;t++)this.waypoints[t].destroy();this.waypoints=[]},e.prototype.disable=function(){for(var t=0,e=this.waypoints.length;t<e;t++)this.waypoints[t].disable()},e.prototype.enable=function(){for(var t=0,e=this.waypoints.length;t<e;t++)this.waypoints[t].enable()},e.defaults={context:window,enabled:!0,enter:t,entered:t,exit:t,exited:t},i.Inview=e}(),jQuery(document).ready(function(w){var t=function(){var t=!1;window.top.TvrMT?t=window.top:window.parent.TvrMT?t=window.parent:window.parent.parent&&window.parent.parent.TvrMT&&(t=window.parent.parent);var e=t?t.TvrMT:{},u={click:!1,inview:!1,inview_once:!1,mouseenter:!1,focus:!1},f={isInsideMT:t,data:{},boundEls:w.extend({},!0,u),targetEls:w.extend({},!0,u),customEvents:[],eventClasses:[],isTargetingMode:function(){return f.isInsideMT&&e.TvrUi.intelli},mediaMatches:function(t){return window.matchMedia(t).matches},isDomEl:function(t){return t&&t.prop&&t.prop("tagName")},jquery_compat:function(t){try{return w(t)}catch(t){return!1}},resolve_active_target:function(t,e,n){if(t.target){if(t.relative_dom){for(var i=0;i<t.relative_dom.length;i++){var o=t.relative_dom[i];switch(o.directive){case"parent":e=e.parent(o.selector);break;case"parents":e=e.parents(o.selector);break;case"closest":e=e.closest(o.selector);break;case"children":e=e.children(o.selector);break;case"find":e=e.find(o.selector);break;case"next":e=e.next(o.selector);break;case"prev":e=e.prev(o.selector);break;case"siblings":e=e.siblings(o.selector)}}return f.isDomEl(e)?(f.update_cached_els("targetEls",t.event,e),e):n}return n}return e},update_cached_els:function(t,e,n){f[t][e]?f[t][e]=w(f[t][e]).add(n):f[t][e]=n},apply_effect:function(e){if(!e.eventObj.mq||window.matchMedia(e.eventObj.mq).matches){var n=f.resolve_active_target(e.eventObj,e.$el,e.$target_els);if(n.hasClass(e.evt_class)&&(n.removeClass(e.evt_class),"transition"===e.eventObj.type))return!1;if(window.requestAnimationFrame(function(t){window.requestAnimationFrame(function(t){n.addClass(e.evt_class)})}),f.after_animation(n,{type:e.eventObj.type,args:[e],cb:function(t){"inview_once"==t.event&&t.waypoint.destroy()}}),"transition"===e.eventObj.type){var t=!1;switch(e.event){case"mouseenter":t="mouseleave";break;case"focus":t="blur"}t&&e.$el.on(t,null,e,function(t){n.removeClass(e.evt_class)})}}},after_animation:function(t,e){var n="transition"==e.type?"transitionend.tvr webkitTransitionEnd.tvr oTransitionEnd.tvr otransitionend.tvr MSTransitionEnd.tvr":"oanimationend.tvr animationend.tvr webkitAnimationEnd.tvr";t.on(n,function(){e.cb.apply(this,e.args),t.off(n)})},refresh_event_binding:function(){if(window.MT_Events_Data&&MT_Events_Data===Object(MT_Events_Data)){MTWaypoint.destroyAll();var t,e=w(),n=f.customEvents.join(" ");for(var i in f.boundEls){f.boundEls.hasOwnProperty(i)&&(t=f.boundEls[i],c=f.targetEls[i],t&&"inview"!==i&&"inview_once"!==i&&t.off(n),c&&(e=e.add(c)))}e.removeClass(f.eventClasses.join(" ")),f.boundEls=w.extend({},!0,u),f.targetEls=w.extend({},!0,u);var o=MT_Events_Data;for(var r in o)if(o.hasOwnProperty(r))for(var s=o[r],a=0;a<s.length;a++){var l=s[a],h=f.jquery_compat(l.code),c=l.target?f.jquery_compat(l.target):h,p="focus"===r?"mt-js_"+r:"mt-"+r,d=r+".tvr-"+l.mqKey;f.update_cached_els("boundEls",r,h),l.relative_dom||f.update_cached_els("targetEls",r,c),w.inArray(p,f.eventClasses)<0&&f.eventClasses.push(p),"inview"!==r&&"inview_once"!==r&&w.inArray(d,f.customEvents)<0&&f.customEvents.push(d),h&&h.each(function(t){var e=w(this),n=e[0],i={$el:e,$target_els:c,event:r,evt_class:p,custom_event:d,eventObj:l};switch(r){case"click":case"mouseenter":case"focus":e.on(d,null,i,function(t){"click"===i.event&&f.isTargetingMode()||t.stopPropagation(),f.apply_effect(i)});break;case"inview":case"inview_once":new MTWaypoint.Inview({element:n,group:r,enabled:!1,mt:i,enter:function(t){this.options.mt.waypoint=this,f.apply_effect(this.options.mt)},exit:function(t){var e=this.options.mt;"transition"===e.eventObj.type&&"inview_once"!==e.event&&f.resolve_active_target(e.eventObj,e.$el,e.$target_els).removeClass(e.evt_class)}}).enable()}})}}}};return f}();t.refresh_event_binding(),window.MT_Events_Manager=t});