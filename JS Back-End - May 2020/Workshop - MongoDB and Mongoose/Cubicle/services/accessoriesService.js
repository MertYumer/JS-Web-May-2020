const context = require('../models/index');

function createAsync(name, description, imageUrl, difficultyLevel) {
    return context.accessories.create({
        name: name,
        description: description,
        imageUrl: imageUrl
    });
};

function getAllUnattachedToCubeAsync(cubeId) {
    return context.accessories.find({ cubes: { $nin: cubeId } });
};

function getAllAttachedToCubeAsync(cubeId) {
    return context.accessories.find({ cubes: cubeId });
};

async function attachToCubeAsync(cubeId, accessoryId) {
    await context.cubes.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } });
    await context.accessories.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } });
}

module.exports = {
    createAsync,
    getAllUnattachedToCubeAsync,
    getAllAttachedToCubeAsync,
    attachToCubeAsync
};