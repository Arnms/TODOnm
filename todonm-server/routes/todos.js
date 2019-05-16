const express = require('express');
const router = express.Router();

/*
    test TODO list data
    TODO
    - id
    - title
    - content
    - deadline
    - priority (3: normal, 2: warning, 1: danger)
    - completed (true / false)
*/
const todos = [
    { id: 1, title: '첫 번째 할일', content: '첫 번째 내용', deadline: undefined, priority: 3, completed: false },
    { id: 2, title: '두 번째 할일', content: '두 번째 내용', deadline: new Date("2019-05-14").toLocaleDateString(), priority: 1, completed: false },
    { id: 3, title: '세 번째 할일', content: '세 번째 내용', deadline: undefined, priority: 3, completed: false },
    { id: 4, title: '네 번째 할일', content: '네 번째 내용', deadline: undefined, priority: 3, completed: false },
    { id: 5, title: '다섯 번째 할일', content: '다섯 번째 내용', deadline: new Date("2019-05-14").toLocaleDateString(), priority: 2, completed: false }
];

router.get('/', function (req, res) {
    res.status(200).json(todos);
  });

router.get('/:id', (req, res) => {
    let item = todos.find((data) => {
        const { id } = req.params;
        return data.id === parseInt(id);
    });

    if(item) {
        res.status(200).json(item);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    let itemId = todos.map(item => item.id);
    let newId = 1;

    if(itemId.length > 0) {
        newId = Math.max.apply(Math, itemId) + 1;
    }

    let item = req.body;
    item.id = newId;

    if(req.body.deadline !== '') {
        let deadline = new Date(req.body.deadline);
        item.deadline = deadline.toLocaleDateString();
    }

    todos.push(item);

    res.status(201).json(item);
});

router.put('/:id', (req, res) => {
    let item = todos.find((data) => {
        const { id } = req.params;
        return data.id === parseInt(id);
    });

    if(item) {
        let updateItem = req.body;
        updateItem.id = item.id;

        if(req.body.deadline !== '') {
            updateItem.deadline = deadline.toLocaleDateString();
        } else {
            delete updateItem[deadline];
        }

        todos.splice(todos.indexOf(item), 1, updateItem);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', (req, res) => {
    let item = todos.find((data) => {
        const { id } = req.params;
        return data.id === parseInt(id);
    });

    if(item) {
        todos.splice(todos.indexOf(item), 1);
    }

    res.sendStatus(204);
});

module.exports = router;