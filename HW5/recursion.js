function reduce(arr, fn, initial, index) {
    // SOLUTION GOES HERE
	if (index == arr.length){
		return initial;
	}

	if (index == undefined || index == null) index = 0;

    var result = fn(initial, arr[index], index, arr);

    return reduce(arr, fn, result, ++index);
}
    
module.exports = reduce
//functional-javascript verify recursion.js