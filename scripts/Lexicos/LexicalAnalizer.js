"use strict";

var EM = require('../Utils/Errors/ErrorManager');
var Constantes = require('../Constantes/PalabrasResevadas');
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
		reglon.push(palabra);
		return reglon;
	} 

	function isASymbol (palabra) {
		var PRS = Constantes.getSymbols();
		return PRS.indexOf(palabra);
	}

	for (var i = 0; i <= code.length; i++) {

		if (typeof(code.charCodeAt(i)) === "number" && !isNaN(code.charCodeAt(i)) ) {
			var PR = (isASymbol(code.charAt(i)) === -1) ? false : true;

			if (code.charCodeAt(i) !== 32 && code.charCodeAt(i) !== 10 && !PR) {
				palabra.push(code.charAt(i));
			}

			if (PR) {
				if (palabra.length) {
					reglon = addPalabra(palabra, reglon);
				}
				palabra = [];
				reglon = addPalabra([code.charAt(i)], reglon);
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

	this.processCode = this.cleanTree(processCode);
};

LexicalAnalizer.prototype.cleanTree = function(processCode) {
	processCode.forEach(function(item) {
		if (Array.isArray(item) && item) {
			for (var i = item.length - 1; i >= 0; i--) {
				if (!item[i].length) {
					item.splice(i, 1);
				}
			}
		}
	});
	return processCode;
};

LexicalAnalizer.prototype.getItem = function(cb) {
	var that = this, item = null;
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
			cb(item);
		} else {
			set(new Position(++that.position.line, -1));
		}
	} else {
		cb(null);
	}
};

LexicalAnalizer.prototype.setItem = function(array) {
	var string = "", response = {};
	array.forEach(function (char) {
		string += char;
	});
	if (Constantes.isAPr(string)) {
		response = {type: "PR", PR: Constantes.get(string), st: string};
	} else {
		response = {palabra: string, type: "NOT PR", st: string};
	}
	return response;
};

module.exports = LexicalAnalizer;