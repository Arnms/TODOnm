const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// todo REST API routing
const todoRouter = require('./routes/todos');

app.use('/todos', todoRouter);

app.use('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));