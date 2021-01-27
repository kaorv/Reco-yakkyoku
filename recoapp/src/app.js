var { SESSION_SECRET } = require("./config/app.config.js").security;
var accountcontrol = require("./lib/security/accountcontrol.js");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
const path = require("path");
const {get} = require("request");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.set("view engine","ejs");
app.use("/public",express.static(__dirname + "/public"));

// 自己証明書によるSSL化
var fs = require('fs');
var https = require('https');
var options = {
  //サーバキーとサーバ証明書
  key: fs.readFileSync(path.resolve(__dirname, "key/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "key/server.crt"))
};

//アプリケーション側は8080番portを開いている
var port = 8080;
app.set('port', port);
//httpsのプロトコルを使用する
var server = https.createServer(options, app);

//ejsでpathを省略できるようにするために用いている
app.use(express.static(path.join(__dirname, "/images")))
app.use(express.static(path.join(__dirname, "/weights")))
app.use(express.static(path.join(__dirname, "/dist")))

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

app.use("/",require("./routes/account.js"));

server.listen(port);