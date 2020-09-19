const express = require('express');
const path = require('path');

const app = express();
const members = require('./members');
const loggers = require('./middleWare/logger')

// // Build a static response
// console.log(__dirname);
// app.use(express.static(path.join(__dirname, '/')));

// app.use(loggers);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(app.get('env'));

// Member api routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));