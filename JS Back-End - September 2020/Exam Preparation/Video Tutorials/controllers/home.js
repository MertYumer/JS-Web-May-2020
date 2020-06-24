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
					.sort({ enrolledUsers: -1 })
					.limit(coursesCountToDisplay);
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
				res.render('home', { isLoggedIn, username, "courses": courses, search });
			} catch (error) {
				next();
			}
		}
	}
};