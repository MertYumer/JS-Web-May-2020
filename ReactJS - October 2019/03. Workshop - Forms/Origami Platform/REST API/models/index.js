const User = require('./User');
const Origami = require('./Origami');
const TokenBlacklist = require('./TokenBlacklist');

// User.create({ username: 'John', password: '111111' });

// Origami.create({ description: '### Case was created in error or is for testing purposes and should not be used or available for SLA reporting.', author: '5ed2dc4ab5aed528484ae79d' })
//     .then((createdOrigami) => {
//         return Promise.all([
//             User.updateOne({ _id: '5edf731534e75b3998478084' }, { $push: { posts: createdOrigami } }),
//         ]);
//     });

module.exports = {
    User,
    Origami,
    TokenBlacklist
};