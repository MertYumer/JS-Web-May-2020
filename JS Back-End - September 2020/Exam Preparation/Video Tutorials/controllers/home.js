const Course = require('../models/Course');
const mongoose = require('mongoose');

module.exports = {
	get: {
		home: async (req, res, next) => {
			const { search } = req.query;
			const { isLoggedIn, username } = req;
			const coursesCountToDisplay = isLoggedIn ? null : 3;
			let query = await Course.find().where('isPublic');

			if (coursesCountToDisplay) {
				query = query
					.sort(function (a, b) {
						return b.enrolledUsers.length - a.enrolledUsers.length;
					})
					.slice(0, coursesCountToDisplay);
			} else {
				query = query
					.sort(function (a, b) {
						return new Date(b.createdOn) - new Date(a.createdOn);
					});
			}

			const courses = query
				.map(c => JSON.stringify(c))
				.map(c => JSON.parse(c));

			try {
				res.render('home', { isLoggedIn, username, courses, search });
			} catch (error) {
				next();
			}
		}
	}
};