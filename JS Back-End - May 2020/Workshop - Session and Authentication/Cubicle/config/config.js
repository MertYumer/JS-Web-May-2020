module.exports = {
    development: {
        port: process.env.PORT || 3000,
        connectionString: 'mongodb://localhost:27017/cubes',
        secret: 'jwt secret',
        jwtExpiringTime: '10m',
        authCookieName: 'auth_cookie'
    },
    production: {}
};