/* 
  description
  -------------------------
    認証・認可処理を行っている場所
    認証が成功すればtopページへ
    失敗すればloginページへ再度戻る仕組みである
    topページからは認可処理をauthorize()で行う
    認可処理は以下のようにauthorize()をrouter
    に渡してあげれば認可が持続される
    ex)
    router.get("~",authorize(),(req,res) => {
      ~
    });
*/
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var initialize,authenticate,authorize;
const mysql = require('mysql');

passport.serializeUser((email,done)=>{
  done(null,email);
});

passport.deserializeUser((email,done)=>{
  var mysql_setting = {
    host     : 'mysql',
    user     : 'root',
    password : 'pass',
    database : 'todo',
    };
  email.forEach( (emailitem) => { 
    emailone=emailitem.username
  });
  var sql = 'SELECT * from userinfo WHERE username="' + emailone +'";';
  var connection = mysql.createConnection(mysql_setting);
    connection.query(sql,function (error, user ,_) {
          if (error == null) {
            return done(null,user);
          } else { 
            return done(error);
          }
    });
});

passport.use("local-strategy",
  new LocalStrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
  },(req,username,password,done)=>{
    var mysql_setting = {
      host     : 'mysql',
      user     : 'root',
      password : 'pass',
      database : 'todo',
    };
    console.log("------------------");
    console.log("loginusername:");
    console.log(username);
    console.log("password:")
    console.log(password);
    console.log("------------------");
    var connection = mysql.createConnection(mysql_setting);
    var sql = 'SELECT * from userinfo WHERE username="'+ username +'" AND password="' + password + '";';
    connection.query(sql,function (_, users ,_) {
      users.forEach( (user) => { 
        loginusername = user.username;
        userpassword = user.password;
        userid = user.userid;
      });
      if(username !== loginusername){
        // Error
        return done(null, false);
      } else if(password !== userpassword) {
        // Error
        return done(null, false);
      } else {
        // Success and return user information.
        return done(null,users);
      }
    });
  })
);

initialize = function (){
  return [
    passport.initialize(),
    passport.session(),
    function(req,res,next){
      if(req.user){
        res.locals.user = req.user;
      }
      next();
    }
  ];
};

authenticate = function(){
  return passport.authenticate(
    "local-strategy",{
      successRedirect:"/top",
      failureRedirect:"/login"
    }
  );
};

authorize =function (privilege){
  return function(req,res,next){
    if (req.isAuthenticated()){
      next();
    }else{
      res.redirect("/login")
    }
  }
};

module.exports = {
  initialize,
  authenticate,
  authorize
};