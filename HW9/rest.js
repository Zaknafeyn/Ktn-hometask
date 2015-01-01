'use strict';
// count-to-6 run rest.js
// count-to-6 verify rest.js

module.exports = function average(...input) {
        // what goes here?
        
        var result = input.reduce((prev, curr, index, arr) => prev + curr);
    
        return result / input.length;
    };
