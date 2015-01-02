// learnyounode verify MyFirstAsyncIO.js

var fs = require('fs');

fs.readFile(process.argv[2],'utf8', function callback(err, data) {
	if (err)
		throw err;
	var res = data.split('\n');
	console.log(res.length - 1);
});