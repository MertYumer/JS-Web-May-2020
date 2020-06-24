const routers = require('../routers');

module.exports = (app) => {
	app.use('/', routers.users);

	app.use('/', routers.home);

	app.use('/course', routers.courses);

	app.get('*', (req, res) => {
		res.render('404');
	});
};