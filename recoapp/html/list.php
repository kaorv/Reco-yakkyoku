<?php
$username = $_GET["username"];
$password = $_GET["password"];
$pagenum = $_GET["pagenum"];

try {
    $dbh = new PDO('mysql:host=mysql;dbname=todo', 'root', 'pass');
    foreach($dbh->query("select * from buy left join userinfo on buy.userid=userinfo.userid where username='" . $username . "' and password='" . $password . "'") as $row) {
        // itemtableとbuytableからusernameと購買履歴を取得する
        print $row["buydate"] . "=";
        print $row["buyitem"] . ",";
    }
    $dbh = null;
} catch (PDOException $e) {
    echo $e;
    die();
}
$dbh = null;

?>