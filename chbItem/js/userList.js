$(function(){

    $.ajax({
        type:"GET",
        url:"footer.html",
        success:function(data){
            $("#footer").html(data);
        },
        error:function(){}
    });
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
                      //  console.log(data.code);
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
                        let name = data.msg;
                      // console.log(name);
                        data.code=="超级管理员"? n =3:data.code=="VIP用户"?n=2:data.code=="普通用户"?n=1:n=0;
                        localStorage["level"]=[n];
                        $.ajax({
                            type:"GET",
                            url:"data/roles/users_users.php",
                            success:(output)=>{
                                let html = "";
                                for(let u of output){
                                   // console.log(name, u.uname,n);
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
                                        if(n>1||name==u.uname){
                                            html  +=`<a data-uid="${u.uid}" class="bth-xgtx">修改头像</a>`;
                                        }if(n>2||name==u.uname){
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
                         //   console.log(a);
                            $.ajax({
                                type:"GET",
                                url:"data/roles/u_04_isLogin.php",
                                success:function(data){
                                 //   console.log(data.code);
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
                                //    console.log(name);
                                    data.code=="超级管理员"? n =3:data.code=="VIP用户"?n=2:data.code=="普通用户"?n=1:n=0;

                                    $.ajax({
                                        type:"GET",
                                        url:"data/roles/users_users.php",
                                        success:function(output){
                                            let html = "";
                                            for(let u of output){
                                               // console.log(name, u.uname,n);
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
    //注销退出登录
    //修改信息
        $("#user-body").on("click",".bth-xgxx",function(e){

            $("#scyh").hide();
            $("#xgtx").hide();
            let  $tar = $(e.target);
            let  uid = $tar.data("uid");
            $("#xgxx").show();
            //将信息展示在页面上 根据uid
            $.ajax({
                type:"GET",
                url:"data/roles/u_06_cxyh.php",
                data:{uid:uid},
                success:function(data){
                    let u = data;
                    let html ="";
                    html +=`
                        <p><span>用户名</span><input type="text" value="${u.user_name}"></p>
                        <p><span>邮箱</span><input type="text" value="${u.email}"></p>
                        <p><span>电话号码</span><input type="text" value="${u.phone}"></p>
                        <button class="xgxx-y" data-uid="${u.uid}">提交</button>
                        <button class="xgxx-x">取消</button>                    
                    `
                    $("#xgxx>form").html(html);
                    $("#xgxx>h1").html(u.uname);
                    $(".xgxx-x").click(function(e){ e.preventDefault();$("#xgxx").hide();})
                    $(".xgxx-y").click(function(e){
                        e.preventDefault();
                        let uid = $(e.target).data("uid");
                        let user_name =$("#xgxx>form>p:nth-child(1)>input").val();
                        let email =$("#xgxx>form>p:nth-child(2)>input").val();
                        let phone =$("#xgxx>form>p:nth-child(3)>input").val();
                        $.ajax({
                            type:"GET",
                            url:"data/roles/u_07_xgyh.php",
                            data:{uid:uid,user_name:user_name,email:email,phone:phone},
                            success:function(data){
                                if(data.code>0){
                                    $("#xgxx>h1").html(data.msg);
                                }
                                $.ajax({
                                    type:"GET",
                                    url:"data/roles/users_users.php",
                                    success:(output)=>{
                                        let n = localStorage.getItem("level");
                                      //  console.log(n);
                                        let html = "";
                                        for(let u of output){
                                     //       console.log(name, u.uname,n);
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
                                                if(n>1||name==u.uname){
                                                    html  +=`<a data-uid="${u.uid}" class="bth-xgtx">修改头像</a>`;
                                                }if(n>2||name==u.uname){
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
                                setTimeout(function(){
                                    $("#xgxx>h1").html(u.uname);
                                },1000);


                            },
                            error:function(){
                                alert("网络错误,请检查")
                            }
                        })
                    })
                },
                error:function(){}
            })
        });

    // //修改头像
    //阻止浏览器的默认事件 拖拽API dragenter dragover drop dragleave
    $(document).on({
        dragenter:function(e){
            e.preventDefault();
        },
        dragover:function(e){
            e.preventDefault();
        },
        drop:function(e){
            e.preventDefault();
        },
        drapleave:function(e){
            e.preventDefault();
        }
    })

    $("#user-body").on("click",".bth-xgtx",function(e) {
        $("#xgxx").hide();
        $("#scyh").hide();
        let $tar = $(e.target);
        let uid = $tar.data("uid");
        console.log(uid);
        let droparea =document.querySelector("#xgtx>div:first-child");

        $("#xgtx").show();
        $("#xgtx>div:last-child").click(function(){
        $("#xgtx").hide();
        })
        droparea.ondrop=function(e){
           e.preventDefault();
            let filst = e.dataTransfer.files;
           let type = filst[0].type;
           if(type.indexOf("image")==-1){
               alert("拖动的不是图片");
               return;
           }
           let size = Math.ceil(filst[0]["size"]/1000);
           if(size>512){
               alert("图片上传过大");
               return;
           }
           let name = filst[0].name;
           let img = window.webkitURL.createObjectURL(filst[0]);
           let html = `<img src="${img}" width="100px"/>${name}`;

            $("#xgtx>div:first-child").html(html);
            let fd = new FormData();
            fd.append("myfile",filst[0]);
            fd.append("uid",uid);
            let xhr = new XMLHttpRequest();
            xhr.open("POST","data/roles/u_09_xgtx.php",true);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
                    let arr = JSON.parse(xhr.responseText);
                    if(arr.code>0){
                        $("#xgtx>div:first-child").html(arr.msg);
                        $.ajax({
                            type:"GET",
                            url:"data/roles/users_users.php",
                            success:(output)=>{
                                let n = localStorage.getItem("level");
                                //  console.log(n);
                                let html = "";
                                for(let u of output){
                                    //       console.log(name, u.uname,n);
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
                                        if(n>1||name==u.uname){
                                            html  +=`<a data-uid="${u.uid}" class="bth-xgtx">修改头像</a>`;
                                        }if(n>2||name==u.uname){
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
                        setTimeout(function(){
                            $("#xgtx").hide();

                        },1000)
                    }
                }
            }
            xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
            xhr.send(fd);
        }
    });
    // //删除用户
    $("#user-body").on("click",".bth-scyh",function(e){
        $("#xgxx").hide();
        $("#xgtx").hide();
        $("#scyh").show();
        let  $tar = $(e.target);
        let  uid = $tar.data("uid");
        $("#scyh>button:first-child").click(function(){
            console.log(1);
            $.ajax({
                type:"GET",
                url:"data/roles/u_08_scyh.php",
                data:{uid:uid},
                success:function(data){
                    console.log(data);
                    $("#scyh").html(data.msg);
                    setTimeout(function(){
                        $("#scyh").hide();
                    },1000);
                    $.ajax({
                        type:"GET",
                        url:"data/roles/users_users.php",
                        success:(output)=>{
                            let n = localStorage.getItem("level");

                            // console.log(n);
                            let html = "";
                            for(let u of output){
                                // console.log(name, u.uname,n);
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
                                    if(n>1||name==u.uname){
                                        html  +=`<a data-uid="${u.uid}" class="bth-xgtx">修改头像</a>`;
                                    }if(n>2||name==u.uname){
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

                }
            })
        });
        $("#scyh>button:last-child").click(function(){
            $("#scyh").hide();
        })
    });
    //修改权限
    $("#user-body").on("click",".bth-xgqx",function(e){
        e.preventDefault();
        console.log(11);
    })
})