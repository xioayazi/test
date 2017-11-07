/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	try{
		var urlinfo=window.location.href; //获取当前页面的url
		var len=urlinfo.length;//获取url的长度
		var offset=urlinfo.indexOf("?");//设置参数字符串开始的位置
		var newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
		var newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
		var newsid=newsids[1];
		console.log(newsid);
		$.post("/ext/control/find_job.jsp",{"pid":newsid},function(data){
			$("#name").val(data);
		});
	}catch(e){
		
	}
//	$("#link_man").attr("name","obj.name");
  //  $("#name").attr("name","obj.name");    
	
	try{
		require.async('album',function(){
			 $('.pic-list').album({
				title: '._title',
				cell: 'li'
			 })
		})
	}catch(e){
		
	}

})