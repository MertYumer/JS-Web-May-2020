const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const accessoriesService = require('../services/accessoriesService');
const cubesService = require('../services/cubesService');

function createGet(req, res) {
    const error = req.query.error;

    res.render('createAccessory.hbs', { user: req.cookies[config.authCookieName], error });
};

async function createPost(req, res) {
    let { name, description, imageUrl } = req.body;

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

    if(error !== '') {
        res.redirect(`/create/accessory?error=${error}`);
        return;
    }

    await accessoriesService
        .createAsync(name, description, imageUrl)
        .catch(err => {
            res.redirect(`/create/accessory?error=${err.message}`); 
            return;
        });

    res.redirect('/');
};

async function attachGet(req, res) {
    const cubeId = req.params.id;

    const cube = await cubesService.getByIdAsync(cubeId);

    if (cube === null) {
        return res.redirect('/not-found');
    }

    const accessories = await accessoriesService.getAllUnattachedToCubeAsync(cubeId);

    let viewModel = {
        user: req.cookies[config.authCookieName],
        cube: {
            id: cube.id,
            name: cube.name,
            imageUrl: cube.imageUrl,
        },
        accessories: []
    };

    accessories.map(a => viewModel.accessories.push({
        id: a.id,
        name: a.name
    }));

    viewModel.canAttachAccessories = viewModel.accessories.length > 0;

    res.render('attachAccessory.hbs', { viewModel });
};

async function attachPost(req, res) {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    await accessoriesService.attachToCubeAsync(cubeId, accessoryId).catch(err => console.log(err));

    res.redirect('/');
};

module.exports = {
    createGet,
    createPost,
    attachGet,
    attachPost
};