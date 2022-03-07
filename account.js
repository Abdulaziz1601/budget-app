const db = require('./db');
const express = require('express');
const router = express.Router();

router.use(express.json()); // enabling to parse JSON

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
    const index = users.findIndex(item => item.id === req.params.id);
    if(index === -1) {
        const user = {
            id: users.length + 1,
            mail: req.body.mail,
            password: req.body.password,
            age: req.body.age,
        }
        
        users.push(user);

        res.status(200).send({
            ...user
        });    
    } else {
        res.status(404).send({message: "Requested id do not exis"});
        return;
    }
    
})

module.exports = router;