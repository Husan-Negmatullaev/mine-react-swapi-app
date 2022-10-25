import React, {Component} from 'react';
import './error-button.scss'

export default class ErrorButton extends Component {
    state = {
        error: false
    }
    throwError = () => {
        this.setState(({error}) => {
            error.foo.bar = ''
        })
    }
    render() {
        return (
            <button
                className="btn btn-danger btn-lg mb-2"
                onClick={() => this.throwError()}>
                Throw new error
            </button>
        );
    }
}