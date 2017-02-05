$(document).ready(function(){
    addddEvent();
    appear();
    loadFoot();
})
//交换验证码的图片地址
function changeImg(){
    _img=document.getElementById("changep");
   var _num=Math.floor(Math.random()*6+1);
   _img.src="images/simple"+_num+".png";
}
function appear(){
     $("#real").click(function(){
         if(this.checked){
             $(".app").css({"display":"block"});
         }else{
             $(".app").css({"display":"none"});
         }
     });

}
function addddEvent(){
    var _reg={
        "mobile":/^1[345678]\d{9}$/g,//验证手机号
        "secret":/^.{6,20}$/g//验证密码
    };
    var _mes="";
    var _len=$(":text").length;
    $(":text").focusin(function(){
        $(this).css({"border-color":"#9d003f"});
        var _li = $(this).parentsUntil("ul").last();
        if(_li[0]!==$("li").eq(0)[0] && _li[0]!==$("li").eq(2)[0]){
            _li.children().eq(0).children().eq(1).text("");
        }else{
            _li.children().eq(0).children().eq(1).css({"color":"#666"});
        }

    });
    $(":text").blur(function() {
        $(this).css({"border-color": "red"});
        var _li1 = $(this).parentsUntil("ul").last();
        var _li2 = $("li");
        var _span = $(".tips");
        for (var i = 0; i < _li2.length; i++) {
            if (_li1[0] === _li2.eq(i)[0]) {
                if ($(this).val() == "") {
                    switch (i) {
                        case 0:
                            _span.eq(i).text("请输入用户名");
                            break;
                        case 3:
                            _span.eq(i).text("请输入密码");
                            break;
                        case 4:
                            _span.eq(i).text("请重新确认您的密码");
                            break;
                    }
                } else {
                    switch (i) {
                        case 0:
                            _reg.mobile.lastIndex=0;//正则全局查询lastindex一定要归零
                            if (_reg.mobile.test($(this).val())) {
                                $.post("api/checkUser.php", {"condition": "mobile='" + $(this).val() + "'"}, function (data, textStatus) {
                                    console.log(data);
                                    if (textStatus == "success" && parseInt(data) > 0) {
                                        _span.eq(0).text("这个手机号已经被注册，请重新核实你的手机号");
                                        _span.eq(0).css({"color":"red"});
                                    } else {
                                        _li2.eq(1).css({"display": "block"});
                                        $(":text").eq(1).focus();
                                        _li2.eq(2).css({"display": "block"});
                                        _span.eq(0).text("请输入您的手机号");
                                        _span.eq(0).css({"color":"#666"});
                                    }
                                });
                            } else {
                                _span.eq(i).text("*您的手机号输入有误");
                                _span.eq(i).css({"color":"red"});
                            }
                            break;
                        case 3:
                            _reg.secret.lastIndex=0;
                            if(_reg.secret.test($(this).val())){
                                _span.eq(i).text("");
                            }else{
                                _span.eq(i).text("您输入的密码格式有误，请输入6到20位字母数字下横线");
                            }
                            break;
                        case 4:
                            _reg.secret.lastIndex=0;
                            if(_reg.secret.test($(this).val())){
                                if($(this).val()===$("input").eq(3).val()){
                                    _span.eq(i).text("");
                                }else{
                                    _span.eq(i).text("两次密码输入的不一致，请您重新输入");
                                }
                            }
                            break;
                        case 1:
                            var _src=($("#changep")[0].src).substring($("#changep")[0].src.indexOf("images"));
                            switch(_src){
                                case "images/simple1.png":
                                    _mes="vrba";
                                    break;
                                case "images/simple2.png":
                                    _mes="yk5w";
                                    break;
                                case "images/simple3.png":
                                    _mes="inpj";
                                    break;
                                case "images/simple4.png":
                                    _mes="pgyj";
                                    break;
                                case "images/simple5.png":
                                    _mes="kgkw";
                                    break;
                                case "images/simple6.png":
                                    _mes="mmee";
                                    break;
                            }
                            _reg.me=new RegExp("^"+_mes+"$","gi");
                            if(_reg.me.test($(this).val())){
                                _span.eq(i).text("");
                            }else{
                                _span.eq(i).text("您输入的验证码有误，请重新输入");
                            }
                            break;
                        case 2:
                            console.log(_span.eq(i).text());
                            break;

                    }
                }
                if(i!=2 && i!=0){
                    _span.eq(i).css({"color":"red"});
                }
            }


        }

    });
    $("#indexlogin").click(function(){
        var _pra={
            "mobile":$(":text").eq(0).val(),
            "check1":$(":text").eq(1).val(),
            "check2":$(":text").eq(2).val(),
            "secret":$(":text").eq(3).val(),
            "password2":$(":text").eq(4).val()
        };
        _reg.mobile.lastIndex=0;
        _reg.secret.lastIndex=0;
        if($("#choose")[0].checked){
            $("#error2").css({"display":"none"});
            if(_pra.secret==_pra.password2){
                if(_reg.mobile.test(parseInt(_pra.mobile)) && _reg.secret.test(_pra.secret))
                {
                    $.post("api/registerUser.php", _pra, function (data,textStatus) {
                        if (textStatus=="success" && parseInt(data) > 0) {
                            alert("您已顺利成为会员！！！");
                            $(":text").val("");
                        } else {
                            alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
                        }
                    });
                }else{
                    alert("您的信息不完整，请认真核对");
                }
            }
        }else{
            $("#error2").css({"display":"block"});
        }


    });


}
function loadFoot(){
    $.post("footpage.html",function(data){
        $(".footpage").html(data);
    });
}

