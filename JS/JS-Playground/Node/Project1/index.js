const express = require('express');
const app = express();
const productRoute = require('./routes/products')

app.use(express.static('public'));

// Product Route
app.use(productRoute);

app.listen(4000); 
  