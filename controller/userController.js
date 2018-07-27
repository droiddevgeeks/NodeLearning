var User = require('../models/schemas/user.js');
var mailer = require('../mail/mail.js');
var models = require('../models');
var http_status = require('../helpers/http_status.js');
var error_status = require('../helpers/errors.js');

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
    http_status.INTERNAL_SERVER_ERROR(res, {
        message: err.message
    });
  }
  if( userExist){
    var response = {"Success" : false , "error": "User already exist"};
    http_status.OK(res, response);
  }
  else{
      console.log("user don't Exist");
      models.userdata.createUser(userData, function(err, userInfo){
        if(err) return err;
        var response = {};
        response.data =  userInfo;
        http_status.OK(res, response);
      });
    }

  });
},

myInfo:  function(req  ,res){
    var number  = req.body.number;
    if(!number){
        var error = {"success":false,"error":"parameter missing"};
        error_status.ParamsMissing(error, res);
    }
    models.userdata.checkUserExist(number , function(err , userExist){
      if(err){
        http_status.INTERNAL_SERVER_ERROR(res, {
            message: err.message
          });
      }
      if(!userExist){
        var response = {"Success" : false , "error": "User Dont exist"};
        http_status.OK(res, response);
      }
      else{
       var response = {};
       response.data = userExist;
       http_status.OK(res, response);
      }
    });
},

signUp:  function(req , res){
var password = req.body.password;
var number  = req.body.number;

models.userdata.checkUserExist(number , function(err , userExist){
  if(err){
    http_status.INTERNAL_SERVER_ERROR(res, {
        message: err.message
    });
  }
  if(!userExist){
    var response = {"Success" : false , "error": "User Dont exist"};
    http_status.OK(res, response);
  }
  else{
    if(password !== userExist.password){
      var error = {"Success": false,"reason":"Invalid creadentials"};
      error_status.InvalidCredential(error, res);
    }
    var response = {};
    response.data = userExist;
    http_status.OK(res, response);
    }
  });

},

allUserCount  : function(req , res){
   models.userdata.findAll(function( err , users){
       if(err){
         http_status.INTERNAL_SERVER_ERROR(res, {
             message: err.message
         });
       }
       if(users.lenght == 0){
         var response = {"message": "No user data","count":0 , "Status": 400};
         http_status.OK(res, response);
       }
       var response = {};
       response.count = users.length;
       response.message = "Success";
       response.data = users;
       http_status.OK(res, response);
   });
 }

};
