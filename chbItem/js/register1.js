$(function(){
    // 1.X号点击这个界面消失
    // 2.账户名检查是否存在
    // 3.账户是否符合格式
    // 4.密码是否符合格式
    // 5.验证码是否符合格式
    // 6.密码与再次输入的密码是否一致
    // 7.点击验证码切换图片
    // 8.注册账户
    let $register = $("#register");
    let $close = $("#register>div>div>div:nth-child(1)>a");
    let $upwd = $("#upwd");
    let $cpwd = $("#cpwd");
    let $yzm = $("#yzm");
    let $uname = $("#uname");
    let $btnr = $("#btnr");
    let $btnl = $("#btnl");
    let yPattern = /^[a-zA-Z]{4}$/;
    //****** 1.X号点击这个界面消失
    $close.on("click",function(e){
        e.preventDefault();
        $register.hide();
    });
    $uname.on("focus",function(e){
        $uname.next().html("请输入3-12位中文或英文");
        $("#register>div>div>div:nth-child(1)>p").html("注册");
    });
    //**** 2.账户名检查是否存在
    $uname.on("blur",function(){
        checkName($uname)
    });
    // 两种方法 callback  promise
    // function checkName(uname,callback){
    //     $.ajax({
    //         type:"GET",
    //         url:"data/roles/u_01_checkName.php",
    //         data:{uname:uname.val()},
    //         success:function(data){
    //            if(data.code>0){
    //                uname.next().html(data.msg);
    //                callback();
    //            }else{
    //                uname.next().html(data.msg);
    //            }
    //         },
    //         error:function(){
    //             alert("网络故障请检查");
    //         }
    //     })
    // }
    function checkName(uname){
        return new Promise(function(callback){
            $.ajax({
                type:"GET",
                url:"data/roles/u_01_checkName.php",
                data:{uname:uname.val()},
                success:function(data){
                    console.log(data);
                    if(data.code>0){

                        uname.next().html(data.msg);
                        callback();
                    }else{
                        uname.next().html(data.msg);
                    }
                },
                error:function(){
                    alert("网络故障请检查");
                }
            })
        })
    }
    $upwd.on("focus",function(){
        $upwd.next().html("请输入密码3-12位区分大小写");
        $("#register>div>div>div:nth-child(1)>p").html("注册");
    })
    $cpwd.on("focus",function(){
        $cpwd.next().html("请再次输入密码3-12位区分大小写");
        $("#register>div>div>div:nth-child(1)>p").html("注册");
    })
    $cpwd.on("blur",function(){
        if($upwd.val()){
            if($cpwd.val()==$upwd.val()){
                $cpwd.next().html("密码一致继续");
            }else{
                $cpwd.next().html("两次密码不一致");
            }
        }
    })
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
        console.log(yPattern.test($yzm.val()));

    });
     // 点击刷新验证码
    $yzm.next().click(function(){
        $yzm.next().attr("src","data/yzm.php");
    })
    $btnr.on("click",function(e){
        e.preventDefault();
        checkName($uname)
            .then(function(){
                if($cpwd.val()==$upwd.val()){
                    checkYzm($yzm)
                        .then(function(){
                            let data = $("form").serialize() ;
                            if($("#missme").is(":checked")){
                                    $.ajax({
                                        type:"POST",
                                        url:"data/roles/u_02_register.php",
                                        data:data,
                                        success:function(data){
                                            $("#register>div>div>div:nth-child(1)>p").html(data.msg);
                                            if(data.code>0){
                                                setTimeout(function(){
                                                    location.href="login.html";
                                                },2000)
                                            }
                                        },
                                        error:function(){
                                            alert("网络错误请检查");
                                        }
                                    })
                                }
                            }
                        )
                }
            })
    });
    $btnl.on("click",function(e){
        e.preventDefault();
        location.href="login.html";
    });
})