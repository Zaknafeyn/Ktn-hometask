var q = require('q');
var defer = q.defer(); 

defer.promise.then(console.log, console.log);

defer.resolve("I FIRED")
defer.reject("I DID NOT FIRE")

//promise-it-wont-hurt verify to_reject_or_not_to_reject.js