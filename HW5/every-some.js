function checkUsersValid(goodUsers) {
      return function(submittedUsers) {
        // SOLUTION GOES HERE

        return submittedUsers.every(function (everyUser){
        	return goodUsers.some(function(goodUser){
        		return everyUser.id == goodUser.id;
        	})
        })
      };
    }
    
    module.exports = checkUsersValid

//functional-javascript verify every-some.js