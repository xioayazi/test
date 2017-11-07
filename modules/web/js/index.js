/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	//banner
	require('slide');
  $('.banner').slide();
	$('.banner').mouseenter(function(e) {
		$(this).find('.arrs').stop(1,1).fadeIn('fast');
	}).mouseleave(function(e) {
		$(this).find('.arrs').stop(1,1).fadeOut('fast');
	});
	
	//pro
	if(base.getType()=='Pc'){
		$('.ipro-list li:first').addClass('hover').css('width','318px');
		$('.ipro-list li').hover(function(e) {
			$(this).stop(1,1).animate({width:'318px'},260).addClass('hover').siblings('li').stop(1,1).animate({width:'126px'},260).removeClass('hover');
		}); 
	}
	

	//视频
	var typeCatch=base.getType();
  require('video');
  require('box');
	$('.ivideo').find('a').on('click',function(e){
		$('.vjs-tech').trigger('click');
		e.preventDefault();
	  var tmp=$(this).data('v');	
	  videoId='video'+Math.floor(Math.random()*100000)
	  var _dom='<video id='+videoId+' class="video-js vjs-default-skin" oncontextmenu="return false;"><source src='+tmp+' type="video/mp4"><p class="vjs-no-js">不支持js的浏览器会看到这个</p></video>'
		var player
		if(typeCatch=='Mobile'){
			 $.box( _dom,{ onshow:function(){
					player = videojs(videoId, {
					width: 320,
					height: 200,
					poster: '',
					controls:true,
					autoplay:true,
					preload:'auto'
				})
				$('.vjs-big-play-button').trigger('click');
			}, width:320,height:200,title:'视频'} );  
		}else{
		$.box( _dom,{ onshow:function(){
				player = videojs(videoId, {
				width: 700,
				height: 438,
				poster: '',
				controls:true,
				autoplay:true,
				preload:'auto'
			})
			$('.vjs-big-play-button').trigger('click');
			}, width:700,height:438,title:'视频'} );  
		}
	})
	

    $.post("/ext/ajax_index_news.jsp",{flag:"news"},function(data){
			$("#news").html(data);
	})	
	


})