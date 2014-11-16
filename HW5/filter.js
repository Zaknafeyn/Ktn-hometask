
function getShortMessages(messages) {
      // SOLUTION GOES HERE
      var result = messages.filter(function(msg){
      	return msg.message.length < 50;
      }).map(function(msg){
      	return msg.message;
      });
      return result;
    }
    
    module.exports = getShortMessages


//functional-javascript verify filter.js
//functional-javascript run filter.js