var WebUrl = require('./schemas/webmine.js');
var Feedpost = require('./schemas/feed.js');

module.exports = {
  getUrls : function(callback){
    WebUrl.find({},function(err,urls){
      if(err){
          callback(err ,null);
      }
      callback(null, urls);
    });
  },
  getPosts : function(callback){
    Feedpost.find({},function(err,posts){
      if(err){
          callback(err ,null);
      }
      callback(null, posts);
    });
  }
};
