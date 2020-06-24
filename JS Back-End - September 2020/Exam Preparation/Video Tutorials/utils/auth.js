const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const controller = require('../controllers/users');
const Course = require('../models/Course');
const { TOKEN_KEY } = require('../controllers/constants');

const authenticationCheck = (req, res, next) => {
	const token = req.cookies[TOKEN_KEY];

	if (!token) {
		req.isLoggedIn = false;
	}

	try {
		jwt.verify(token, config.secret);
		req.isLoggedIn = true;
	} catch (error) {
		req.isLoggedIn = false;
	}

	next();
};

const anonymousRestriction = (req, res, next) => {
	const token = req.cookies[TOKEN_KEY];

	if (!token) {
		return res.redirect('/');
	}
	next();
};

const getUserId = (token) => {
	const { userId } = jwt.decode(token, config.secret);
	return userId;
};

const isCreatorCheck = async (req, res, next) => {
	const token = req.cookies[TOKEN_KEY];

	if (!token) {
		req.isCreator = false;
	}

	try {
		const id = req.params.id;
		const { creatorId } = await Course.findById(id).select('creatorId');
		const { userId } = jwt.decode(token, config.secret);

		req.isCreator = creatorId === userId;
	} catch (error) {
		req.isCreator = false;
	}

	next();
};

const isEnrolledCheck = async (req, res, next) => {
	const token = req.cookies[TOKEN_KEY];

	if (!token) {
		req.isEnrolled = false;
	}

	try {
		const courseId = req.params.id;
		const { userId } = jwt.decode(token, config.secret);

		const course = await Course.findById(courseId).populate('enrolledUsers').lean();
		req.isEnrolled = course.enrolledUsers.some((x) => x._id.equals(mongoose.Types.ObjectId(userId)));
	} catch (error) {
		req.isEnrolled = false;
	}

	next();
};

const notCreatorRestriction = async (req, res, next) => {
	try {
		const token = req.cookies[TOKEN_KEY];
		const id = req.params.id;
		const creatorId = await controller.getCreator(id);
		const { userID } = jwt.decode(token, config.secret);

		if (creatorId === userID) {
			next();
		} else {
			return res.redirect('/');
		}
	} catch (error) {
		return res.redirect('/');
	}
};

module.exports = {
	authenticationCheck,
	anonymousRestriction,
	getUserId,
	isCreatorCheck,
	isEnrolledCheck,
	notCreatorRestriction
};