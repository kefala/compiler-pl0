"use strict";

function PalabraResevada(hash, palabra, type) {
	this.hash = hash;
	this.palabra = palabra;
	this.type = type;
}

var PR = {};

PR.all = [
	new PalabraResevada("PLUS", "+", "SYMBOL"),
	new PalabraResevada("MINUS", "-", "SYMBOL"),
	new PalabraResevada("MULT", "*", "SYMBOL"),
	new PalabraResevada("SLASH", "/", "SYMBOL"),
	new PalabraResevada("EQUALS", "=", "SYMBOL"),
	new PalabraResevada("LESS", "<", "SYMBOL"),
	new PalabraResevada("GREATER", ">", "SYMBOL"),
	new PalabraResevada("LPARENT", "(", "SYMBOL"),
	new PalabraResevada("RPARENT", ")", "SYMBOL"),
	new PalabraResevada("COMMA", ",", "SYMBOL"),
	new PalabraResevada("SEMICOLOM", ";", "SYMBOL"),
	new PalabraResevada("TWOPOINTS", ":", "SYMBOL"),
	new PalabraResevada("PERIOD", ".", "SYMBOL"),
	new PalabraResevada("ODD", "ODD", "WORD"),
	new PalabraResevada("BEGIN", "BEGIN", "WORD"),
	new PalabraResevada("END", "END", "WORD"),
	new PalabraResevada("IF", "IF", "WORD"),
	new PalabraResevada("THEN", "THEN", "WORD"),
	new PalabraResevada("WHILE", "WHILE", "WORD"),
	new PalabraResevada("DO", "DO", "WORD"),
	new PalabraResevada("CALL", "CALL", "WORD"),
	new PalabraResevada("CONST", "CONST", "WORD"),
	new PalabraResevada("INT", "INT", "WORD"),
	new PalabraResevada("PROCEDURE", "PROCEDURE", "WORD"),
	new PalabraResevada("OUT", "OUT", "WORD"),
	new PalabraResevada("IN", "IN", "WORD"),
	new PalabraResevada("ELSE", "ELSE", "WORD")
];

PR.getSymbols = function () {
	var arr = [];
	this.all.forEach(function (item) {
		if (item.type === "SYMBOL") {
			arr.push(item.palabra);
		}
	});
	return arr;
}

PR.isAPr = function (string) {
	var sc = string.toUpperCase();
	for (var i = this.all.length - 1; i >= 0; i--) {
		if (this.all[i].palabra === sc) {
			return true;
		}
	}
	return false;
};

PR.get = function (sc) {
	var sc = sc.toUpperCase();
	for (var i = this.all.length - 1; i >= 0; i--) {
		if (this.all[i].palabra === sc) {
			return this.all[i];
		}
	}
	return null;
};
	
module.exports = PR;