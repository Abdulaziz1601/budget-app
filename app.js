const express = require('express');
const accountsRouter = require('./user.js');

const app = express();


app.use(express.json());

app.use('/users', accountsRouter);


app.get('/', (req, res) => {

    res.status(200).json({
        type: "success",
        payload: "Hello World"
    });
});

app.post('/', (req, res) => {
    res.json({
        type: "success",
        payload: "Hello World"
    });
});

app.listen(3000, () => {
    console.log("Server started on 3000")
});