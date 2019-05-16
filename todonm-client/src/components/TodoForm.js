import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deadlineChecked: true
        };

        if(this.props.modalType === 'edit') {
            this.refs.title.value = this.props.modalData.title;
            this.refs.content.value = this.props.modalData.content;
            this.refs.daedline.value = this.props.modalData.deadline;
            this.refs.deadlineChecked.value = this.props.modalData.deadlineChecked;
            this.setState({ deadlineChecked: !this.props.daedlineChecked });
            this.refs.priority.value = this.props.modalData.priority;
        }

        this.isEnableDeadline = this.isEnableDeadline.bind(this);
        this.createTodoForm = this.createTodoForm.bind(this);
    }

    isEnableDeadline(event) {
        const target = event.target;
        const value = target.checked;

        this.setState({
            deadlineChecked: !value
        });
    }

    createTodoForm(event) {
        event.preventDefault();

        const formData = {};

        for(const field in this.refs) {
            formData[field] = this.refs[field].value;
        }

        axios.post('http://localhost:3001/todos/', formData)
            .then((res) => {
                this.props.onModalClose();
            })
            .catch((err) => {
                console.log('error');
            });
    }

    render() {
        return (
            <Form onSubmit={this.createTodoForm} ref={this.forms}>
                <Form.Row>
                    <Form.Group as={Col} xl lg md sm xs controlId='TodoTitle'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name='title' ref='title' required type='text' placeholder='TODO Title' />
                    </Form.Group>
                    <Form.Group as={Col} xl lg md sm xs controlId='TodoDeadline'>
                        <Form.Check inline label='Deadline' type='checkbox' id='deadlineCheck' onChange={this.isEnableDeadline} />
                        <Form.Control name='deadline' ref='deadline' type='date' disabled={this.state.deadlineChecked} />
                    </Form.Group>
                    <Form.Group as={Col} xl lg md sm xs controlId='TodoPriority'>
                        <Form.Label>Priority</Form.Label>
                        <Form.Control name='priority' ref='priority' as='select'>
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
                        <Form.Control name='content' ref='content' required as='textarea' rows='2' />
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