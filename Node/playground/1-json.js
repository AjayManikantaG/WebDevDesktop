const fs = require('fs');
// const book = {
//     title: 'ego is the enemy',
//     author: 'Ryan',
// }

// // const bookJSON = JSON.stringify(book);
// // fs.writeFileSync('1-json.json', bookJSON);

// dataBuffer = fs.readFileSync('1-json.json');
// console.log(dataBuffer.toString());
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

// dataBuffer = fs.readFileSync('1-json.json');
// dataJSON = dataBuffer.toString();
// data = JSON.parse(dataJSON);
// console.log(data);
// data.name = "vijay";
// data.planet = "mars";
// data.age = 27;

// const data1 = JSON.stringify(data);
// fs.writeFileSync('1-json.json', data1);
// console.log(data);

dataBuffer = fs.readFileSync('1-json.json');
data = dataBuffer.toString();
console.log(JSON.parse(data));