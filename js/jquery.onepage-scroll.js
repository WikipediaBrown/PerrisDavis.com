!function($){var defaults={sectionContainer:"section",easing:"ease",animationTime:1e3,pagination:!0,updateURL:!1,keyboard:!0,beforeMove:null,afterMove:null,loop:!0,responsiveFallback:!1,direction:"vertical"}
$.fn.swipeEvents=function(){return this.each(function(){function touchstart(event){var touches=event.originalEvent.touches
touches&&touches.length&&(startX=touches[0].pageX,startY=touches[0].pageY,$this.bind("touchmove",touchmove))}function touchmove(event){var touches=event.originalEvent.touches
if(touches&&touches.length){var deltaX=startX-touches[0].pageX,deltaY=startY-touches[0].pageY
deltaX>=50&&$this.trigger("swipeLeft"),-50>=deltaX&&$this.trigger("swipeRight"),deltaY>=50&&$this.trigger("swipeUp"),-50>=deltaY&&$this.trigger("swipeDown"),(Math.abs(deltaX)>=50||Math.abs(deltaY)>=50)&&$this.unbind("touchmove",touchmove)}}var startX,startY,$this=$(this)
$this.bind("touchstart",touchstart)})},$.fn.onepage_scroll=function(options){function responsive(){var valForTest=!1,typeOfRF=typeof settings.responsiveFallback
"number"===typeOfRF&&(valForTest=$(window).width()<settings.responsiveFallback),"boolean"===typeOfRF&&(valForTest=settings.responsiveFallback),"function"===typeOfRF&&(valFunction=settings.responsiveFallback(),valForTest=valFunction,typeOFv=typeof valForTest,"number"===typeOFv&&(valForTest=$(window).width()<valFunction)),valForTest?($("body").addClass("disabled-onepage-scroll"),$(document).unbind("mousewheel DOMMouseScroll MozMousePixelScroll"),el.swipeEvents().unbind("swipeDown swipeUp")):($("body").hasClass("disabled-onepage-scroll")&&($("body").removeClass("disabled-onepage-scroll"),$("html, body, .wrapper").animate({scrollTop:0},"fast")),el.swipeEvents().bind("swipeDown",function(event){$("body").hasClass("disabled-onepage-scroll")||event.preventDefault(),el.moveUp()}).bind("swipeUp",function(event){$("body").hasClass("disabled-onepage-scroll")||event.preventDefault(),el.moveDown()}),$(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(event){event.preventDefault()
var delta=event.originalEvent.wheelDelta||-event.originalEvent.detail
init_scroll(event,delta)}))}function init_scroll(event,delta){deltaOfInterest=delta
var timeNow=(new Date).getTime()
return timeNow-lastAnimation<quietPeriod+settings.animationTime?void event.preventDefault():(deltaOfInterest<0?el.moveDown():el.moveUp(),void(lastAnimation=timeNow))}var settings=$.extend({},defaults,options),el=$(this),sections=$(settings.sectionContainer)
if(total=sections.length,status="off",topPos=0,leftPos=0,lastAnimation=0,quietPeriod=500,paginationList="",$.fn.transformPage=function(settings,pos,index){if("function"==typeof settings.beforeMove&&settings.beforeMove(index),$("html").hasClass("ie8"))if("horizontal"===settings.direction){var toppos=el.width()/100*pos
$(this).animate({left:toppos+"px"},settings.animationTime)}else{var toppos=el.height()/100*pos
$(this).animate({top:toppos+"px"},settings.animationTime)}else $(this).css({"-webkit-transform":"horizontal"===settings.direction?"translate3d("+pos+"%, 0, 0)":"translate3d(0, "+pos+"%, 0)","-webkit-transition":"all "+settings.animationTime+"ms "+settings.easing,"-moz-transform":"horizontal"===settings.direction?"translate3d("+pos+"%, 0, 0)":"translate3d(0, "+pos+"%, 0)","-moz-transition":"all "+settings.animationTime+"ms "+settings.easing,"-ms-transform":"horizontal"===settings.direction?"translate3d("+pos+"%, 0, 0)":"translate3d(0, "+pos+"%, 0)","-ms-transition":"all "+settings.animationTime+"ms "+settings.easing,transform:"horizontal"===settings.direction?"translate3d("+pos+"%, 0, 0)":"translate3d(0, "+pos+"%, 0)",transition:"all "+settings.animationTime+"ms "+settings.easing})
$(this).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(e){"function"==typeof settings.afterMove&&settings.afterMove(index)})},$.fn.moveDown=function(){var el=$(this)
if(index=$(settings.sectionContainer+".active").data("index"),current=$(settings.sectionContainer+"[data-index='"+index+"']"),next=$(settings.sectionContainer+"[data-index='"+(index+1)+"']"),next.length<1){if(settings.loop!==!0)return
pos=0,next=$(settings.sectionContainer+"[data-index='1']")}else pos=100*index*-1
if("function"==typeof settings.beforeMove&&settings.beforeMove(next.data("index")),current.removeClass("active"),next.addClass("active"),settings.pagination===!0&&($(".onepage-pagination li a[data-index='"+index+"']").removeClass("active"),$(".onepage-pagination li a[data-index='"+next.data("index")+"']").addClass("active")),$("body")[0].className=$("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,""),$("body").addClass("viewing-page-"+next.data("index")),history.replaceState&&settings.updateURL===!0){window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(index+1)}el.transformPage(settings,pos,next.data("index"))},$.fn.moveUp=function(){var el=$(this)
if(index=$(settings.sectionContainer+".active").data("index"),current=$(settings.sectionContainer+"[data-index='"+index+"']"),next=$(settings.sectionContainer+"[data-index='"+(index-1)+"']"),next.length<1){if(settings.loop!==!0)return
pos=100*(total-1)*-1,next=$(settings.sectionContainer+"[data-index='"+total+"']")}else pos=100*(next.data("index")-1)*-1
if("function"==typeof settings.beforeMove&&settings.beforeMove(next.data("index")),current.removeClass("active"),next.addClass("active"),settings.pagination===!0&&($(".onepage-pagination li a[data-index='"+index+"']").removeClass("active"),$(".onepage-pagination li a[data-index='"+next.data("index")+"']").addClass("active")),$("body")[0].className=$("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,""),$("body").addClass("viewing-page-"+next.data("index")),history.replaceState&&settings.updateURL===!0){window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(index-1)}el.transformPage(settings,pos,next.data("index"))},$.fn.moveTo=function(page_index){if(current=$(settings.sectionContainer+".active"),next=$(settings.sectionContainer+"[data-index='"+page_index+"']"),next.length>0){if("function"==typeof settings.beforeMove&&settings.beforeMove(next.data("index")),current.removeClass("active"),next.addClass("active"),$(".onepage-pagination li a.active").removeClass("active"),$(".onepage-pagination li a[data-index='"+page_index+"']").addClass("active"),$("body")[0].className=$("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,""),$("body").addClass("viewing-page-"+next.data("index")),pos=100*(page_index-1)*-1,history.replaceState&&settings.updateURL===!0){window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(page_index-1)}el.transformPage(settings,pos,page_index)}},el.addClass("onepage-wrapper").css("position","relative"),$.each(sections,function(i){$(this).css({position:"absolute",top:topPos+"%"}).addClass("section").attr("data-index",i+1),$(this).css({position:"absolute",left:"horizontal"===settings.direction?leftPos+"%":0,top:"vertical"===settings.direction||"horizontal"!=settings.direction?topPos+"%":0}),"horizontal"===settings.direction?leftPos+=100:topPos+=100,settings.pagination===!0&&(paginationList+="<li><a data-index='"+(i+1)+"' href='#"+(i+1)+"'></a></li>")}),el.swipeEvents().bind("swipeDown",function(event){$("body").hasClass("disabled-onepage-scroll")||event.preventDefault(),el.moveUp()}).bind("swipeUp",function(event){$("body").hasClass("disabled-onepage-scroll")||event.preventDefault(),el.moveDown()}),settings.pagination===!0&&($("ul.onepage-pagination").length<1&&$("<ul class='onepage-pagination'></ul>").prependTo("body"),"horizontal"===settings.direction?(posLeft=el.find(".onepage-pagination").width()/2*-1,el.find(".onepage-pagination").css("margin-left",posLeft)):(posTop=el.find(".onepage-pagination").height()/2*-1,el.find(".onepage-pagination").css("margin-top",posTop)),$("ul.onepage-pagination").html(paginationList)),""!=window.location.hash&&"#1"!=window.location.hash)if(init_index=window.location.hash.replace("#",""),parseInt(init_index)<=total&&parseInt(init_index)>0){if($(settings.sectionContainer+"[data-index='"+init_index+"']").addClass("active"),$("body").addClass("viewing-page-"+init_index),settings.pagination===!0&&$(".onepage-pagination li a[data-index='"+init_index+"']").addClass("active"),next=$(settings.sectionContainer+"[data-index='"+init_index+"']"),next&&(next.addClass("active"),settings.pagination===!0&&$(".onepage-pagination li a[data-index='"+init_index+"']").addClass("active"),$("body")[0].className=$("body")[0].className.replace(/\bviewing-page-\d.*?\b/g,""),$("body").addClass("viewing-page-"+next.data("index")),history.replaceState&&settings.updateURL===!0)){window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+init_index}pos=100*(init_index-1)*-1,el.transformPage(settings,pos,init_index)}else $(settings.sectionContainer+"[data-index='1']").addClass("active"),$("body").addClass("viewing-page-1"),settings.pagination===!0&&$(".onepage-pagination li a[data-index='1']").addClass("active")
else $(settings.sectionContainer+"[data-index='1']").addClass("active"),$("body").addClass("viewing-page-1"),settings.pagination===!0&&$(".onepage-pagination li a[data-index='1']").addClass("active")
return settings.pagination===!0&&$(".onepage-pagination li a").click(function(e){e.preventDefault()
var page_index=$(this).data("index")
el.moveTo(page_index)}),$(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(event){event.preventDefault()
var delta=event.originalEvent.wheelDelta||-event.originalEvent.detail
$("body").hasClass("disabled-onepage-scroll")||init_scroll(event,delta)}),0!=settings.responsiveFallback&&($(window).resize(function(){responsive()}),responsive()),settings.keyboard===!0&&$(document).keydown(function(e){var tag=e.target.tagName.toLowerCase()
if(!$("body").hasClass("disabled-onepage-scroll"))switch(e.which){case 38:"input"!=tag&&"textarea"!=tag&&el.moveUp()
break
case 40:"input"!=tag&&"textarea"!=tag&&el.moveDown()
break
case 32:"input"!=tag&&"textarea"!=tag&&el.moveDown()
break
case 33:"input"!=tag&&"textarea"!=tag&&el.moveUp()
break
case 34:"input"!=tag&&"textarea"!=tag&&el.moveDown()
break
case 36:el.moveTo(1)
break
case 35:el.moveTo(total)
break
default:return}}),!1}}(window.jQuery)
