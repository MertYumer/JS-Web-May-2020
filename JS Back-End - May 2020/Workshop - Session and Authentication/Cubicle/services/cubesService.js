const context = require('../models/index');

function getAllAsync() {
    return context.cubes.find();
};

function getByIdAsync(id) {
    return context.cubes.findById(id).populate('accessories');
};

function createAsync(name, description, imageUrl, difficultyLevel, creatorId) {
    return context.cubes.create({
        name: name,
        description: description,
        imageUrl: imageUrl,
        difficultyLevel: difficultyLevel,
        creatorId: creatorId
    });
};

function searchAsync(search, from, to) {
    let query = {};

    if (to !== '') {
        query = {
            ...query,
            difficultyLevel: { $lte: +to }
        };
    }

    if (from !== '') {
        query = {
            ...query,
            difficultyLevel: { ...query.difficultyLevel, $gte: +from }
        };
    }

    return new Promise(async (resolve, reject) => {
        let cubes = await context
            .cubes
            .find(query)
            .catch(err => reject(err));

        cubes = cubes
            .filter(c => c.name
                .toLowerCase()
                .includes(search.toLowerCase()));

        resolve(cubes);
    });
};

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    searchAsync
};