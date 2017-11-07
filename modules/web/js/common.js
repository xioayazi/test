/**
 * name: common
 * version: v2.0.1
 * update: 去掉count模块和环境变量
 * date: 2015-07-07
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var base = require('base');
	var typeCatch = base.getType();

	if(base.browser.ie==6){
		alert('本站不支持IE6访问，请升级IE或使用chrome、Firefox等高级浏览器！');
	}

	//pc模拟多终端检测
	if(window.sessionStorage && sessionStorage.getItem('PcMode')){
		$('body').addClass('PcMode');
		typeCatch = base.getType();
	}
	/*(function() { 
		if( window.sessionStorage && sessionStorage.getItem('browserRedirectLock') ) return;
	    if(!base.browser.isMobile && typeCatch!=='Pc'){
	    	require.async('box',function(){
	    		$.box.confirm('网站即将进入移动模式，点【取消】保持电脑模式', function(){
	    			window.sessionStorage && sessionStorage.setItem('browserRedirectLock','true'); 
	    			$.box.hide();
	    		},function(){
	    			typeCatch = 'Pc';
	    			window.sessionStorage && sessionStorage.setItem('PcMode','Pc'); 
	    		},{
	    			title: "切换到移动模式"
	    		})
	    	})
	    }
	})();*/
	
	//跨屏刷新
	var throttleResize = base.throttle(function(){
			if(base.getType()!==typeCatch) document.location.reload();
		});
	$(window).on('resize',function(){
		throttleResize();
	});

	/*
	* 常用工具
	*/
	//返回顶部
	$('body').on('click','.gotop',function(){$('html,body').stop(1).animate({scrollTop:'0'},300);return false});
	//关闭当前页
	$('body').on('click','.closewin',function(){window.opener=null;window.open("","_self");window.close()});
	//打印当前页
	$('body').on('click','.print',function(){window.print()});
	//加入收藏
	$('body').on('click','.favorite',function(){var sURL = "http:&#47;&#47;"+document.domain+"&#47;",sTitle = document.title;try{window.external.addFavorite(sURL, sTitle)} catch (e){try{window.sidebar.addPanel(sTitle, sURL, "")}catch (e){alert("加入收藏失败，请使用Ctrl+D进行添加")}}});
	//设为首页
	$('body').on('click','.sethome',function(){var vrl="http:&#47;&#47;"+document.domain+"&#47;";if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")}var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',vrl)}else{alert("您的浏览器不支持自动设为首页，请您手动进行设置！")}});
	//屏蔽ie78 console未定义错误
	if (typeof console === 'undefined') {
	    console = { log: function() {}, warn: function() {} }
	}
	//textarea扩展max-length
	$('textarea[max-length]').on('change blur keyup',function(){
		var _val=$(this).val(),_max=$(this).attr('max-length');
		if(_val.length>_max){
			$(this).val(_val.substr(0,_max));
		};
	})
	//延时显示
	$('.opc0').animate({'opacity':'1'},160);
	// placeholder
	$('input, textarea').placeholder();
	//按需渲染
	base.scanpush();
	//响应图片
	base.resImg();
	/*
	* 输出
	*/
	module.exports = {
		demo:function(){
			console.log('hello '+base.getType());
		}
	}

	/*
	* 站内公用
	*/
 
	//导航当前状态
	//var jrChannelArr=jrChannel.split('#');
	//$('.nav').children('li').eq(jrChannelArr[0]).addClass('cur').find('li').eq(jrChannelArr[1]).addClass('cur');
	
	if(base.getType()=='Pc'){
		//页面平滑滚动
		if (base.browser.ie > 8 || base.browser.ie == 0) {
			require('smoothscroll');
		}
	}
	
	//语言版本
	$('.top-lan').mouseenter(function(e) {
		$(this).find('.tlan-v').stop(1,1).slideDown('fast');
	}).mouseleave(function(e) {
		$(this).find('.tlan-v').stop(1,1).slideUp('fast');
	});
	
	
	//nav
	var _li = $('.nav').children('ul').children('li');
	if(base.getType()!='Mobile'){
		_li.each(function(i,e){
			i = i+1;
			$(this).addClass('nav'+i);
		});
		_li.mouseenter(function(){
			$(this).find('.nav_layer').stop(1,1).fadeIn();
			$(this).addClass('hover');
		}).mouseleave(function(){
			$(this).find('.nav_layer').stop(1,1).fadeOut();
			$(this).removeClass('hover');
		});
	}else{
		_li.each(function(i,e) {
			$(this).children('a').after($(this).find('ul'));
			$(this).find('._layer').remove();
		});
		require('offcanvas');
  	$('.nav').offcanvas();	
		
	}
	
	
	//分享
	if(base.getType()!='Mobile'){
		require.async('bdshare',function(bdshare){
			bdshare(
			 [{
						tag : 'share_s',  
						bdSize : 16,      //图标尺寸, 16｜24｜32
						bdStyle : '1'     //图标类型, 0｜1｜2
	
				 },
				 {
						tag : 'share_b',
						bdSize : 24,
						bdStyle: 0
				}])
		 });
	}
	 
	 //foot
	 $('.fb-cygs').mouseenter(function(e) {
		$(this).find('.cygs-v').stop(1,1).slideDown('fast');
	}).mouseleave(function(e) {
		$(this).find('.cygs-v').stop(1,1).slideUp('fast');
	});
	base.topush('.foot');
	
	
	
	$(".posi span").each(function(i){
	   $(this).replaceWith("<em>-</em>");
		//return false;
	 });

	//下层左侧跟随滚动
	if(base.getType()=='Pc'){
		$(document).ready(function(){
			 $(window).scroll(function(){
			  var rightTop  = $(".nmian-right").offset().top;
			  var leftTop = $(".nmian-left").offset().top;
			  var _top=0;
			  var scrollerTop = $(this).scrollTop();
				/*console.log('rightTop=='+rightTop);
				console.log('leftTop=='+leftTop);
				console.log('scrollerTop=='+scrollerTop);
				console.log('nmian-leftHeight=='+$(".nmian-left").height());
				console.log('nmian-rightHeight=='+$(".nmian-right").height());
				console.log('========================');*/
			  if(scrollerTop > rightTop) {
					
			  	if(scrollerTop + $(".nmian-left").height() < rightTop + $(".nmian-right").height()){
				   $(".nmian-left").css({"position":"fixed", "left":$(".nmian-left").offset().left + "px", "top":_top,"width":'252px'});
				  }else{
				   	$(".nmian-left").css({"position":"fixed", "left":$(".nmian-left").offset().left + "px", "top":(_top - (scrollerTop + $(".nmian-left").height() - (rightTop + $(".nmian-right").height())) ) + "px" });
				   }
					 
			  } else {
				   $(".nmian-left").css({"position":"static"});
			  }
			 });
		});
		  	
	}

	
})