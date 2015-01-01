'use strict';
// count-to-6 run spread.js
// count-to-6 verify spread.js

var numbers = process.argv.slice(2);
var min = Math.min(...numbers);

console.log('The minimum of [%s] is %s', numbers, min);