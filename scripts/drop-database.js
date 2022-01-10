const mongoose = require('mongoose')
require('../config/environment')

const env = process.env.NODE_ENV

console.log('ENV:', env)

if (env === 'test' || env === 'development') {
	mongoose.connect(process.env.DATABASE_URL, () => {
		const db = mongoose.connection.db

		console.log('Resetting database:', db.namespace)

		db.dropDatabase()

		console.log('Database reset')
	})

	mongoose.connection.close()
} else {
	console.log('Database can only be reset in development and test environments')
}
