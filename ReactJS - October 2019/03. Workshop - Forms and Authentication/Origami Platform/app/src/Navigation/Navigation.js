import React from 'react';

import './Navigation.css';

import Link from '../shared/Link/Link';

function Navigation({ isLogged }) {
    return (
        <nav className='Navigation'>
            <ul>
                <Link url='#'>
                    <img id='logo' src='/white-origami-bird.png' alt='my-app-logo' />
                </Link>
                <Link url='/'>Posts</Link>
                {isLogged && <Link url='/share'>Share</Link>}
                {isLogged && <Link url='/profile'>Profile</Link>}
                {!isLogged && <Link url='/register'>Register</Link>}
                {!isLogged && <Link url='/login'>Login</Link>}
                {isLogged && <Link url="/logout">Logout</Link>}
            </ul>
        </nav>
    );
}

export default Navigation;