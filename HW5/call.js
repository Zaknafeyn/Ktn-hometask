
function duckCount() {
      // SOLUTION GOES HERE
      var count = 0;
      return [].reduce.call(arguments, function(prev, curr){
      	if (Object.prototype.hasOwnProperty.call(curr, 'quack'))
      		return prev + 1;
      	return prev;
      }, 0);
    }
    
    module.exports = duckCount
//functional-javascript verify call.js