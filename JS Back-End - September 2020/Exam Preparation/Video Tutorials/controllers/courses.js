const { getUserId } = require('../utils/auth');
const { TOKEN_KEY } = require('../controllers/constants');
const Course = require('../models/Course');
const { response } = require('express');

module.exports = {
    get: {
        create: async (req, res, next) => {
            try {
                const { isLoggedIn, username } = req;
                res.render('course-create', { isLoggedIn, username });
            } catch (error) {
                next();
            }
        },
        details: async (req, res, next) => {
            try {
                const { isLoggedIn, username } = req;
                const isCreator = req.isCreator;
                const isEnrolled = req.isEnrolled;
                const courseId = req.params.id;
                const course = await Course.findById(courseId).populate('enrolledUsers').lean();

                res.render('course-details', { isLoggedIn, username, ...course, isCreator, isEnrolled });
            } catch (error) {
                next();
            }
        },
        edit: async (req, res, next) => {
            try {
                const { isLoggedIn, username } = req;
                const courseId = req.params.id;
                const course = await Course.findById(courseId).populate('enrolledUsers').lean();
                res.render('course-edit', { isLoggedIn, username, ...course });
            } catch (error) {
                next();
            }
        },
        enroll: async (req, res, next) => {
            try {
                const courseId = req.params.id;
                const token = req.cookies[TOKEN_KEY];
                const userId = getUserId(token);
                await Course.findByIdAndUpdate(courseId, {
                    $addToSet: {
                        enrolledUsers: [userId]
                    }
                });
                res.redirect(`/course/details/${courseId}`);
            } catch (error) {
                next();
            }
        },
        delete: async (req, res, next) => {
            try {
                const courseId = req.params.id;
                await Course.findByIdAndDelete(courseId);
                res.redirect('/');
            } catch (error) {
                next();
            }
        },
    },

    post: {
        create: async (req, res, next) => {
            const { title, description, imageUrl, checked, isLoggedIn, username } = req.body;
            const isPublic = !!checked;
            const token = req.cookies[TOKEN_KEY];
            const creatorId = getUserId(token);

            const newCourse = new Course({
                title,
                description,
                imageUrl,
                isPublic,
                creatorId,
                createdOn: Date.now()
            });

            let success = true;
            let userId;
            const errorMessages = [];

            try {
                const { _id } = await newCourse.save();
                userId = _id
            } catch (error) {
                if (error.name === 'MongoError') {
                    errorMessages.push(COURSE_EXISTS_MESSAGE);
                } else {
                    Object.keys(error.errors).forEach((x) => {
                        errorMessages.push(error.errors[x].message);
                    });
                }

                success = false;
            }

            if (success) {
                res.redirect(`/course/details/${userId}`);
            } else {
                res.render('course-create', {
                    isLoggedIn,
                    username,
                    errorMessages,
                    title,
                    description,
                    imageUrl,
                    checked
                });
            }
        },
        edit: async (req, res, next) => {
            const id = req.params.id;
            const { isLoggedIn, username } = req;
            const { title, description, imageUrl, checked } = req.body;
            const isPublic = !!checked;

            try {
                await Course.findByIdAndUpdate(courseId, courseObject);
                res.render('edit-course', { isLoggedIn, username, title, description, imageUrl, isPublic, id });
            } catch (error) {
                const errorMessages = [];
                if (error.name === 'MongoError') {
                    errorMessages.push(COURSE_EXISTS_MESSAGE);
                } else {
                    Object.keys(error.errors).forEach((x) => {
                        errorMessages.push(error.errors[x].message);
                    });
                }

                res.redirect(`/course/details/${id}`);
            }
        }
    }
}