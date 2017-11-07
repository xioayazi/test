/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	if(base.getType()!="Mobile"){
		$('.gongyi-list li:odd').addClass('odd');
		$('.gongyi-list li').hover(function(e) {
			$(this).addClass('hover');
		},function(e) {
			$(this).removeClass('hover');
		});
	}
	


})