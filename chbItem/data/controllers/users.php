<?php
    require("../init.php");
    require("../00_imageUtils.php");
//    注册新用户 js中先检查用户名是否存在 存在就不会执行这一步
//    验证码很重要的一步 php中也要判断用户名或者密码是否符合规范
    function register(){
        global $conn;
        @$uname = $_REQUEST["uname"].trim();
        @$upwd = $_REQUEST["upwd"].trim();
        @$yzm = $_REQUEST["yzm"].trim();
        session_start();
        $code = $_SESSION['code'];
        $uPattern = '/^[0-9a-zA-Z_]{3,12}$/';
        $pPattern = '/^\w{3,12}$/';
        $yPattern = '/^[a-zA-Z]{4}$/';
        if(!preg_match($uPattern,$uname)){    //preg_math(pattern,$) 判断正则表达式啊
            die('{"code":-1,"msg":"用户名格式不正确"}');
        }
        if(!preg_match($pPattern,$upwd)){
            die('{"code":-2,"msg":"密码格式不正确"}');
        }
		if($yzm!=$code){
		    die('{"code":-3,"msg":"验证码不正确"}');
		}
        if(!preg_match($yPattern,$yzm)){
            die('{"code":-3,"msg":"验证码格式不正确"}');
        }
		#$sql = "SELECT * FROM test_user WHERE binary uname = '$uname' AND binary upwd = '$upwd'";  binary 取的时候
        $sql = " INSERT INTO ph_user (uname,upwd) VALUES ('$uname',md5('$upwd'))";  //记得加密加密
        $result = mysqli_query($conn,$sql);
        echo ('{"code":1,"msg":"注册成功"}');
    }
    // 检查用户名是否存在
    function checkName(){
         global $conn;
         @$uname = $_REQUEST["uname"];
         $uPattern = '/[a-zA-Z0-9_]{3,12}/';
         if(!preg_match($uPattern,$uname)){
             die('{"code":-1,"msg":"用户名格式不正确"}');
         }
         $sql = "SELECT uid FROM ph_user WHERE uname = '$uname'";
         $result = mysqli_query($conn , $sql);
         $row = mysqli_fetch_assoc($result);
         if($row==null){
			echo ('{"code":1,"msg":"可以注册"}');
		 }else{
			echo ('{"code":-2,"msg":"用户名已存在"}');
		 }
    }
    // 登陆账户  session_start();一个函数里面只要开一个就可以了
    function login(){
        global $conn;
        @$uname = $_REQUEST["uname"].trim();
        @$upwd = $_REQUEST["upwd"].trim();
        @$yzm = $_REQUEST["yzm"].trim();
        session_start();
        $code = $_SESSION["code"];
        $uPattern = '/^[0-9a-zA-Z_]{3,12}$/';
        $pPattern = '/^\w{3,12}$/';
        $yPattern = '/^[a-zA-Z]{4}$/';
        if(!preg_match($uPattern,$uname)){    //preg_math(pattern,$) 判断正则表达式啊
            die('{"code":-1,"msg":"用户名格式不正确"}');
        }
        if(!preg_match($pPattern,$upwd)){
            die('{"code":-2,"msg":"密码格式不正确"}');
        }
		if($yzm!=$code){
		    die('{"code":-3,"msg":"验证码不正确"}');
		}
        if(!preg_match($yPattern,$yzm)){
            die('{"code":-3,"msg":"验证码格式不正确"}');
        }
        $sql = "SELECT uid FROM ph_user WHERE uname = '$uname' AND binary upwd = md5('$upwd') AND expire = '0' " ;
        $result = mysqli_query($conn,$sql);
        $user = mysqli_fetch_assoc($result);
        if($user !=null ){
            $_SESSION["uid"] = $user["uid"];
            echo '{"code":1,"msg":"登陆成功"}';
        }else{
           echo '{"code":-4,"msg":"密码错误或账户不存在"}';
        }
    }
    function isLogin(){
        global $conn;
        session_start();
        @$uid = $_SESSION["uid"];
        if(!$uid){
            die('{"code":-1,"msg":"用户未登录"}');
         }
         $sql = "   SELECT uname FROM ph_user WHERE uid = $uid";
         $result = mysqli_query($conn,$sql);
         $row = mysqli_fetch_row($result);

         if($row != null){
         $sql = " SELECT r.rname from ph_role r where r.rid = ( select b.rid from ph_user_role b where b.uid = $uid) ";
          $result = mysqli_query($conn,$sql);
          $fname = mysqli_fetch_row($result);
          $uname = ["code"=>$fname[0],"msg"=>$row[0]];
         echo  json_encode($uname);}
         else {
         echo '{"code":-2,"msg":"用户不存在"}';
         }
    }
    function users(){
        global $conn;
        $sql = " select a.uid,a.uname,a.email,a.user_name,a.phone,a.avatar,(select b.rname from ph_role b where b.rid = (select c.rid from ph_user_role c where c.uid = a.uid) ) as rname from ph_user a where expire = '0'  ";
           $result = mysqli_query($conn,$sql);

           $rows = mysqli_fetch_all($result,1);
           echo json_encode($rows);
      }
     //注销
     function loginout(){
       
        session_start();
        $_SESSION["uid"]=null;
		echo '{"code":-2,"msg":"用户已经注销"}';
     }
     function cxyh(){
        global $conn;
        @$uid = $_REQUEST["uid"];
        if($uid){
            $sql = " SELECT uname,email,user_name,phone,uid FROM ph_user WHERE uid = $uid ";
            $result = mysqli_query($conn,$sql);
            $user = mysqli_fetch_assoc($result);
            echo json_encode($user);
        }
     }
     function xgyh(){
        global $conn;
        @$uid = $_REQUEST["uid"];
        if($uid){
            @$user_name = $_REQUEST["user_name"];
            if(!$user_name) $user_name =null;
            @$email = $_REQUEST["email"] ;
            if(!$email) $email =" ";
            @$phone = $_REQUEST["phone"] ;
            if(!$phone) $phone =" ";
            $sql = " UPDATE ph_user SET user_name = '$user_name', email = '$email', phone='$phone' where uid = $uid ";
            $result = mysqli_query($conn,$sql);
            $user =  mysqli_affected_rows($conn);
            if(count($user)>0){
                echo '{"code":1,"msg":"修改成功"}';
            }else{
                echo '{"code":-1,"msg":"修改失败"}';
            }
        }
     }
     function  scyh(){
         global $conn;
         @$uid = $_REQUEST["uid"];
         if($uid){
           $sql = " UPDATE ph_user SET expire = '1' WHERE uid = $uid";
           $result = mysqli_query($conn,$sql);
           $row = mysqli_affected_rows($conn);
           if(count($row)>0){
            echo '{"code":1,"msg":"删除成功"}';
           }else{
            echo '{"code":-1,"msg":"删除失败"}';
           }
         }
     }
     function xgtx(){
        global $conn;
        $rs = empty($_FILES); //判断这个定向是否为空
        if($rs){
            die ('{"code":-1,"msg":"上传文件不存在"}');
        }
        @$uid = $_REQUEST["uid"];
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
         $new = "../../upload/user/bs/".$pname;
         move_uploaded_file($old,$new);
         $result = mkThumbnail("../../upload/user/bs/".$pname, 80, 80,"../../upload/user/img80/".$pname );
         $avatar = "upload/user/img80/".$pname;

         $sql = "UPDATE ph_user SET avatar = '$avatar'  where uid = $uid ";
         $result = mysqli_query($conn,$sql);
         $row = mysqli_affected_rows($conn);
         if($row>0){
            echo '{"code":1,"msg":"上传成功"}';
         }else{
            echo '{"code":-4,"msg":"上传失败"}';
         }
     }
