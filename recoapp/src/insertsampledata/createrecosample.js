const mysql = require('mysql');

var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
};

var connection = mysql.createConnection(mysql_setting);
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected');

  //ユーザの個人情報一覧
  connection.query('CREATE TABLE todo.userinfo (userid INT AUTO_INCREMENT NOT NULL PRIMARY KEY,username VARCHAR(50),email VARCHAR(50),password CHAR(50),created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,health_URL TEXT,face_URL TEXT);',
   function (err, result) {
    if (err) throw err; 
    console.log('database created');
  });

  //購買履歴一覧(useridによって分割されている)
  connection.query('CREATE TABLE todo.buy (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,userid INT NOT NULL,buyitem VARCHAR(50),buydate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,phar VARCHAR(50));',
   function (err, result) {
    if (err) throw err; 
    console.log('database created');
  });

  //症状の一覧
  connection.query('CREATE TABLE todo.symptom (type1 VARCHAR(50) NOT NULL,srcurl VARCHAR(50),srcurl2 VARCHAR(50),description TEXT NOT NULL);',
   function (err, result) {
    if (err) throw err; 
    console.log('database created');
  });

  //商品の一覧(商品に関する詳細が書かれている)
  connection.query('CREATE TABLE todo.item (itemid INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,item VARCHAR(50) NOT NULL,value INT NOT NULL,description TEXT NOT NULL,type1 VARCHAR(50) NOT NULL,type2 VARCHAR(50),type3 VARCHAR(50),Ban TEXT,limitednum INT,link TEXT,modallink1 TEXT,modallink2 TEXT,modallink3 TEXT);',
   function (err, result) {
    if (err) throw err; 
    console.log('database created');
  });

  //カートtable(より扱いやすくするためにdatabaseに格納した)
  connection.query('CREATE TABLE todo.cart (addid INT AUTO_INCREMENT NOT NULL PRIMARY KEY,item VARCHAR(50) NOT NULL,value INT NOT NULL,phar VARCHAR(50));',
   function (err, result) {
    if (err) throw err; 
    console.log('database created');
  });

  //自販機在庫table
  connection.query('CREATE TABLE todo.recostock (venderid INT NOT NULL,item VARCHAR(50) NOT NULL,stocknum INT NOT NULL);',
   function (err, result) {
    if (err) throw err; 
    console.log('database created');
  });

  connection.end();
});