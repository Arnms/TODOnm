const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// todo REST API routing
const todoRouter = require('./routes/todos');

app.use('/todos', todoRouter);

app.use('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));