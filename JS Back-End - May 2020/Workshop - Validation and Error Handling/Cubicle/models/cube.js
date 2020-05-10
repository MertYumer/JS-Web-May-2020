const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        validate: {
            validator: function (v) {
                const regex = new RegExp('^[A-Za-z0-9 ]+$');
                return regex.test(v);
            },
            message: props => `Name should contain only letters, digits and whitespaces.`
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        validate: {
            validator: function (v) {
                const regex = new RegExp('^[A-Za-z0-9 ]+$');
                return regex.test(v);
            },
            message: props => `Description should contain only letters, digits and whitespaces.`
        }
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
    creatorId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    accessories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Accessory' }]
});

module.exports = mongoose.model('Cube', cubeSchema);
