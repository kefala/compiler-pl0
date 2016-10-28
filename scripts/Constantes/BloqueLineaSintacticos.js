"use strict";
//st r pr next, nextC
var constDefBlock = [
	['const', 	1, 1, 1, 	null],
	['string', 	1, 0, 2, 	null],
	['=', 		1, 1, 3, 	null],
	['number', 	1, 0, 4, 	null],
	[',', 		0, 1, 1, 	5],
	[';', 		1, 1, null, null]
];

var varDefBlock = [
	['var', 	1, 1, 1, 	null],
	['string', 	1, 0, 2, 	null],
	[',', 		0, 1, 1, 	3],
	[';', 		1, 1, null, null]
];

var readBlock = [
	['read', 	1, 1, 1, 	null],
	['(', 		1, 1, 2, 	null],
	['ident', 	1, 0, 3, 	null],
	[')', 		1, 1, 4, 	null],
	[';', 		1, 1, 		null, null]
];

var readLnBlock = [
	['readln', 	1, 1, 1, 	null],
	['(', 		1, 1, 2, 	null],
	['ident', 	1, 0, 3, 	null],
	[')', 		1, 1, 4, 	null],
	[';', 		1, 1, null, null]
];

var inBlock = [
	['in', 		1, 1, 1, 	null],
	['ident', 	1, 0, 2, 	null],
	[';', 		1, 1, null, null]
];

var outBlock = [
	['out', 	1, 1, 1, 	null],
	['ident', 	1, 0, 2, 	null],
	[';', 		1, 1, null, null]
];

var callBlock = [
	['call', 	1, 1, 1, 	null],
	['ident', 	1, 0, null, null]
];

function BlockLine(ap, block) {
	this.ap = ap;
	this.level = 0;
	this.block = block;
}

BlockLine.prototype.expected = function(ident) {
	if (this.block[this.level][2]) {
		if (!ident.PR) {
			console.log("Se esperaba la palabra reservada puta", ident.st);
			process.exit(1);
		}
		if (ident.st.toUpperCase() === this.block[this.level][0].toUpperCase()) {
			if (this.block[this.level][3] === null) {
				this.level = 0;
				return true;
			} else {
				this.level = this.block[this.level][3];
			}
		} else {
			if (!this.block[this.level][1]) {
				this.level = this.block[this.level][4];
				return this.expected(ident);
			} else {
				console.log("En la linea: " + ident.position.line + " se esperaba la palabra reservada", this.block[this.level][0]);
				process.exit(1);
			}
		}
	} else {
		if (this.block[this.level][0] === 'number') {
			if (!parseInt(ident.st) && parseInt(ident.st) !== 0) {
				console.log("Se esperaba un numbero gato");
				process.exit(1);
			}
		}
		if (this.block[this.level][0] === 'string') {
			if (parseInt(ident.st) || parseInt(ident.st) === 0) {
				console.log("Se esperaba una string gato");
				process.exit(1);
			}
		}
		if (this.block[this.level][3] === null) {
			this.level = 0;
			return true;
		}
		this.level = this.block[this.level][3];
	}
};

var BloquesSintacticos = {};

BloquesSintacticos.CONST 	= new BlockLine('const', constDefBlock);
BloquesSintacticos.VAR 		= new BlockLine('var', varDefBlock);
BloquesSintacticos.READ 	= new BlockLine('read', readBlock);
BloquesSintacticos.READLN 	= new BlockLine('readln', readLnBlock);
BloquesSintacticos.CALL 	= new BlockLine('call', callBlock);
BloquesSintacticos.IN 		= new BlockLine('in', inBlock);
BloquesSintacticos.OUT 		= new BlockLine('out', outBlock);

module.exports = BloquesSintacticos;
