const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const usersService = require('../services/usersService');

function loginGet(req, res) {
    const error = req.query.error;

    res.render('login.hbs', { user: req.cookies[config.authCookieName], error });
}

async function loginPost(req, res) {
    const { username, password } = req.body;

    const user = await usersService
        .getByUsernameAsync(username)
        .catch(err => console.log(err));

    if (user === null || !user.matchPassword(password)) {
        const error = 'Invalid username or password.'
        res.redirect(`/login?error=${error}`);
        return;
    }

    const jwt = usersService.login(user.id);

    res.cookie(config.authCookieName, jwt);
    res.redirect('/');
}

function registerGet(req, res) {
    const error = req.query.error;

    res.render('register.hbs', { user: req.cookies[config.authCookieName], error });
}

async function registerPost(req, res) {
    const { username, password, repeatPassword } = req.body;

    const validateUsernameAndPasswordRegex = new RegExp('^[A-Za-z0-9]+$');

    let error = '';

    if (username === null || username.length < 5 || !validateUsernameAndPasswordRegex.test(username)) {
        error += 'Username is not valid.\n';
    }

    if (password === null || password.length < 8 || !validateUsernameAndPasswordRegex.test(password)) {
        error += 'Password is not valid.\n';
    }

    if (password !== repeatPassword) {
        error += 'Passwords does not match.\n';
    }

    const user = await usersService
        .getByUsernameAsync(username)
        .catch(err => console.log(err));

    if (user !== null) {
        error += 'Username is already taken.\n';
    }

    if (error !== '') {
        res.redirect(`/register?error=${error}`);
        return;
    }

    await usersService
        .registerAsync(username, password)
        .catch(err => {
            res.redirect(`/register?error=${error}`);
            return;
        });

    res.redirect('/login');
}

function logout(req, res) {
    res.clearCookie(config.authCookieName);
    res.redirect('/');
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout
};