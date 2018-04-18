var express  = require('express');
var User = require('./model/user.js');
var config  = require('./config/config.js');
var mailer = require('./mail/mail.js');
var router =  express.Router();


router.post("/signIn" , function(req  ,res) {
var username = req.body.name;
var pass  = req.body.password;
var number   = req.body.number;

var userData  = new User();
userData.name = username;
userData.password = pass;
userData.number  =number;

checkUserData( number , function(err , userExist){
 if( userExist)
{
res.send({"Success" : false , "error": "User already exist"});
}
else
{
console.log("userExist");
userData.save(function(err , user){
if(err) return err;
var response = {};
response.data =  user;
mailer.sendMail(user);
res.send(response);
});
}

});

});

router.post("/myInfo" , function(req  ,res){
    var number  = req.body.number;
    if(!number)
    {
        res.send({"success":false,"error":"parameter missing"});
    }
    checkUserData(number , function(err , userExist){
     if(!userExist)
    {
    res.send({"Success":false,"error":"User Dont Exist"});
    }
    else
    {
     var response = {};
    response.data = userExist;
    res.send(response);
    }
});
});

router.post("/signUp" , function(req , res){
var password = req.body.password;
var number  = req.body.number;

checkUserData(number , function(err , userExist){
 if(!userExist)
{
res.send({"Success":false,"error":"User Dont Exist"});
}
else
{
 var response = {};
response.data = userExist;
res.send(response);
}
});

});

router.get("/alluser/:count" , function(req , res){
    var count = parseInt(req.params.count)
    if(count < 0 ||count >5)
    count = 5;
   User.find({},function(err,users)
   {
       if(err !=null)
       {
           res.send({"message": "No user data","count":0 , "Status": 400})
       }
       var response = {};
       response.count = users.length;
       response.message = "Success";
       response.data = users;
        res.send(response);
   })
   .limit(count)
   .sort({
       number: 'desc'
   })
});

function checkUserData(number , callback)
{
User.findOne({number:number} , function(err , userExist){
if(err) callback(err , null);
callback(null,userExist);
});
}

module.exports  =router;

