const express = require('express');
const router = express.Router();
const members = require('../../members')

// Get single member
router.get('/:id', (req, res) => {
    let found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {

    } else {
        res.status(400).json({msg: `No such member with id ${req.params.id} `})
    }
    res.json(members.filter(member =>  member.id === parseInt(req.params.id)));
})

//Gets all members
router.get('/', (req, res) => res.json(members));


// Create member
router.post('/', (req, res) => {
    res.send(req.body);
});


module.exports = router;