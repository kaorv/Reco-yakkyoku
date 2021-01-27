var { SESSION_SECRET } = require("./config/app.config.js").security;
var accountcontrol = require("./lib/security/accountcontrol.js");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

// Constants
const PORT = 8090;
const HOST = '0.0.0.0';

app.set("view engine","ejs");
app.use("/public",express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(session({
  secret:SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  name:"sid"
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(flash());
app.use(...accountcontrol.initialize());

//dbテスト用route
//app.use("/",require("./routes/test.js"));
//今回のappはsearch画面からなのでここから
app.use("/account",require("./routes/account.js"));

app.listen(PORT, HOST);