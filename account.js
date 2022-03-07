const db = require('./db');
const express = require('express');
const router = express.Router();

const users = db.users;


router.get('/', (req, res) => {
    res.send(
        users
    );
});

router.get('/:id', (req, res) => {
    const user = users.find(item =>  item.id === parseInt(req.params.id));

    if (!user) throw res.status(404).send("The user with given ID was not found!");
    
    res.send({
        ...user
    });
});

router.post('/:id', (req, res) => {
    res.send({
        reqBody: req.body
    })
})

module.exports = router;