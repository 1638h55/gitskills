$(document).ready(function(){
    addFooter();
    deleEvent();
    judy();
  //  changep();
});
function addFooter(){
    $.post("footpage.html",function(data){
        $(".footpage").html(data);
    });

}
function deleEvent(){
    $(":text").eq(0).focusin(function(){
        $(this).next().css({"background":"url('images/login_04.png') no-repeat -18px 0"});
        $(this).prev().css({"display":"none"});
        $(this).css({
            "border-color":"rgb(255.173,119)",
            "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

        });
        $(".errorpig").css({"display":"none"});
    });
    $(":text").eq(1).focusin(function(){
        $(this).next().css({"background":"url('images/login_04.png') no-repeat -18px -18px"});
        $(this).prev().css({"display":"none"});
        $(this).css({
            "border-color":"rgb(255,173,119)",
            "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"
        });
        $(".errorpig").css({"display":"none"});
    });

        $(":text").eq(0).blur(function(){
            $(this).next().css({"background":"url('images/login_04.png') no-repeat 0 0"});
            $(this).css({
                "border":"1px solid rgb(222, 222, 222)",
                "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

            });
            if($(this).val()==""){
                $(this).prev().css({"display":"block"});
            }else{
                $(this).prev().css({"display":"none"});
            }

        });
    $(":text").eq(1).blur(function(){
        $(this).next().css({"background":"url('images/login_04.png') no-repeat 0 -18px"});
        $(this).css({
            "border":"1px solid rgb(222, 222, 222)",
            "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

        });
        if($(this).val()==""){
            $(this).prev().css({"display":"block"});
            $("li").eq(2).css({"display":"none"});
        }else{
            $(this).prev().css({"display":"none"});
            $("li").eq(2).css({"display":"block"});
        }
    });
}
function qqLogin(){
    alert("hello");
    //window.location.href="qq.html";
}
function xunLogin(){
    window.location.href="xunlei.html";
}
function judy(){
    $(".subbutton input").click(function(){
        var _pra={
            "mobile":$(":text").eq(0).val(),
            "secret":$(":text").eq(1).val()

        };
        if(_pra.mobile!="" &&  _pra.secret!="" && $(":text").eq(2).val()!=""){
            $.post("api/login.php",_pra,function(data,textStatus){
                console.log(data);
                try{
                    if(data=="0"){
                        $(this).html("<a href=\"login.html\">login</a>");
                    }else{
                        alert("欢迎:"+data+" 光顾!!");
                        window.location.href="head.html";
                    }
                }catch (e){
                    alert("忘记密码了吗?");
                }
            });
        }else if(_pra.mobile==""){
            $(".errorpig").css({"display":"block"});
            $(".errorpig").text("请输入用户名");

         }else
        {
            $(".errorpig").css({"display": "block"});
            $(".errorpig").text("请输入密码");
        }
    });
}
function changeP(){
        var _num=Math.floor(Math.random()*5);
        var _arr=["images/login01.jpg","images/login02.jpg","images/login03.jpg","images/login04.jpg","images/login05.jpg"];
        $("#change").attr({"src":_arr[_num]});
}