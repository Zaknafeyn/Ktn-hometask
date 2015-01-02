// learnyounode verify JugglingAsync.js

var http = require('http');
var bl = require('bl');

var urls = process.argv.slice(2);

var results = [];
// console.log(urls);

urls.forEach(function(url) {
	http.get(url, function(response){
		response.pipe(bl(function(err, data){
			results[url] = data.toString();
			// console.log("url: %s, data: %s", url, results[url]);
			done(url);
		}));
	});
});

var callCount = 0;
var totalCount = urls.length;

function done(url) {
	callCount++;
	// console.log("call count: %s, url: %s", callCount, url);
	if (callCount == totalCount){
		urls.forEach(function(url){
			console.log(results[url]);
		});
	}
}