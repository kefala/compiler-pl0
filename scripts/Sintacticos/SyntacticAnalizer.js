"use strict";

var bs = require('./../Constantes/BloqueLineaSintacticos');

function SyntacticAnalizer() {
	this.block = null;
}

SyntacticAnalizer.prototype.searchBlockLine = function(ident) {
	for (var item in bs) {
		this.block = (bs[item].ap.toUpperCase() === ident.st.toUpperCase()) ? bs[item] : this.block;
	}
	return this.block;
};

SyntacticAnalizer.prototype.build = function(lexObj) {
	if (!this.block) {
		this.block = this.searchBlockLine(lexObj);
	}
	if (this.block) {
		console.log(this.block.ap);
	}
	if (this.block && this.block.expected(lexObj)) {
		this.block = null;
	}
};

module.exports = SyntacticAnalizer;
