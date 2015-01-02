// learnyounode verify MakeItModular.js

var module = require('./MakeItModular_module.js');

var path = process.argv[2];
var ext = process.argv[3];

module(path, ext, function(err, data) {
	data.forEach(function(file){
	 	console.log(file)
	 });
});

