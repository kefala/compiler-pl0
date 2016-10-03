"use strict";
var EM = require('../Utils/Errors/ErrorManager');
var Position = require("./Cursor");

function LexicalAnalizer(code) {
	this.code = code;
	this.processCode = [];
	this.position = new Position(0, -1);
	this.start();
}

LexicalAnalizer.prototype.start = function() {
	var code = this.code, palabra = [], reglon = [], processCode = [], isAdd = false;
	
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
					reglon = addPalabra([], reglon);
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

	this.processCode = processCode;
};

LexicalAnalizer.prototype.getItem = function(cb) {
	var that = this;
	var item = null;
	that.position.column++;
	
	function set(position) {
		if (that.processCode.length === position.line) {
			cb(null);
		} else {
			that.position = position;
			that.getItem(cb);
		}
	}

	if (Array.isArray(that.processCode[that.position.line])) {
		if (Array.isArray(that.processCode[that.position.line][that.position.column])) {
			item = that.setItem(that.processCode[that.position.line][that.position.column]);
			cb(that.processCode[that.position.line][that.position.column]);
		} else {
			set(new Position(++that.position.line, -1));
		}
	} else {
		cb(null);
	}
	
};


LexicalAnalizer.prototype.setItem = function(array) {
	console.log(array.fruits.toString());
};


module.exports = LexicalAnalizer;