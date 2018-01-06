$(()=>{
    $.ajax({
        type:"GET",
        url:"footer.html",
        success:function(data){
            $("#footer").html(data);
        }
    })
    $.ajax({
        type: "GET",
        url: "header.html",
        success: function (data) {
            $("#head").html(data);
            $(function(){
                let $searchP = $("#search-product");
                let $btnS = $("#bth-search");
                // 1.判断是否登录
                $btnS.click(function(){

                    let search = $("#search-product").val().trim();
                    if(search !== ""){
                        location = "showProduct.html?kw="+search;
                    }
                })
                //判断是否登陆
                $.ajax({
                    type:"GET",
                    url:"data/roles/u_04_isLogin.php",
                    success:function(data){
                        console.log(data.code);
                        if(data.code!="-1"){
                            $("#l3").removeClass("lfade").children("a").html(`欢迎${data.msg}`).css({color:"red"});
                            $("#l4").removeClass("lfade").children("a").html(`退出`);
                            $("#l1").addClass("lfade");
                            $("#l2").addClass("lfade");

                        }else{
                            $("#l1").removeClass("lfade");
                            $("#l2").removeClass("lfade");
                            $("#l3").addClass("lfade");
                            $("#l4").addClass("lfade");
                        }
                        let n = 0;
                        let name = data.name;
                        console.log(name);
                        data.code=="超级管理员"? n =3:data.code=="VIP用户"?n=2:data.code=="普通用户"?n=1:n=0;

                        $.ajax({
                            type:"GET",
                            url:"data/roles/users_users.php",
                            success:function(output){
                                let html = "";
                                for(let u of output){
                                    console.log(name, u.uname,n);
                                    html += `
                    <tr>
                        <td><img src="${u.avatar}" alt=""></td>
                        <td>${u.uname}</td>
                        <td>${u.email}</td>
                        <td>${u.user_name}</td>
                        <td>${u.phone}</td>
                        <td>${u.rname}
                            <a href="" data-uid="${u.uid}" class="bth-xgqx">修改权限</a>
                        </td>
                        <td>`
                                    //这个 n 是判断登录用户的n的
                                    // u.rname=="超级管理员"? n =3:u.rname=="VIP用户"?n=2:n=1;
                                    if(n>1||name==u.uname){
                                        html  +=`<a data-uid="${u.uid}" class="bth-xgxx">修改信息</a>`;
                                        if(n>1){
                                            html  +=`<a data-uid="${u.uid}" class="bth-xgtx">修改头像</a>`;
                                        }if(n>2){
                                            html  +=`<a data-uid="${u.uid}" class="bth-scyh">删除用户</a>`;
                                        }
                                    }
                                    html +=   `</td>
                    </tr>                
                `;
                                }
                                $("#user-body").html(html);
                            },
                            error:function(){
                                alert("网络错误，请检查")
                            }
                        });
                    },
                    error:function(){
                        alert("这错误请检查");
                    }
                })
                //注销登陆
                $("#l4").click(function(e){
                    e.preventDefault();
                    $.ajax({
                        type:"GET",
                        url:"data/roles/u_05_loginout.php",
                        success:function(a){
                            console.log(a);
                            $.ajax({
                                type:"GET",
                                url:"data/roles/u_04_isLogin.php",
                                success:function(data){
                                    console.log(data.code);
                                    if(data.code!="-1"){
                                        $("#l3").removeClass("lfade").children("a").html(`欢迎${data.msg}`).css({color:"red"});
                                        $("#l4").removeClass("lfade").children("a").html(`退出`);
                                        $("#l1").addClass("lfade");
                                        $("#l2").addClass("lfade");

                                    }else{
                                        $("#l1").removeClass("lfade");
                                        $("#l2").removeClass("lfade");
                                        $("#l3").addClass("lfade");
                                        $("#l4").addClass("lfade");
                                    }
                                    let n = 0;
                                    let name = data.name;
                                    console.log(name);
                                    data.code=="超级管理员"? n =3:data.code=="VIP用户"?n=2:data.code=="普通用户"?n=1:n=0;

                                    $.ajax({
                                        type:"GET",
                                        url:"data/roles/users_users.php",
                                        success:function(output){
                                            let html = "";
                                            for(let u of output){
                                                console.log(name, u.uname,n);
                                                html += `
                    <tr>
                        <td><img src="${u.avatar}" alt=""></td>
                        <td>${u.uname}</td>
                        <td>${u.email}</td>
                        <td>${u.user_name}</td>
                        <td>${u.phone}</td>
                        <td>${u.rname}
                            <a href="" data-uid="${u.uid}" class="bth-xgqx">修改权限</a>
                        </td>
                        <td>`
                                                //这个 n 是判断登录用户的n的
                                                // u.rname=="超级管理员"? n =3:u.rname=="VIP用户"?n=2:n=1;
                                                if(n>1||name==u.uname){
                                                    html  +=`<a data-uid="${u.uid}" class="bth-xgxx">修改信息</a>`;
                                                    if(n>1){
                                                        html  +=`<a data-uid="${u.uid}" class="bth-xgtx">修改头像</a>`;
                                                    }if(n>2){
                                                        html  +=`<a data-uid="${u.uid}" class="bth-scyh">删除用户</a>`;
                                                    }
                                                }
                                                html +=   `</td>
                    </tr>                
                `;
                                            }
                                            $("#user-body").html(html);
                                        },
                                        error:function(){
                                            alert("网络错误，请检查")
                                        }
                                    });
                                },
                                error:function(){
                                    alert("这错误请检查");
                                }
                            })
                        },
                        error:function(){

                            alert("网络1错误请检查");
                        }}
                    )
                })
                $("#u1").on("click","a",function(e){
                    e.preventDefault();
                    let $tar = $(e.target);
                    $tar.parent().parent().prev().html($tar.html());
                })

                $searchP.blur(function(){$("#search-box ").empty();}) //失去焦点的时候 下面的框框消失了
                $searchP.on("keyup",function(e) {
                    //注意啊只有当鼠标事件变化的时候才会发生寻找  ajax 等一切 没药搞混了 都是否则
                    if(e.keyCode==38){
                        if(!$("#search-box").is(":has(.active)")) {
                            $("#search-box").children().last().addClass("active");
                        }else{
                            if($("#search-box .active").index()==0){
                                $("#search-box .active").removeClass("active");
                                $("#search-box").children().last().addClass("active");
                            }
                            else {
                                $("#search-box .active").removeClass("active").prev().addClass("active");
                            }
                        }
                        $searchP.val($("#search-box .active a").html())  ;
                    }else if(e.keyCode==40){
                        //首先判断第一个是不是获得焦点
                        //然后判断哪个获得焦点 它下面的一个获得焦点
                        //如果是最后一个的话 下一个是第一个
                        if(!$("#search-box").is(":has(.active)")){
                            $("#search-box").children().first().addClass("active");
                        }else{
                            if($("#search-box").children().last().is(".active")){
                                $("#search-box").children(".active").removeClass("active");
                                $("#search-box").children().first().addClass("active");
                            }else{
                                $("#search-box").children(".active").removeClass("active").next().addClass("active");
                            }
                        }
                        $searchP.val($("#search-box .active a").html())  ;
                    }
                    else if(e.keyCode==13){
                        $("#bth-search").click();
                    }

                    else{
                        $tar = $(e.target);
                        //up 38 down 40 回车13 keyCode码
                        let val = $tar.val();
                        if(val){
                            $.ajax({
                                type: "GET",
                                url: "data/roles/productLike.php",
                                data: {val: val},
                                success: function (data) {
                                    let html = "";
                                    for (var p of data) {
                                        html += `
                                                        
                        <p>
                            <a href="" data-pid="${p.pid}">${p.title}</a>
                        </p>
                   
                                `
                                    }
                                    $("#search-box ").show().html(html);
                                },
                                error: function () {
                                    alert("网络错误请检查")
                                }
                            })}else{
                            $("#search-box ").empty();
                        }

                    }


                })


            })
            if(localStorage["cart"]) {$(".header-search>div:nth-child(2)>span").html( localStorage["cart"]);}

        },
        error: function () {
            alert("1")
        }

    });

    //页面加载效果，显示图片和一切
    //页面加载 传递 kw 后面的参数被接下来的时候会默认 改码
    let kw = decodeURI(location.search.slice(1).split("=")[1]); //转换成 URI格式啊不认识中文啊
   // console.log(kw);
    setTimeout(function(){ $("#search-product").val(kw);},1000)
    if(kw){

        $.ajax({
            type:"GET",
            data:{kw:kw},
            url:'data/roles/productKW.php',
            success:function(output){
             //   console.log(output.data);
                if(output.data !==undefined) {
                    let html = "";
                //    console.log(output);
                    let p = output.data;
                    let family = output.family;
                    let $pic = $("#pic-show");

                    let pics = output.pic;

                    let $img = $("#product-nav>div:first-child>div:first-child");
                    let $imgs = $("#product-nav>div:first-child>div:last-child");
                    let $imgm = $("#product-nav>div:first-child>div:first-child>div:nth-child(2)");
                    let $imgf = $("#product-nav>div:first-child>div:first-child>div:last-child");
                    let $aprev = $("#product-nav>div:first-child a.prev");
                    let $anext = $("#product-nav>div:first-child a.next");
                    if(pics != null) {
                        let npic = pics.length;
                  //      console.log(pics);
                        var move = 0;
                        for (let pic of pics) {
                            html += `<li class="fl"><img src="${pic.sm54}" alt="" data-img="${pic.md450}" data-bimg="${pic.lg800}"></li>`
                        }
                        // li宽60 两边有9px的间距
                        $pic.css({width: pics.length * 78 + "px"})
                        $pic.html(html);


                        //鼠标点击前面的前进一格页面 后面的后退一格页


                        function pmove(dir) { //move 是全局的就别用参数往里面调
                            move += dir * 1;

                            if (move == -1) move = npic - 1;
                            if (move == npic) move = 0;
                            //  $("#mdpic").attr("src",$("#pic-show>li:first-child>img").data("img"));

                            $("#mdpic").attr("src", $pic.children().eq(move).children("img").data("img"));
                            //  console.log($imgs);
                            // $imgs.css({background:"url("+$("#pic-show>li:first-child>img").data("bimg")+") "+(-x+150)+"px "+(-y+150)+"px  no-repeat"})

                            $("#lg-pic").css({background: "url(" + $pic.children().eq(move).children("img").data("bimg") + ")"})
                        }


                        $aprev.click(function (e) {
                                e.preventDefault();
                                pmove(-1);
                                $pic.children().eq(move).addClass("active").siblings().removeClass("active");
                                //  console.log(move);
                                if (move == 9) {
                                    $pic.css({left: -5 * 78 + "px"})
                                }
                                else if (move > 4) {
                                    $pic.css({left: -5 * 78 + "px"})
                                }
                                $imgm.mousemove(function (e) {
                                    e.preventDefault();
                                    $imgs.show();
                                    $imgf.show();
                                    var x = e.offsetX;
                                    var y = e.offsetY;

                                    if (x < 150) x = 150;
                                    if (y < 150) y = 150;
                                    if (x > 300) x = 300;
                                    if (y > 300) y = 300;
                                    $imgs.css({background: "url(" + $pic.children().eq(move).addClass("active").children("img").data("bimg") + ") " + (-x + 150) + "px " + (-y + 150) + "px  no-repeat"})

                                    $imgf.css({top: y - 150 + "px", left: x - 150 + "px"});
                                })
                            })
                        $anext.click(function (e) {
                            e.preventDefault();
                            pmove(1);
                      //      console.log(npic);
                            $pic.children().eq(move).addClass("active").siblings().removeClass("active");
                            if (move < npic - 4) {
                                $pic.css({left: -move * 78 + "px"})
                            }
                            $imgm.mousemove(function (e) {

                                e.preventDefault();
                                $imgs.show();
                                $imgf.show();
                                var x = e.offsetX;
                                var y = e.offsetY;

                                if (x < 150) x = 150;
                                if (y < 150) y = 150;
                                if (x > 300) x = 300;
                                if (y > 300) y = 300;
                                $imgs.css({background: "url(" + $pic.children().eq(move).addClass("active").children("img").data("bimg") + ") " + (-x + 150) + "px " + (-y + 150) + "px  no-repeat"})

                                $imgf.css({top: y - 150 + "px", left: x - 150 + "px"});
                            })
                        })


                        //页面加载第一个是得到的数据
                        $("#mdpic").attr("src", $("#pic-show>li:first-child>img").data("img"));
                        $("#pic-show>li:first-child").addClass("active")
                        // 移动触发的时候
                        $imgm.mousemove(function (e) {
                            e.preventDefault();
                            $imgs.show();
                            $imgf.show();
                            var x = e.offsetX;
                            var y = e.offsetY;

                            if (x < 150) x = 150;
                            if (y < 150) y = 150;
                            if (x > 300) x = 300;
                            if (y > 300) y = 300;
                            $imgs.css({background: "url(" + $("#pic-show>li:first-child>img").data("bimg") + ") " + (-x + 150) + "px " + (-y + 150) + "px  no-repeat"})

                            $imgf.css({top: y - 150 + "px", left: x - 150 + "px"});
                        })
                        //点击切换呢

                        $pic.on("click", "img", function (e) {
                            $tar = $(e.target);
                            $tar.parent().addClass("active").siblings().removeClass("active");
                            let mdpic = $tar.data("img");
                            let lgpic = $tar.data("bimg");
                            $("#mdpic").attr("src", mdpic);

                            //找不到图片了 我曹
                            $imgm.mousemove(function (e) {

                                e.preventDefault();
                                $imgs.show();
                                $imgf.show();
                                var x = e.offsetX;
                                var y = e.offsetY;

                                if (x < 150) x = 150;
                                if (y < 150) y = 150;
                                if (x > 300) x = 300;
                                if (y > 300) y = 300;
                                $imgs.css({background: "url(" + lgpic + ") " + (-x + 150) + "px " + (-y + 150) + "px  no-repeat"})

                                $imgf.css({top: y - 150 + "px", left: x - 150 + "px"});
                            })


                        })

                    }
                    $("#p-lname").html(p.lname);
                    $("#p-fname").html(family.fname);
                    $("#p-title").html(p.title);
                    $("#p-subtitle").html(p.subtitle);
                    $("#p-price").html("¥" + p.price);
                    $("#p-weight").html(p.weight);
                    html = `
                        <li class="fl">品牌：<a href="">${family.fname}</a></li>
                        <li class="fl">商品名称：<span>${p.lname}</span></li>
                        <li class="fl" id="p-pid" data-pid="${p.pid}">商品编号：<span>${parseInt(Math.random() * 10000)}</span></li>
                        <li class="fl">商品毛重：<span>${p.weight}</span></li>
                        <li class="fl">商品产地：<span>中国大陆</span></li>
                        <li class="fl">系统：<span>${p.os}</span></li>
                        <li class="fl">运行内存：<span>${p.ram}</span></li>
                        <li class="fl">前置摄像头像素：<span>${p.postposition}</span></li>
                        <li class="fl">热点：<span>功能机，骁龙芯片，双卡双</span></li>
                        <li class="fl">后置摄像头像素：<span>${p.preposition}</span></li>
                        <li class="fl">电池容量：<span>${p.battery}</span></li>
                        <li class="fl">机身内存：<span>${p.rom}</span></li>
                        <li class="fl">机身颜色<span>${p.color}</span></li>            
            
                     `
                    $("#ps1").html(html);
                }else{
                    console.log("什么窦娥米找到");
                }
            },
            error:function(){
                alert("网络1错误请检查")
            }
        })}
    })
    //购物车 点击跳转
$("#add-cart").click(function(){
    location="productCart.html";
})






    // 放大镜效果

    let $img = $("#product-nav>div:first-child>div:first-child");
    let $imgs = $("#product-nav>div:first-child>div:last-child");
    let $imgm =  $("#product-nav>div:first-child>div:first-child>div:nth-child(2)");
    let $imgf = $("#product-nav>div:first-child>div:first-child>div:last-child");


        $imgm.mousemove(function(e){
            e.preventDefault();
            $imgs.show();
            $imgf.show();
           var x = e.offsetX;
           var  y = e.offsetY;

            if(x<150)x=150;
            if(y<150)y=150;
            if(x>300)x=300;
            if(y>300)y=300;
            $imgs.css({background:"url(img/showProduct/bg-2.jpg) "+(-x+150)+"px "+(-y+150)+"px  no-repeat"})

            $imgf.css({top:y-150+"px",left:x-150+"px"});
        })



    $img.mouseleave(function(){
        $imgs.hide();
        $imgf.hide();
    })
//    规格转换啊
    let $detailHeader = $("#detail-header");
        let detaliOffset =$detailHeader.offset().top
  //  console.log($detailHeader.offset().top);
    $(window).scroll(function(){
        if(detaliOffset<scrollY){

            $detailHeader.addClass("detail-fixed")
        }else{
            $detailHeader.removeClass("detail-fixed")
        }
    })
    let $detailsub =$("#detail-sub");
    $detailHeader.on("click","li",function(e){
        $tar = $(e.target);
        var n = $tar.index();
        $tar.addClass("active").siblings().removeClass("active");
        $detailsub.children(":eq("+n+")").addClass("in").siblings().removeClass("in");
    })
//    选配件
    let $productAdd = $("#product-add>ul");
    $productAdd.on("click","li",function(e){
        $tar = $(e.target);

        var n = $tar.index();
        if(n<6){
        $tar.addClass("active").siblings().removeClass("active");}
    })
//    右侧导航栏返回顶部
    let $asidetop = $("aside>ul>li:nth-child(11)");
    //console.log($asidetop);
    $asidetop.click(function(e){
        e.preventDefault();



        $("html,body").stop(true).animate({scrollTop:"0px"},3000)
    })
 ///////////////////////////////////////////////////////////////////////////////////////////
    //详细介绍这边开始
    //颜色选择
    $("#x-color").on("click","a",function(e){
        e.preventDefault();
        $(e.target).addClass("x-active").siblings().removeClass("x-active");
    })
    $("#x-banben").on("click","a",function(e){
        e.preventDefault();
        $(e.target).addClass("x-active").siblings().removeClass("x-active");
    })
    $("#x-buy").on("click","a",function(e){
        e.preventDefault();
        $(e.target).addClass("x-active").siblings().removeClass("x-active");
    })
    $("#x-com").on("click","a",function(e){
        e.preventDefault();
        $(e.target).addClass("x-active").siblings().removeClass("x-active");
    })
    $("#x-saliy").on("click","a",function(e){
        e.preventDefault();
        $(e.target).addClass("x-active").siblings().removeClass("x-active");
    })
    //增值白条
    $("#x-fq").on("click","a",function(e){
        e.preventDefault();
        $(e.target).addClass("x-active").parent().siblings().find(".x-active").removeClass("x-active");
    })
    $("#x-promise").on("click","a",function(e){
        e.preventDefault();
        if($(e.target).parent().has(".fl")){
        $(e.target).addClass("x-active").parent().siblings().find(".x-active").removeClass("x-active");}
    })
    //////////////////////////////////////////////////////////////////上面的点击详情的
        //下面是详情里面的小点点
    $(".r1").change(function(){
        $("#r1").html("<img src='img/showproduct/b1.png ' >"+$(".r1:checked").parent().text()+" <span></span>")

    });
    $(".r2").change(function(){
        $("#r2").html("<img src='img/showproduct/b1.png ' >"+$(".r2:checked").parent().text()+" <span></span>")

    });
    $(".r3").change(function(){
        $("#r3").html("<img src='img/showproduct/b1.png ' >"+$(".r3:checked").parent().text()+" <span></span>")

    })  ;
   // $(".r1").prop("checked")
    //加减值啊
    function fq(num){
        let price = parseInt($("#p-price").text().slice(1))
        num = price*num;
        html  +=`
                   <li class="fl"><a href="" class="x-active">不分期</a><p>无手续费 </p></li>
                            <li class="fl"><a href="">￥${num/3}×3期</a><p>含手续费：费率0.5%，￥${num/3}×3期 </p></li>
                            <li class="fl"><a href="">￥${num/6}×6期</a><p>含手续费：费率0.5%，￥${num/6}×6期 </p></li>
                            <li class="fl"><a href="">￥${num/12}×12期</a><p>含手续费：费率0.5%，￥${num/12}×12期 </p></li>
                            <li class="fl"><a href="">￥${num/24}×24期</a><p>含手续费：费率0.5%，￥${num/24}×24期 </p></li>        
        `
    }
    $("#x-add").click(function(e){
        e.preventDefault();
        let num = $("#x-num").val();
        num ++;
        html = "";

        $("#x-num").val(num);
        fq(num);
        $("#x-fq").html(html);
    })
    $("#x-red").click(function(e){
        e.preventDefault();
        let num = $("#x-num").val();
        if(num>0){
        num --;

        $("#x-num").val(num)
        }
        html="";
        fq(num);
        $("#x-fq").html(html);
    })
    //白条分期的地方
    //加入购物车的话 保存uid  和数量通过localStorage [key,value]来存
    $("#add-cart").click(function(){
        localStorage["pid="+$("#p-pid").data("pid")]=[$("#x-num").val()];

    })
