const string = `1234567890
123-456-7890
123 456 7890 `;
const regex = /(\d{3}[ -]?\d{3}[ -]?\d{4}[-]?)/gm;
const isExisting = regex.exec(string);
// console.log(isExisting);

const express = require('express');
const multer = require('multer')
