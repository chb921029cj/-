$(function(){
    // 1.判断是否登录

    $.ajax({
        type:"GET",
        url:"data/roles/u_04_isLogin.php",
        success:function(data){
            if(data.code>0){
                $("#l3").removeClass("lfade").children("a").html(`欢迎${data.msg}`);
                $("#l4").removeClass("lfade").children("a").html(`退出`);
                $("#l1").addClass("lfade");
                $("#l2").addClass("lfade");

            }else{
                $("#l1").removeClass("lfade");
                $("#l2").removeClass("lfade");
                $("#l3").addClass("lfade");
                $("#l4").addClass("lfade");
            }
        },
        error:function(){
            alert("网络错误请检查");
        }
    })
    $("#u1").on("click","a",function(e){
        e.preventDefault();
       let $tar = $(e.target);
        $tar.parent().parent().prev().html($tar.html());
    })
    let offsetX =$("#search").offset().top;
    console.log(offsetX);
    $(window).scroll(function(){
        if($(window).scrollTop()>=offsetX){
            $("#search").addClass("header-fixed")
        }else{
            $("#search").removeClass("header-fixed")
        }
    })



})