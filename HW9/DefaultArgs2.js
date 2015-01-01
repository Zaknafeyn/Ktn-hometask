'use strict';
// count-to-6 run DefaultArgs1.js
// count-to-6 verify DefaultArgs1.js

 module.exports = function makeImportant(str, cnt = x => x.length) {
        return str + "!".repeat((typeof(cnt) == "function") ? cnt(str) : cnt);
};

//other option
//module.exports = function makeImportant (string, bangs = string.length) => string + "!".repeat(bangs);