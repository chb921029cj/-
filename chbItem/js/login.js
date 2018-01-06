$(function(){
    let $register = $("#login");
    let $close = $("#login>div>div>div:nth-child(1)>a");
    let $upwd = $("#upwd");
    let $yzm = $("#yzm");
    let $uname = $("#uname");
    let $btnr = $("#btnr");
    let $btnl = $("#btnl");
    let yPattern = /^[a-zA-Z]{4}$/;
    let $missme = $("#missme");
    if(localStorage.getItem("uname")){
        $uname.val(localStorage.getItem("uname"));
    }
    $close.on("click",function(e){
        e.preventDefault();
        $register.hide();
    });
    $uname.on("focus",function(){
        $uname.next().html("请输入3-12位中文或英文");
        $("#login>div>div>div:nth-child(1)>p").html("登陆");
    });
    $upwd.on("focus",function(){
        $upwd.next().html("请输入密码3-12位区分大小写");
        $("#login>div>div>div:nth-child(1)>p").html("登陆");
    });
    function checkYzm(yzm){
        return new Promise(function(callback){
            if(yPattern.test(yzm.val())){
                callback();
            }else{
                yzm.val("验证码格式不正确") ;
            }
        })
    }
    $yzm.on("blur",function(){
        checkYzm($yzm);
    });
    $btnr.on("click",function(e){
        e.preventDefault();
        location.href="register1.html";
    });
    $yzm.next().click(function(){
        $yzm.next().attr("src","data/yzm.php");
    })
    $btnl.on("click",function(e){
        e.preventDefault();
        checkYzm($yzm).then(function(callback){
            let data = $("form").serialize();
            $.ajax({
                type:"POST",
                url:"data/roles/u_03_login.php",
                data:data,
                success:function(data){
                    if(data.code>0){
                        location.href="index.html";
                    }else{
                        $("#login>div>div>div:nth-child(1)>p").html(data.msg);
                    }
                },
                error:function(){
                    alert("网络错误请检查")
                }
            })
        })
    })

    $missme.click(function(){
        if($missme.is(":checked")){
            localStorage.setItem("uname",$uname.val())
        }
    })


})