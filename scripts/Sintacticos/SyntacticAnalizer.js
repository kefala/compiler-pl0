"use strict";

function NodeSyntact(ident) {
	this.ident = ident;
	this.next = null;	
}

function SyntacticAnalizer() {
	this.actual = null;

}

SyntacticAnalizer.prototype.search = function(ident) {
	
	console.log(ident);

	return this.actual;
};

SyntacticAnalizer.prototype.build = function(ident) {
	if (!this.actual) {
		this.actual = this.search(ident);
	}
	
};
module.exports = SyntacticAnalizer;
