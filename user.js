const db = require('./db');
const express = require('express');
const router = express.Router();

router.use(express.json()); // enabling to parse JSON

const users = db.users;

// GET users array

router.get('/', (req, res) => {
    res.send(
        users
    );
});

// GET specific User

router.get('/:id', (req, res) => {
    const user = users.find(item =>  item.id === parseInt(req.params.id));

    if (!user) throw res.status(404).send("The user with given ID was not found!");
    
    res.send({
        ...user
    });
});

// Adding new User
router.post('/:id', (req, res) => {
    const index = users.findIndex(item => item.id === req.params.id);
    if(index === -1) {
        const user = {
            id: users.length + 1,
            mail: req.body.mail,
            password: req.body.password,
            age: req.body.age,
            role: req.body.role
        }
        
        users.push(user);

        res.status(200).send({
            ...user
        });    
    } else {
        res.status(404).send({message: "Requested id do not exis"});
        return;
    }
    
});

// Updating Users

router.put('/:id', (req, res) => {
    const user = users.find(item => item.id === parseInt(req.params.id));

    if(!user) {
        res.status(404).send("The user with the given ID was not found");
    }
    users[req.params.id - 1] = req.body;  
    // const newUser = req.body;
    res.send(users[req.params.id - 1]);
});

// Deleting the user

router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(item => item.id === parseInt(req.params.id));

    if(userIndex === -1) {
        res.status(404).send("The user with the given ID was not found");
        return;
    }

    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.send(deletedUser);
})

module.exports = router;