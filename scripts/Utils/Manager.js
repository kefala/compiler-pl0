"use strict";

var Manager = {
	ready: function () {
		var that = this;
		global.LexicalAnalizer.getItem(function (obj) {
			if (obj === null) {
				console.log("------fin-----");
			} else {
				//console.log(obj);
				that.ready();
			}
		});
	
	}
};

module.exports = Manager;