const cubesService = require('../services/cubesService');
const accessoriesService = require('../services/accessoriesService');

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
};

function createGet(req, res) {
    res.render('create.hbs');
};

async function createPost(req, res) {
    let { name, description, imageUrl, difficultyLevel } = req.body;

    difficultyLevel = +difficultyLevel;

    if (name === null || name === '') {
        res.redirect('/');
    }

    const validateImageRegex = new RegExp('^https?://');

    if (!validateImageRegex.test(imageUrl)) {
        res.redirect('/');
    }

    if (description === null || description === '' || description.length > 100) {
        res.redirect('/');
    }

    if (difficultyLevel < 1 || difficultyLevel > 6) {
        res.redirect('/');
    }

    await cubesService
        .createAsync(name, description, imageUrl, difficultyLevel)
        .catch(err => console.log(err));

    res.redirect('/');
};

async function details(req, res) {
    const cubeId = req.params.id;

    const { id, name, description, imageUrl, difficultyLevel } = await cubesService
        .getByIdAsync(cubeId)
        .catch(err => console.log(err));

    let accessories = await accessoriesService.getAllAttachedToCubeAsync(cubeId);

    let viewModel = {
        cube: {
            id,
            name,
            description,
            imageUrl,
            difficultyLevel,
            HasAccessories: accessories.length !== 0
        },
        accessories: []
    };

    accessories.map(a => viewModel.accessories.push({
        name: a.name,
        description: a.description,
        imageUrl: a.imageUrl
    }));

    res.render('details.hbs', { viewModel });
};

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
};

function about(req, res) {
    res.render('about.hbs');
};

function notFound(req, res) {
    res.status(404);
    res.render('404.hbs');
};

module.exports = {
    all,
    createGet,
    createPost,
    details,
    search,
    about,
    notFound
};