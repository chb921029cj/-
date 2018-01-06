$(()=> {
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
    let time = 0;
    let  ppnum =0;
    let ppprice = 0;
    for (let p in localStorage) {
        time++;


        var reg = /pid=/g;
        if (reg.test(p)) {
            var pid = p.split("=")[1];
            let num = localStorage[p];

            ppnum += parseInt(num);

            $.ajax({
                type: "GET",
                data: {pid: pid},
                url: "data/roles/adproduct_all.php",
                success: function (output) {
                    //  console.log(num);
                    let p = output.data;
                    let pics = output.pic;
                    ppprice += p.price*num;

                    //   console.log(pics.length);
                    let html = `
                <tr>
                    <td class="a"><i></i><span>满减</span></td>
                    <td  colspan="5">
                        <a href="">${p.subtitle}	</a>
                        <a href="">去凑单 ></a>
                    </td>
                </tr>
                <tr data-pid="${p.pid}">
                    <td ><input type="checkbox"></td>
                    <td class="clear">
                        <a href="" class="fl">`
                    if (pics.length > 0) {
                        html += `  <img src="${pics[0]["sm80"]} " alt="照片不存在">`
                    } else {
                        html += `  <img src=" " alt="照片不存在">`
                    }


                    html += `</a>

                        <p class="fl">${p.title}</p> <span class="fr">${p.color}</span>
                        <p class="fl"><span></span>支持7天无理由退货</p>
                        <p class="fl"><span></span><a href="">选包装</a>  </p>
                        <p class="fl"><a href="">【赠品】小米（MI）智能体重秤 家用健康秤 电子秤 精度高 APP数据测量 led灯显示 X1</a><a href="">查看价格</a></p>
                    </td>
                    <td>
                        <p class="p-price">¥${p.price}</p>
                        <a href="">更多促销 <span></span></a>
                        <div></div>
                    </td>
                    <td>
                        <a href="javascript:;" class="p-red">-</a><span class="p-num">${num}</span><a href="javascript:;" class="p-add">+</a>
                    </td>
                    <td class="p-all">¥${p.price * num}</td>
                    <td>
                        <a href="" class="p-delete">删除</a>
                        <a href="">移到我的关注</a>
                        <a href="">加到我的关注</a>
                    </td>
                </tr>                 
                 `
                    $("#bdbody-1").append(html);
                    //点击增加修改删除啥的
                    $("#ap-num").html(ppnum);
                    $("#ap-pr").html("¥" + ppprice);

                },
                error: function () {
                    alert("网络错误")
                }
            })
                // .then(()=>{
                //     let numb = 0;
                //     let aprice = 0;
                //     for (var p of $(".p-num")) {
                //         numb += parseInt($(p).html());
                //     }
                //     $("#ap-num").html(numb);
                //     for (var p of $(".p-all")) {
                //         aprice += parseInt($(p).html().slice(1));
                //     }
                //     $("#ap-pr").html("¥" + aprice);
                //     $(".p-red").click(function (e) {
                //         e.preventDefault();
                //         $tar = $(e.target);
                //         let n = parseInt($tar.next().html());
                //         let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
                //
                //         if (n > 0) {
                //             var numb = 0;
                //             var aprice = 0;
                //             n--;
                //             $tar.next().html(n);
                //             price = n * price;
                //             $tar.parent().next().html("¥" + price);
                //             for (var p of $(".p-num")) {
                //                 numb += parseInt($(p).html());
                //             }
                //             $("#ap-num").html(numb);
                //             for (var p of $(".p-all")) {
                //                 aprice += parseInt($(p).html().slice(1));
                //
                //
                //             }
                //             $("#ap-pr").html("¥" + aprice);
                //         }
                //
                //     })
                //     $(".p-add").click(function (e) {
                //         var numb = 0;
                //         var aprice = 0;
                //         e.preventDefault();
                //         $tar = $(e.target);
                //         let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
                //         let n = parseInt($tar.prev().html());
                //
                //         n++;
                //         $tar.prev().html(n);
                //         price = n * price;
                //         $tar.parent().next().html("¥" + price);
                //         for (var p of $(".p-num")) {
                //             numb += parseInt($(p).html());
                //         }
                //         $("#ap-num").html(numb);
                //         for (var p of $(".p-all")) {
                //             aprice += parseInt($(p).html().slice(1));
                //
                //         }
                //         $("#ap-pr").html("¥" + aprice);
                //     })
                //     $(".p-delete").click(function (e) {
                //         e.preventDefault();
                //         $tar = $(e.target);
                //         console.log($tar);
                //
                //         localStorage.removeItem("pid=" + $tar.parent().parent().data("pid"));
                //         $tar.parent().parent().prev().remove();
                //         $tar.parent().parent().remove();
                //     })
                // });
        }
    }
    console.log(typeof(ppnum));
    console.log(ppnum);
    console.log(ppprice);
    // switch(time)
    // {
    //     case 3:
    //         let numb = 0;
    //         let aprice = 0;
    //         for (var p of $(".p-num")) {
    //             numb += parseInt($(p).html());
    //         }
    //         $("#ap-num").html(numb);
    //         for (var p of $(".p-all")) {
    //             aprice += parseInt($(p).html().slice(1));
    //         }
    //         $("#ap-pr").html("¥" + aprice);
    //         $(".p-red").click(function (e) {
    //             e.preventDefault();
    //             $tar = $(e.target);
    //             let n = parseInt($tar.next().html());
    //             let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
    //
    //             if (n > 0) {
    //                 var numb = 0;
    //                 var aprice = 0;
    //                 n--;
    //                 $tar.next().html(n);
    //                 price = n * price;
    //                 $tar.parent().next().html("¥" + price);
    //                 for (var p of $(".p-num")) {
    //                     numb += parseInt($(p).html());
    //                 }
    //                 $("#ap-num").html(numb);
    //                 for (var p of $(".p-all")) {
    //                     aprice += parseInt($(p).html().slice(1));
    //
    //
    //                 }
    //                 $("#ap-pr").html("¥" + aprice);
    //             }
    //
    //         })
    //         $(".p-add").click(function (e) {
    //             var numb = 0;
    //             var aprice = 0;
    //             e.preventDefault();
    //             $tar = $(e.target);
    //             let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
    //             let n = parseInt($tar.prev().html());
    //
    //             n++;
    //             $tar.prev().html(n);
    //             price = n * price;
    //             $tar.parent().next().html("¥" + price);
    //             for (var p of $(".p-num")) {
    //                 numb += parseInt($(p).html());
    //             }
    //             $("#ap-num").html(numb);
    //             for (var p of $(".p-all")) {
    //                 aprice += parseInt($(p).html().slice(1));
    //
    //             }
    //             $("#ap-pr").html("¥" + aprice);
    //         })
    //         $(".p-delete").click(function (e) {
    //             e.preventDefault();
    //             $tar = $(e.target);
    //             console.log($tar);
    //
    //             localStorage.removeItem("pid=" + $tar.parent().parent().data("pid"));
    //             $tar.parent().parent().prev().remove();
    //             $tar.parent().parent().remove();
    //         })
    //         // $(".p-num").change(function(){
    //         //     for(var p of $(".p-num")){
    //         //         numb += parseInt($(p).html());
    //         //     }
    //         //     $("#p-allnum").html(numb);
    //         // })
    //         break;
    //
    //
    //
    // }
    //setTimeout(function(){
        console.log($(".p-red"));
        let numb = 0;
        let aprice = 0;
        for (var p of $(".p-num")) {
            numb += parseInt($(p).html());
        }
        console.log($(".p-num"));
        $("#ap-num").html(numb);
        for (var p of $(".p-all")) {
            aprice += parseInt($(p).html().slice(1));
        }
        $("#ap-pr").html("¥" + aprice);
        $("#bdbody-1").on("click",".p-red",function (e) {
                e.preventDefault();
                if(time == localStorage.length){
                    let  $tar = $(e.target);
                    let n = parseInt($tar.next().html());
                    let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));

                    if (n > 0) {
                        var numb = 0;
                        var aprice = 0;
                        n--;
                        $tar.next().html(n);
                        price = n * price;
                        $tar.parent().next().html("¥" + price);
                        for (var p of $(".p-num")) {
                            numb += parseInt($(p).html());
                        }
                        $("#ap-num").html(numb);
                        for (var p of $(".p-all")) {
                            aprice += parseInt($(p).html().slice(1));


                        }
                        $("#ap-pr").html("¥" + aprice);
                    }
                }
        });
        $("#bdbody-1").on("click",".p-add",function(e){
            var numb = 0;
            var aprice = 0;
            e.preventDefault();
            if(time == localStorage.length){
                let  $tar = $(e.target);
                let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
                let n = parseInt($tar.prev().html());

                n++;
                $tar.prev().html(n);
                price = n * price;
                $tar.parent().next().html("¥" + price);
                for (var p of $(".p-num")) {
                    numb += parseInt($(p).html());
                }
                $("#ap-num").html(numb);
                localStorage["cart"]=[numb];
                $(".header-search>div:nth-child(2)>span").html(numb);
                for (var p of $(".p-all")) {
                    aprice += parseInt($(p).html().slice(1));

                }
                $("#ap-pr").html("¥" + aprice);}
        });
        $("#bdbody-1").on("click",".p-delete",function(e){
            e.preventDefault();
            $tar = $(e.target);
            if(time==localStorage.length){
                localStorage.removeItem("pid=" + $tar.parent().parent().data("pid"));
                $tar.parent().parent().prev().remove();
                $tar.parent().parent().remove();}
         });

        // $(".p-red").click(function (e) {
        //
        //     e.preventDefault();
        //     if(time == localStorage.length){
        //         let  $tar = $(e.target);
        //         let n = parseInt($tar.next().html());
        //         let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
        //
        //         if (n > 0) {
        //             var numb = 0;
        //             var aprice = 0;
        //             n--;
        //             $tar.next().html(n);
        //             price = n * price;
        //             $tar.parent().next().html("¥" + price);
        //             for (var p of $(".p-num")) {
        //                 numb += parseInt($(p).html());
        //             }
        //             $("#ap-num").html(numb);
        //             for (var p of $(".p-all")) {
        //                 aprice += parseInt($(p).html().slice(1));
        //
        //
        //             }
        //             $("#ap-pr").html("¥" + aprice);
        //         }
        //     }
        // })
        // $(".p-add").click(function (e) {
        //     var numb = 0;
        //     var aprice = 0;
        //     e.preventDefault();
        //     if(time == localStorage.length){
        //         let  $tar = $(e.target);
        //         let price = parseInt($tar.parent().prev().find(".p-price").html().slice(1));
        //         let n = parseInt($tar.prev().html());
        //
        //         n++;
        //         $tar.prev().html(n);
        //         price = n * price;
        //         $tar.parent().next().html("¥" + price);
        //         for (var p of $(".p-num")) {
        //             numb += parseInt($(p).html());
        //         }
        //         $("#ap-num").html(numb);
        //         for (var p of $(".p-all")) {
        //             aprice += parseInt($(p).html().slice(1));
        //
        //         }
        //         $("#ap-pr").html("¥" + aprice);}
        // })
        // $(".p-delete").click(function (e) {
        //     // e.preventDefault();
        //     // $tar = $(e.target);
        //     // if(time==localStorage.length){
        //     //
        //     //     localStorage.removeItem("pid=" + $tar.parent().parent().data("pid"));
        //     //     $tar.parent().parent().prev().remove();
        //     //     $tar.parent().parent().remove();}
        // })
        // $(".p-num").change(function(){
        //     for(var p of $(".p-num")){
        //         numb += parseInt($(p).html());
        //     }
        //     $("#p-allnum").html(numb);
        // })


    //},1000)



})










