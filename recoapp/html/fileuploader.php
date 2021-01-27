<?php
	$user = $_GET["username"];
	if (!is_dir("${user}/")) { 
		mkdir("${user}/"); 
	} 
    date_default_timezone_set('Asia/Tokyo');
    $date = date("YmdHis");
    $file = file_get_contents("php://input");
    $fileName = "./${user}/${date}.zip";
    file_put_contents($fileName,$file);
    print("succses");
?>