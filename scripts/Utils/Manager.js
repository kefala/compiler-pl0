"use strict";


var SyntacticAnalizer = require('./../Sintacticos/SyntacticAnalizer');

var Manager = {
	ready: function () {
		var that = this;
		global.LexicalAnalizer.getItem(function (obj) {
			if (obj === null) {
				return;
			} else {
				console.log(SyntacticAnalizer, obj.st);
				that.ready();
			}
		});
	}
};

module.exports = Manager;