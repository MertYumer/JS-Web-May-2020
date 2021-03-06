const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
	LETTERS_AND_DIGITS_PATTERN,
	INCORRECT_USERNAME_MESSAGE,
	INCORRECT_USERNAME_LENGTH_MESSAGE,
	NAME_MIN_LENGTH,
	REQUIRED_PASSWORD,
	REQUIRED_USERNAME
} = require('../controllers/constants');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, REQUIRED_USERNAME],
		unique: true,
		minlength: [NAME_MIN_LENGTH, INCORRECT_USERNAME_LENGTH_MESSAGE],
		match: [LETTERS_AND_DIGITS_PATTERN, INCORRECT_USERNAME_MESSAGE]
	},
	password: {
		type: String,
		required: [true, REQUIRED_PASSWORD]
	},
	enrolledCourses: [{
		type: Schema.Types.ObjectId,
		ref: 'Course'
	}]
});

module.exports = mongoose.model('User', UserSchema);