const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: function (v) {
                const regex = new RegExp('^[A-Za-z0-9]+$');
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                const regex = new RegExp('^[A-Za-z0-9]+$');
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        }
    },
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcryptjs.compare(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcryptjs.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }
            bcryptjs.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);