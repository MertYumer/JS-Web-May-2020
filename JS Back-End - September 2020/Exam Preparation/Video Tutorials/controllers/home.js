module.exports = {
	get: {
		home: async (req, res, next) => {
			const { search, isLoggedIn, username } = req;
			
			try {
				res.render('home', { search, isLoggedIn, username });
			} catch (error) {
				next();
			}
		}
	}
};