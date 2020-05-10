const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
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
    cubes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Cube' }]
});

module.exports = mongoose.model('Accessory', accessorySchema);