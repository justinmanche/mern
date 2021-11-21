const express = require('express')
const { User } = require('../models')
const { requireAuth } = require('./middleware')

const router = express.Router()

module.exports = router

router.post('/checkusername', (req, res) => {
	const username = req.body.username.toLowerCase()

	User.find({ username }, (err, users) => {
		if (err) {
			res.status(400).send({ message: 'Check username failed', err, username })
		}
		if (users && users[0]) {
			res.send({ available: false, message: 'Username exists', username })
		} else {
			res.send({ available: true, message: 'Username available', username })
		}
	})
})

router.get('/', requireAuth, (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			res.status(400).send({ err })
		}

		res.send(users)
	})
})

router.get('/:id', requireAuth, (req, res) => {
	User.findById(req.params.id, async (err, user) => {
		if (err) return res.status(400).send({ message: 'Failed to retrieve user', err })

		res.send(user)
	})
})
