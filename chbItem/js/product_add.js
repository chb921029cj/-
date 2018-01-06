(function(){
    window.onload=function(){
        $.ajax({
            type:"GET",
            url:"data/roles/search_famiy.php",
            success:function(data){
                console.log(data);
                let html = `<option  >----------------请选择品牌----------------</option>`;

                for(let p of data){
                    html += `<option value="${p.fid}">${p.fname}</option>`;
                };
                $("#family_id").html(html);
            },
            error:function(){
                alert("网络错误")
            }
        });
    }
        $("#submit").click(function(e){
            e.preventDefault();
            let data = $("#form").serialize();
            $.ajax({
                type:"POST",
                url:"data/roles/product_add.php",
                data:data,
                success:function(data){
                    console.log(data );
                },
                error:function(){
                    alert("网络错误");
                }
            })
        })
})()