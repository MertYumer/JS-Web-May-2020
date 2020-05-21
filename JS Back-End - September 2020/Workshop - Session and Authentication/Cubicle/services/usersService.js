const context = require('../models/index');
const jwt = require('../utils/jwt')

function getByUsernameAsync(username) {
    return context.users.findOne({ username });
}

function getByIdAsync(id) {
    return context.users.findById(id);
}

function registerAsync(username, password) {
    return context.users.create({ username, password });
}

function login(id) {
    return jwt.createToken({ id });
}

module.exports = {
    getByUsernameAsync,
    getByIdAsync,
    registerAsync,
    login
}