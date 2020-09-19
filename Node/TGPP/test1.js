/** @format */

const gm = require("gm");

gm("./assets/sample.pdf")
  .setFormat("jpg")
  .resize(175)
  .quality(75)
  .write("cover.jpg", (error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("JPG generated..!!");
    }
  });
