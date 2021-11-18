const express  = require('express')
const passport = require('passport')
const { User } = require('../database/schemas')

const router = express.Router()

module.exports = router

router.post('/register', (req, res, next) => {
	User.register(new User({ username : req.body.username }), req.body.password, (err, user) => {
		if (err) {
			return res.status(400).send({ message: err.message })
		}

		passport.authenticate('local')(req, res, () => {
			req.session.save((err) => {
				if (err) {
					return next(err)
				}
				res.send({ message: 'User created successfully', user })
			})
		})
	})
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
	req.session.save((err) => {
		if (err) {
			return next(err)
		}
	})

	res.end()
})

router.post('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) {
			res.status(400).send({ message: 'Logout failed', err })
		}
		req.sessionID = null
		req.logout()
		res.send({ message: 'Logged out successfully' })
	})
})
