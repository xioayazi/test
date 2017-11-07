/*
* name: manifest.js
* version: v1.0.0
* update: offcanvas代替mmenu
* date: 2015-10-08
*/
define('manifest',function(){
    var mod = {
        'audio/audio'                       : 1,
        'copy/ZeroClipboard'                : 1,
        'flv/flv'                           : 1,
    	'hook/hook'							: 1,
    	'jquery/1/jquery'					: 1,
        'jquery/2/jquery'                   : 1,
    	'My97DatePicker/WdatePicker'		: 1,
    	'raty/raty'							: 1,
    	'upload/upload'						: 1,
    	'validform/validform'				: 1,
    	'video/video'						: 1,
    	'webuploader/webuploader'			: 1,
        'album'                             : 1,
    	'autocomplete'						: 1,
        'base'								: 1,
        'bdmap'								: 1,
        'bdshare'							: 1,
        'box'								: 1,
        'count'								: 1,
        'countdown'							: 1,
        'drag'								: 1,
        'easing'							: 1,
        'echarts'                           : 1,
        'etpl'								: 1,
        'fastclick'                         : 1,
        'img-auto'							: 1,
        'img-loaded'						: 1,
        'img-ready'							: 1,
        'instantclick'						: 1,
        'json'								: 1,
        'lazyload'							: 1,
        'marquee'                           : 1,
        'masonry'							: 1,
        'mousemenu'							: 1,
        'mousetrap'							: 1,
        'mousewheel'						: 1,
        'offcanvas'                         : 1,
        'on-scroll'							: 1,
        'photowall'							: 1,
        'pjax'								: 1,
        'qr'								: 1,
        'scroll-bar'						: 1,
        'scroll-col'                        : 1,
        'scroll-row'						: 1,
        'select'							: 1,
        'slide'								: 1,
        'tab'								: 1,
        'tip'								: 1,
        'touch'								: 1,
        'zoom'								: 1
    }
    var manifest = {}
    for(var key in mod){
        manifest[seajs.data.base + key + '.js'] = mod[key]
    }
    seajs.data.localcache.manifest = manifest;
    
})