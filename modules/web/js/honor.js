/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	base.topush('.honor-scroll');
	
	require('./movingboxes');
	$('.honor-focus').movingBoxes({
		startPanel   : 1,       // 从第一个li开始
		reducedSize  : .6,      // 缩小到原图50%的尺寸
		wrap         : true,   // 无缝循环
		buildNav     : true,	// 显示指示器效果
		navFormatter : function(){ return "&#9679;"; } // 指示器格式，为空即会显示123
	});

        
	


})