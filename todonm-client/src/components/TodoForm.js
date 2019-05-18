import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            deadlineChecked: true
        };

        if(this.props.modalType === 'update') {
            this.state.item = this.props.modalData;

            if(this.state.item.deadline === undefined || this.state.item.deadline === '') {
                this.state.deadlineChecked = true;
            } else {
                this.state.deadlineChecked = false;

                const date = new Date(this.props.modalData.deadline);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                
                this.state.item.deadline =
                    year.toString() + '-' +
                    (month > 9 ? '' : '0') + month + "-" +
                    (day > 9 ? '' : '0') + day;
            }
        }

        this.isEnableDeadline = this.isEnableDeadline.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ item: props.modalData });
    }

    isEnableDeadline(event) {
        const target = event.target;
        const value = target.checked;

        this.setState({
            deadlineChecked: !value
        });
    }

    createTodo(event) {
        event.preventDefault();

        const formData = {};

        for(const field in this.refs) {
            formData[field] = this.refs[field].value;
        }

        formData.priority = parseInt(formData.priority);
        
        axios.post('http://localhost:3001/todos/', formData)
            .then((res) => {
                this.props.fetchTodoList();
                this.props.onModalClose();
            })
            .catch((err) => {
                console.log('error');
            });
    }

    updateTodo(event) {
        event.preventDefault();

        const formData = {};

        for(const field in this.refs) {
            formData[field] = this.refs[field].value;
        }

        formData.id = this.props.modalData.id;
        formData.completed = this.props.modalData.completed;

        if(this.state.deadlineChecked) {
            delete formData.deadline;
        } else {
            const date = new Date(formData.deadline);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            
            formData.deadline =
                year.toString() + '-' +
                (month > 9 ? '' : '0') + month + "-" +
                (day > 9 ? '' : '0') + day;
        }

        axios.put('http://localhost:3001/todos/' + this.props.modalData.id, formData)
            .then((res) => {
                this.props.fetchTodoList();
                this.props.onModalClose();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <Form onSubmit={this.props.modalType === 'update' ? this.updateTodo : this.createTodo} ref={this.forms}>
                <Form.Row>
                    <Form.Group as={Col} xl lg md sm xs controlId='TodoTitle'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name='title' ref='title' required type='text' placeholder='Title' defaultValue={this.props.modalType === 'update' ? this.state.item.title : ''}/>
                    </Form.Group>
                    <Form.Group as={Col} xl lg md sm xs controlId='TodoDeadline'>
                        <Form.Check inline label='Deadline' type='checkbox' id='deadlineCheck' onChange={this.isEnableDeadline} checked={!this.state.deadlineChecked} />
                        <Form.Control name='deadline' ref='deadline' type='date' disabled={this.state.deadlineChecked} defaultValue={this.props.modalType === 'update' ? this.state.item.deadline : ''} />
                    </Form.Group>
                    <Form.Group as={Col} xl lg md sm xs controlId='TodoPriority'>
                        <Form.Label>Priority</Form.Label>
                        <Form.Control name='priority' ref='priority' as='select' defaultValue={this.props.modalType === 'update' ? this.props.modalData.priority : 1}>
                            <option value='1'>P1 (Do)</option>
                            <option value='2'>P2 (Decide)</option>
                            <option value='3'>P3 (Delegate)</option>
                            <option value='4'>P4 (Delete)</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId='TodoContent'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control name='content' ref='content' required as='textarea' rows='2' defaultValue={this.props.modalType === 'update' ? this.state.item.content : ''} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Col className='form-button-box'>
                        <Button variant='outline-success' type='submit'>Save</Button>
                        <Button variant='outline-danger' onClick={this.props.onModalClose}>Cancel</Button>
                    </Col>
                </Form.Row>
            </Form>
        );
    }
}

export default TodoForm;