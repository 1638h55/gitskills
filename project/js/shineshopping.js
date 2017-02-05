
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
		$("script").eq(2).remove();
		$("body").eq(0).css({"display":"block"});
		
	},"html");
	$("a").attr({"href":" ","target":"_blank"});
	
	
	/*$.ajax({
		type:"post",
		url:"commonstyle.html",
		cache:false,
		async:false,
		dataType:"html",
		success:function(data){
			$(".head").html(data);
			$(".bottomfoot").css({display:"none"});
			$(".bottomhead").parent().mouseenter(function(){
				$(".bottomfoot").show();
			});
			$(".bottomhead").parent().mouseleave(function(){
				$(".bottomfoot").hide();
			});
			$("script").eq(2).remove();
			$("body").eq(0).css({"display":"block"});
			}
		
		});
		*/
		getMessage();

	
});
function getMessage(){
	$.post("json/shine.json",function(data){
		$("body").css({"display":"block"});
		var _data=data["shine"]["brand"];
		var _rightpicture=data["shine"]["hot"];
		var _start=data["shine"]["start"];
		//左边图片的加载
		var _img1=$(".contenttopleft p:first-child img");
		var _img2=$(".contenttopleft+img");
		var _span1=$(".contenttopleft p:nth-child(2) span");
		var _span2=$(".contenttopleft p:nth-child(3) span");
		var i=0;
		for(var _key in _data){
			_img1.eq(i).attr({"src":"images/"+_data[_key]["logosrc"]+".jpg"});
			_img2.eq(i).attr({"src":"images/"+_data[_key]["showsrc"]+".jpg"});
			_span2.eq(i).before("<strong style=\"font-size:48px;color:#ff9c00;\">"+_data[_key]["saletype"]+"</strong>");
			_span1.eq(i).html(_data[_key]["own"]);
			calDate(_data[_key]["time"],i);
			i++;
		}
		//右边图片的加载
		var _img3=$(".conrightlist li div:first-child img");
		var _a=$(".conrightlist li div:nth-child(2) a");
		var _str=$(".conrightlist li div:nth-child(3) strong");
		for(var _k in _rightpicture){
			_img3.eq(parseInt(_k)-1).attr({"src":"images/"+_rightpicture[_k]["src"]+".jpg"});
			_a.eq(parseInt(_k)-1).text(_rightpicture[_k]["name"]);
			_str.eq(parseInt(_k)-1).text(_rightpicture[_k]["price"]);
		}
		var _img4=$(".contentlistleft ol li .conpicture img");
		var _img5=$(".contentlistleft ol li .conword p img");
		var _own=$(".contentlistleft ol li .conword p:nth-child(2)");
		for(var _kk in _start){
			_img4.eq(parseInt(_kk)-1).attr({"src":"images/"+_start[_kk]["showsrc"]+".jpg"});
			_img5.eq(parseInt(_kk)-1).attr({"src":"images/"+_start[_kk]["logosrc"]+".jpg"});
			_own.eq(parseInt(_kk)-1).html(_start[_kk]["own"]);
		}
		$("img").mouseenter(function(){
			$(this).animate({"opacity":0.7},200).animate({"opacity":1},200);
		});
		$(".contentlistleft ol li").mouseenter(function(){
			$(this).children().eq(1).animate({
				"top":"150px"
			},300);
		});
		$(".contentlistleft ol li").mouseleave(function(){
			$(this).children().eq(1).animate({
				"top":"190px"
			},300);
		})
		$("a").hover(function(){
			$("a").attr({"color":"#000"});
		});
        loadfooter();
},"json");

}


function calDate(endTime,i){
	var _timer=0;
	var _now=null;
	var _future=new Date(endTime);
	var _time=$(".time");
	var _len=_time.length;
	var _new=null;
	var _date=null;
	var _hours=null;
	var _min=null;
	var _seconds=null;
	function get(){
		window.clearTimeout(_timer);
		_now=new Date();
		_new=new Date(_future.getTime()-_now.getTime());
		_date=_new.getDate();
		_hours=_new.getHours();
		_min=_new.getMinutes();
		_seconds=_new.getSeconds();
		$(".time").eq(i).html(_date+"天"+_hours+"小时"+_min+"分"+_seconds+"秒");
		_timer=window.setTimeout(get,30);
		
	}
	get();	
	
}
function loadfooter(){
	$.post("footpage.html",function(data){
		$(".footpage").html(data);
	})
}