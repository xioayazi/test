/** seajs.config.pc*/// 网站根路径//获取当前网址，如： http://localhost:8083/myproj/view/my.jspvar curWwwPath = window.document.location.href;//获取主机地址之后的目录，如： myproj/view/my.jspvar pathName = window.document.location.pathname;var pos = curWwwPath.indexOf(pathName);//获取主机地址，如： http://localhost:8083var localhostPath = curWwwPath.substring(0, pos);//获取带"/"的项目名，如：/myprojvar projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);seajs.root = document.getElementById("seajsConfig") && document.getElementById("seajsConfig").getAttribute("domain") || ''; //alert(seajs.root);//seajs.root = document.getElementById("seajsConfig") && localhostPath || '';seajs.config({    base: seajs.root + "website2(2)/modules/",    paths: {        "js": seajs.root + "website2(2)/modules/web/js"    },    alias: {        "audio": "audio/audio",        "copy": "copy/ZeroClipboard",        "flv": "flv/flv",        "hook": "hook/hook",        "jquery": "jquery/1/jquery.js",        "validform": "validform/validform",        "datepicker": "My97DatePicker/WdatePicker",        "raty": "raty/raty",        "video": "video/video",                "webuploader": "webuploader/webuploader",        // localstorage缓存        "seajs-localcache": "seajs/seajs-localcache",        // debug        "seajs-debug": "seajs/seajs-debug"    },    preload: ['manifest', 'seajs-localcache'],    localcache: {        timeout: 30000    },    comboExcludes: /jquery\.js/ 	// 从 combo 中排除掉 jquery.js });