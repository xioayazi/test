/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	
	
	if(base.getType()=="Pc"){
		//类别
		$('.pcat-list li').hover(function(e) {
			$(this).addClass('hover');
		},function(e) {
			$(this).removeClass('hover');
		});
		
		//产品
		$('.pro-list li').hover(function(e) {
			$(this).addClass('hover');
			$(this).find('._sum').stop(1,1).slideDown(256);
		},function(e) {
			$(this).removeClass('hover');
			$(this).find('._sum').stop(1,1).slideUp(256);
		});
	}
	
	
		
		
	



})