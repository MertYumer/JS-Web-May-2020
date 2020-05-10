const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const jwt = require('./jwt');
const context = require('../models/index');

function auth() {
    return async function (req, res, next) {
        const token = req.cookies[config.authCookieName] || '';

        Promise.all([
            jwt.verifyToken(token),
        ]).then(([data]) => {
            context.users
                .findById(data.data.id)
                .then(user => {
                    req.user = user;
                    next();
                });
        }).catch(err => {
            if (['jwt expired', 'jwt must be provided'].includes(err.message)) {
                res.redirect('/login');
                return;
            }
            next(err);
        });


        // const userData = await jwt
        //     .verifyToken(token)
        //     .catch(err => {
        //         if ([
        //             'token expired',
        //             'jwt must be provided'
        //         ].includes(err.message)
        //         ) {
        //             res.redirect('/login');
        //             return;
        //         }
        //         next(err);
        //     });

        // req.user = await usersService.getByIdAsync(userData.data.id);
        // next();
    }
}

module.exports = auth;