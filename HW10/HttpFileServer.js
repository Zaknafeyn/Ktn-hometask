// learnyounode verify HttpFileServer.js

var http = require('http');
var fs = require('fs');

var port = process.argv[2];
var filePath = process.argv[3];

var server = http.createServer(function (req, res) {
	var readStream = fs.createReadStream(filePath);
	readStream.pipe(res);
});
server.listen(port);

// -- oficial solution
// var server = http.createServer(function (req, res) {
//       res.writeHead(200, { 'content-type': 'text/plain' })
    
//       fs.createReadStream(process.argv[3]).pipe(res)
//     })
    
//     server.listen(Number(process.argv[2]))