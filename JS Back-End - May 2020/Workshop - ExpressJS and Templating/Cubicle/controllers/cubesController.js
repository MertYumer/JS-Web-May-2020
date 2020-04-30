const cubesService = require('../services/cubesService');

async function all(req, res) {
    let allCubes = await cubesService
        .getAllAsync()
        .catch(err => console.log(err));

    res.render('index.hbs', { allCubes })
}

function createGet(req, res) {
    res.render('create.hbs');
}

async function createPost(req, res) {
    const { name, difficultyLevel, description, imageURL } = req.body;

    difficultyLevel = +difficultyLevel;

    if (name === null || name === '') {
        res.redirect('/');
    }

    if (difficultyLevel <= 0 || difficultyLevel > 6) {
        res.redirect('/');
    }

    await cubesService
        .createAsync(name, difficultyLevel, description, imageURL)
        .catch(err => console.log(err));

    res.redirect('/');
}

async function details(req, res) {
    const cubeId = req.params.id;

    const cube = await cubesService
        .getByIdAsync(cubeId)
        .catch(err => console.log(err));

    res.render('deteils.hbs', { cube });
}

function about(req, res) {
    res.render('about.hbs');
}

function notFound(req, res) {
    res.status(404);
    res.render('404.hbs');
}

module.exports = {
    all,
    createGet,
    createPost,
    details,
    about,
    notFound
};