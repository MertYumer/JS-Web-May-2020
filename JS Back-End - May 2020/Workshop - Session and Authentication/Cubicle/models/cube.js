const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const regex = new RegExp('^https?://')
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid image URL.`
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Accessory' }]
});

module.exports = mongoose.model('Cube', cubeSchema);
