
$(document).ready(function(){
	$.post("commonstyle.html",function(data){
		$(".head").html(data);
		$(".bottomfoot").css({display:"none"});
		$(".bottomhead").parent().mouseenter(function(){
			$(".bottomfoot").show();
		});
		$(".bottomhead").parent().mouseleave(function(){
			$(".bottomfoot").hide();
		});
	},"html");
	
});
function addEvent(){
	
}