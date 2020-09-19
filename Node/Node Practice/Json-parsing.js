const fs = require('fs');

// const dataBuffer = fs.readFileSync('1-books.json');
// const dataString = dataBuffer.toString();
// const data = JSON.parse(dataString);
// console.log(data.name);

const dataBuffer = fs.readFileSync('1-books.json');
const dataString = dataBuffer.toString();
const data = JSON.parse(dataString);

data.name = "Vijay";
data.age = 24;

const userJson = JSON.stringify(data);
fs.writeFileSync('1-books.json', userJson);
console.log(data);
