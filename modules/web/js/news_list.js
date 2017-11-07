/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	//新闻搜索
	require('select');
	$('.news-sele-months').select({
		callback: function(val,txt){
		  //alert('选中了'+txt)
		}
	  })
	
  var cat=$("#catID").html();
   $.post("/tools/ajax_getYearorMonth.jsp",{flag:"year",catId:cat},function(data){
			$("#year").html(data);
			$('.news-sele-year').select({
			callback: function(val,txt){
			  //alert('选中了'+txt)
				 $.post("/tools/ajax_getYearorMonth.jsp",{flag:"mon",catId:cat,year:txt},function(data){
					 $("#month").html(data);
						$('.news-sele-months').select({
							callback: function(val,txt){
							  //alert('选中了'+txt)
							}
						  })
				 })	
			}
		  })
	})	
	
	
        
	


})