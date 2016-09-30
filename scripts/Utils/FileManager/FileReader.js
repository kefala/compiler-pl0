"use strict";

var fs = require('fs')
var FileReader = {};


FileReader.open = function (fileName, callback) {
	fs.readFile(fileName, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		callback(data);
	});	
};

module.exports = FileReader;