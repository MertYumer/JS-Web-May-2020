const fs = require('fs');
const Cube = require('../models/cube');

function getAllAsync() {
    return new Promise((resolve, reject) => {
        fs.readFile('./config/database.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data));
        });
    });
}

function getByIdAsync(id) {
    return new Promise((resolve, reject) => {
        fs.readFile('./config/database.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            let cubes = JSON.parse(data);

            if (!cubes.some(c => c.Id === id)) {
                reject(new Error("Id does not exist!"));
            }

            resolve(cubes.filter(c => c.Id === id)[0]);
        });
    });
}

function createAsync(name, difficultyLevel, imageURL = null, description = null) {
    return new Promise((resolve, reject) => {
        const cube = new Cube(name, difficultyLevel, imageURL, description)

        fs.readFile('./config/database.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const cubes = JSON.parse(data);
            cubes.push(cube);

            fs.writeFile('./config/database.json', JSON.stringify(cubes), 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    });
}

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync
};