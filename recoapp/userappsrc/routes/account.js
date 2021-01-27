var router = require("express").Router();
var { authenticate,authorize } = require("../lib/security/accountcontrol.js");
var { username,password,database,host } = require("../config/mysql.config.js");
const mysql = require('mysql');

router.get("/top/",authorize(),(req,res) => {
    var mysql_setting = {
      host     : 'mysql',
      user     : 'root',
      password : 'pass',
      database : 'todo',
      };
    console.log("------------------");
    console.log("req.user:");
    req.user.forEach( (row) => { 
      console.log(row.userid); 
      userid=row.userid
    });
    console.log(userid);
    console.log("------------------");
    var connection = mysql.createConnection(mysql_setting);
      var sql = 'select * from buy where userid=' + userid + ';';
      console.log(sql);
      connection.query(sql,function (error, rows ,fields) {
            if (error == null) {
              res.render("./index.ejs",{ content: rows });
          } else { console.log("hoge  " + error);}
      });
});

router.get("/login",(req,res) =>{
  res.render("./account/login.ejs",{message:req.flash("message")});
});

router.post("/login",authenticate());

router.post("/logout",(req,res)=>{
  req.logout();
  res.redirect("/account/login");
});

router.get("/searchresult/",authorize(),(req,res) => {
  var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
  };
  var itemname = req.query.itemname;
  console.log(itemname);
	var connection = mysql.createConnection(mysql_setting);
  var sql = 'SELECT * FROM item WHERE item="'+ itemname +'";';
  console.log(sql);
  connection.query(sql,
      (error, rows ,fields) => {
      if (error == null) {
        //console.log(rows);
        res.render("./result/index.ejs",{ content: rows });
      } else { console.log("hoge  " + error);}
  });
});

module.exports = router;