const context = require('../models/index');

function createAsync(name, description, imageUrl, difficultyLevel) {
    return context.accessories.create({
        name: name,
        description: description,
        imageUrl: imageUrl
    });
}

function getAllUnattachedToCubeAsync(cubeId) {
    return context.accessories.find({ cubes: { $nin: cubeId } });
}

module.exports = {
    createAsync,
    getAllUnattachedToCubeAsync
}