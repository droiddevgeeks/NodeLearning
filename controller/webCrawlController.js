var crawlPage  = require('../crawl/webcrawl.js');
var rssfeed  = require('../crawl/rssfeed.js');
var models = require('../models');
var http_status = require('../helpers/http_status.js');

module.exports = {
  startWebCrawl : function(req , res){
    var response = {"message":"started mining","statusCode": 200};
    http_status.OK(res, response);
    crawlPage.start();
  },

  startRssCrawl : function(req, res){
      var response = {"message":"started mining","statusCode": 200};
      http_status.OK(res, response);
      rssfeed.start();
  },

  getWebCrawlingUrls : function(req , res){

      var response = {};
      models.crawldata.getUrls(function(error , urls){
        if(error){
          http_status.INTERNAL_SERVER_ERROR(res, {
              message: error.message
          });
        }
        response.count = urls.length;
        response.message = "Success";
        response.data = urls;
        http_status.OK(res, response);
      })

  },

  getCrawlingPosts : function(req , res){
      var response = {};
      models.crawldata.getPosts(function(error , posts){
        if(error){
          http_status.INTERNAL_SERVER_ERROR(res, {
              message: error.message
          });
        }
      response.count = posts.length;
      response.message = "Success";
      response.data = posts;
      http_status.OK(res, response);
    });
  }
};
