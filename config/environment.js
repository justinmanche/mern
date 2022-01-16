const mongoHost = process.env.MONGODB_HOST || '127.0.0.1'
const mongoPort = process.env.MONGODB_PORT || 27017
const mongoDb = process.env.MONGODB_DB || 'mern'

module.exports = {
	mongo: `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`,
	port: process.env.PORT || 4000,
	sessionSecret: process.env.SESSION_SECRET || 'mern',
	nodeEnv: process.env.NODE_ENV,
	customerDomain: process.env.CUSTOMER_DOMAIN || 'http://localhost:8081',
	adminDomain: process.env.ADMIN_DOMAIN || 'http://localhost:8080'
}
