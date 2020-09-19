const express = require('express')
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.status(200).send('<form action="/product" method="post" ><input type="text" name="title" /><button type="submit">Submit</button></form>')
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.status(200).send('<h1>We are in Product page..!!</h1>')
});

module.exports = router;