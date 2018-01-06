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

                $.ajax({
                    type:"GET",
                    url:"data/roles/u_04_isLogin.php",
                    success:function(data){
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
                        alert("这错误请检查");
                    }
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
        }

    });








    let $bthpd = $("#bth-pd");

    let pno , pageSize ;
    $bthpd.click(function(){
        pno = $(".pno").val() ||1;
        pageSize = $(".pageSize").val() ||6;

        list(pno=pno ,pageSize=pageSize);
    })
    function list(pno =1,pageSize=6){
        $.ajax({
            type:"GET",
            url:"data/roles/adproduct_search.php",
            data:{pno:pno,pageSize:pageSize},

            success:function(output){
                $("#pageCount").html( output.count);
                $("#countP").html(output.countPage);
                let html = "";
                let data = output.data;
                let pageSize=output.pageSize;
                let countPage = output.countPage;
                let pno = parseInt(output.pno);
                $(".pno").val(pno);
                for(var p of data){
                    html +=`
                    <tr>
                        <td>
                            <input type="checkbox" style='vertical-align:-2px;'>
                        </td>
                        <td>
                            ${p.pid}
                        </td>
                        <td>
                           <img src="${p.pic}" alt="图片不存在请添加"> 
                        </td>
                        <td>
                            ${p.fname}
                        </td>
                        <td>
                            <a href="showProduct.html?kw=${p.title}">${p.title}</a>
                        </td>
                        <td>
                            ${p.lname}
                        </td>
                        <td>
                            ${p.color}
                        </td>
                        <td>
                            ${p.price}
                        </td>
                        <td>`

                       if(p.expire==0){
                         html +=      ` <a href="" class="pdetail" data-lname="${p.lname}" data-id="${p.pid}">详细</a>
                            <a href="" class="pdelete" data-lname="${p.lname}" data-id="${p.pid}">删除</a>
                            <a href="" class="pupdate" data-lname="${p.lname}" data-id="${p.pid}">修改</a>
                            <a href="" class="ppic" data-lname="${p.lname}" data-id="${p.pid}">添加照片</a>`}

                      html+=`  </td>
                    </tr>                    
                    `
                }
                    $("#tbody").html(html);
                html = "";

                    html +=`<a data-pno="1" data-page="${pageSize}">首页</a>`

                if(pno>1 ){
                    html +=`<a data-pno="${pno-1}" data-page="${pageSize}">上一页</a>`
                };
                if(pno-2>0 ){
                    html +=`<a data-pno="${pno-2}" data-page="${pageSize}">${pno-2}</a>`
                };
                if(pno-1>0 ){
                    html +=`<a data-pno="${pno-1}" data-page="${pageSize}">${pno-1}</a>`
                };
                if(pno ){
                    html +=`<a data-pno="${pno}" class='focus' data-page="${pageSize}">${pno}</a>`
                };
                if(pno+1<=countPage ){
                    html +=`<a data-pno="${pno+1}" data-page="${pageSize}">${pno+1}</a>`
                };
                if(pno+2<=countPage ){
                    html +=`<a data-pno="${pno+2}" data-page="${pageSize}">${pno+2}</a>`
                };
                if(pno<countPage ){
                    html +=`<a data-pno="${pno+1}" data-page="${pageSize}">下一页</a>`
                };
                html +=`<a data-pno="${countPage}" data-page="${pageSize}">尾页</a>`
                $("#pagep").html(html);

                $(".ppic").click(function(e){
                    $(".ppdetail").remove();
                    $(".ppupdate").remove();
                        if($(".pppic").length==0){
                    e.preventDefault();
                    $tar = $(e.target);
                    var pid = $tar.data("id");
                    var pname = $tar.data("lname");
                    html="";
                    html += `
                        <div class="pppic">
                            <div>
                                <button class="pic-y">上传</button>
                                <button class="pic-x">取消</button>
                            </div>
                            <h2>${pname}</h2>
                            <hr>
                            <div id="drop_area">
                                <h2>将图片拖到此处</h2>
                            </div>
                        
                        </div>
                    `
                    $('body').append(html);
                    $(".pic-x").click(function(e){
                        $(e.target).parent().parent().remove();
                    })
                            $(document).on({
                                dragenter:function(e){
                                    e.preventDefault();
                                },
                                dragover:function(e){
                                    e.preventDefault();
                                },
                                dragleave:function(e){
                                    e.preventDefault();
                                },
                                drop:function(e){
                                    e.preventDefault();
                                }
                            });
                            //放图片 这里是图片 上传图片
// ***************************************************************************************************
                            //图片上传的加载哟
                            drop_area.ondrop=function(e){
                                e.preventDefault();


                                let first = e.dataTransfer.files;
                                let rs = first[0].type.indexOf("image"); //确认上传文件的格式
                                let size = Math.ceil(first[0].size/1024);
                                let img = window.webkitURL.createObjectURL(first[0]);
                                $("#drop_area").html(`<img src="${img}" href="#" width="200px">`);
                                let  pic = new FormData();                               //创建一个文件对象来上传 用append追加
                                pic.append("myfile",first[0]);
                                pic.append("lid",pid);
                               // console.log(pic);  //传参数还是用原生的把
                                $(".pic-y").click(function(){
                                    if(rs==-1){
                                        alert("只能上传图片格式文件");
                                        return;
                                    }
                                    if(size>2048){
                                        alert("上传文件过大,不能超过2MB");
                                        return;
                                    }
                                    var xhr = new XMLHttpRequest();
                                    xhr.open("POST","data/roles/adproduct_pic.php",true);
                                    xhr.onreadystatechange =function(){
                                        if(xhr.readyState==4&&xhr.status==200){
                                            $(".pppic>h2").html(JSON.parse(xhr.responseText).msg)
                                            setTimeout(function(){
                                                $("#drop_area").html( `<h2>将图片拖到此处</h2>`);
                                                $(".pppic>h2").html(pname);
                                                },2000)


                                        }

                                    }
                                    xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
                                    xhr.send(pic);
                                })

                                // $.ajax({
                                //     type:"POST",
                                //     data:pic,  //不要将一个对象弄成参数传上去啊
                                //     url:"data/roles/adproduct_pic.php",
                                //     success:function(data){
                                //         console.log(data);
                                //     },
                                //     error:function(){
                                //         alert("网络故障");
                                //     }
                                // })

                            }


                        }else{
                            e.preventDefault();
                        }
                });
                $(".pdetail").click(function(e){
                    $(".pppic").remove();
                    $(".ppupdate").remove();
                    if($(".ppdetail").length==0){
                        let pid = $(e.target).data("id");
                        e.preventDefault();
                        $.ajax({
                            type:"GET",
                            data:{pid:pid},
                            url:"data/roles/adproduct_detail.php",
                            success:function(output){

                                var p = output;
                                html = "";
                                html += `
                                        <div class="ppdetail">
                                            <div>
                                                <button class="detaill-x" data-pid="${p.pid}">修改</button>
                                                <button class="detaill-y">关闭</button>
                                            </div>
                                            <h2>${p.lname}</h2>
                                            <ul class="clear">
                                                <li class="fl"><strong>商品编号</strong><span>${p.pid}</span></li>
                                                <li class="fl"><strong>名称</strong><span>${p.lname}</span></li>
                                                <li class="fl"><strong>主标题</strong><span>${p.title}</span></li>
                                                <li class="fl"><strong>商品详情</strong><span>${p.subtitle}</span></li>
                                                <li class="fl"><strong>价格</strong><span>${p.price}</span></li>
                                                <li class="fl"><strong>承诺</strong><span>${p.promise}</span></li>
                                                <li class="fl"><strong>规格</strong><span>${p.spec}</span></li>
                                                <li class="fl"><strong>系统</strong><span>${p.os}</span></li>
                                                <li class="fl"><strong>分辨率</strong><span>${p.resolution}</span></li>
                                                <li class="fl"><strong>电池容量</strong><span>${p.battery}</span></li>
                                                <li class="fl"><strong>后置摄像头</strong><span>${p.postposition}</span></li>
                                                <li class="fl"><strong>前置摄像头</strong><span>${p.preposition}</span></li>
                                                <li class="fl"><strong>CPU核数</strong><span>${p.cpu}</span></li>
                                                <li class="fl"><strong>频率</strong><span>${p.pre}</span></li>
                                                <li class="fl"><strong>RAM</strong><span>${p.ram}</span></li>
                                                <li class="fl"><strong>ROM</strong><span>${p.rom}</span></li>
                                                <li class="fl"><strong>是否促销</strong><span>${p.is_onsale}</span></li>
                                                <li class="fl"><strong>详细介绍</strong><span>${p.detail}</span></li>
                                                <li class="fl"><strong>上架时间</strong><span>${p.sold_time}</span></li>
                                                <li class="fl"><strong>重量</strong><span>${p.weight}</span></li>
                                                <li class="fl"><strong>颜色</strong><span>${p.color}</span></li>
                                            </ul>
                                        </div>                                  
                                `
                                $("html").append(html);
                                $(".detaill-y").click(function(){
                                    $(".detaill-y").parent().parent().remove();
                                });
                                $(".detaill-x").click(function(e){
                                    e.preventDefault();
                                    let n=$(e.target).data("pid");
                                    $(".pupdate[data-id=" + n + "]").click();

                                });
                            },
                            error:function(){
                                alert("网络错误请检查");
                            }
                        })
                    }else{
                        e.preventDefault();
                    }

                });
                $(".pupdate").click(function(e){
                    $(".pppic").remove();
                    $(".ppdetail").remove();
                    e.preventDefault();
                    if($(".ppupdate").length==0){
                        let pid = $(e.target).data("id");
                        $.ajax({
                            type:"GET",
                            data:{pid:pid},
                            url:"data/roles/adproduct_detail.php",
                            success:function(output){
                                var p = output;

                                html = "";
                                html += `
                                        <div class="ppupdate">
                                            <form action="" id="updateform">
                                                <div>
                                                    <button  class="update-x">确认</button>
                                                    <button  class="update-y">取消</button>
                                                </div>
                                                <h2>${p.lname}</h2>
                                                <ul class="clear">
                                                <li class="fl"><strong>商品编号</strong><input type="text" name="pid" value="${pid}" readonly  ></li>
                                                <li class="fl"><strong>名称</strong><input type="text" name="lname" value="${p.lname}" readonly></li>
                                                <li class="fl"><strong>主标题</strong><input type="text" name="title" value="${p.title}"></li>
                                                <li class="fl"><strong>商品详情</strong><input type="text" name="subtitle" value="${p.subtitle}" ></li>
                                                <li class="fl"><strong>价格</strong><input type="text" name="price" value="${p.price}" ></li>
                                                <li class="fl"><strong>承诺</strong><input type="text" name="promise" value="${p.promise}"></li>
                                                <li class="fl"><strong>规格</strong><input type="text" name="spec" value="${p.spec}"></li>
                                                <li class="fl"><strong>系统</strong><input type=" text" name="os" value="${p.os}"></li>
                                                <li class="fl"><strong>分辨率</strong><input type="text" name="resolution" value="${p.resolution}" ></li>
                                                <li class="fl"><strong>电池容量</strong><input type="text" name="battery" value="${p.battery}"></li>
                                                <li class="fl"><strong>后摄像头</strong><input type="text" name="postposition" value="${p.postposition}"></li>
                                                <li class="fl"><strong>前摄像头</strong><input type="text" name="preposition" value="${p.preposition}"></li>
                                                <li class="fl"><strong>CPU核数</strong><input type="text" name="cpu" value="${p.cpu}"></li>
                                                <li class="fl"><strong>频率</strong><input type="text" name="pre" value="${p.pre}"></li>
                                                <li class="fl"><strong>RAM</strong><input type="text" name="ram" value="${p.ram}"></li>
                                                <li class="fl"><strong>ROM</strong><input type="text" name="rom" value="${p.rom}"></li>
                                                <li class="fl"><strong>是否促销</strong><input type="text" name="is_onsale" value="${p.is_onsale}"></li>
                                                <li class="fl"><strong>详细介绍</strong><input type="text" name="detail" value="${p.detail}"></li>
                                                <li class="fl"><strong>上架时间</strong><input type="text" name="sold_time" value="${p.sold_time}"></li>
                                                <li class="fl"><strong>重量</strong><input type="text"name="weight" value="${p.weight}"></li>
                                                <li class="fl"><strong>颜色</strong><input type="text" name="color" value="${p.color}"></li>
                                                </ul>
                                            </form>
                                        </div>                                                    
                                `
                                $("html").append(html);
                                $(".update-y").click(function(){
                                    $(".update-y").parent().parent().parent().remove();
                                });
                                $(".update-x").click(function(e){
                                    e.preventDefault();

                                    let data =  $("#updateform").serialize();
                                    $.ajax({
                                        type:"POST",
                                        url:"data/roles/adproduct_update.php",
                                        data:data,
                                        success:function(output){
                                            $("#updateform>h2").html(output.msg);
                                            setTimeout(function(){
                                                $("#updateform>h2").html($("#updateform input[name=lname]").val());
                                            },2000);
                                        },
                                        error:function(){
                                            alert("网络错误请检查")
                                        }
                                    })
                                })
                            },
                            error:function(){
                                alert("网络错误请检查");
                            }
                        })
                    }
                })
                $(".pdelete").click(function(e){
                    $(".ppdetail").remove();
                    $(".ppupdate").remove();
                    e.preventDefault();
                    if($(".ppdelete").length==0){

                        $tar = $(e.target);
                        var pid = $tar.data("id");
                        var pname = $tar.data("lname");
                        html="";
                        html += `
                            <div class="ppdelete">
                                <button class="delete-x">确认</button>
                                <button class="delete-y">取消</button>
                            </div>
                    `
                        $('body').append(html);
                        $(".delete-y").click(function(e){
                            $(e.target).parent().remove();
                        })
                        $(".delete-x").click(function(e){
                            $.ajax({
                                type:"POST",
                                data:{pid:pid},
                                url:"data/roles/adproduct_delete.php",
                                success:function(output){
                                    $(".ppdelete").html("<h1>"+output.msg+"</h1>");
                                    setTimeout(function(){
                                        $(".ppdelete").remove();
                                        list(pno=pno ,pageSize=pageSize);
                                    },2000)
                                },
                                error:function(){
                                    alert("网络错误");
                                }
                            })
                        })


                    }else{
                        e.preventDefault();
                    }
                });
                },
            error:function(){
                alert("网络错误");
            }
        })
    }
    list(pno=pno ,pageSize=pageSize);
    $("#pagep").on("click","a",function(e){
        e.preventDefault();
        $tar =$(e.target);
        var pno = $tar.data("pno");
        var pageSize = $tar.data("page") ;
        list(pno=pno ,pageSize=pageSize);
    })

    $.ajax({
        type:"GET",
        url:"data/roles/productLname.php",
        success:function(output){
            html = "";
            console.log(output.splice(2,1));
            for(var i = 0 ;i<8 ;i++){
                var n = output.splice(parseInt((Math.random()*(output.length-i))),1);
                // console.log(output);
                html += `<a href="showProduct.html?kw=${n[0].title}">${n[0].lname}</a> `
                // console.log(html);
            }

            $("#search-lname").html(html);
        },
        error:function(){
            alert("网络错误请检查");
        }
    })

})