$(document).ready(function(){
    addFooter();
    deleEvent();
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
            "border":"1px solid rgb(225, 173, 119)",
            "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

        });
    });
    $(":text").eq(1).focusin(function(){
        $(this).next().css({"background":"url('images/login_04.png') no-repeat -18px -18px"});
        $(this).prev().css({"display":"none"});
        $(this).css({
            "border":"1px solid rgb(225, 173, 119)",
            "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

        });
    });

        $(":text").eq(0).blur(function(){
            $(this).next().css({"background":"url('images/login_04.png') no-repeat 0 0"});
            $(this).prev().css({"display":"block"});
            $(this).css({
                "border":"1px solid rgb(222, 222, 222)",
                "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

            });
        });
    $(":text").eq(1).blur(function(){
        $(this).next().css({"background":"url('images/login_04.png') no-repeat 0 -18px"});
        $(this).prev().css({"display":"block"});
        $(this).css({
            "border":"1px solid rgb(222, 222, 222)",
            "box-shawdow":"0 2px 2px rgba(240,127,5,0.5)"

        });
    });
}
function qqLogin(){
    alert("hello");
    //window.location.href="qq.html";
}
function xunLogin(){
    window.location.href="xunlei.html";
}