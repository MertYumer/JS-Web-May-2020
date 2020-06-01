import React from 'react';

import './Footer.css';

import Link from '../shared/Link/Link';

function Footer({ isLogged }) {
    return (
        <footer className='Footer'>
            <ul>
                <Link url='/'>Posts</Link>
                {isLogged && <Link url='/share'>Share</Link>}
                {isLogged && <Link url='/profile'>Profile</Link>}
                {!isLogged && <Link url='/register'>Register</Link>}
                {!isLogged && <Link url='/login'>Login</Link>}
                {isLogged && <Link url="/logout">Logout</Link>}
                <Link url='#'>
                    <img id='logo' src='/blue-origami-bird-flipped.png' alt='my-app-logo' />
                </Link>
            </ul>
        </footer>
    );
}

export default Footer;