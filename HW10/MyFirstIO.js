// learnyounode verify MyFirstIO.js

var fs = require('fs');

var buffer = fs.readFileSync(process.argv[2]);
var contents = buffer.toString();
var res = contents.split('\n');
console.log(res.length - 1);