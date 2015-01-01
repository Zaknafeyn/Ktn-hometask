'use strict';
// count-to-6 run ArrowFunctions1.js
// count-to-6 verify ArrowFunctions1.js

var inputs = process.argv.slice(2);
var result = inputs.map((currVal,index, arr) => currVal.charAt(0))
					.reduce((prevVal, currVal, index, arr) => prevVal + currVal );

console.log('[%s] becomes "%s"', inputs, result);