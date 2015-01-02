// learnyounode verify BabySteps.js

// console.log(process.argv);
var arr = process.argv.slice(2);
var result = 0;
for(var i=0; i < arr.length; i++){
	result += +arr[i];
}
console.log(result);