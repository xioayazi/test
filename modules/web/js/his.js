/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');

	var iScrollPos = 0;

	var wHeight = $(window).height();

	// init
	var blowFixed = $('.blow-fixed');
	var midpoint = wHeight / 2;
	// console.log("midpoint",midpoint);

	//listener
	$(window).resize(function() {
		wHeight = $(window).height();
		midpoint = wHeight / 2;
		// console.log("midpoint",midpoint);
	});

	var timeline = $('.timeline');
	if((timeline.length > 0) && !$('body').hasClass('breakpoints-768')) {
		if(base.getType() != 'Mobile') {
			console.log(1);
			$(window).scroll(function() {
				checkTimeline();
			});
			checkTimeline();
			console.log(2);
		}
	}

	function checkTimeline() {
		var timelineOffsetTop = timeline.offset().top;
		var timelineHeight = timeline.height();

		var timelineDetail = timeline.find('.timeline-detail');
		var lastTimelineDetail = timelineDetail.filter(':last');
		var lastTimelineDetailOffsetTop = lastTimelineDetail.offset().top;

		blowFixed.css("top", midpoint + "px");

		var iCurScrollPos = $(this).scrollTop() + midpoint;
		// console.log(iCurScrollPos, midpoint);

		if(iCurScrollPos >= timelineOffsetTop && iCurScrollPos <= (timelineOffsetTop + timelineHeight)) { //if within the top dot and the bottom of timeline

			// console.log("within");

			blowFixed.css('display', function() {
				return iCurScrollPos >= lastTimelineDetailOffsetTop ? 'none' : 'block';
			});

			timelineDetail.each(function(index, element) {
				var self = $(element);
				var selfOffsetTop = self.offset().top;
				var selfOffsetBottom = selfOffsetTop + self.height();

				if(iCurScrollPos > iScrollPos) { //if scrolling down
					// console.log("v");
					if(iCurScrollPos >= selfOffsetTop) {
						// if (iCurScrollPos >= selfOffsetTop && iCurScrollPos <= selfOffsetBottom) {
						timelineDetail.removeClass('timeline-active');
						self.addClass('timeline-active');
						self.find('.timeline-effect').fadeIn('slow');
						// self.find('.timeline-effect').css("display","block");
					}
				} else { //scrolling up
					// console.log("^");
					if(iCurScrollPos <= selfOffsetTop + 100) {
						// if (iCurScrollPos >= selfOffsetTop && iCurScrollPos <= selfOffsetTop + 100) {
						timelineDetail.removeClass('timeline-active');
						self.addClass('timeline-active');
						self.find('.timeline-effect').fadeOut('slow');
						// self.find('.timeline-effect').css("display","none");
					}
				}
			});
			iScrollPos = iCurScrollPos;

		} else {
			// console.log("outside");
			blowFixed.css('display', 'none');

			if(iCurScrollPos < timelineOffsetTop) { //hide all
				timelineDetail.each(function(index, element) {
					var self = $(element);
					var selfOffsetTop = self.offset().top;
					var selfOffsetBottom = selfOffsetTop + self.height();

					timelineDetail.removeClass('timeline-active');
					self.addClass('timeline-active');
					self.find('.timeline-effect').fadeOut('slow');
					// self.find('.timeline-effect').css("display","none");
				});
			} else if(iCurScrollPos > (timelineOffsetTop + timelineHeight)) { //show all
				timelineDetail.each(function(index, element) {
					var self = $(element);
					var selfOffsetTop = self.offset().top;
					var selfOffsetBottom = selfOffsetTop + self.height();

					timelineDetail.removeClass('timeline-active');
					self.addClass('timeline-active');
					self.find('.timeline-effect').fadeIn('slow');
				});
			}

		} //else
	}

	$('.timeline .timeline-detail:last').addClass('last_item');

	

})