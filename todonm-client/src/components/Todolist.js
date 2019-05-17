import React, { Component } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import './Todolist.css';
import axios from 'axios';

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

class Todolist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            modalShow: false,
            modalType: '',
        };

        this.fetchTodoList();

        this.fetchTodoList = this.fetchTodoList.bind(this);
        this.createModalShow = this.createModalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    fetchTodoList() {
        axios.get('http://localhost:3001/todos/')
        .then((res) => {
            this.setState({ todos: res.data });
        })
        .catch((err) => {
            console.log('fetch error');
        });
    }

    createModalShow() {
        this.setState({
            modalShow: true,
            modalType: 'create'
        });
    }

    modalClose() {
        this.setState({ modalShow: false });
    }

    render() {
        return (
            <>
            <Button variant='primary' className='createTodoBtn' onClick={this.createModalShow}><i className='plus icon'></i></Button>

            <ListGroup>
                {this.state.todos.map((item) => {
                    return (<TodoItem item={item} fetchTodoList={this.fetchTodoList} />)
                })}
            </ListGroup>

            <Modal size='lg' show={this.state.modalShow} onHide={this.modalClose}>
                <Modal.Body>
                    <TodoForm modalType={this.state.modalType} onModalClose={this.modalClose} />
                </Modal.Body>
            </Modal>
            </>
        );
    }
}

export default Todolist;