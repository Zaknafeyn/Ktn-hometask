'use strict';

function deepCopy(obj) {
	var newObj = {};
	for(var o in obj){
		if (obj.hasOwnProperty(o) && o != null && o != undefined){
			//newObj[o] = deepCopy(obj[o]);
			console.log(o);
		}
	}

	return newObj;
}


// var a = {b: ‘c’, d: {e: ‘f’}},
//     b = deepCopy(a);
// a.d = 12;
// b.d // {e: ‘f’}