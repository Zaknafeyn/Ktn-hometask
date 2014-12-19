var q = require('q');
var defer = q.defer(); 

defer.promise.then(function(obj){
	console.log(obj);
}, function(err){
	console.log(err.message);
});

setTimeout(defer.reject(new Error("REJECTED!")), 300);


//promise-it-wont-hurt verify  reject-a-promise.js