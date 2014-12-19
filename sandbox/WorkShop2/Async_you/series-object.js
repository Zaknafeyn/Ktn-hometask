var fs = require('fs');
var http = require('http'),
async = require('async');

var readGet = function(urlFromFile, cb){
	// console.log("two");
	var body = '';

	http.get(urlFromFile, function(res){

          res.on('data', function(chunk){
            body += chunk.toString();
          });

          res.on('end', function(){
            cb(null, body);
          });
        }).on('error', function(err) {
          cb(err);
        }
)
};

async.series([
	{one: readGet(process.argv[2])},
	{two: readGet(process.argv[3])},
	],function(err, data){
		if (err) return console.error(err);
        console.log(data);
      
	});

//async-you verify series-object.js