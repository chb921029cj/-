<?php
    require("../init.php");
    require("../00_imageUtils.php");
    function adsearch_family(){
        global $conn;
         $sql = " SELECT * FROM ph_product_family ";
         $result =  mysqli_query($conn,$sql);
         $users = mysqli_fetch_all($result,1);
         echo json_encode ($users);
    }
//    商品添加
    function adproduct_add(){
        global $conn;
        @$family_id =$_REQUEST["family_id"];
        @$title  = $_REQUEST["title"];
        @$subtitle  = $_REQUEST["subtitle"];
        @$price  = $_REQUEST["price"];
        @$promise  = $_REQUEST["promise"];
        @$spec  = $_REQUEST["spec"];
        @$lname  = $_REQUEST["lname"];
        @$os  = $_REQUEST["os"];
        @$resolution  = $_REQUEST["resolution"];
        @$size  = $_REQUEST["size"];
        @$battery  = $_REQUEST["battery"];
        @$postposition  = $_REQUEST["postposition"];
        @$preposition  = $_REQUEST["preposition"];
        @$cpu  = $_REQUEST["cpu"];
        @$ram  = $_REQUEST["ram"];
        @$rom  = $_REQUEST["rom"];
        @$is_onsale  = $_REQUEST["is_onsale"];
        @$detail  = $_REQUEST["detail"];
//        	sold_time BIGINT,  #上架时间 UNIX_TIMESTAMP()PHP中这样使用
//        	expire    enum('0','1')
        $sql = " INSERT INTO ph_product VALUES( ";
        $sql .= " null ,'$family_id','$title' , '$subtitle', $price ,'$promise', ";
        $sql .= " '$spec','$lname','$os','$resolution','$size','$battery', ";
        $sql .= " '$postposition','$preposition','$cpu','$ram','$rom',$is_onsale ,'$detail',UNIX_TIMESTAMP(),'0' ";
        $sql .= " ) ";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_affected_rows($conn);
        if($row>0){
            return true;
        }else{
            return false;
        }
     }
     //分页查询
        function adproduct_search(){
            global $conn;               //global  切记别忘记了
             $output = [
                 "count" => 0,  //总数量
                 "countPage" => 0, //总页数
                 "pno" =>1,  //当前页
                "pageSize" =>6, //每页显示
                "data"
             ];
             @$pno = $_REQUEST["pno"];    //先用一个变量接收 传来的数据 判断是否存在
             @$pageSize = $_REQUEST["pageSize"];
             if ($pno) $output["pno"] = $pno;
             if($pageSize) $output["pageSize"] = $pageSize;
             $sql = " SELECT count(*) FROM ph_product";
             $result = mysqli_query($conn,$sql);
             $row = mysqli_fetch_row($result);
             $output["count"] = $row[0];
             $output["countPage"] = ceil($output["count"]/$output["pageSize"]);
             $pnoN = ($output["pno"]-1)*$output["pageSize"];
             $pageSize = $output['pageSize'];
            //子查询最好了  最好了 最好了
             $sql = " SELECT p.pid ,p.title,p.price,p.lname,p.expire,p.color,f.fname,( select sm100  from ph_product_pic as c where c.pid = p.pid limit 1) as pic    FROM ph_product p , ph_product_family f  ";
             $sql .= " where p.family_id = f.fid  LIMIT  $pnoN,$pageSize  ";

             $result = mysqli_query($conn,$sql);
             $data = mysqli_fetch_all ($result,1);
             $output["data"] = $data;
             echo json_encode($output);
        }
//       商品查询详细
        function adproduct_detail(){
            global $conn;
            @$pid = $_REQUEST["pid"];
            $sql = " SELECT * FROM ph_product, ph_product_family WHERE pid = $pid AND family_id = fid ";

            $result = mysqli_query($conn,$sql);
            $user = mysqli_fetch_assoc($result);
            echo json_encode($user);
        }
        //查询商品的所有东西
           function adproduct_all(){
               global $conn;
               $output =[];
               @$pid = $_REQUEST["pid"];
               if($pid){
               $sql = " SELECT * FROM ph_product a , ph_product_family b WHERE a.pid = $pid AND a.family_id = b.fid ";

               $result = mysqli_query($conn,$sql);
               $user = mysqli_fetch_assoc($result);
               $output["data"] = $user;
               $sql = " SELECT * FROM ph_product_pic  WHERE  pid = $pid ";
               $result = mysqli_query($conn,$sql);
               $user = mysqli_fetch_all($result,1);    //feth_all  后面记得加1
               $output["pic"] = $user;
               echo json_encode($output);}
           }

//     商品删除 就是更改expire 的 0 变为1 更改 mysqli_affected_rows
        function adproduct_delete(){
            global $conn;
            @$pid = $_REQUEST["pid"];
            $sql = "UPDATE ph_product SET expire = '1' WHERE pid = $pid";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_affected_rows($conn);
            if($row>0){
                return true;
            }else{
                return false;
            }
        }
//        图片上传
       function adproduct_pic(){
        global $conn;
        $rs = empty($_FILES);                         //判断上传的是否为空
        if($rs){
            die( '{"code":-1,"msg":"上传文件不存在"}');
        }
        @$pic = $_FILES["myfile"];
        $name = $pic["name"];
         $size = ceil($pic["size"]/1024);
         $type = strstr($name,".");
         if($type!=".img"&&$type!=".png"&&$type!=".jpg"){
            die( '{"code":-2,"msg":"上传文件格式不正确"}');
         }
         if($size>2048){
            die( '{"code":-3,"msg":"上传文件过大"}');
         }
         $pname = time().rand(1,99999).$type;
         $old = $pic["tmp_name"];
         $new = "../../upload/product/bs/".$pname;
         move_uploaded_file($old,$new);
         $result = mkThumbnail("../../upload/product/bs/".$pname, 40, 40,"../../upload/product/sm40/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 54, 54,"../../upload/product/sm54/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 80, 80,"../../upload/product/sm80/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 85, 85,"../../upload/product/sm85/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 100, 100,"../../upload/product/sm100/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 180, 180,"../../upload/product/sm180/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 450, 450,"../../upload/product/md450/".$pname );
         $result = mkThumbnail("../../upload/product/bs/".$pname, 800, 800,"../../upload/product/lg800/".$pname );
         @$lid = $_REQUEST["lid"];
         $sm40 = "upload/product/sm40/".$pname;
         $sm54 = "upload/product/sm54/".$pname;
         $sm80 = "upload/product/sm80/".$pname;
         $sm85= "upload/product/sm85/".$pname;
         $sm100 = "upload/product/sm100/".$pname;
         $sm180 = "upload/product/sm180/".$pname;
         $md450 = "upload/product/md450/".$pname;
         $lg800 = "upload/product/lg800/".$pname;
         $sql = "INSERT INTO ph_product_pic VALUES ( ";
         $sql .= " NULL ,$lid ,'$sm40','$sm54','$sm80','$sm85','$sm100','$sm180' ,'$md450','$lg800 ') ";
         $result = mysqli_query($conn,$sql);
         $row = mysqli_affected_rows($conn);
         if($row>0){
            echo '{"code":1,"msg":"上传成功"}';
         }else{
            echo '{"code":-4,"msg":"上传失败"}';
         }
       }
      //商品修改
       function adproduct_update(){
        global $conn;
        @$lname = $_REQUEST["lname"];
        @$pid = $_REQUEST["pid"];
        @$title = $_REQUEST["title"]  ;
        if($title == null ) $title= '';
        @$subtitle= $_REQUEST["subtitle"] ;        if($subtitle == null ) $subtitle= '';
        @$price= $_REQUEST["price"]  ;        if($price == null ) $price= 0;
        @$promise = $_REQUEST["promise"] ;        if($promise == null ) $promise= '';
        @$spec = $_REQUEST["spec"] ;        if($spec == null ) $spec= '';
        @$os = $_REQUEST["os"] ;        if($os == null ) $os= '';
        @$resolution = $_REQUEST["resolution"] ;        if($resolution == null ) $resolution= '';
       @ $battery= $_REQUEST["battery"] ;        if($battery == null ) $battery = '';
       @ $postposition= $_REQUEST["postposition"] ;        if($postposition == null ) $postposition= '';
        @$preposition =$_REQUEST["preposition"] ;        if($preposition == null ) $preposition= '';
        @ $cpu = $_REQUEST["cpu"] ;        if($cpu == null ) $cpu= '';
        @ $pre= $_REQUEST["pre"] ||'';        if($pre == null ) $pre= '';
        @ $ram= $_REQUEST["ram"] ||'';        if($ram == null ) $ram= '';
        @$rom= $_REQUEST["rom"]||'' ;        if($rom == null ) $rom= '';
        @  $is_onsale= $_REQUEST["is_onsale"] ;        if($is_onsale == null ) $is_onsale = 0;
         @ $sold_time= $_REQUEST["sold_time"] ;        if($sold_time == null ) $sold_time= 0;
         @ $weight= $_REQUEST["weight"] ;        if($weight == null ) $weight= '';
         @ $detail= $_REQUEST["detail"] ;        if($detail == null ) $detail= '';
         @ $color= $_REQUEST["color"] ;        if($color == null ) $color= '';
        if($is_onsale==="是") $is_onsale= 1;else $is_onsale = 0;

        $sql  =  " UPDATE ph_product  SET  ";
        $sql .=  " title =  '$title' , ";
        $sql .=  " subtitle =  '$subtitle' , ";
        $sql .=  " price =  $price , ";
        $sql .=  " promise =  '$promise' , ";
        $sql .=  " spec =  '$spec' , ";
        $sql .=  " os =  '$os' , ";
        $sql .=  " resolution =  '$resolution' , ";
        $sql .=  " battery =  '$battery' , ";
        $sql .=  " postposition =  '$postposition' , ";
        $sql .=  " preposition =  '$preposition' , ";
        $sql .=  " cpu =  '$cpu' , ";
        $sql .=  " pre =  '$pre' , ";
        $sql .=  " ram =  '$ram' , ";
        $sql .=  " rom =  '$rom' , ";
        $sql .=  " is_onsale =  $is_onsale , ";
        $sql .=  " sold_time =  $sold_time , ";
        $sql .=  " weight =  '$weight' , ";
         $sql .=  " detail =  '$detail' , ";
          $sql .=  " color =  '$color'  ";
          $sql .= " where pid = $pid ";
        $result = mysqli_query($conn,$sql);
          $user = mysqli_affected_rows($conn);
        if($user>0)echo '{"code":1,"msg":"修改成功"  }';
        else echo '{"code":-1,"msg":"修改不成功,请继续修改" }';

       }
       //接收参数模糊查询
       function productLike(){
       global $conn;
       @$val = $_REQUEST["val"];
       $sql = " SELECT * FROM  ph_product WHERE ";
       if( $val ){
            $vals = explode(" ",$val) ; // 炸开 分开 用explode炸开分开

            for ( $i = 0 ;$i<count($vals) ;$i++ ){

                $vals[$i] =  "title like  '% ". $vals[$i] ."%' "; //记得加引号 引号
            }
            $sql  .=  implode(" and ",$vals);
            $sql .= " limit 10  ";
            $result = mysqli_query($conn,$sql);
            $users = mysqli_fetch_all($result,1);
            echo json_encode($users);
          }
       }
       function  productKW(){
            global $conn;
            @$kw = $_REQUEST["kw"];
            $output = [];
            if($kw){
                $kws = explode(" ",$kw);
                for(  $i = 0 ; $i<count($kws);$i++){
                    $kws[$i] = " title like '%" . $kws[$i] ."%' ";
                }
                $kwall = implode("AND" , $kws);
                $sql = " select * from ph_product where  ".$kwall;
                $result = mysqli_query($conn,$sql);
                $users = mysqli_fetch_assoc($result);
                if(count($users)>0){
                    $pid = $users["pid"];
                    $family_id  = $users["family_id"];
                    $output["data"] = $users;
                    $sql =  " SELECT * FROM ph_product_pic  WHERE  pid = $pid  ";
                    $result = mysqli_query($conn,$sql);
                    $users = mysqli_fetch_all($result,1);
                    $output["pic"] = $users;
                    $sql =  " SELECT * FROM ph_product_family  WHERE  fid = $family_id   ";
                    $result = mysqli_query($conn,$sql);
                    $users = mysqli_fetch_assoc($result);
                    $output["family"] = $users;
                    echo json_encode($output);
                }else{
                    echo  json_encode($output);
                }

            }
       }
       function productLname(){
        global $conn;
        $sql = " SELECT title,lname From ph_product ";
        $result = mysqli_query($conn,$sql);
        $user = mysqli_fetch_all($result,1);
        echo json_encode($user);
       }
       function productSY(){
       global $conn;
       $sql = " SELECT a.title,a.lname,a.price,a.pid,(select sm100 from ph_product_pic  WHERE  pid = a.pid limit 1 ) as sm100 From ph_product a ";
         $result = mysqli_query($conn,$sql);
         $user = mysqli_fetch_all($result,1);
         echo json_encode($user);
       }
	    //分类查找品牌下面的手机
	    function productfamily(){
	    global $conn;
	    $output = [];
	    $sql = " SELECT fid,fname from ph_product_family";
	    $result = mysqli_query($conn,$sql);
	    $users = mysqli_fetch_all($result,1);
        $output["family"] = $users;
	     for( $i = 0;$i<count($users);$i++){

	      $sql =" SELECT a.title , a.price ,a.pid,(select sm100 from ph_product_pic  WHERE  pid =a.pid limit 1 ) as sm100 FROM ph_product a WHERE family_id =    ";

	      $sql .=  $users[$i]["fid"];

		   $result = mysqli_query($conn,$sql);
    	   $user = mysqli_fetch_all($result,1);
            $output["product"][$i] = $user;
	     }
	     echo json_encode($output);
	    }

