(function(){

        function product_show(pnop=1 ,pageSizep=20){

            $.ajax({
                type:"GET",
                url:"data/roles/adproduct_search.php",
                data:{pno:pnop,pageSize:pageSizep},
                success:function(output){
                    if(output==null){location.href="register.html";}
                    let data = output.data;
                    let pno = parseInt(output.pno);   //接收过来的pno 是个字符串
                    let countPage = output.countPage;
                    let html = "";
                    for(let p of data ){
                        html += `
                    <tr>
                        <td><input type="checkbox">选择</td>
                        <td>${p.pid}</td>
                        <td>${p.pid}</td>
                        <td>${p.family_id}</td>
                        <td>${p.title}</td>
                        <td>${p.spec}</td>
                        <td>${p.price}</td>
                  
                    `;
                        if(p.expire==0){
                            html += `<td style="font-size:12px;">
                                    <a class="btn-detail" data-id="${p.pid}">详细 </a>
                                    <a class="btn-delete" data-id="${p.pid}">删除 </a>
                                    <a class="btn-updata" data-id="${p.pid}">修改 </a>
                                    <a class="btn-pic" data-id="${p.pid}">添加照片</a>
                                  </td>
                                `;
                        }
                        html +=`</tr> `;
                    }
                    $("#tbody").html(html);
                    let html1 = "";

                    html1 +=`<a herf="1">首页</a>`;
                    if(pno>1){
                    html1 +=`<a herf="${pno-1}">上一页</a>`;}

                    if(pno-2>0){
                        html1 += `<a herf="${pno-2}">${pno-2}</a>`
                    }
                    if(pno-1>0){
                        html1 += `<a herf="${pno-1}">${pno-1}</a>`;
                    }

                        html1 += `<a herf="${pno}">${pno}</a>`;
                    if(pno+1<countPage+1){
                        html1 += `<a  herf="${pno+1}">${pno+1}</a>`;
                    }

                    if(pno+2<countPage+1){
                        html1 += `<a herf="${pno+2}">${pno+2}</a>`;
                    }
                    if(pno!=countPage){
                    html1 +=`<a herf="${pno+1}">下一页</a>`;}

                    html1 +=`<a herf="${countPage}">尾页</a>`;
                    $("#countPage").html(html1);
                },
                error:function(){
                    alert("网络错误");
                }
            })
        }
     product_show();
     $("#countPage").on("click","a",function(e){

         let pno = $(e.target).attr("herf");
         product_show(pno ,pageSizep=4);

     })
    // 商品详情
    $("#tbody").on("click",".btn-detail",function(e){
        e.preventDefault();
        $(".my-btn-detail ").show();
        let pid = $(e.target).data("id");
        $.ajax({
            type:"GET",
            url:"data/roles/adproduct_detail.php",
            data:{pid:pid},
            success:function(data){
                let p = data;
                let  html = "";
                html +=`
                    
                        <li><strong>所属分类</strong>${p.family_id}</li>
                        <li><strong>主标题</strong>${p.title}</li>
                        <li><strong>副标题</strong>${p.subtitle}</li>
                        <li><strong>单价</strong>${p.price}</li>
                        <li><strong>承诺</strong>${p.promise}</li>
                        <li><strong>规格</strong>${p.spec}</li>
                        <li><strong>商品名称</strong>${p.lname}</li>
                        <li><strong>操作系统</strong>${p.os}</li>
                        <li><strong>分辨率</strong>${p.resolution}</li>
                        <li><strong>尺寸</strong>${p.size}</li>
                        <li><strong>电池容量</strong>${p.battery}</li>
                        <li><strong>后置摄像头</strong>${p.postposition}</li>
                        <li><strong>前置摄像头</strong>${p.preposition}</li>
                        <li><strong>核心数</strong>${p.cpu}</li>
                        <li><strong>RAM容量</strong>${p.ram}</li>
                        <li><strong>ROM容量</strong>${p.rom}</li>
                        <li><strong>详细说明</strong>${p.detail}</li>
                                 
                `;
                $("#product-detail").html(html);
            },
            error:function(){
                alert("网络故障")
             }
        })
    })
    $(".my-btn-detail").on("click","a",function(e){
        e.preventDefault();
        $(".my-btn-detail").hide();
    })
    $(".my-btn-updata").on("click","a",function(e){
        e.preventDefault();
        $(".my-btn-updata").hide();
    })
    $(".my-btn-pic").on("click","a",function(e){
        e.preventDefault();
        $(".my-btn-pic").hide();
    })

    $("#tbody").on("click",".btn-delete",function(e){
        e.preventDefault();
        let rs = confirm("是否删除这个产品");                               //confirm 删除确认  才执行下一步
        if(rs){
            let pid = $(e.target).data("id");
            $.ajax({
                type:"GET",
                url:"data/roles/adproduct_delete.php",
                data:{pid:pid},
                success:function(data){
                    console.log(data);
                    product_show();
                },
                error:function(){
                    alert:("网络故障");
                }
            })

        }
    })
    $("#tbody").on("click",".btn-updata",function(e){
        e.preventDefault();
        $(".my-btn-updata ").show();
        let pid = $(e.target).data("id");
        $.ajax({
            type:"GET",
            url:"data/roles/adproduct_detail.php",
            data:{pid:pid},
            success:function(data){
                let p = data;
                console.log(p);
                let  html = "";
                html +=`  
                    <li><strong>所属分类</strong><input type="text" value="${p.family_id}"></li>
                    <li><strong>主标题</strong><input type="text" value="${p.title}"></li>
                    <li><strong>副标题</strong><input type="text" value="${p.subtitle}"></li>
                    <li><strong>单价</strong><input type="text" value="${p.price}"></li>
                    <li><strong>承诺</strong><input type="text" value="${p.promise}"></li>
                    <li><strong>规格</strong><input type="text" value="${p.spec}"></li>
                    <li><strong>商品名称</strong><input type="text" value="${p.lname}"></li>
                    <li><strong>操作系统</strong><input type="text" value="${p.os>""}</li>
                    <li><strong>分辨率</strong><input type="text" value="${p.resolution}"></li>
                    <li><strong>尺寸</strong><input type="text" value="${p.size}"></li>
                    <li><strong>电池容量</strong><input type="text" value="${p.battery}"></li>
                    <li><strong>后置摄像头</strong><input type="text" value="${p.postposition}"></li>
                    <li><strong>前置摄像头</strong><input type="text" value="${p.preposition}"></li>
                    <li><strong>核心数</strong><input type="text" value="${p.cpu}"></li>
                    <li><strong>RAM容量</strong><input type="text" value="${p.ram}"></li>
                    <li><strong>ROM容量</strong><input type="text" value="${p.rom}"></li>
                    <li><strong>详细说明</strong><input type="text" value="${p.detail}"></li>                
                `
                $("#product-updata").html(html);
            },
            error:function(){
                alert("网络故障")
             }
        })

    })
    $("#tbody").on("click",".btn-pic",function(e){
        e.preventDefault();
        $(".my-btn-pic").show();
        let pid = $(e.target).data("id");
        // 阻止浏览器默认行为
        $(".my-btn-pic h2").attr("class",pid)

    })
    //阻止事件的默认行为且其 拖的elem是DOM来做
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
    drop_area.ondrop=function(e){
        e.preventDefault();
        let pid = $(".my-btn-pic h2").attr("class");
        console.log(pid);
        let first = e.dataTransfer.files;
        let rs = first[0].type.indexOf("image"); //确认上传文件的格式
        let size = Math.ceil(first[0].size/1024);
        let img = window.webkitURL.createObjectURL(first[0]);
        console.log(img);
        if(rs==-1){
            alert("只能上传图片格式文件");
            return;
        }
        if(size>2048){
            alert("上传文件过大,不能超过2MB");
            return;
        }
        $("#pic_show").html(`<img src="${img}" href="#">`);
        let  pic = new FormData();                               //创建一个文件对象来上传 用append追加
        pic.append("myfile",first[0]);
        pic.append("lid",pid);
        console.log(pic);  //传参数还是用原生的把
        var xhr = new XMLHttpRequest();
        xhr.open("POST","data/roles/adproduct_pic.php",true);
        xhr.onreadystatechange =function(){
            if(xhr.readyState==4&&xhr.status==200){
                console.log(xhr.responseText);
            }

        }
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
        xhr.send(pic);
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

})()