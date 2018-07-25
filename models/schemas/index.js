var fs = require("fs");
var path = require("path");
var schemas = {};

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function (file) {
    var file_name = file.replace(".js", "");
    schemas[file_name] = require(path.join(__dirname, file));
});

module.exports = schemas;
