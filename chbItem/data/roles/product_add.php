<?php
    header("Content-Type:application/json;Charset=utf-8");
    require("../controllers/product.php");
    if(adproduct_add()){
        echo '{"code":1,"msg":"添加成功"}';
    }else{
            echo '{"code":-1,"msg":"添加失败"}';
    }