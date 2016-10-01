"use strict";

var colors = require('colors/safe');

var EM = {
	error: function (params) {
		console.log(colors.red.underline(params.type + 'error'));
		process.exit();
	}
};

module.exports = EM;