import React, { Component } from 'react';
import { Row, Col, ListGroup, Button, ButtonGroup, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import './TodoItem.css';
import axios from 'axios';

import TodoForm from './TodoForm';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            modalShow: false,
            modalType: '',
            completed: false,
            deadlineText: ''
        };

        this.completed = this.props.item.completed;

        if(!this.completed) {
            if(this.state.item.deadline === undefined || this.state.item.deadline === '') {
                this.state.deadlineText = <span className='text-muted'>마감기한 없음</span>;
            } else {
                if(new Date(this.state.item.deadline) >= new Date()) {
                    this.state.deadlineText = <span className='text-muted'>{this.state.item.deadline} 까지</span>;
                } else {
                    this.state.deadlineText = <span className='text-danger'>마감기한이 지났습니다.</span>;
                }
            }
        }

        this.deleteTodo = this.deleteTodo.bind(this);
        this.checkCompleted = this.checkCompleted.bind(this);
        this.updateModalShow = this.updateModalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ item: props.item });
    }

    deleteTodo(event) {
        event.preventDefault();

        if(window.confirm('Are you sure you want to delete this TODO?')) {
            axios.delete('http://localhost:3001/todos/' + this.state.item.id)
            .then((res) => {
                this.props.fetchTodoList();
            })
            .catch((err) => {
                console.log('delete error', err);
            });
        }
    }

    checkCompleted() {
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                completed: !prevState.item.completed
            }
        }));
    }

    updateModalShow() {
        this.setState({
            modalShow: true,
            modalType: 'update'
        });
    }

    modalClose() {
        this.setState({ modalShow: false });
    }

    render() {
        return (
            <>
            <ListGroup.Item data-id={this.state.item.id} action={this.props.isAction} variant=
                {
                    (() => {
                        if(this.state.item.completed) {
                            return 'success';
                        }

                        if(this.state.item.deadline !== '' || this.state.item.deadline !== undefined) {
                            if(new Date(this.state.item.deadline) < new Date()) {
                                return 'dark';
                            }
                        }

                        switch(this.state.item.priority) {
                            case 1: return 'danger';
                            case 2: return 'warning';
                            case 3: return 'primary';
                            case 4: return 'info';
                            default: return 'light';
                        }
                    })()
                }>
                <Row>
                    <Col xl lg md sm xs>
                        <div className='item-header'>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                    <Tooltip id='completed-tooltip'>
                                        {this.state.item.completed ? 'Complete' : 'Incomplete'}
                                    </Tooltip>
                                }>
                                <i className={this.state.item.completed ? 'check circle icon' : 'check circle outline icon'} onClick={this.checkCompleted}></i>
                            </OverlayTrigger>
                            {this.state.item.title}
                            {this.state.deadlineText}
                        </div>
                        <div className='item-body'>
                            {this.state.item.content}
                        </div>
                    </Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2} className='buttonGroup'>
                        <ButtonGroup vertical>
                            <Button variant='dark' onClick={this.updateModalShow}>Edit</Button>
                            <Button variant='danger' onClick={this.deleteTodo}>Delete</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </ListGroup.Item>

            <Modal size='lg' show={this.state.modalShow} onHide={this.modalClose}>
                <Modal.Body>
                    <TodoForm modalData={this.state.item} modalType={this.state.modalType} onModalClose={this.modalClose} fetchTodoList={this.props.fetchTodoList} />
                </Modal.Body>
            </Modal>
            </>
        );
    }
}

export default TodoItem;