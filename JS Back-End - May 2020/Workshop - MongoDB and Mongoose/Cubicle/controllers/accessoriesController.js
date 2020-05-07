const accessoriesService = require('../services/accessoriesService');
const cubesService = require('../services/cubesService');

function createGet(req, res) {
    res.render('createAccessory.hbs');
}

async function createPost(req, res) {
    let { name, description, imageUrl } = req.body;

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

    await accessoriesService
        .createAsync(name, description, imageUrl)
        .catch(err => console.log(err));

    res.redirect('/');
}

async function attachGet(req, res) {
    const cubeId = req.params.id;

    const cube = await cubesService.getByIdAsync(cubeId);

    if (cube === null) {
        return res.redirect('/not-found');
    }

    const accessories = await accessoriesService.getAllUnattachedToCubeAsync(cubeId);

    let viewModel = {
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
}

module.exports = {
    createGet,
    createPost,
    attachGet
};