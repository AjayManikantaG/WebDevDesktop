/** @format */

const fromPath = require("pdf2pic").fromPath;

const options = {
  density: 100,
  savename: "untitled",
  savedir: "./",
  format: "png",
  width: 175,
  height: 225,
};
const storeAsImage = fromPath("./assets/sample.pdf", options);
const pageToConvertAsImage = 1;

storeAsImage(pageToConvertAsImage).then((resolve) => {
  console.log("Page 1 is now converted as image");

  return resolve;
});
