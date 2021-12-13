const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongo, server

beforeAll(async () => {
	server = await MongoMemoryServer.create()
	mongo = await mongoose.connect(server.getUri(), {})
})

afterEach(async () => {
	const collections = mongo.connection.collections

	for (const key in collections) {
		const collection = collections[key]
		await collection.deleteMany()
	}
})

afterAll(async () => {
	if (mongo) {
		await mongo.connection.close()
	}
	if (server) {
		await server.stop()
	}
})
