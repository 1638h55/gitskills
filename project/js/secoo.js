$(document).ready(function(){
    //请求数据
  $.post("json/secoo.json",null,function(data){
      var _data=data["products"];//左侧菜单栏数据
      var _data2=data["recommend"];//搜索框下面的热词数据
      var i=0;
      var _str="";
      for(var k in _data){
         var _obj=_data[k];
         $($(".bottomfoot dl dt strong")[i]).html("<a href=\"\" target=\"_blank\">"+_obj["name"]+"</a>");
         $($(".bottomfoot dl dt p")[i]).html("<a href=\"\" target=\"_blank\">"+_obj["fbrand"][0]+"</a>"+"<a href=\"\" target=\"_blank\">"+_obj["fbrand"][1]+"</a>"+"<a href=\"\" target=\"_blank\">"+_obj["fbrand"][2]+"</a>");
          var _str=$(".bottomfoot dl:nth-child("+(i+1)+")").children("dd").children().children().children("strong");
              $(_str[0]).html("<a href=\"\" target=\"_blank\">"+_obj["categories"]["name"]+"</a>");
              $(_str[1]).html("</a>"+"<a href=\"\" target=\"_blank\">"+_obj["brand"]["name"]+"</a>");
              $(_str[2]).html("<a href=\"\" target=\"_blank\">"+_obj["hotwords"]["name"]+"</a>");
          var _div=$(".bottomfoot dl:nth-child("+(i+1)+")").children("dd").children().children().children("div");
          var _arr1=_obj["categories"]["detail"];
          var _arr2=_obj["brand"]["detail"];
          var _arr3=_obj["hotwords"]["detail"];
          var _arr4=_obj["reco"];
          var _arr=[_arr1,_arr2,_arr3,_arr4];
          var _code="";
          var m=0;
          for(var p=0;p<_div.length;p++){
              for(var n=0;n<_arr[m].length;n++){
                  _code+="<a href=\"\" target=\"_blank\">"+_arr[m][n]+"</a>"+"|";

              }
              if(p<_div.length-1){
                  $(_div[p]).html(_code);
              }else{
                  $(_div[p]).html(_code.replace(/\|+/g,""));
                  $(_div[p]).children().css({"display":"inline-block","width":"110px","background-color":"#463b7f","color":"#fff","line-height":"26px","text-align":"center","margin-right":"20px"});
                  $(_div[p]).children().hover(function(){
                      $(this).addClass("hover");
                      $(".hover").css({"opacity":"0.6","color":"#f1f1f1"})
                  },function(){
                      $(this).removeClass("hover");
                      $(this).css({"opacity":"1"})
                  })
              }

              _code="";
              m++;
          }
          i++;
     }//添加到左侧菜单栏中
     for(var key=0;key<_data2.length;key++){
         _str+="<a href=\"http://www.secoo.com/listTop/161125dvf.shtml\" target=\"_blank\">"+_data2[key]+"</a>";
     }//搜素框下面的热词48-53
      $(".middle .second").html(_str.replace("[object Object]",""));
      $(".middle .second a").css({"margin-right":"25px","color":"#999999"});
      $(".middle .second a").hover(function(){$(this).css({"color":"red"});},function(){$(this).css({"color":"#999999"})});

  },"json");
  ajaxRequest("post","footpage.html",true,null,function(data){
	  $(".footpage").html(data);
  })
  //创建对象准备为元素添加事件
    var EventUtil={
        addEvent:function(element,type,hander){
            if(element.addEventListener){
                element.addEventListener(type,hander,false)
            }else if(element.attachEvent){
                element.attachEvent("on"+type,hander);
            }else{
                element["on"+type]=hander;
            }
        },
        removeEvent:function(element,type,hander){
            if(element.removeEventListener){
                element.removeEventListener(type,hander,false);
            }else if(element.detachEvent){
                element.detachEvent("on"+type,hander);
            }else{
                element["on"+type]=null;

            }
        }
    };
    //事件函数添加事件
   addEvent(EventUtil);
   getMessage();
    floor(EventUtil);
    bannerPicture()
    readPic();
    changeOpacity();
    getCookie();
});
//左侧导航栏的鼠标事件
function addEvent(EventUtil){
    var _bot=document.getElementsByClassName("bottomfoot")[0];
    var n=0;
    for(var i=0;i<_bot.children.length;i++){
        EventUtil.addEvent(_bot.children[i],"mouseover",function(e,n){
            e=e||window.event;
            var target=e.target||e.srcElement;
            var _current=0;
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            e.preventDefault?e.preventDefault():e.returnValue=false;
            switch (target.tagName){
                case "DT":
                    target.nextElementSibling.style.display="block";
                    EventUtil.addEvent( target.nextElementSibling,"mouseover",function(e){
                        this.style.display="block";
                    });
                    EventUtil.addEvent( target.nextElementSibling,"mouseout",function(e){
                        this.style.display="none";
                    })
                    target.style.backgroundColor="#fff";
                    for(var n=0;n<target.children[1].children.length;n++){
                        target.children[1].children[n].style.color="black";
                    }
                    target.children[0].children[0].style.color="#382f6b";
                    break;
                case "A":
                    target.style.color="red";break;
                default:break;

            }

        },false);
        EventUtil.addEvent(_bot.children[i],"mouseout",function(e,p){
            e=e||window.event;
            var target=e.target||e.srcElement;
            e.stopPropagation?e.stopPropagation():e.cancelable=true;
            e.preventDefault?e.preventDefault():e.returnValue=false;

            switch (target.tagName){
                case "DT":
                    target.nextElementSibling.style.display="none";
                    target.style.backgroundColor="transparent";
                    target.children[0].children[0].style.color="#fff";
                    for(var n=0;n<target.children[1].children.length;n++){
                        target.children[1].children[n].style.color="#fff";
                    }
                    break;
                case "A":
                    if(target===$(".bottomfoot dl dt strong a")[0]){
                        target.style.color="#382f6b";
                    }else{
                        target.style.color="black";
                    }
                    target.parentNode.parentNode.style.backgroundColor="transparent";break;

                default:break;
            }
        },false);

    };
}
//获取中间搜索框的数据
function getMessage(){
    var _timer=0;
    var _input=$("#middlleleft input");
    var _str="hello world";
    _input.focus(function get (){
        var value=_input.val();
        _input.blur(function(){
            _input.after("");
        });
        var _res=_str[_str.indexOf(value)];
        _input.after("<b>"+_res+"</b>");
        $("b").css({"color":"red",fontSize:20});
    });
}
function floor(EventUtil){
    var _len= $("#fixedcontent a").length;
    for(var i=0;i<_len;i++){
        EventUtil.addEvent($("#fixedcontent a")[i],"mouseover",function(){
            this.children[0].style.display="none";
            this.children[1].style.display="block";
            this.children[1].style.borderBottom="none";
            this.children[1].style.fontSize=14+"px";
            this.children[1].style.color="#e93b39";
        });
        EventUtil.addEvent($("#fixedcontent a")[i],"mouseout",function(){
            this.children[1].style.display="none";
            this.children[0].style.display="block";
        })
    }

}
//楼层效果从161开始
$(document).scroll(function(){
    var _height=$(this).scrollTop();
    var s=0;
    if(_height>400 && _height<7000){
        $(".fixedpart").show("slow");
        $(".fixon").show();
            if(_height>400 && _height<1000){
                s=0;
                $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
                $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
                $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
                $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
            }
        if(_height>1000 && _height<1700) {
            s = 1;
            $($("#fixedcontent a")[s-1]).children().first().css({"display": "block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display": "none"});
            $($("#fixedcontent a")[s]).children().first().css({"display": "none"});
            $($("#fixedcontent a")[s]).children().last().css({"display": "block", "font-size": 14, "color": "#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display": "block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display": "none"});
        }
        if(_height>1700 && _height<2300){
                s=2;
                $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
                $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
                $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
                $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
               $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
                $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
        if(_height>2300 && _height<2600){
            s=3;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
        if(_height>2600 && _height<2900){
            s=3;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>2900 && _height<3300){
            s=4;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>3300 && _height<3700){
            s=5;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>3700 && _height<4100){
            s=6;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>4100 && _height<4500){
            s=7;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>4500 && _height<4900){
            s=8;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>4900 && _height<5300){
            s=9;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>5300 && _height<5700){
            s=10;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>5700 && _height<6000){
            s=11;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>6000 && _height<6400){
            s=12;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>6400 && _height<6700){
            s=13;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});
        }
		if(_height>6700 && _height<7000){
            s=14;
            $($("#fixedcontent a")[s-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[s]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[s+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[s+1]).children().last().css({"display":"none"});

        }
		
    }else{
        $(".fixedpart").hide("fast");
        $(".fixon").hide();
    }
});
//轮播图效果
function bannerPicture(){
    var _len=$(".banner div li").length;
    var _li=$(".banner div li");
    var i=_len-1;
    var _timer=0;
    var n=i;
    function startmove() {
        window.clearTimeout(_timer);
        if (i >0) {
            $(_li[i]).animate({"z-index": 1, "opacity": 0}, 800, function () {
                this.style.zIndex = 0;
                this.style.opacity = 1;
                $(".banner div:nth-child(2) span").css({"background-color":"#2e16b6"})
                $($(".banner div:nth-child(2) span")[i]).css({"background-color":"#fff"});
                i--;
                _li[i].style.zIndex=1;
                _timer=window.setTimeout(startmove,1500);
            });
        } else {
            $(_li[i]).animate({"z-index": 1, "opacity": 0}, 800, function () {
                this.style.zIndex = 0;
                this.style.opacity = 1;
                $(".banner div:nth-child(2) span").css({"background-color":"#2e16b6"})
                $($(".banner div:nth-child(2) span")[i]).css({"background-color":"#fff"});
                i = _len - 1;
                _li[i].style.zIndex=1;
                _timer=window.setTimeout(startmove,1500);

            })
        }
    }
    startmove();
    $(".banner").mouseenter(function (){
        window.clearTimeout(_timer);
        $("li").stop();
    })
    $(".banner").mouseleave(function(){
        _timer=window.setTimeout(startmove,1000);
    })
    $(".banner div:nth-child(2) span").mouseenter(function(){
        window.clearTimeout(_timer);
        $("li").finish();
        $(".banner div:nth-child(2) span").css({"background-color":"#2e16b6"});
        this.style.backgroundColor="#fff";

    })
    $(".banner div:nth-child(2) span").mouseleave(function(){
        _timer=window.setTimeout(startmove,1000);
        $(".banner div:nth-child(2) span").css({"background-color":"#2e16b6"})
        this.style.backgroundColor="#fff";
        n=$(this).index();

    })
}
function readPic(){
	var _big=$(".mallcon1 a img");
	var _small=$(".mallcon a img").not(_big);
	var _h4=$(".mallcon h4").not(".mallcon1 h4");
	var _span=$(".own");
	var i=0;
	var n=0;
	var p=0;
	var _height1=$(window).height();
	var _height2=0;
	var _h3=$(".maincontent").height();
	var _cha=0;
    var _height=0;
    var s=0;
    var _timer=0;
	ajaxRequest("post","json/mall.json",false,null,function(data){
		var _data=JSON.parse(data);
		for(var key in _data){
				for(var k in _data[key]){
					if(_data[key][k]["src"]){
						_small.eq(n).attr({"src":"images/"+_data[key][k]["src"]+".jpg"});
						_h4.eq(n).text(_data[key][k]["name"]);
						
						n++;
					}
					if(_data[key][k]["price"]){
						_span.eq(p).text(_data[key][k]["price"]);
						p++;
					}
				}
			_big.eq(i).attr({"src":"images/"+_data[key]["1"]+".jpg"});
			i++;
			if(key!=="reco"){
				delete _data[key];
			}
			
		}
			$(document).on("scroll",function(){
			    window.clearTimeout(_timer);
				_height2=$(document).scrollTop();
				_height=$(this).scrollTop();
				_cha=_h3-_height2-2*_height1;
				if(_cha<0 && _data.hasOwnProperty("reco")){
					for(var m in _data["reco"]){
						$(".recon a img").eq(parseInt(m)-1).attr({"src":"images/"+_data["reco"][m]["src"]+".jpg"});
						$(".recon .nname").eq(parseInt(m)-1).text(_data["reco"][m]["name"]);
						$(".recon .pprice").eq(parseInt(m)-1).append(parseInt(_data["reco"][m]["price"]));
					}
					_cha=1000;
					delete _data["reco"];
				}else{
                   $(this).off("scroll",arguments.callee);//不取消的话会一直加载一直抖动
				}
				startMove(_timer);
			});

	});
}
function changeOpacity(){
	$("div").delegate("img",{
		"mouseenter":function(e){
			e=e||window.event;
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			e.preventDefault?e.preventDefault():e.returnValue=false;
			$(this).animate({
				"opacity":0.5
			},200).animate({
				"opacity":1
			},200);
		},
		"mouseleave":function(e){
			e=e||window.event;
			$(this).finish();
		}
	})
}
function startMove(_timer){
	var _left=$(".recon ul").position().left;
	function move(){
		window.clearTimeout(_timer);
		if(_left<-230){
			_left+=230;
		}else{
			_left=-1560;
		}
		$(".recon ul").css({"left":_left+"px"});
		_timer=window.setTimeout(move,3000)
	}
	move();
	$(".recon img").mouseenter(function(){
		window.clearTimeout(_timer);
		
	});
	$(".recon img").mouseleave(function(){
		_timer=window.setTimeout(move,3000);
	});
	$(".prev").click(function(){
		window.clearTimeout(_timer);
		var _left2=$(".recon ul").position().left;
		if(_left2<-230){
			_left2+=230;
		}else{
			_left2=0;
		}
		$(".recon ul").css({"left":_left2+"px"});
	});
	$(".next").click(function(){
		window.clearTimeout(_timer);
		var _left3=$(".recon ul").position().left;
		if(_left3>-1560){
			_left3-=230;
		}else{
			_left3=-1560;
		}
		$(".recon ul").css({"left":_left3+"px"});
	});
}
function getCookie(){
    var _cookie=document.cookie;
    if(_cookie!=""){

    }

}