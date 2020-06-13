import React from 'react';

import './Main.css';

function Main({ title, children }) {
    return (
        <div className='Main'>
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default Main;