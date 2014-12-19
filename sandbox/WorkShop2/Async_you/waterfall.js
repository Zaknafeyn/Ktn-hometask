var fs = require('fs');
var http = require('http'),
async = require('async');

var readFile = function(cb){
	// console.log("one");
        fs.readFile(process.argv[2], function(err, data){
            if (err){
                cb(err);
            } else {
                cb(null, data.toString())
            }
        })
    }

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

//readFile(readGet);
async.waterfall([
	readFile,
	readGet
	],
	function(err, data){
		// console.log("three");
		if (err) return console.error(err);
      //console.log(result);
      console.log('boom!');
	});

//async-you verify waterfall.js