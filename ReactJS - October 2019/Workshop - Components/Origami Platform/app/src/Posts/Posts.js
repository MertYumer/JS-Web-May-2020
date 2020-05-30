import React, { Component, Fragment } from 'react';

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
        const { title } = this.props;

        return (
            <Fragment>
                <h1>{title}</h1>
                <div className='Posts'>
                    {posts
                        ? posts.map(post => <Post key={post._id} author={post.author} imgUrl='/blue-origami-bird.png'>{post.description}</Post>)
                        : <div>Loading...</div>}
                </div>
            </Fragment>
        );
    }

    async componentDidMount() {
        const { count } = this.props;

        let posts = await service.getAll();

        if(count !== undefined){
            posts = posts.slice(0, count);
        }
        
        this.setState({ posts });
    }
}

export default Posts;