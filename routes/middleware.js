const requireAuth = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).send({ message: 'User not authenticated' })
	}

	req.isAdmin = req.user.type === 'admin'

	next()
}

module.exports = {
	requireAuth,
}
