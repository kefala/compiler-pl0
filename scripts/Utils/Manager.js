"use strict";


var SyntacticAnalizer = require('./../Sintacticos/SyntacticAnalizer');
var sa = new SyntacticAnalizer();

var Manager = {
	ready: function () {
		var that = this;
		global.LexicalAnalizer.getItem(function (obj) {
			if (obj === null) {
				return;
			} else {
				sa.build(obj.st);
				that.ready();
			}
		});
	}
};

module.exports = Manager;