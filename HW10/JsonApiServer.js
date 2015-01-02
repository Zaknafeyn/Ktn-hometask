//learnyounode verify JsonApiServer.js

var http = require('http');

var port = process.argv[2];
var url = require('url');

var server = http.createServer(function (req, res) {

	console.log(req.url);

	if (req.method != 'GET')
		return res.end('send me a GET\n');

	var parsedUrl = url.parse(req.url, true);
	console.log(parsedUrl);
	var pathName = parsedUrl.pathname;

	var isoDateStr = parsedUrl.query.iso;
	var date = new Date(isoDateStr);

	if (pathName == '/api/unixtime'){
		var obj = {
			"unixtime": date.getTime()
		};
	}
	else {
		var obj = {
			"hour": date.getHours(),
			"minute": date.getMinutes(),
			"second": date.getSeconds()
		};
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	var result = JSON.stringify(obj);
	console.log(result);

	return res.end(result);
});

server.listen(port);

