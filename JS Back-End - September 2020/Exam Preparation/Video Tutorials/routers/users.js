const express = require('express');
const router = express.Router();
const { users } = require('../controllers');
const { anonymousRestriction } = require('../utils/auth');

router.get('/login', users.get.login);

router.post('/login', users.post.login);

router.get('/register', users.get.register);

router.post('/register', users.post.register);

router.get('/logout', anonymousRestriction, users.get.logout);

module.exports = router;