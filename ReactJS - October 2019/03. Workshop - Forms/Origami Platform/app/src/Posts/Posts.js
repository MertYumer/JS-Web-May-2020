import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Posts.css';

import Post from '../Post/Post';

import service from '../services/postsService';

const Posts = ({ limit }) => {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        service
            .getAll(limit)
            .then(posts => {
                setPosts(posts);
            });
    }, [limit]);

    return (
        <Fragment>
            <h1>Publications</h1>
            <div className="Posts">
                {posts
                    ? posts.map(post => <Post key={post._id} author={post.author.username} imgUrl='/blue-origami-bird.png'>{post.description}</Post>)
                    : <div>Loading...</div>
                }
            </div>
        </Fragment>
    );
}

Posts.propTypes = {
    limit: PropTypes.number
};

export default Posts;