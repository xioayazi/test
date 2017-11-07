/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	
	/**
	require('select');
	$('.news-sele-year').select({
    callback: function(val,txt){
      alert('选中了'+txt)
    }
  })
	$('.news-sele-months').select({
    callback: function(val,txt){
      alert('选中了'+txt)
    }
  })
  **/
  //扫描按需加载
base.scanpush();
	var helper=require('helper');
	$(document).ready(function() {
	if(typeof(jrInfo)==='object'){
			helper.ViewCount(jrInfo,function(count){
			 var data=$.trim(count);
				$('#viewCountId').text(data);			
				});
			helper.getInforPN(jrInfo,function(prev,next){
					$('#bottom').html(prev+next);	
					
				});	
			
		}
     })   
	


})