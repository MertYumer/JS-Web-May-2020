const cubesService = require('../services/cubesService');

async function all(req, res) {
    const cubes = await cubesService
        .getAllAsync()
        .catch(err => console.log(err));

    let cubesViewModel = [];

    cubes.map(c => cubesViewModel.push({
        id: c.id,
        name: c.name,
        imageUrl: c.imageUrl,
        difficultyLevel: c.difficultyLevel
    }));

    res.render('index.hbs', { cubes: cubesViewModel });
}

function createGet(req, res) {
    res.render('create.hbs');
}

async function createPost(req, res) {
    let { name, description, imageUrl, difficultyLevel } = req.body;

    difficultyLevel = +difficultyLevel;

    if (name === null || name === '') {
        res.redirect('/');
    }

    if (difficultyLevel <= 0 || difficultyLevel > 6) {
        res.redirect('/');
    }

    await cubesService
        .createAsync(name, description, imageUrl, difficultyLevel)
        .catch(err => console.log(err));

    res.redirect('/');
}

async function details(req, res) {
    const cubeId = req.params.id;

    const cube = await cubesService
        .getByIdAsync(cubeId)
        .catch(err => console.log(err));

    res.render('details.hbs', { cube });
}

async function search(req, res) {
    const { search, from, to } = req.body;

    if (isNaN(from) || isNaN(to)) {
        res.redirect("/");
    }

    const cubes = await cubesService
        .searchAsync(search, from, to)
        .catch(err => console.log(err));

        let cubesViewModel = [];

    cubes.map(c => cubesViewModel.push({
        id: c.id,
        name: c.name,
        imageUrl: c.imageUrl,
        difficultyLevel: c.difficultyLevel
    }));

    res.render('index.hbs', { search: { search, from, to }, cubes: cubesViewModel });
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
    search,
    about,
    notFound
};