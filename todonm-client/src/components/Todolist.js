import React, { Component } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import './Todolist.css';
import axios from 'axios';

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoAlert from './TodoAlert';

class Todolist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            modalShow: false,
            modalType: '',
            alertList: []
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

            const aList = this.state.todos.filter((item) => {
                return (new Date(item.deadline) < new Date()) && !item.completed;
            });

            this.setState({ alertList: aList });
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
            <div className='alertGroup'>
                {this.state.alertList.map((item, i) => {
                    return (<TodoAlert key={i} item={item} />);
                })}
            </div>

            <Button variant='primary' className='createTodoBtn' onClick={this.createModalShow}><i className='plus icon'></i></Button>

            <ListGroup>
                {this.state.todos.map((item, i) => {
                    return (<TodoItem key={i} item={item} fetchTodoList={this.fetchTodoList} isAction={false} />);
                })}
            </ListGroup>

            <Modal size='lg' show={this.state.modalShow} onHide={this.modalClose}>
                <Modal.Body>
                    <TodoForm modalType={this.state.modalType} fetchTodoList={this.fetchTodoList} onModalClose={this.modalClose}  />
                </Modal.Body>
            </Modal>
            </>
        );
    }
}

export default Todolist;