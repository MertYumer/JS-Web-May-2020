import React from 'react';

import './ShareThought.css';

import Posts from '../Posts/Posts';

function ShareThought() {
    return (
        <div className='Input'>
            <div>
                <h1>Share your thoughs</h1>
                <textarea></textarea>
                <button>Post</button>
            </div>

            <div>
                <Posts title='Last 3 posts' count='3'></Posts>
            </div>
        </div>
    );
}

export default ShareThought;