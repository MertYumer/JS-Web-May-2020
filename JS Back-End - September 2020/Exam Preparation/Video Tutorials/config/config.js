module.exports = {
    development: {
        port: process.env.PORT || 3000,
        connectionString: 'mongodb://localhost:27017/exam',
        secret: process.env.SECRET_KEY
    },
    production: {}
};