var q = require('q');
var defer = q.defer(); 

var attachTitle = function(param1){
	return "DR. " + param1;
}

defer.promise.then(attachTitle).then(console.log);

defer.resolve("MANHATTAN");
//promise-it-wont-hurt verify values_and_promises.js
