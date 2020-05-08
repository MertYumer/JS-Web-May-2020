const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const usersService = require('../services/usersService');

function loginGet(req, res) {
    res.render('login.hbs');
}

async function loginPost(req, res) {
    const { username, password } = req.body;

    const user = await usersService
        .getByUsernameAsync(username)
        .catch(err => console.log(err));

    if (user === null || !user.matchPassword(password)) {
        res.redirect('/login');
        return;
    }

    const jwt = usersService.login(user.id);

    res.cookie(config.authCookieName, jwt);
    res.redirect('/');
}

function registerGet(req, res) {
    res.render('register.hbs');
}

async function registerPost(req, res) {
    const { username, password, repeatPassword } = req.body;

    if (username === null || username === '') {
        res.redirect('/register');
        return;
    }

    if (password === null || password === '') {
        res.redirect('/register');
        return;
    }

    if (password !== repeatPassword) {
        res.redirect('/register');
        return;
    }

    const user = await usersService
        .getByUsernameAsync(username)
        .catch(err => console.log(err));

    if (user !== null) {
        res.redirect('/register');
        return;
    }

    await usersService
        .registerAsync(username, password)
        .catch(err => console.log(err));

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