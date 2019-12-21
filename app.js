// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

var firstname=req.body.firstname;
var lastname=req.body.lastname;
var email = req.body.email;

var data = {
  members:[
    {email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};

var jsonData = JSON.stringify(data);

  var options = {
    url:"https://us4.api.mailchimp.com/3.0/lists/55b1d9599d",
    method:"POST",
    headers :{
    "Authorization":"aansh 9921600d88b0ce345b5bdf0f2b62bb67-us4"
  },
   body:jsonData
  };

  request(options,function(error,response,body){
    if(error || response.statusCode!=200)
    res.sendFile(__dirname+"/failure.html");
    else
    res.sendFile(__dirname+"/success.html");
  });
});

app.post("/failure.html",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("Started server on port 3000");
});



///API :9921600d88b0ce345b5bdf0f2b62bb67-us4
//// IDEA: 55b1d9599d
