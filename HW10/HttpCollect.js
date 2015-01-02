// learnyounode verify HttpCollect.js

var http = require('http');
var bl = require('bl');

var url = process.argv[2];

http.get(url, function(response) {
	response.pipe(bl(function(err, data){
		if (err) console.error(err);
		var res = data.toString();
		
		console.log(res.length);
		console.log(res);
	}));
	// response
	// .on("data", function(data){
	// 	var str = data.toString();
	// 	results.push(data.toString());
	// 	res += data.toString();
	// 	count += str.length;
	// 	// console.log("----");
	// })
	// .on("end",function(){
	// 	console.log(count);
	// 	console.log(res);
	// 	// results.forEach(console.log);
	// 	// console.log(results);
	// });
});