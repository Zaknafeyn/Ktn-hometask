
function duckCount() {
      // SOLUTION GOES HERE
      var count = 0;
      return arguments.reduce(function(prev, curr){
      	if (curr.hasOwnProperty('quack'))
      		return prev + 1;
      	return prev;
      }, 0);
    }
    
    module.exports = duckCount
//functional-javascript verify call.js