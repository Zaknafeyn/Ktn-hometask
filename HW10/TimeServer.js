// learnyounode verify TimeServer.js

var net = require('net');

var server = net.createServer(function (socket) {
	var date = new Date();
	// console.log('aaa');
	socket.end(formatDate(date));
});

server.listen(process.argv[2]);

function formatDate(date) {

	return 	pad(date.getFullYear()) + "-" +
			pad(date.getMonth() + 1)  + "-" +     // starts at 0
			pad(date.getDate()) + " " +      // returns the day of month
			pad(date.getHours()) + ":" +
			pad(date.getMinutes());
}

function pad(num, size) {
	if (size === undefined)
		size = 2;

    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}