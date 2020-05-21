const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

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

    res.render('index.hbs', { user: req.cookies[config.authCookieName], cubes: cubesViewModel });
};

function createGet(req, res) {
    const error = req.query.error;

    res.render('create.hbs', { user: req.cookies[config.authCookieName], error });
};

async function createPost(req, res) {
    let { name, description, imageUrl, difficultyLevel } = req.body;

    difficultyLevel = +difficultyLevel;
    let error = '';

    const validateNameAndDescriptionRegex = new RegExp('^[A-Za-z0-9 ]+$');

    if (name === null 
        || name === '' 
        || name.length < 5 
        || !validateNameAndDescriptionRegex.test(name)) {
        error += 'Name is not valid.\n';
    }

    if (description === null
        || description === ''
        || description.length < 20
        || !validateNameAndDescriptionRegex.test(description)) {
        error += 'Description is not valid.\n';
    }

    const validateImageRegex = new RegExp('^https?://');

    if (!validateImageRegex.test(imageUrl)) {
        error += 'Image must have a valid URL.\n';
    }

    if (difficultyLevel < 1 || difficultyLevel > 6) {
        error += 'Difficulty level must be between 1 and 6.\n';
    }

    if (error !== '') {
        res.redirect(`/create?error=${error}`);
        return;
    }

    const user = req.user;

    await cubesService
        .createAsync(name, description, imageUrl, difficultyLevel, user.id)
        .catch(err => {
            res.redirect(`/create?error=${error}`);
            return;
        });

    res.redirect('/');
};

async function details(req, res) {
    const cubeId = req.params.id;

    const { id, name, description, imageUrl, difficultyLevel } = await cubesService
        .getByIdAsync(cubeId)
        .catch(err => console.log(err));

    let accessories = await accessoriesService.getAllAttachedToCubeAsync(cubeId);

    let viewModel = {
        user: req.cookies[config.authCookieName],
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

    res.render('index.hbs', { user: req.cookies[config.authCookieName], search: { search, from, to }, cubes: cubesViewModel });
};

async function editGet(req, res) {
    const user = req.user;
    const cubeId = req.params.id;

    const isUserCubeCreator = await cubesService.isCreatedByUserAsync(cubeId, user.id)

    if (!isUserCubeCreator) {
        res.redirect('/');
        return;
    }

    const cube = await cubesService.getByIdAsync(cubeId);

    const viewModel = {
        user: req.cookies[config.authCookieName],
        cube: {
            id: cube.id,
            name: cube.name,
            imageUrl: cube.imageUrl,
            description: cube.description,
            difficultyLevel: cube.difficultyLevel
        }
    };

    res.render('editCube.hbs', { viewModel });
};

async function editPost(req, res) {
    let { name, description, imageUrl, difficultyLevel } = req.body;
    const cubeId = req.params.id;

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
        .editAsync(cubeId, name, description, imageUrl, difficultyLevel)
        .catch(err => console.log(err));

    res.redirect('/details/' + cubeId);
}

async function deleteGet(req, res) {
    const user = req.user;
    const cubeId = req.params.id;

    const isUserCubeCreator = await cubesService.isCreatedByUserAsync(cubeId, user.id)

    if (!isUserCubeCreator) {
        res.redirect('/');
        return;
    }

    const cube = await cubesService.getByIdAsync(cubeId);

    const viewModel = {
        user: req.cookies[config.authCookieName],
        cube: {
            id: cube.id,
            name: cube.name,
            imageUrl: cube.imageUrl,
            description: cube.description,
            difficultyLevel: cube.difficultyLevel
        }
    };

    res.render('deleteCube.hbs', { viewModel });
};

async function deletePost(req, res) {
    const id = req.params.id;

    await cubesService.deleteAsync(id);
    res.redirect('/');
}

module.exports = {
    all,
    createGet,
    createPost,
    details,
    search,
    editGet,
    editPost,
    deleteGet,
    deletePost
};