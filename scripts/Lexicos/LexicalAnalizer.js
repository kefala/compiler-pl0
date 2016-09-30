"use strict";

var Position = require("./CursorPosition");

function LexicalAnalizer(code) {
	this.code = code;
	this.position = Position;
}

LexicalAnalizer.prototype.start = function() {
	var that = this;
	for (var i = 0; i <= that.code.length; i++) {

		if (typeof(that.code.charCodeAt(i)) === "number" && !isNaN(that.code.charCodeAt(i))) {
			
			console.log(that.code.charAt(i), that.code.charCodeAt(i));
			console.log(that.position);
			
			// call to apropiete boolean function
			if (false) {
				break;
			}

			that.position.finish.column++;
			if (that.code.charCodeAt(i) === 10) {
				that.position.finish.line++;
				that.position.finish.column = 0;
				that.position.start.line++;
				that.position.start.column = 0;
			}
			if (that.code.charCodeAt(i) === 32) {
				that.position.start.column = that.position.finish.column;
			}

		}
		
	}

};

module.exports = LexicalAnalizer;