var request = require('request');
var cheerio = require('cheerio');
var Feeds = require('../models/schemas/feed.js');

module.exports.start = function(){

  request("https://www.reddit.com", function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }

    var $ = cheerio.load(body);
    $('div#siteTable > div.link').each(function( index ) {
      var title = $(this).find('p.title > a.title').text().trim();
      var score = $(this).find('div.score.unvoted').text().trim();
      var user = $(this).find('a.author').text().trim();

      // inserting data in DB
    var feedData  = new Feeds();
    feedData.author  = user;
    feedData.title   =title;
    feedData.score  = score;
    feedData.save(function(err , feeds){
        if(err){
            console.log("Error:");
            return err;
        }
        var response = {};
        response.data =  feeds;
        });
      });
  });

}
