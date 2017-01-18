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
    var i=0;
    if(_height>300){
        $(".fixedpart").show("slow");
            if(_height>300 && _height<600){
                i=0;
                $($("#fixedcontent a")[i]).children().first().css({"display":"none"});
                $($("#fixedcontent a")[i]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
                $($("#fixedcontent a")[i+1]).children().first().css({"display":"block"});
                $($("#fixedcontent a")[i+1]).children().last().css({"display":"none"});
            }
        if(_height>600 && _height<900) {
            i = 1;
            $($("#fixedcontent a")[i-1]).children().first().css({"display": "block"});
            $($("#fixedcontent a")[i-1]).children().last().css({"display": "none"});
            $($("#fixedcontent a")[i]).children().first().css({"display": "none"});
            $($("#fixedcontent a")[i]).children().last().css({"display": "block", "font-size": 14, "color": "#e93b39"});
            $($("#fixedcontent a")[i+1]).children().first().css({"display": "block"});
            $($("#fixedcontent a")[i+1]).children().last().css({"display": "none"});
        }
        if(_height>900 && _height<1200){
                i=2;
                $($("#fixedcontent a")[i-1]).children().first().css({"display":"block"});
                $($("#fixedcontent a")[i-1]).children().last().css({"display":"none"});
                $($("#fixedcontent a")[i]).children().first().css({"display":"none"});
                $($("#fixedcontent a")[i]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
               $($("#fixedcontent a")[i+1]).children().first().css({"display":"block"});
                $($("#fixedcontent a")[i+1]).children().last().css({"display":"none"});
        }
        if(_height>1200 && _height<1500){
            i=3;
            $($("#fixedcontent a")[i-1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[i-1]).children().last().css({"display":"none"});
            $($("#fixedcontent a")[i]).children().first().css({"display":"none"});
            $($("#fixedcontent a")[i]).children().last().css({"display":"block","font-size":14,"color":"#e93b39"});
            $($("#fixedcontent a")[i+1]).children().first().css({"display":"block"});
            $($("#fixedcontent a")[i+1]).children().last().css({"display":"none"});
        }

    }else{
        $(".fixedpart").hide("fast");
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
