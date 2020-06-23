const express = require('express');
const router = express.Router();
const { home } = require('../controllers');

router.get('/', home.get.home);

router.get('/about', home.get.about);

module.exports = router;