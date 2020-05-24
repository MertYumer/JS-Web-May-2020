import React from 'react';

import './Post.css';

function Post({ imgUrl, author, children }) {
    return (
        <div className='Post'>
            <img src="/blue-origami-bird.png" alt=''></img>
            <p className='description'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, reiciendis quam. Deleniti, voluptatibus odit veritatis libero ipsam, suscipit vitae obcaecati sed ipsa quaerat neque molestias consequuntur reiciendis ipsum tempora cum.
            </p>
            <div>
                <span>
                    <small>Author: {author}</small>
                </span>
            </div>
        </div>
    );
}

export default Post;