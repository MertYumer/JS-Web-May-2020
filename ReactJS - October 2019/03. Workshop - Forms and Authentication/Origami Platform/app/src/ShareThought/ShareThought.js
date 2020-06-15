import React from 'react';

import './ShareThought.css';

import Posts from '../Posts/Posts';
import postsService from '../services/postsService';

const ShareThought = ({ history }) => {
    const textareaRef = React.useRef();

    const createPost = React.useCallback(() => {
        const value = textareaRef.current.value;
        postsService.create({ description: value }).then(() => {
            history.push('/');
        });
    }, [textareaRef, history]);

    return <div className='Input'>
        <form>
            <h1>Share your thoughs</h1>
            <textarea ref={textareaRef}></textarea>
            <button type='button' onClick={createPost}>Post</button>
        </form>
        <div>
            <Posts limit={3} />
        </div>
    </div>;
}

export default ShareThought;