const cubesController = require('../controllers/cubesController');

module.exports = (app) => {
    app.get('/', cubesController.all);

    app.get('/about', cubesController.about);

    app.get('/create', cubesController.createGet);

    app.post('/create', cubesController.createPost);

    app.get('/details/:id', cubesController.details);

    app.get('/not-found', cubesController.notFound);
};