import React from 'react';

import '../shared/styles/LoginAndRegister.css';

function Login() {
    return (
        <div className='Login'>
            <h1>Login Page</h1>
            <form>
            <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username'></input>
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password'></input>
                </div>
                <div className='form-control'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;