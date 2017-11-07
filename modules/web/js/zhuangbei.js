/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	//视频
	var typeCatch=base.getType();
  require('video');
  require('box');
	$('.zhuangbei-video').find('a').on('click',function(e){
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

	
	$('.zbtab-key li').on('mouseenter', function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
		var id=$(this).data('sid');
		//alert(id);
		/*$.ajax({
			type: 'get',
			url: "/ext/ajax_udata.jsp",
			dataType:"html",
			data:{sid:id,flag:'zhuangbei'},
			success: function(msg){
				$("#caseList").html(msg);
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
			}
		});*/
		if(id==1){
			$("#caseList").html("<img src='images/04731eaef2fd47768d969617b03f1f5d.jpg' alt='洗烘灌封联动线'/><div class='_cover'><div class='_title'>洗烘灌封联动线</div><div class='_sum'><p>国内第一条采用“L”型设计的联动线，其优点是：人流与物流有效分开，减少交叉污染的风险；操作区与维护区有效分开，降低因维护造成对无菌区污染的风险。</p></div></div>");
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
		}
		if(id==2){
			$("#caseList").html("<img src='images/78421c058d42452f8856f9c7e55d49d9.jpg' alt='物料输送转运系统'/><div class='_cover'><div class='_title'>洗烘灌封联动线</div><div class='_sum'><p>国内第一条采用“L”型设计的联动线，其优点是：人流与物流有效分开，减少交叉污染的风险；操作区与维护区有效分开，降低因维护造成对无菌区污染的风险。</p></div></div>");
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
		}
		if(id==3){
			$("#caseList").html("<img src='images/45589eeb488e43248d2bb2d3395a0051.jpg' alt='洗烘灌封联动线'/><div class='_cover'><div class='_title'>洗烘灌封联动线</div><div class='_sum'><p>国内第一条采用“L”型设计的联动线，其优点是：人流与物流有效分开，减少交叉污染的风险；操作区与维护区有效分开，降低因维护造成对无菌区污染的风险。</p></div></div>");
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
		}
		if(id==4){
			$("#caseList").html("<img src='images/342aa44105154235b1b6d96521005d73.jpg' alt='洗烘灌封联动线'/><div class='_cover'><div class='_title'>洗烘灌封联动线</div><div class='_sum'><p>国内第一条采用“L”型设计的联动线，其优点是：人流与物流有效分开，减少交叉污染的风险；操作区与维护区有效分开，降低因维护造成对无菌区污染的风险。</p></div></div>");
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
		}
		if(id==5){
			$("#caseList").html("<img src='images/f48b47aa818f422c86bb5b8c6e2c5262.jpg' alt='洗烘灌封联动线'/><div class='_cover'><div class='_title'>洗烘灌封联动线</div><div class='_sum'><p>国内第一条采用“L”型设计的联动线，其优点是：人流与物流有效分开，减少交叉污染的风险；操作区与维护区有效分开，降低因维护造成对无菌区污染的风险。</p></div></div>");
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
		}
		if(id==6){
			$("#caseList").html("<img src='images/5dd55496e0b44c05b7da88d1be752856.jpg' alt='洗烘灌封联动线'/><div class='_cover'><div class='_title'>洗烘灌封联动线</div><div class='_sum'><p>国内第一条采用“L”型设计的联动线，其优点是：人流与物流有效分开，减少交叉污染的风险；操作区与维护区有效分开，降低因维护造成对无菌区污染的风险。</p></div></div>");
				setTimeout(function() {
					$("#caseList").find('._cover').addClass('on').end().find('img').addClass('show_on');
				}, 100)
		}
		
	}).first().trigger('mouseenter');
	
	
	
	

        
	


})