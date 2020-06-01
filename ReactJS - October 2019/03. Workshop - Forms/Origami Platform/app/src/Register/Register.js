import React from 'react';
import * as yup from 'yup';

import '../shared/styles/LoginAndRegister.css';

import withForm from '../shared/hocs/withForm';
import usersService from '../services/usersService';

class Register extends React.Component {
    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
    rePasswordOnChangeHandler = this.props.controlChangeHandlerFactory('rePassword');

    submitHandler = () => {
        const errors = this.props.getFormErrorState();
        if (!!errors) { return; }

        const data = this.props.getFormState();

        usersService
            .register(data)
            .then(() => {
                this.props.history.push('/login');
            });
    }

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };

    render() {
        const usernameError = this.getFirstControlError('username');
        const passwordError = this.getFirstControlError('password');
        const rePasswordError = this.getFirstControlError('rePassword');

        return (
            <form className='Register'>
                <h1>Register Page</h1>
                <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' onChange={this.usernameOnChangeHandler} />
                    {usernameError && <div className="error">{usernameError}</div>}
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' onChange={this.passwordOnChangeHandler} />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <div className='form-control'>
                    <label htmlFor='rePassword'>Re-password</label>
                    <input type='password' id='rePassword' onChange={this.rePasswordOnChangeHandler} />
                    {rePasswordError && <div className="error">{rePasswordError}</div>}
                </div>
                <div className='form-control'>
                    <button type='button' onClick={this.submitHandler}>Register</button>
                </div>
            </form>
        );
    }
}

const initialFormState = {
    username: '',
    password: '',
    rePassword: ''
};

const schema = yup.object({
    username: yup
        .string('Username shoud be a string')
        .required('Username is required')
        .min(4, 'Username should be more than 4 chars'),

    password: yup
        .string('Password must be a string')
        .required('Password is required')
        .min(6, 'Password must be more than 6 chars'),

    rePassword: yup
        .string('Password must be a string')
    //.oneOf([yup.ref('password'), ''], 'Passwords don\'t match')
    //.required('Password is required')
    //.min(6, 'Password must be more than 6 chars')
});

export default withForm(Register, initialFormState, schema);