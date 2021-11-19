const express = require('express')
const path = require('path')
const auth = require('./auth')
const user = require('./user')
const users = require('./users')
const items = require('./items')
const router = express.Router()

router.use('/api', auth)
router.use('/api/user', user)
router.use('/api/users', users)
router.use('/api/items', items)

router.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
})

module.exports = router
