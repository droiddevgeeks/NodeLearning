var crawlPage  = require('../crawl/webcrawl.js');
var rssfeed  = require('../crawl/rssfeed.js');
var models = require('../models');

module.exports = {
  startWebCrawl : function(req , res){
    res.send({"message":"started mining","statusCode": 200});
    crawlPage.start();
  },

  startRssCrawl : function(req, res){
      res.send({"message":"started mining","statusCode": 200});
      rssfeed.start();
  },

  getWebCrawlingUrls : function(req , res){

      var response = {};
      models.crawldata.getUrls(function(error , urls){
        if(error){
        }
        response.count = urls.length;
        response.message = "Success";
        response.data = urls;
        res.send(response);
      })

  },

  getCrawlingPosts : function(req , res){
      var response = {};
      models.crawldata.getPosts(function(error , posts){
        if(error){
        }
      response.count = posts.length;
      response.message = "Success";
      response.data = posts;
      res.send(response);
    });
  }
};
