<?php
$username = $_GET["username"];
$password = $_GET["password"];

try {
    $dbh = new PDO('mysql:host=mysql;dbname=todo', 'root', 'pass');
    foreach($dbh->query("SELECT username,password FROM userinfo WHERE username ='" . $username . "'" . " and " . "password = '" . $password . "'") as $row) {
        // itemtableとbuytableからusernameと購買履歴を取得する
        if ($row["username"] == $username){
            print "success";
        } else{
            print "error" ;
        }

    }
    $dbh = null;
} catch (PDOException $e) {
    echo $e;
    die();
}
$dbh = null;

?>