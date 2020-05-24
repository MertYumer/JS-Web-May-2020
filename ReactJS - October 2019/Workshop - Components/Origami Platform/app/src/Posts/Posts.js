import React from 'react';

import './Posts.css';

import Post from '../Post/Post';

function Posts() {
    return (
        <div className="Posts">
            <Post />
            <Post />
        </div>
    );
}

export default Posts;