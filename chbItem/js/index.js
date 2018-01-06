$(function(){
    let $slides = $(".silde-container>div>ul");
    let $imgs = $(".silde-container>div>ul>li");
    let WIDTH = 1000;
    let INTERVAL = 3000;
    let timer = null;
    let canmove = true;
    let WAITE = 3000;
    let move = 0;

    function slideMove(dir=0,callback){
        let $spans = $(".silde-container>div>p>span");
        let moves ;
        move += dir;
        move == $imgs.length-1? moves = 0:moves = move;
        $spans.eq(moves).addClass("active").siblings().removeClass("active");
        $slides.stop(true).animate({left:-(move*WIDTH)+"px"},INTERVAL,callback)
    }
    function mover(){
        if(canmove){
            if(move == $imgs.length-1 ){
                move = 0;
                $slides.css({left:0});
            }
            timer = setTimeout(function(){
                move ++;
                slideMove(0,mover);
            },WAITE)
        }
    }
    mover();
    $(".silde-container").hover(function(){
            canmove=false;
            clearTimeout(timer);
            timer=null;
        },function(){
            canmove=true;
            mover();
        }
    )
    $(".silde-container>div>p").html("<span></span>".repeat($imgs.length-1)).children("span:first-child").addClass("active") ;
    $(".silde-container>div>p").on("click","span",function(e){
        let $tar = $(e.target);
        move=$tar.index();
        slideMove();
    })
    $(".silde-prev").click(function(e){
        if(move == 0){
            move =  $imgs.length-1 ;
          //  console.log();
            $slides.css({left:-(move * WIDTH)});
        }
        e.preventDefault();
        slideMove(-1);
    })
    $(".silde-next").click(function(e){
        if(move == $imgs.length-1 ){
            move = 0;
            $slides.css({left:0});
        }
        e.preventDefault();
        slideMove(1);
    })
    $.ajax({
        type: "GET",
        url: "header.html",
        success: function (data) {

            // 1.判断是否登录
            //记得都是一步步来的

            $("#head").html(data);
            $(function(){
                // 1.判断是否登录
                $.ajax({
                    type:"GET",
                    url:"data/roles/u_04_isLogin.php",
                    success:function(data){
                        console.log(data);
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
                    },
                    error:function(){
                        alert("网络错误请检查");
                    }
                });
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



            })
            $("#bth-search").click(function(){
         //
                //       console.log(1);
                let search = $("#search-product").val().trim();
                if(search !== ""){
                    location = "showProduct.html?kw="+search;
                }
            })
            $.ajax({
                type:"GET",
                url:"data/roles/productLname.php",
                success:function(output){
                    html = "";
                    for(var i = 0 ;i<8 ;i++){

                        var n = output.splice(parseInt((Math.random()*(output.length-i))),1);

                        // console.log(n);
                        html += `<a href="showProduct.html?kw=${n[0].title}">${n[0].lname}</a> `
                    }
                    $("#search-lname").html(html);
                },
                error:function(){
                    alert("网络错误请检查");
                }
            })
            if(localStorage["cart"]) {$(".header-search>div:nth-child(2)>span").html( localStorage["cart"]);}
            let offsetX =$("#search").offset().top;
            $(window).scroll(function(){
                if($(window).scrollTop()>=offsetX){
                    $("#search").addClass("header-fixed")
                }else{
                    $("#search").removeClass("header-fixed")
                }

            });
       //     console.log();
            $("#search-product").blur(function(){$("#search-box ").empty();}) //失去焦点的时候 下面的框框消失了
            $("#search-product").on("keyup",function(e) {
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
                    $("#search-product").val($("#search-box .active a").html())  ;
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
        },
        error: function () {
        }
    })
    //console.log(1);

    for(let i =0;i< $("#nav-img>ul>li").length;i++){
       $( $("#nav-img>ul>li")[i]).mouseenter(function(e){
          $(this).addClass("active").siblings().removeClass("active")
       })
    }
    // 页尾引见
    $.ajax({
        type:"GET",
        url:"footer.html",
        success:function(data){
            $("#footer").html(data);
        }
    })
    //楼层点亮
    let $divs = $("#body>div>div") ;
    let $floors = $("aside>a");
  //  console.log($divs.eq(1).offset().top);

    $(window).scroll(function(e){
         //   console.log($divs.eq(1).offset().top);
        $tar=$(e.target);
        if($tar.scrollTop()>$($divs[0]).offset().top-innerHeight/2){$("aside").show()}
        else{$("aside").hide()}
        for(var i= 1;i<$divs.length;i++){
            if($tar.scrollTop()>=$divs.eq(i).offset().top-innerHeight/2-85){
                $floors.eq(i-1).addClass("active").siblings().removeClass("active");
            }
        }
    }
    )
    $("aside").click("a",function(e){
        e.preventDefault();
        $tar = $(e.target);
        var n = $tar.index();
        if(n!=7){
       // console.log(n);
        var offsetX= $divs.eq(n+1).offset().top;
            $('html,body').stop(true).animate({scrollTop:offsetX-innerHeight/2+ 'px' }, 800)
       console.log(offsetX);}else{
            console.log($(window).scrollTop());
            $('html,body').stop(true).animate({scrollTop: '0px'}, 800)
        }
    })
    //热门推荐的 点击 轮播

    let $rmtjn = $("#rmtj>.body-next");
    let $rmtjp = $("#rmtj>.body-prev");
    let $xpsfn = $("#xpsf>.body-next");
    let $xpsfp = $("#xpsf>.body-prev");

    $.ajax({
        type:"GET",
        url:"data/roles/productSY.php",
        success:function(output){
            let n  = Math.ceil(output.length/6)
            let arr1 = [];
            let html = "";
            //  arr1[arr1.length]=  output.splice(parseInt(Math.random() * n), 1);
         //   console.log(1);
          //  arr1.push(output.splice(parseInt(Math.random() * n), 1));
          //  console.log(arr1);
            for(let j = 0;j<n;j++){
                arr1[j]=[];
                for(let i = 0 ;i<6;i++){
                   // console.log(i);
                   var arr = output.splice(parseInt(Math.random()*(n-i)),1);
                   // console.log(arr);
                    if(arr.length == 0){continue}
                    arr1[j].push( arr );
                }
            }
         //   console.log(arr1[0][2]);
            for (let j = 0; j<n ;j ++){
                html += `
                       <li class="fl">
                            <ul >`

                for(let i=0 ;i<arr1[j].length;i++){
                //    console.log(arr1[j][i]);


                    html +=              `
            
                                  <li>
                                    <a href="showProduct.html?kw=${arr1[j][i][0].title}">
                                        <img src="${arr1[j][i][0].sm100} " alt="图片不存在请加载" width="100px" >
                                    </a>
                                    <a href=" showProduct.html?kw=${arr1[j][i][0].title}">${arr1[j][i][0].lname}${arr1[j][i][0].title} </a>
                                    <p>¥${arr1[j][i][0].price}</p>
                                </li>
                               `


                   }
                html += `
                            </ul>
                        </li>    `
            }
            //console.log(html);
            $("#rmtj>ul:first-child").html(html);//加载完毕
            $("#rmtj>ul:first-child").css({width:595*n+"px"});
            let move = 0;
            function pmove(dir){
                move += dir ;
                if(move==-1)move = n-1;
                if(move==n)move =0;
            }
            $rmtjn.click(function(e){
                e.preventDefault();
                pmove(1);
           //     console.log(move);
                $("#rmtj>ul:first-child").css({left:-595*move+"px"})
            })
            $rmtjp.click(function(e){
                e.preventDefault();
                pmove(-1);
             //   console.log(move);
                $("#rmtj>ul:first-child").css({left:-595*move+"px"})

            })
        },
        error:function(){
            alert("错误")
        }
    });
    $.ajax({
        type:"GET",
        url:"data/roles/productSY.php",
        success:function(output){
            let n  = Math.ceil(output.length/6)
            let arr1 = [];
            let html = "";
            //  arr1[arr1.length]=  output.splice(parseInt(Math.random() * n), 1);
           // console.log(1);
            //  arr1.push(output.splice(parseInt(Math.random() * n), 1));
          //  console.log(arr1);
            for(let j = 0;j<n;j++){
                arr1[j]=[];
                for(let i = 0 ;i<6;i++){
                    // console.log(i);
                    var arr = output.splice(parseInt(Math.random()*(n-i)),1);
                    // console.log(arr);
                    if(arr.length == 0){continue}
                    arr1[j].push( arr );
                }
            }
           // console.log(arr1[0][2]);
            for (let j = 0; j<n ;j ++){
                html += `
                       <li class="fl">
                            <ul >`

                for(let i=0 ;i<arr1[j].length;i++){
                //    console.log(arr1[j][i]);


                    html +=              `
            
                                  <li>
                                    <a href="showProduct.html?kw=${arr1[j][i][0].title}">
                                        <img src="${arr1[j][i][0].sm100} " alt="图片不存在请加载" width="100px" >
                                    </a>
                                    <a href="showProduct.html?kw=${arr1[j][i][0].title}">${arr1[j][i][0].lname}${arr1[j][i][0].title} </a>
                                    <p>¥${arr1[j][i][0].price}</p>
                                </li>
                               `


                }
                html += `
                            </ul>
                        </li>    `
            }
            //console.log(html);
            $("#xpsf>ul:first-child").html(html);//加载完毕
            $("#xpsf>ul:first-child").css({width:595*n+"px"});
            let move = 0;
            function pmove(dir){
                move += dir ;
                if(move==-1)move = n-1;
                if(move==n)move =0;
            }

           // console.log($("#xpsf>ul:first-child"));
            $xpsfn.click(function(e){


                e.preventDefault();
                pmove(1);
              //  console.log(move);
                $("#xpsf>ul:first-child").css({left:-595*move+"px"})
            })
            $xpsfp.click(function(e){
                e.preventDefault();
                pmove(-1);
              //  console.log(move);
                $("#xpsf>ul:first-child").css({left:-595*move+"px"})

            })
        },
        error:function(){
            alert("错误")
        }
    });
    //根据品牌找手机
    $.ajax({
        type:"GET",
        url:"data/roles/productfamily.php",
        success:function(output){
            let family = output.family;
            let product = output.product;
            let html ="";
            for (var i = 0 ;i<6 ;i++){
                html += `
                        <div class="brand">
                            <div class="fl">
                                <img src="img/index/bp-1.jpg " alt="">
                                <div>
                                    <div class="fl">${family[i].fname}</div>
                                    <div class="fl">
                                        <a href="">关注店铺</a>
                                        <a href="">进入店铺</a>
                                    </div>
                                </div>
                            </div>
                            <ul class="fl">`
                        for( var j = 0 ;j<4;j++){
                            var n = parseInt(Math.random()*product[i].length);
                            html += `
                                     <li class="fl">
                                        <a href="showProduct.html?kw=${product[i][n].title}">
                                            <img src="${product[i][n].sm100}" alt="" >
                                        </a>
                                        <a href="showProduct.html?kw=${product[i][n].title}">${product[i][n].title}</a>
                                        <p>¥${product[i][n].price}</p>
                                    </li>
                            `

                        }

                       html +=`   </ul>
                        </div>            
                
                `
            }
            $("#ppqj").html(html);

        },
        error:function(){
            alert("网络错误请检查")
        }
    });
    //京东网厅
    $.ajax({
        type:"GET",
        url:"data/roles/productSY.php",
        success:function(output){
           // console.log(output);
            let n = output.length; //需要找长度-1 到 0 之间的数据
            //let num = parseInt(Math.random()*output.length);//我要找3组 一组4个
            let arr = [];
            for(let i= 0 ; i<3;i++){
                arr[i]=[];
                for(let j=0;j<4;j++){
                let num = parseInt(Math.random()*output.length);
                arr[i].push(output.splice(num,1))
                }
            }
          // console.log(arr);
            let html = "";
            let wdarr = ["中国移动","中国电信","中国联通"];
            for(let i = 0;i<3;i++){
                html += `
                    <div>
                        <p>
                            <span>${wdarr[i]}</span>
                            <a href="">更多<i>></i></a>
                        </p>
                        <ul>`
                for(let j =0;j<4;j++){

                 html +=`           <li class="fl">
                                <a href="showProduct.html?kw=${arr[i][j][0].title}" class="fl"><img src="${arr[i][j][0].sm100} " alt="请添加照片" width="100px"></a>
                                <a href="showProduct.html?kw=${arr[i][j][0].title}" class="fl"> ${arr[i][j][0].title}</a>
                                <span class="fl">¥${arr[i][j][0].price}</span>
                            </li>`}

                html += `        </ul>
                        <div></div>
                    </div>                
                
                `
            }
            $("#jdwt").html(html);


        },
        error:function(){
            alert("网络错误请检查")
        }
    });
    //自己挑 随机四个
    $.ajax({
        type:"GET",
        url:"data/roles/productSY.php",
        success:function(output){
          //  console.log(output);
            let arr = [];
            let html = "";
            for(var i = 0;i<4;i++){
                let num = parseInt(Math.random()*output.length);
                arr=output[num]
                html += `
                           <li class="fl">
                            <a href="showProduct.html?kw=${arr.title}">
                                <img src="${arr.sm100} " alt="图片不存在请添加" width="100px" >
                            </a>
                            <a href="showProduct.html?kw=${arr.title}">${arr.title}</a>
                            <p>¥${arr.price}</p>
                        </li>
                `

            }
            $("#zjt").html(html);

        },
        error:function(){alert("网络错误,请检查")}

    })
})