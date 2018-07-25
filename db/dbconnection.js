var mongoose = require('mongoose');
var config  = require('../config/config.js');
console.log("----------------------------------------------------------------")
console.log("Database Server running..."+config.db);
mongoose.connect(config.db);
console.log('Database Connected');
console.log("----------------------------------------------------------------")
