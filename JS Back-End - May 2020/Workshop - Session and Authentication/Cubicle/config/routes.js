const cubesController = require('../controllers/cubesController');
const accessoryController = require('../controllers/accessoriesController');

module.exports = (app) => {
    app.get('/', cubesController.all);

    app.get('/about', cubesController.about);

    app.get('/create', cubesController.createGet);

    app.post('/create', cubesController.createPost);

    app.get('/details/:id', cubesController.details);

    app.post('/search', cubesController.search);

    app.get('/not-found', cubesController.notFound);

    app.get('/create/accessory', accessoryController.createGet);

    app.post('/create/accessory', accessoryController.createPost);

    app.get('/attach/accessory/:id', accessoryController.attachGet);

    app.post('/attach/accessory/:id', accessoryController.attachPost);
};