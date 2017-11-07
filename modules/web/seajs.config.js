/*
* seajs.config.pc
*/
// 网站根路径
seajs.root = document.getElementById("seajsConfig") && document.getElementById("seajsConfig").getAttribute("domain") || ''; 

seajs.config({
	base: seajs.root + "/resources/modules",
	paths: {
		"js" : seajs.root + "/resources/web/js"
	},
	alias: {
		"audio"		  : "audio/audio",
		"copy"		  : "copy/ZeroClipboard",
		"flv"		  : "flv/flv",
		"hook"	 	  : "hook/hook",
		"jquery" 	  : "jquery/1/jquery.js",
		"validform"   : "validform/validform",
		"datepicker"  : "My97DatePicker/WdatePicker",
		"raty"		  : "raty/raty",
		"video"		  : "video/video",
		"webuploader" : "webuploader/webuploader",
		// localstorage缓存
		"seajs-localcache" : "seajs/seajs-localcache",
		// debug
		"seajs-debug" : "seajs/seajs-debug"
	},
	preload:['manifest','seajs-localcache'],
    localcache:{
        timeout: 30000
    },
    comboExcludes: /jquery\.js/ 	// 从 combo 中排除掉 jquery.js 
});