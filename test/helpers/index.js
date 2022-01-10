const express = require('express')
const request = require('supertest')
const requestLogger = require('../../lib/requestLogger')
const userFactory = require('../factories/user')
const User = require('../../models/User')
const { once } = require('events')

const port = 3465
const host = 'localhost'

module.exports = {
	createServer: async () => {
		const bodyParser = require('body-parser')
		const routes = require('../../routes/index')
		const configPassport = require('../../passport-config')
		require('../../config/environment')

		const app = express()

		app.use(requestLogger)
		app.use(bodyParser.json())

		configPassport(app, express)

		app.use('/', routes)

		const server = app.listen(port, host, () => console.log(`Server is listening on port ${host}:${port}`))

		await once(server, 'listening')

		return server
	},
	getAgent: () => request.agent(`http://${host}:${port}`),
	authenticate: async (agent, user = userFactory.build()) => {
    const req = await agent.post('/api/register').send(user)

		const createdUser = await User.findByUsername(req.body.user.username)

		return createdUser.toJSON()
	}
}
