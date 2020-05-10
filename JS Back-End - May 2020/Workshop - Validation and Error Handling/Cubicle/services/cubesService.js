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

function editAsync(id, name, description, imageUrl, difficultyLevel) {
    return context.cubes.updateOne(
        { _id: id },
        { name, description, imageUrl, difficultyLevel }
    );
};

async function deleteAsync(id){
    return context.cubes.deleteOne({_id: id});
}

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

async function isCreatedByUserAsync(cubeId, userId) {
    const cube = await context.cubes.findOne({ _id: cubeId, creatorId: userId });

    return cube !== null;
}

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    editAsync,
    deleteAsync,
    searchAsync,
    isCreatedByUserAsync
};