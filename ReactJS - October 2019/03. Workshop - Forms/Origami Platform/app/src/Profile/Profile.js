import React from 'react';

import './Profile.css';

import Posts from '../Posts/Posts';

function Profile() {
    return (
        <div className='Profile'>
            <img src='/blue-origami-bird-flipped.png' alt='profile' />
            <div className='personal-info'>
                <p><span>Email:</span>testemail@abv.bg</p>
                <p><span>Posts:</span>10</p>
            </div>
            <Posts title='3 of your posts' count='3'></Posts>
        </div>
    );
}

export default Profile;