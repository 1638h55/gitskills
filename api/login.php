<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
		session_start();
		//$_SESSION["user"]=null;
		if(!isset($_SESSION["user"])||){
			$user=0;
			if(isSet($_POST["mobile"]) && isSet($_POST["password"])){
				$conn=new mysqli("localhost","root","","db_test");
				mysqli_query($conn,"set character set 'utf8'");//读库
				mysqli_query($conn,'set names utf8');//写库
				$result=$conn->query("select * from t_user where mobile='".$_POST["mobile"]."' and secret='".$_POST["password"]."';");
				while($row = mysqli_fetch_assoc($result)){
					$user=$row["mobile"];
					$_SESSION["secret"]=$row["password"];
				}
				$conn->close();
			}
			echo $user;
		}else{
			if(isset($_SESSION["user"])){
				echo $_SESSION["user"];
			}
		}
    }
    doPost();

?>