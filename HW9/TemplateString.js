// count-to-6 run TemplateString.js
// count-to-6 verify TemplateString.js

'use strict';
var name = process.argv[2];

var stringTemplate =  `Hello, ${name}!
Your name lowercased is "${name.toLowerCase()}".`;
console.log(stringTemplate);