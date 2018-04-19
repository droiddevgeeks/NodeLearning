// use of strict is that we have to declare variable first then use.
// normally in java stript we can use variable fisrt before declaring
'use strict' 
var express = require('express');
var app = express();
var body_parser = require('body-parser');
const ejs = require('ejs');
const prettyMs = require('pretty-ms');

var authRoute  = require('./userController.js');
var dbconnection = require('./db/dbconnection');
var config = require('./config/config.js');
var routerdemo = require('./routingdemo/routingdemo.js');
var crawlPage  = require('./crawl/webcrawl.js');
var WebUrl = require('./model/webmine.js');
var rssfeed  = require('./crawl/rssfeed.js');
var Feedpost  = require('./model/feed.js');

// Middlewares to parse the body
app.set('view engine', ejs);
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true})); 
app.use('/api',authRoute);
app.use('/routedemo', routerdemo)
app.use(express.static('public'));
app.use('/resources', express.static(__dirname + '/images'));

var sendBadRequestError = (error, response) => {
  response.status(400)
      .send(error);
};

var sendInternalServerError = (error, response) => {
  response.status(500)
      .send(error);
};

var sendFileNotFoundError = (error, response) => {
  response.status(404)
      .send(error);
};

// middleware 
var requestTime = function (req, res, next)
{
 req.requestTime = Date.now()
 //console.log("Api request at--------------------- "+prettyMs(req.requestTime));
 console.log("Api request at--------------------- "+req.requestTime);
 console.log("Api request URL--------------------- "+req.originalUrl);
 next()
}

app.use(requestTime)

// html page render code
app.get('/policy' , function(req  ,res){
  res.render('privacypolicy.ejs');
});

app.get('/rules' , function(req  ,res)
{
  res.render('rulesnregulations.ejs');
});


/* call chainig using array as well as next method */
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})      /* call chaining demo ends here */


app.get('/webcrawl/', (request, response)=>{
response.send({"message":"started mining","statusCode": 200});
crawlPage.start();
});

app.get('/weburls' , function(req , res){
  WebUrl.find({},function(err,urls){
    if(err !=null){
        res.send({"message": "No url data","count":0 , "Status": 400})
    }
    var response = {};
    response.count = urls.length;
    response.message = "Success";
    response.data = urls;
    res.send(response);
  });
});

app.get('/rssfeed', function(req, res){
  res.send({"message":"started mining","statusCode": 200});
  rssfeed.start();
});

app.get('/posts' , function(req , res){
  Feedpost.find({},function(err,posts){
    if(err !=null){
        res.send({"message": "No url data","count":0 , "Status": 400})
    }
    var response = {};
    response.count = posts.length;
    response.message = "Success";
    response.data = posts;
    res.send(response);
  });
});





var server = app.listen(config.port, function () {
    console.log("----------------------------------------------------------------")
    console.log('Node server is running..'+ "http://localhost:"+config.port);
    console.log("----------------------------------------------------------------")
});

