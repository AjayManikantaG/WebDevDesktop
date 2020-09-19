/** @format */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productRouter = require("./routes/product");
const usersRouter = require("./routes/users");
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(productRouter);
app.use(usersRouter);

app.get("/", (req, res, next) => {
  let homePath = path.join(__dirname, 'views', 'home.html');  
  res.status(200).sendFile(homePath);
});

app.use((req, res, next) => {
  res.send("<h1>Oops this url is not available..!<h1>");
});

app.listen(3000);
