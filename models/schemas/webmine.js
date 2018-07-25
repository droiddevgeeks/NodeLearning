var mongoose =  require('mongoose');
var Schema   = mongoose.Schema;

var CrawlSchema = new Schema(
{
url : { 
	 type : String,
	 required : true}
});

module.exports  = mongoose.model('WebUrl' , CrawlSchema);
