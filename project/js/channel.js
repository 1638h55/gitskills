$(document).ready(function(){
	var subCookieUtil={
		get:function(name,subname){
			var subcookies=this.getAll(name);
			if(subcookies){
				return subcookies[subname];
			}else{
				return null;
			}
		},
		
		getAll:function(name){
			var cookiename=encodeURIComponent(name)+"=",
				cookiestart=document.cookie.indexOf(cookiename),
				cookievalue=null,
				cookieend,
				subcookies,
				i,
				parts,
				result={};
				if(cookiestart>-1){
					cookieend=document.cookie.indexOf(";",cookiestart);
					if(cookieend==-1){
						cookieend=document.cookie.length;
					}
					cookievalue=document.cookie.substring(cookiestart+cookiename.length,cookieend);
					if(cookievalue.length>0){
						subcookies=cookievalue.split("&");
						for(let i=0;i<subcookies.length;i++){
							parts=subcookies[i].split("=");
							result[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);
						}
					}
					return result;
				}else{
					return null;
				}		
			
		},
		
		set:function(name,subname,value,expires,path,domain,secure){
			var subcookies=this.getAll(name) || {};
			subcookies[value]=value;
			this.setAll(name,subcookies,expires,path,domain,secure);
		},
		setAll:function(name,subcookies,expires,path,domain,secure){
			var cookietext=encodeURIComponent(name)+"=",
			subcookiesparts=new Array(),
			subname;
			for(subname in subcookies){
				if(subname.length>0 && subcookies.hasOwnProperty(subname)){
					subcookiesparts.push(encodeURIComponent(subname)+"="+
					encodeURIComponent(subcookies[subname]));
				}
			}
			if(subcookiesparts.length>0){
				cookietext+=subcookiesparts.join("&");
				if(expires instanceof Date){
					cookietext+=";expires="+expires.toGMTString();
				}
				if(path){
					cookietext+=";path="+path;
				}
				if(domain){
					cookietext+=";domain"+domain;
				}
				if(secure){
					cookietext+=";secure"+secure;
				}
			}else{
				cookietext+=";expires="+(new Date(0)).toGMTString();
			}
			document.cookie=cookietext;
		},
		unset:function(name,subname,path,domain,secure){
			var subcookies=this.getAll(name);
				if(subcookies){
					delete subcookies[subname];
					this.setAll(name,subcookies,null,path,domain,secure);
				}
		},
		unsetAll:function(name,path,domain,secure){
			this.setAll(name,null,new Date(0),path,domain,secure);
		}
		
	};
	loadMessage(subCookieUtil);
})
//读取图片以及document滚动加载图片
function loadMessage(subCookieUtil){
	$.post("json/products.json",function(data){
		var _jewelry=data["products"]["channel"]["categories"]["jewelry"];
		var _img=$(".first ul div a img");
		var _p1=$("p.name");
		var _p2=$("p.price");
		var _h1=document.documentElement.clientHeight||document.body.clientHeight;
		var _h2=$("ul").height();
		var _h3=_h2-2*_h1;
		var _ul=null;
		var _li="";
		var _div="";
		var img="";
		var a="";
		var _p3="";
		var _p4="";
		for(let key in _jewelry["earing"]){
			_img[parseInt(key)-1].src="images/"+_jewelry["earing"][key]["src"]+".jpg";
			_p1.html(_jewelry["earing"][key]["name"]);
			_p2.html("<strong>"+_jewelry["earing"][key]["price"]+"</strong>");
		}
		delete _jewelry["earing"];
		$(document).scroll(function(){
			let i=1;
			if($(this).scrollTop()>=_h3){			
				for(let key in _jewelry){
					_ul=document.createElement("ul");
					for(let k in _jewelry[key]){	
						img="<img alt=\"\" src=\"images/"+_jewelry[key][k]["src"]+".jpg\"/>";
						a="<a>"+img+"</a>";
						_div="<div>"+a+"</div>";
						_p3="<p class=\"name\">"+_jewelry[key][k]["name"]+"</p>";
						_p4="<p class=\"price\">$ "+_jewelry[key][k]["price"]+"</p>";
						_li+="<li>"+_div+_p3+_p4+"</li>";
						_h3+=$(this).scrollTop();
					}
					_ul.innerHTML=_li;
					$(".maincontent")[i].appendChild(_ul);
					i++;
				}
			}
			//addEvent();
		});
		addEvent(subCookieUtil);
	},"json");
}
//绑定事件
function addEvent(subCookieUtil){
	$("ul").delegate("li",{
		mouseenter:function(e){
			e=e||window.event;
			var _target=e.target||e.srcElement;
			$(this).css({"background-color":"#f5f5f5"});
			$(this).children("div").children().children().animate({opacity:0.7},100).animate({opacity:1},100);
			$(this).children("p.name").hover(function(){$(this).css({"color":"#9c003f"})});
			$(this).children("p.name").mouseleave(function(){$(this).css({"color":"#666"})});
			
		},
		mouseleave:function(){
			$(this).css({"background":"#fff"});
		},
		//
		"click":function(e){
			e=e||window.event;
			var _target=e.target||e.srcElement;
			var _div=$(this).parentsUntil("div").parent();
			var _li=null;
			var key="";
			var k="";
			if(_div.hasClass("first")){
				_li=$(".first ul li");
				key="earing";
				for(let i=0;i<_li.length;i++){
					if(this===_li[i]){
						k=i+1;
						getMessage(key,k,subCookieUtil);
						$(this).children("div").children().attr({href:"detail.html?cookiename="+key+k});
						break;
					}
				}
				
			}
			if(_div.hasClass("second")){
				_li=$(".first ul li");
				key="necklace";
				for(let i=0;i<_li.length;i++){
					if(this===_li[i]){
						k=i+1;
						getMessage(key,k,subCookieUtil);
						$(this).children("div").children().attr({href:"detail.html?cookiename="+key+k});
						break;
					}
				}
				
			}
			if(_div.hasClass("third")){
				_li=$(".first ul li");
				key="more";
				for(let i=0;i<_li.length;i++){
					if(this===_li[i]){
						k=i+1;
						getMessage(key,k,subCookieUtil);
						$(this).children("div").children().attr({href:"detail.html?cookiename="+key+k});
						break;
					}
				}
				
			}
			if(_div.hasClass("fourth")){
				_li=$(".first ul li");
				key="hot";
				for(let i=0;i<_li.length;i++){
					if(this===_li[i]){
						k=i+1;
						getMessage(key,k,subCookieUtil);
						$(this).children("div").children().attr({href:"detail.html?cookiename="+key+k});
						break;
					}
				}
				
			}
			
		}
	});
}
function getMessage(key,k,subCookieUtil){
	$.post("json/products.json",function(data){
		var _jewelry=data["products"]["channel"]["categories"]["jewelry"];
			var _data=_jewelry[key][k];
			subCookieUtil.setAll(key+k,_data);
			
	},"json")
}