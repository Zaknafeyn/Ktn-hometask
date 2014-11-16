// Your code goes here
'use strict';

function deepCopy(obj) {
	if (obj == null || "object" != typeof obj) 
	  return obj;
	var newObj = obj.constructor();
	for(var o in obj){
		if (obj.hasOwnProperty(o)  && o != null && o != undefined){
			newObj[o] = deepCopy(obj[o]);
			console.log(o);
		}
	}

	return newObj;
}