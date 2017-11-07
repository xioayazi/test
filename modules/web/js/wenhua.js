/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	$('.dianboShow li').mouseenter(function() {
		if(!$(this).hasClass('cur')){
			$(this).find('.ico_w img').stop().animate({
				width: 0
			}, 160);
			$(this).find('.ico_b img').stop().delay(160).animate({
				width: 179
			}, 160);
		}
	}).mouseleave(function() {
		if(!$(this).hasClass('cur')){
			$(this).find('.ico_b img').stop().animate({
				width: 0
			}, 160);
			$(this).find('.ico_w img').stop().delay(160).animate({
				width: 179
			}, 160);
		}
	});
	
	$('.dianboShow li').each(function(index, element) {
		if($(this).hasClass('cur')){
			$(this).find('.ico_b img').css('width','179px');
			$(this).find('.ico_w img').css('width','0');
		}
	});
	
	require('tab');
  $('.wenhua-tab').tab({posi_auto:false});
        
	


})