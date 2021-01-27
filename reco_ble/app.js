const express = require("express");
const app = express();


app.set("view engine","ejs");
app.use("/public",express.static(__dirname + "/public"));

app.use("/",require("./routes/index.js"));
app.use("/account/",require("./routes/account.js"));

app.listen(8080);