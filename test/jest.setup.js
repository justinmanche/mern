const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongo, server

beforeAll(async () => {
	if (mongoose.connection.getClient()) {
		throw 'Mongoose connection already established'
	}
	server = await MongoMemoryServer.create()
	mongo = await mongoose.connect(server.getUri(), {})
})

// Use this to clear the database between tests
//
// afterEach(async () => {
// 	const collections = mongo.connection.collections
//
// 	for (const key in collections) {
// 		const collection = collections[key]
// 		await collection.deleteMany()
// 	}
// })

afterAll(async () => {
	if (mongo) {
		await mongo.connection.close()
	}
	if (server) {
		await server.stop()
	}
})
