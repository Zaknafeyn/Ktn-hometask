var q = require('q');


// console.log(process.argv[2]);


function parsePromised(arg){
	var defer = q.defer(); 
		try{
			var json = JSON.parse(arg);
			defer.resolve();
		}
		catch (e){
			defer.reject(e);
		}

		return defer.promise;
	
}

// return defer.promise.then(parsePromise).then(consle.log, consle.log);

parsePromised(process.argv[2]).then(console.log, console.log);

//promise-it-wont-hurt verify throw_an_error.js
