const auth = require('../utils/auth');

const cubesController = require('../controllers/cubesController');
const accessoriesController = require('../controllers/accessoriesController');
const usersController = require('../controllers/usersController');

module.exports = (app) => {
    app.get('/register', usersController.registerGet);
    app.post('/register', usersController.registerPost);

    app.get('/login', usersController.loginGet);
    app.post('/login', usersController.loginPost);

    app.get('/logout', auth(), usersController.logout);

    app.get('/', cubesController.all);

    app.get('/about', cubesController.about);

    app.get('/create', auth(), cubesController.createGet);
    app.post('/create', auth(), cubesController.createPost);

    app.get('/details/:id', cubesController.details);

    app.post('/search', cubesController.search);

    app.get('/not-found', cubesController.notFound);

    app.get('/create/accessory', auth(), accessoriesController.createGet);
    app.post('/create/accessory', auth(), accessoriesController.createPost);

    app.get('/attach/accessory/:id', auth(), accessoriesController.attachGet);
    app.post('/attach/accessory/:id', auth(), accessoriesController.attachPost);
};