"use strict";

function LexicalAnalizer(code) {
	this.code = code;
	this.processCode = [];
}

LexicalAnalizer.prototype.start = function() {
	var code = this.code;
	var palabra = [], reglon = [], processCode = [];
	var j = 0;
	for (var i = 0; i <= code.length; i++) {

		if (typeof(code.charCodeAt(i)) === "number" && !isNaN(code.charCodeAt(i))) {

			if (code.charCodeAt(i) !== 32 && code.charCodeAt(i) !== 10) {
				palabra.push(code.charAt(i));
			}

			if (false) {
				break;
			}
			
			if (code.charCodeAt(i) === 32) {
				reglon.push(palabra);
				palabra = [];
				if (code.charCodeAt(i - 1) !== 32) {
					reglon.push(palabra);
				}
			}
			if (code.charCodeAt(i) === 10 || code.length - 1 === i) {
				reglon.push(palabra);
				processCode.push(reglon);
				palabra = [];
				reglon = [];

			}
		}
	}

	that.processCode = processCode;

};



module.exports = LexicalAnalizer;