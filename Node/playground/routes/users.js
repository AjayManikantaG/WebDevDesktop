const express = require('express');
const router = express.Router();

router.use('/users', (req, res, next) => {
    res.status(200).send('<h1>Hii dudes from users page..!!');
});

module.exports = router;