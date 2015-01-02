// learnyounode verify FilteredLS.js

var fs = require('fs');

var path = process.argv[2];
var filter = "." + process.argv[3];

fs.readdir(path, function (err, list) {
	if (err) throw err;
	var res = [];
	var j=0;
	for (var i=0; i <= list.length; i++) {
		if (endsWith(list[i], filter))
		{
			console.log(list[i]);
		}
	}
});

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// default solution

 // var fs = require('fs')
 //    var path = require('path')
    
 //    fs.readdir(process.argv[2], function (err, list) {
 //      list.forEach(function (file) {
 //        if (path.extname(file) === '.' + process.argv[3])
 //          console.log(file)
 //      })
 //    })