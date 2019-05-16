import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Todolist.css';
import TodoForm from './TodoForm';

class Todolist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            modalType: '',
        };

        this.createModalShow = this.createModalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
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
            <Button variant='primary' className='createTodoBtn' onClick={this.createModalShow}>+</Button>

            <Modal show={this.state.modalShow} onHide={this.modalClose}>
                <Modal.Body>
                    <TodoForm modalType={this.state.modalType} onModalClose={this.modalClose} />
                </Modal.Body>
            </Modal>
            </>
        );
    }
}

export default Todolist;