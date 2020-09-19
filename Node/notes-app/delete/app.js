const text = require('./util');
const yargs = require("yargs");
const fs = require('fs');

console.log(text()); 

console.log(process.argv[2]);
console.log(yargs.argv);
