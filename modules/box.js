/*
 * name: box.js
 * version: v3.8.3
 * update: resize监听bug
 * date: 2016-02-03                                                       
 * base on: zhangxinxu
 */
define('box', function(require, exports, module) {
	seajs.importStyle('.wrap_close a,.wrap_close a:hover{text-decoration:none}\
		.wrap_close a,.wrap_msg_clo{text-align:center;cursor:pointer}\
		#boxBlank{display:none; position:fixed;z-index:99;left:0;top:0;width:100%;height:100%;background:#000;filter:alpha(opacity=50);\
		background:rgba(0,0,0,0);-webkit-transition:background ease-in-out .2s;transition:background ease-in-out .2s}\
		#boxBlank.active{display:block}\
		#boxBlank.show{background:rgba(0,0,0,.5)}\
		.wrap_out{z-index:100;}\
		.wrap_out_posi{position:absolute;border-radius:4px;overflow:hidden;max-width:100%;}\
		.wrap_out_posi.init{-webkit-transform:scale(.5);transform:scale(.5)}\
		.wrap_out_posi.show{-webkit-transform:scale(1);transform:scale(1);-webkit-transition:all .1s ease-in-out;transition:all .1s ease-in-out}\
		.wrap_out_drag{-webkit-transition:none;transition:none}\
		.wrap_hide{opacity:0!important;top:-20%!important}\
		.wrap_bar{background:#434343;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\
		.wrap_title{line-height:30px;padding-left:10px;margin:0;font-weight:400;font-size:15px;color:#fff}\
		.wrap_close{position:relative}\
		.wrap_close a{width:20px;height:20px;margin-top:-26px;color:#fff;font:700 1.5em/20px Tahoma;position:absolute;right:6px}\
		.wrap_body{background:#fff}\
		.wrap_remind{padding:2em 2em 1em;min-width:14em;overflow:hidden}\
		.wrap_foot{padding:0 2em 2em;text-align:center}\
		.wrap_foot .btn{margin:0 4px;min-width:6em}\
		.wrap_msg{position:relative;width:500px;max-width:100%}\
		.wrap_msg_cont{padding:15px 40px 15px 15px;line-height:22px}\
		.wrap_msg_clo{position:absolute;width:30px;height:50px;line-height:50px;right:0;top:0}\
		.wrap_msg_clo .ion{margin:0;font-size:16px}\
		.wrap_msg_clo:hover{opacity:.8}', module.uri);
	var $ = require('jquery');
	var base = require('base');
	var Language = [{
			close: "关闭",
			confirm: "确认",
			cancel: "取消",
			loading: "加载中...",
			error: "加载出了点问题"
		}, {
			close: "close",
			confirm: "confirm",
			cancel: "cancel",
			loading: "loading...",
			error: "something is wrong"
		}],
		def = {
			title: "对话框",
			oktext: null,
			canceltext: null,
			shut: "×",
			width: "auto",
			height: "auto",
			layout: true, //是否使用默认弹出框
			setposi: true, //是否自动定位
			hook: null, //自定义样式名
			bar: true, //是否显示标题栏
			bg: true, //是否显示背景
			fix: true, //是否弹出框固定在页面上
			bgclose: true, //是否点击半透明背景隐藏弹出框
			drag: false, //是否可拖拽
			protect: false, //保护装载的内容
			onshow: null, //弹窗显示后触发事件
			onclose: null, //弹窗关闭后触发事件
			delay: 0, //弹窗打开后关闭的时间, 0和负值不触发
			lang: 0, //语言选择，0：中文 1:英文,
			color: "info" //msg方法情景色，info，primary，success，warning，danger
		},
		eleBlank = $("#boxBlank").length ? $('#boxBlank') :
		$('<div id="boxBlank" ontouchmove="return false" onselectstart="return false" />').appendTo('body');
	eleBlank.click(function() {
		$.box.hide(false, true);
	});
	//全局配置
	if ($.isPlainObject(window.boxGlobal)) {
		$.extend(def, window.boxGlobal);
	}

	$.box = function(elements, options) {
		if (!elements) {
			return console.warn('no elements to $.box()');
		};
		var s = $.extend({}, def, options || {}),
			hook = '',
			boxID = 'boxID' + parseInt(Math.random() * 1e5),
			$o,
			eleOut;
		
		if (s.hook && /^\w*$/.test(s.hook)) {
			hook = s.hook;
		}
		typeof(elements) === 'function' && (elements = elements());
		if (typeof(elements) === 'object' && elements.length) {
			//现有dom
			elements.show();
			if (!s.bridge) {
				s.protect = true;
			}
		} else if ($.parseHTML($.trim(elements + ''))[0].nodeType === 1) {
			//dom字符串
			elements = $(elements);
		} else {
			//纯字符串
			elements = $('<div class="wrap_remind">' + elements + '</div>');
			s.layout || (elements.css('min-width', '0'));
		};

		eleOut = (function() {
			var _;
			if (s.layout) {
				_ = $('<div class="wrap_out_posi">' +
					'<div class="wrap_in">' +
					'<div class="wrap_bar" onselectstart="return false;">' +
					'<h4 class="wrap_title"></h4>' +
					(s.shut ? '<div class="wrap_close"><a href="#" title="' + Language[s.lang].close + '"></a></div>' : '')+
					'</div>' +
					'<div class="wrap_body"></div>' +
					'</div>' +
					'</div>');
				_.find('.wrap_body').append(elements);
			} else if (s.setposi) {
				_ = $('<div class="wrap_out_posi" />').append(elements);
			} else {
				_ = elements;
			}

			return _.addClass(hook + ' wrap_out ' + boxID)
				.attr('box-ui-bg', !!s.bg)
				.data({
					protect: s.protect,
					bgclose: s.bgclose,
					setposi: s.setposi
				})
				.appendTo('body');
		})();

		$o = {
			s: s,
			ele: elements,
			bg: eleBlank,
			out: eleOut,
			tit: eleOut.find(".wrap_title"),
			bar: eleOut.find(".wrap_bar"),
			clo: eleOut.find(".wrap_close a")
		};
		$o.tit.html(s.title);
		$o.clo.html(s.shut);

		if ($.isFunction(s.onshow)) {
			setTimeout(function() {
				s.onshow(eleOut);
			}, 0);
		};
		if (!s.bar) {
			$.box.barHide($o);
		} else {
			$.box.barShow($o);
		};
		if (s.setposi) {
			$.box.setSize($o);
		}
		if (s.fix && s.setposi) {
			$.box.setFixed($o);
		};
		if (s.drag) {
			$.box.drag($o);
		} else if(!window.PluginBoxResizeHandel){
			window.PluginBoxResizeHandel = base.throttle(function(){
				$.box.setSize($o)
			});
			$(window).on('resize',PluginBoxResizeHandel);
		};
		
		if (!s.bg) {
			$.box.bgHide();
		} else {
			$.box.bgShow();
		};
		$o.clo.click(function(e) {
			e.preventDefault();
			return $.box.hide($o);
		});
		if (s.delay > 0) {
			setTimeout(function() {
				$.box.hide($o);
			}, s.delay);
		};

		//返回box元素
		return $o;
	};
	$.extend($.box, {
		setSize: function($o) {
			if (!$o.bg.length || !$o.ele.length || !$o.out.length) {
				return;
			}
			var w = $(window).width(),
				h = $(window).height(),
				st = $(window).scrollTop(),
				outHeight = $o.out.height(),
				xh,
				xw;

			if($o.s.height==='auto'){
				if(outHeight>h){
					xh = h;
				}else{
					if($o.out.data('initHeight')===void(0)){
						xh = outHeight;
						$o.out.data('initHeight',xh);
						console.log('记录初始高度');
					}else if($o.out.data('initHeight')!==outHeight){
						xh = $o.out.data('initHeight');
						console.log('box恢复为初始高度');
					}else{
						xh = outHeight;
					}
				};
			}else{
				xh = Math.min(parseFloat($o.s.height),h);
				console.log('box高度自定调整为窗口最大高度：'+h);
			};
			if($o.s.width=='auto'){
				xw = Math.min($o.out.width(),w);
			}else{
				xw = Math.min($o.s.width,w);
			};
			$o.bg.height(h);
			$o.out.css({
				"width": xw,
				"height": xh
			});

			if ($o.s.setposi) {
				var l = (w - xw) / 2,
					t;					
				if ($o.s.top !== void(0)) {
					t = $o.s.top;
				}else if($o.s.fix){
					t = (h - xh) / 2;
				}else{
					t = st + (h - xh) / 2;
				}
				$o.out.css({
					top: t,
					left: l,
					opacity: 1
				}).addClass('init');
				setTimeout(function(){
					$o.out.addClass('show');
				},0);
			}
			return $o;
		},
		setFixed: function($o) {
			if (!$o.out || !$o.out.length) {
				return false;
			};
			return $o.out.css({
				position: "fixed"
			});
		},
		bgCheck: function() {
			if (!$('.wrap_out[box-ui-bg=true]').length) {
				$('#boxBlank').removeClass('show');
				setTimeout(function() {
					$('#boxBlank').removeClass('active');
				}, 400);
			};
		},
		bgHide: function() {
			$.box.bgCheck();
		},
		bgShow: function() {
			$('#boxBlank').addClass('show active');
		},
		barHide: function($o) {
			if ($o.bar && $o.bar.length) {
				$o.bar.hide();
			}
		},
		barShow: function($o) {
			if ($o.bar && $o.bar.length) {
				$o.bar.show();
			}
		},
		hide: function($o, fromBgClick) {
			if(window.PluginBoxResizeHandel){
				$(window).unbind('resize',PluginBoxResizeHandel);
				window.PluginBoxResizeHandel = null;
			};
			if (!$o) {
				var _allBox = $('.wrap_out');
				if (fromBgClick) {
					_allBox = _allBox.filter(function() {
						return $(this).data('bgclose') === true;
					});
				};
				_allBox.each(function(i, e) {
					var _this = $(e);
					if (_this.data('setposi')) {
						_this.removeClass('show');
					} else {
						//actionSheet插件关闭
						_this.removeClass('action-sheet-up');
					}
					setTimeout(function() {
						if (_this.data('protect')) {
							var _ele = _this.find('.wrap_body').length ? _this.find('.wrap_body').children() : _this.children();
							_ele.hide().appendTo($("body"));
						};
						_this.remove();
						$.box.bgCheck();
					}, 100);
				});
				return _allBox = null;
			} else if ($o.ele && $o.out.length && $o.out.css("display") !== "none") {
				if ($o.s.setposi) {
					$o.out.removeClass('show');
				} else {
					$o.out.removeClass('action-sheet-up');
				}			
				setTimeout(function() {
					if ($o.s.protect) {
						$o.ele.hide().appendTo($("body"));
					};
					$o.out.remove();
					$.box.bgCheck();
					if ($.isFunction($o.s.onclose)) {
						$o.s.onclose();
					};
				}, 100);
			}
		},
		drag: function($o) {
			if (!$o.out.length || !$o.bar.length) {
				return false;
			};
			require.async('drag', function() {
				$o.out.drag({
					dragStart: function($this) {
						$this.addClass('wrap_out_drag');
					},
					dragEnd: function($this) {
						$this.removeClass('wrap_out_drag');
					}
				});
			});
		},
		loading: function(s) {
			return $.box(Language[s.lang].loading, {
				bar: false,
				bgclose: false
			});
		},
		confirm: function(message, sureCall, cancelCall, options) {
			var s = $.extend({}, def, options || {});
			s.bridge = true;
			var element = $('<div class="wrap_remind">' + message + '</div>' + '<div class="wrap_foot"><button class="btn btn-primary boxconfirm">' + (s.oktext ? s.oktext : Language[s.lang].confirm) + '</button><button class="btn btn-default boxcancel">' + (s.canceltext ? s.canceltext : Language[s.lang].cancel) + '</button></div>');
			var _o = $.box(element, s);
			_o.out.find(".boxconfirm").click(function() {
				if ($.isFunction(sureCall)) {
					sureCall.call(this);
				}
			});
			_o.out.find(".boxcancel").click(function() {
				if (cancelCall && $.isFunction(cancelCall)) {
					cancelCall.call(this);
				};
				$.box.hide(_o);
			});
			return _o;
		},
		alert: function(message, callback, options) {
			var s = $.extend({}, def, options || {});
			s.bridge = true;
			var element = $('<div class="wrap_remind">' + message + '</div>' + '<div class="wrap_foot"><button class="btn btn-primary boxconfirm">' + (s.oktext ? s.oktext : Language[s.lang].confirm) + '</button></div>');
			var _o = $.box(element, s);
			_o.out.find(".boxconfirm").click(function() {
				if (callback && $.isFunction(callback)) {
					callback.call(this);
				};
				$.box.hide(_o);
			});
			return _o;
		},
		msg: function(message, options) {
			var s = $.extend({}, def, options || {}),
				element;
			s.top = 0;
			s.layout = false;
			s.bg = false;
			s.bridge = true;
			if(s.delay){
				element = '<div class="wrap_msg"><div class="wrap_msg_cont bg-' + s.color + '">' + message + '</div></div>';
			}else{
				element = '<div class="wrap_msg"><div class="wrap_msg_cont bg-' + s.color + '">' + message + '</div><div class="wrap_msg_clo"><i class="ion">&#xe6c9;</i></div></div>';
			}
			var _o = $.box(element, s);
			_o.out.find(".wrap_msg_clo").one('click', function() {
				$.box.hide(_o);
			});
			return _o;
		},
		ajax: function(uri, params, options) {
			var s = $.extend({}, def, options || {});
			if (uri) {
				var _loading = $.box.loading(s);
				options = options || {};
				options.protect = false;
				$.ajax({
					url: uri,
					data: params || {},
					success: function(html, other) {
						$.box.hide(_loading);
						return $.box(html, options);
					},
					error: function() {
						$.box.hide(_loading);
						return $.box.alert(Language[s.lang].error);
					}
				});
			}
		},
		ifram: function(uri, params, options) {
			if (uri) {
				var html;
				options = options || {};
				options.protect = false;
				params = params || {};
				html = '<iframe name="' + (params.name || '') + '" src="' + uri + '" width="' + (params.width || 640) + '" height="' + (params.height || 480) + '" frameborder="0"></iframe>';
				return $.box(html, options);
			}
		},
		img: function(src, options) {
			var s = $.extend({}, def, options || {});
			if (!src) return;
			options = options || {};
			options.bg = true;
			options.layout = false;
			var _loading = $.box.loading(s),
				$img = '<img src="' + src + '">';
			require.async('img-ready', function(ready) {
				ready(src, function(width, height) {
					options.width = width;
					options.height = height;
					$.box.hide(_loading);
					return $.box($img, options);
				});
			});
		}
	});
});//@ sourceURL=http://www.cttq.com/resources/modules/box.js