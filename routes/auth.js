const express  = require('express')
const passport = require('passport')
const { User } = require('../models')

const router = express.Router()

module.exports = router

router.post('/register', (req, res, next) => {
	const { username, password, type } = req.body
	const userParams = { username, password, type }
	User.register(new User(userParams), req.body.password, (err, user) => {
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

router.post('/login', async function(req, res) {
	passport.authenticate('local', function (err, user) {
		if (err){
			res.status(401).send({ message: err })
		} else {
			if (!user) {
				res.status(401).send({ message: 'username or password incorrect'})
			} else {
				req.login(user, function(err){
					if (err){
						res.status(401).send({ message: err})
					} else {
						res.send({ message:'Authentication successful' })
					}
				})
			}
		}
	})(req, res)
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
