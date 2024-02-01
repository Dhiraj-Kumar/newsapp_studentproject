const express= require("express");
const bodyparser= require("body-parser");
const router = require('./Routes/emailRouter')
var cors = require('cors')
let port =process.env.PORT || 8005;
const app= express();


app.use(cors())
app.use(bodyparser.urlencoded({extended:false}));
app.use('/',router)

// Failure route
// app.post("/failure",function(req,res){
//    res.redirect("/");
// })

app.listen(port,function(){
  console.log("server is running on port 8005.");
})