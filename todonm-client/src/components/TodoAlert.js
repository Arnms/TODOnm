import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import './TodoAlert.css';

class TodoAlert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            isShow: true
        };

        this.alertShow = this.alertShow.bind(this);
    }

    alertShow() {
        this.setState({ isShow: !this.state.isShow });
    }

    render() {
        return (
            <Alert show={this.state.isShow} onClick={this.alertShow} variant='danger'>
                <strong>{this.state.item.title}</strong> 의 마감기한이 지났습니다.
            </Alert>
        );
    }
}

export default TodoAlert;