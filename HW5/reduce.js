function countWords(inputWords) {
      // SOLUTION GOES HERE
      return inputWords.reduce(function(prev, curr){
      	if (prev[curr] == undefined || prev[curr] == null){
      		prev[curr] = 0;
      	};
      	
      	prev[curr]++;
      	return prev;
      }, {});
}
    
module.exports = countWords


//functional-javascript verify reduce.js