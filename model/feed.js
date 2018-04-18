var mongoose =  require('mongoose');
var Schema   = mongoose.Schema;

var FeedSchema = new Schema(
{
author : { 
	 type : String,
	 required : true},
title : {
	 type : String,
	 required : true},
score : {
	 type : String,
	 required : true}
});

module.exports  = mongoose.model('Feeds' , FeedSchema);
