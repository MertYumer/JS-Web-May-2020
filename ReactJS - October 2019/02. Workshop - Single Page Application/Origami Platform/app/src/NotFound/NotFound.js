import React from 'react';

import './NotFound.css';

function NotFound({ title }) {
    return (
        <div className='FourOFour'>
            <h1>{title}</h1>
            <img src='/emoji.jpg' alt='Emoji' />
        </div>
    );
}

export default NotFound;