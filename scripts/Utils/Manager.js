"use strict";

var Manager = {
	ready: function () {
		var that = this;
		global.LexicalAnalizer.getItem(function (obj) {
			if (obj === null) {
				return;
			} else {
				console.log(obj.st);
				that.ready();
			}
		});
	}
};

module.exports = Manager;