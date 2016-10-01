"use strict";
var path = require('path');

var EM = require('../Utils/Errors/ErrorManager');

function LexicalAnalizer(code) {
	this.code = code;
	this.processCode = [];
}

LexicalAnalizer.prototype.start = function() {
	var code = this.code, palabra = [], reglon = [], processCode = [];
	
	function addPalabra(palabra, reglon) {

		if (!isAPR(palabra) || !isAIdent(palabra)) {
			EM.error({
				type: "Lexical "
			});
		}

		reglon.push(palabra);
		return reglon;
	} 

	function isAPR (palabra) {
		return true;
	}

	function isAIdent (palabra) {
		return true;
	}


	for (var i = 0; i <= code.length; i++) {

		if (typeof(code.charCodeAt(i)) === "number" && !isNaN(code.charCodeAt(i))) {

			if (code.charCodeAt(i) !== 32 && code.charCodeAt(i) !== 10) {
				palabra.push(code.charAt(i));
			}
			
			if (code.charCodeAt(i) === 32) {
				reglon = addPalabra(palabra, reglon);
				palabra = [];
				if (code.charCodeAt(i - 1) !== 32) {
					reglon = addPalabra(palabra, reglon);
				}
			}
			if (code.charCodeAt(i) === 10 || code.length - 1 === i) {
				reglon = addPalabra(palabra, reglon);
				processCode.push(reglon);
				palabra = [];
				reglon = [];

			}
		}
	}
	console.log(processCode);
	this.processCode = processCode;

};






module.exports = LexicalAnalizer;