/** @format */

const numbers = [
    { id: 1, isOpen: true},
    { id: 2, isOpen: false},
    { id: 3, isOpen: true},
];

const atleastOnePositive = numbers.filter(a => a.isOpen === true);
console.log(atleastOnePositive);
