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
  console.log(email);
  email.forEach( (emailitem) => { 
    //console.log(emailitem.email);
    emailone=emailitem.email
  });
  //console.log(emailone);
  var sql = 'SELECT * from userinfo WHERE email="' + emailone +'";';
  //console.log(sql);
  var connection = mysql.createConnection(mysql_setting);
    connection.query(sql,function (error, user ,fields) {
          console.log("ここdesuka");
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
    console.log("req.body:");
    console.log(req.body);
    //console.log(username);
    //console.log(password);
    var connection = mysql.createConnection(mysql_setting);
    var sql = 'SELECT * from userinfo WHERE email="'+ username +'" AND password="' + password + '";';
    //console.log(sql);
    connection.query(sql,function (error, users ,fields) {
      console.log(users);
      users.forEach( (user) => { 
        //console.log(people.email);
        useremail = user.email;
        userpassword = user.password;
        userid = user.userid;
      });
      console.log("bb");
      if(username !== useremail){
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
      successRedirect:"/account/top",
      failureRedirect:"/account/login"
    }
  );
};

authorize =function (privilege){
  return function(req,res,next){
    if (req.isAuthenticated()){
      next();
    }else{
      res.redirect("/account/login")
    }
  }
};

module.exports = {
  initialize,
  authenticate,
  authorize
};