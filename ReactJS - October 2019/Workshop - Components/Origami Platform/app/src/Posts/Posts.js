import React, { Component } from 'react';

import './Posts.css';

import Post from '../Post/Post';

import service from '../services/postsService';

class Posts extends Component {
    constructor() {
        super();

        this.state = {
            posts: null
        };
    }

    render() {

        const { posts } = this.state;

        return (
            <div className='Posts'>
                {posts ?
                    posts.map(post => <Post key={post._id} author={post.author} imgUrl='/blue-origami-bird.png'>{post.description}</Post>)
                    : <div>Loading...</div>}
            </div>
        );
    }

    async componentDidMount(){
        let posts = await service.getAll();

        this.setState({ posts });
    }
}

export default Posts;