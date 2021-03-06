"use strict";

var FileReader = require('./Utils/FileManager/FileReader');
var Manager = require('./Utils/Manager');
var LexicalAnalizer = require('./Lexicos/LexicalAnalizer');

function App(fileName) {
	this.fileName = fileName;
	this.stringProgram = null;
}

//read the file and start old the process
App.prototype.start = function() {
	var that = this;
	FileReader.open(this.fileName, function (stringProgram) {
		that.stringProgram = stringProgram;
		global.LexicalAnalizer = new LexicalAnalizer(stringProgram);
		that.createCompiler();
	});
};

App.prototype.createCompiler = function() {
	Manager.ready();
};

module.exports = App;