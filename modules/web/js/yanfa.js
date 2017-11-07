/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');


	$(function() {
		if (base.getType() === 'Pc') {
			require('./movingboxes.js');
			$('.yanfa_slide ._list').movingBoxes({
				startPanel: 1, // 从第一个li开始
				reducedSize: .32, // 缩小到原图50%的尺寸
				wrap: true // 无缝循环
				/*	buildNav: true, // 显示指示器效果
					navFormatter: function() {
							return "&#9679;";
						} // 指示器格式，为空即会显示123*/
			});
		} else {
			$('.yanfa_slide').slide({

			});
		}
	});


	require.async('album', function() {
		$('.pic-list').album({
			title: '._title',
			cell: 'li'
		})
	})
	var page = 2;
	var size = 2;

	$('.load_more').on('click', function(event) {
		$.post("/ext/ajax_img.jsp", {
			page: page,
			catId: "1211"
		}, function(data) {
			var d = $.trim(data);
			if (d != null && d != '') {
				$("#imgmore").append(data);
				require.async('album', function() {
					$('.pic-list').album({
						title: '._title',
						cell: 'li'
					})
				})
				page++;
			} else {
				$('.load_more').hide();
			}
		})

	});



})