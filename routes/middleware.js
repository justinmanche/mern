const requireAuth = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).send({ message: 'User not authenticated' })
	}

	console.log('Req user:', req.user)

	req.isAdmin = req.user.type === 'admin'

	next()
}

module.exports = {
	requireAuth,
}
