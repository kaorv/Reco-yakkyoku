var router = require("express").Router();
const hostnamespace = "localhost"
// const domain = "ec2-54-172-90-103.compute-1.amazonaws.com"

router.get("/top/",(req,res) => {
  res.render("./index.ejs",{ domain:hostnamespace });
});


module.exports = router;