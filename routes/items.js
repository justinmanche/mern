const express = require('express')
const { requireAuth } = require('./middleware')
const { Item } = require('../models')

const router = express.Router()

module.exports = router

router.get('/', requireAuth, async (req, res) => {
	Item.find({ user: req.user.id }, (err, items) => {
		if (err) return res.status(400).send({ message: 'Failed to retrieve items', err })

		res.send(items)
	})
})

router.get('/:id', requireAuth, (req, res) => {
	Item.findById(req.params.id, async (err, item) => {
		if (err) return res.status(400).send({ message: 'Failed to retrieve item', err })

		res.send(await item.populate('user'))
	})
})

router.post('/', requireAuth, async (req, res) => {
	req.body.user = req.user.id
	const newItem = Item(req.body)

	newItem.save(async (err, savedItem) => {
		if (err) {
			res.status(400).send({ message: 'Create item failed', err })
		} else {
			res.send({ message: 'Item created successfully', item: savedItem })
		}
	})
})

router.put('/complete', requireAuth, (req, res) => {
	Item.findById(req.body.id, { __v: 0, user: 0 }, (err, item) => {
		if (err) {
			res.status(400).send({ message: 'Toggle item failed', err })
		} else {
			item.completed = !item.completed
			item.save((err, savedItem) => {
				if (err) {
					res.status(400).send({ message: 'Toggle item failed', err })
				} else {
					res.send({ message: 'Toggled complete item successfully', item: savedItem })
				}
			})
		}
	})
})

router.patch('/:id', requireAuth, (req, res) => {
	Item.findById(req.params.id, { __v: 0, user: 0 }, (err, item) => {
		if (err) {
			res.status(400).send({ message: 'Update item failed', err })
		} else {
			item.name = req.body.name
			item.content = req.body.content
			item.updated_at = Date.now()
			item.save((err, savedItem) => {
				if (err) {
					res.status(400).send({ message: 'Update item failed', err })
				} else {
					res.send({ message: 'Updated item successfully', item: savedItem })
				}
			})
		}
	})
})

router.delete('/:id', requireAuth, (req, res) => {
	Item.findByIdAndRemove(req.params.id, err => {
		if (err) {
			res.status(400).send({ message: 'Delete item failed', err })
		} else {
			res.send({ message: 'Item successfully delete' })
		}
	})
})
