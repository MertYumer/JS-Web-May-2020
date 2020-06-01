import React from 'react';

import './Aside.css';

import Link from '../shared/Link/Link';

function Aside({ isLogged }) {
    return (
        <aside className='Aside'>
            <ul>
                <Link url='/'>Posts</Link>
                {isLogged && <Link url='/share'>Share</Link>}
                {isLogged && <Link url='/profile'>Profile</Link>}
                {!isLogged && <Link url='/register'>Register</Link>}
                {!isLogged && <Link url='/login'>Login</Link>}
                {isLogged && <Link url="/logout">Logout</Link>}
            </ul>
        </aside>
    );
}

export default Aside;