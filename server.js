// use of strict is that we have to declare variable first then use.
// normally in java stript we can use variable fisrt before declaring
'use strict'
var express = require('express');
var app = express();
var db = require('./db/dbconnection.js');
var body_parser = require('body-parser');
var config = require('./config/config.js');
var routes = require('./routes');
const ejs = require('ejs');

// Middlewares to parse the body
app.set('view engine', ejs);
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use('/', routes);

var server = app.listen(config.port, function () {
    console.log("----------------------------------------------------------------")
    console.log('Node server is running..'+ "http://localhost:"+config.port);
    console.log("----------------------------------------------------------------")
});
