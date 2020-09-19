/** @format */

const pdf = require("pdf-thumbnail");
const fs = require("fs");
const pdfBuffer = require("fs").readFileSync("./assets/sample1.pdf");

pdf(pdfBuffer, {
  compress: {
    type: "JPEG",
    quality: 70,
  },
  resize: {
    width: 175,
  },
})
  .then((data) => {
    data.pipe(fs.createWriteStream("./thumnail1.jpeg"));
    console.log("Converted..!!");
  })
  .catch((err) => console.log(err));
