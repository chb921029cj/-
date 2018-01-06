<?php
    header("Content-Type:application/json;Charset=utf8");
        require("../controllers/product.php");
        if(adproduct_delete()){
            echo '{"code":1,"msg":"删除成功"}';
        }else{
            echo '{"code":-1,"msg":"删除失败"}';
        }