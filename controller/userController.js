var User = require('../models/schemas/user.js');
var mailer = require('../mail/mail.js');
var models = require('../models');


module.exports = {
signIn  : function(req  ,res) {
var username = req.body.name;
var pass  = req.body.password;
var number   = req.body.number;

var userData  = new User();
userData.name = username;
userData.password = pass;
userData.number  =number;

models.userdata.checkUserExist(number , function(err , userExist){
  if(err){
    return;
  }
  if( userExist){
   res.send({"Success" : false , "error": "User already exist"});
  }
  else{
      console.log("user don't Exist");
      models.userdata.createUser(userData, function(err, userInfo){
        if(err) return err;
        var response = {};
        response.data =  userInfo;
      //  mailer.sendMail(userInfo);  // will do later
        res.send(response);
      });
    }

  });
},

myInfo:  function(req  ,res){
    var number  = req.body.number;
    if(!number){
        res.send({"success":false,"error":"parameter missing"});
    }
    models.userdata.checkUserExist(number , function(err , userExist){
      if(err){
        return;
      }
      if(!userExist){
       res.send({"Success" : false , "error": "User Dont exist"});
      }
      else{
       var response = {};
       response.data = userExist;
       res.send(response);
      }
    });
},

signUp:  function(req , res){
var password = req.body.password;
var number  = req.body.number;

models.userdata.checkUserExist(number , function(err , userExist){
  if(err){
    return;
  }
  if(!userExist){
   res.send({"Success" : false , "error": "User Dont exist"});
  }
  else{
    if(password !== userExist.password){
      res.send({"Success": false,"reason":"Invalid creadentials"});
    }
    var response = {};
    response.data = userExist;
    res.send(response);
    }
  });

},

allUserCount  : function(req , res){
   models.userdata.findAll(function( err , users){
       if(err){
           return;
       }
       if(users.lenght == 0){
         res.send({"message": "No user data","count":0 , "Status": 400})
       }
       var response = {};
       response.count = users.length;
       response.message = "Success";
       response.data = users;
        res.send(response);
   });
 }

};
