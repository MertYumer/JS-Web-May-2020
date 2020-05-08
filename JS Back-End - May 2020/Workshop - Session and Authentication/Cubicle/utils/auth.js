const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const jwt = require('./jwt');
const usersService = require('../services/usersService');

function auth() {
    return async function (req, res, next) {
        const token = req.cookies[config.authCookieName] || '';

        const userData = await jwt
            .verifyToken(token)
            .catch(err => {
                res.redirect('/');
                return;
            });

        req.user = await usersService.getByIdAsync(userData.data.id);
        next();
    }
}

module.exports = auth;