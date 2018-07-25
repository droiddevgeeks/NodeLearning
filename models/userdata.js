var User = require('./schemas/user.js');
module.exports = {

  checkUserExist : function(number , callback){

    User.findOne({number:number} , function(err , userExist){
    if(err) callback(err , null);
    callback(null,userExist);
    });
  },

  createUser : function(user , callback){
    user.save(function(err , user){
    if(err) return callback(err ,null);
    callback(null , user);
    });
  },

  findAll : function(callback){
    User.find({},function(err,users){
    if(err){
      callback(err, null);
    }
    callback(null,users);
  });
  }
};
