const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const {
    TOKEN_KEY,
    USERNAME,
    SALT_ROUNDS,
    UNMATCHING_PASSWORDS_MESSAGE,
    INCORRECT_PASSWORD_MESSAGE,
    INCORRECT_PASSWORD_LENGTH_MESSAGE,
    LETTERS_AND_DIGITS_PATTERN,
    USERNAME_EXISTS_MESSAGE,
    PASSWORD_MIN_LENGTH,
    INVALID_LOGIN_MESSAGE
} = require('./constants');

module.exports = {
    get: {
        login: (req, res, next) => {
            const { isLoggedIn } = req;
            res.render('login', { isLoggedIn });
        },

        register: (req, res, next) => {
            const { isLoggedIn } = req;
            res.render('register', { isLoggedIn });
        },

        logout: (req, res, next) => {
            res.clearCookie(TOKEN_KEY);
            res.clearCookie(USERNAME);
            res.redirect('/');
        }
    },

    post: {
        login: async (req, res, next) => {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            const errorMessages = [INVALID_LOGIN_MESSAGE];

            if (!user) {
                const { isLoggedIn } = req;
                res.render('login', { isLoggedIn, errorMessages, username });
            }

            const passwordIsCorrect = await bcryptjs.compare(password, user.password);

            if (!passwordIsCorrect) {
                const { isLoggedIn } = req;
                res.render('login', { isLoggedIn, errorMessages, username });
            } else {
                const token = generateToken(username, user._id);
                res.cookie(TOKEN_KEY, token);
                res.cookie(USERNAME, username);
                res.redirect('/');
            }
        },

        register: async (req, res, next) => {
            const { username, password, repeatPassword } = req.body;

            const errorMessages = [];

            if (password.length < PASSWORD_MIN_LENGTH) {
                errorMessages.push(INCORRECT_PASSWORD_LENGTH_MESSAGE);
            }

            if (password !== repeatPassword) {
                errorMessages.push(UNMATCHING_PASSWORDS_MESSAGE);
            }

            if (!password.match(LETTERS_AND_DIGITS_PATTERN)) {
                errorMessages.push(INCORRECT_PASSWORD_MESSAGE);
            }

            const hashedPassword = errorMessages.length > 0 ? null : await hashPassword(password);

            const user = new User({ username, password: hashedPassword });
            let success = true;
            let userId;

            try {
                const { _id } = await user.save();
                userId = _id;

            } catch (error) {
                if (error.name === 'MongoError') {
                    errorMessages.push(USERNAME_EXISTS_MESSAGE);
                } else {
                    Object.keys(error.errors).forEach((x) => {
                        errorMessages.push(error.errors[x].message);
                    });
                }
                
                success = false;
            }

            if(success) {
                const data = {
                    username,
                    userId
                };
            
                const token = jwt.sign(data, config.secret);
                res.cookie(TOKEN_KEY, token);
                res.cookie(USERNAME, username);
                res.redirect('/');
            } else {
                const { isLoggedIn } = req;
                res.render('register', { isLoggedIn, errorMessages, username });
            }
        }
    }
};

const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
};