/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
/*	//视频
	var typeCatch=base.getType();
  require('video');
  require('box');
	$('.about-video').find('a').on('click',function(e){
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
	})*/
	
	require.async('album',function(){
     $('.pic-list').album({
        title: '._title',
        cell: 'li'
     })
  })
	


})