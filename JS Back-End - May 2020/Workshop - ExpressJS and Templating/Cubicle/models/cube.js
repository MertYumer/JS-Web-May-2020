const uniqid = require("uniqid");

module.exports = class Cube {
    Id;
    Name;
    Description;
    Filesystem
    ImageURL;
    DifficultyLevel;

    constructor(name, difficultyLevel, description = null, imageURL = null) {
        this.Id = uniqid();
        this.Name = name;
        this.Description = description;
        this.ImageURL = imageURL;
        this.DifficultyLevel = difficultyLevel;
    }
};
