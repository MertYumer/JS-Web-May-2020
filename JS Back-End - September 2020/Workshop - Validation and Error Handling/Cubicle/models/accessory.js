const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
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
        maxlength: 100,
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
    cubes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Cube' }]
});

module.exports = mongoose.model('Accessory', accessorySchema);