<?php
$item = $_GET["item"];

try {
    $dbh = new PDO('mysql:host=mysql;dbname=todo', 'root', 'pass');
    foreach($dbh->query("SELECT * FROM item WHERE item ='" . $item . "'") as $row) {
        print $row["description"];
    }
    $dbh = null;
} catch (PDOException $e) {
    echo $e;
    die();
}
$dbh = null;

?>