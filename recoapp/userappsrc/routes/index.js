var router = require("express").Router();
var { username,password,database,host } = require("../config/mysql.config.js");
const mysql = require('mysql');


router.get("/get/",(req,res) => {
	var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
    };
	var connection = mysql.createConnection(mysql_setting);
    // データベースに接続
    connection.connect();
    // データを取り出す
    connection.query('SELECT * from user', 
            function (error, rows ,fields) {
        // データベースアクセス完了時の処理
        if (error == null) {
          rows.forEach( (row) => { 
            console.log(row.username); 
          });
          console.log(rows);
          res.render("./test/index.ejs",{ content: rows });
            console.log("databaseに繋がったよ");
        } else { console.log("hoge  " + error);}
    });
    // 接続を解除
    connection.end();
});

router.get("/in/",(req,res) => {
	var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
    };
	var connection = mysql.createConnection(mysql_setting);
    // データベースに接続
    connection.connect();
    // データを取り出す
    const employee = { username: 'nakano', email: 'Australia@email.com' };
    connection.query('INSERT INTO user SET ?', employee, (err, res) => {
      if(err) throw err;
      console.log('Last insert ID:', res.insertId);
    });
    // 接続を解除
    res.render("./index.ejs");
    connection.end();
});

router.get("/del/",(req,res) => {
	var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
    };
	var connection = mysql.createConnection(mysql_setting);
    // データベースに接続
    connection.connect();
    // データを取り出す
    connection.query('DELETE FROM user WHERE username = ?', ["nakano"], (err, result) => {
        if (err) throw err;
    
        console.log(`Deleted ${result.affectedRows} row(s)`);
      }
    );
    // 接続を解除
    res.render("./index.ejs");
    connection.end();
});


router.get("/search/",(req,res) => {
	var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
    };
	var connection = mysql.createConnection(mysql_setting);
    // データベースに接続
    connection.connect();
    // データを取り出す
    //var keyword = req.query.word || "";
    var keyword = ""
    var key = '%'+ keyword +'%';
    connection.query('SELECT * FROM user WHERE username LIKE ?;',key,
        (error, rows ,fields) => {
        // データベースアクセス完了時の処理
        if (error == null) {
          rows.forEach( (row) => {
            console.log(row.username); 
          });
          console.log(rows);
          res.render("./test/index.ejs",{ content: rows });
          console.log("get");
        } else { console.log("hoge  " + error);}
    });
    // 接続を解除
    connection.end();
});

router.get("/searchresu/",(req,res) => {
	var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
    };
	var connection = mysql.createConnection(mysql_setting);
    // データベースに接続
    connection.connect();
    // データを取り出す
    var keyword = req.query.word || "";
    console.log(req.query.word);
    //var keyword = "a"
    var key = '%'+ keyword +'%';
    connection.query('SELECT * FROM user WHERE username LIKE ?;',key,
        (error, rows ,fields) => {
        // データベースアクセス完了時の処理
        if (error == null) {
          rows.forEach( (row) => {
            console.log(row.username); 
          });
          console.log(rows);
          res.render("./test/index.ejs",{ content: rows });
          console.log("post");
        } else { console.log("hoge  " + error);}
    });
    // 接続を解除
    connection.end();
});



//CREATE TABLE sample_table (title TEXT NOT NULL, FULLTEXT KEY(title) WITH PARSER NGRAM);

module.exports = router;


