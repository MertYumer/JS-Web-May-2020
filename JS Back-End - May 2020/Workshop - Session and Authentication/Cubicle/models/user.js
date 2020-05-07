const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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