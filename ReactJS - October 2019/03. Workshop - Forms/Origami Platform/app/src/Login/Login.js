import React from 'react';
import * as yup from 'yup';

import '../shared/styles/LoginAndRegister.css';

import { useFormControl, getValidationsRunnerForSchema } from '../shared/hocs/withForm';

const validations = {
    username: yup.string()
        .required('Username is required')
        .min(4, 'Username should be more than 4 chars'),

    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be more than 6 chars')
}

const schema = yup.object().shape(validations);

const validationsRunner = getValidationsRunnerForSchema(schema);

const Login = ({ login, history }) => {
    const usernameFormControl = useFormControl('', validations.username);
    const passwordFormControl = useFormControl('', validations.password);
    const [serverError, setServerError] = React.useState(null);

    const submitHandler = React.useCallback(() => {
        validationsRunner({
            username: usernameFormControl.value,
            password: passwordFormControl.value
        }).then(data => {
            login(history, data).catch(error => {
                if (typeof error === 'object') { throw error; }
                setServerError(error);
            });

        }).catch(errors => {
            if (errors.username) { usernameFormControl.setErrors(errors.username); }
            if (errors.password) { passwordFormControl.setErrors(errors.password); }
        })
    }, [usernameFormControl, passwordFormControl, setServerError, history, login]);

    return <form className='Login'>
        <h1>Login Page</h1>
        <div className="form-control">
            <label>Username</label>
            <input type="text" onChange={usernameFormControl.changeHandler} />
            {usernameFormControl.errors && <div className='error'>{usernameFormControl.errors[0]}</div>}
        </div>
        <div className="form-control">
            <label>Password</label>
            <input type="password" onChange={passwordFormControl.changeHandler} />
            {passwordFormControl.errors && <div className='error'>{passwordFormControl.errors[0]}</div>}
        </div>
        {serverError && serverError}
        <div className="form-control">
            <button type="button" onClick={submitHandler}>Login</button>
        </div>
    </form>;
}

export default Login;