const mongoose = require('mongoose')
const { nodeEnv, mongo } = require('../config')

if (nodeEnv === 'test' || nodeEnv === 'development') {
	mongoose.connect(mongo, () => {
		const db = mongoose.connection.db

		console.log('Resetting database:', db.namespace)

		db.dropDatabase()

		console.log('Database reset')
	})

	mongoose.connection.close()
} else {
	console.log('Database can only be reset in development and test environments')
}
