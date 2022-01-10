const url = require('url')

const requestLogger = (req, res, next) => {
	const fullUrl = url.format({
		protocol: req.protocol,
		host: req.get('host'),
		pathname: req.originalUrl
	})
	const time = new Date()
	const method = req.method

	console.log(`${time}: ${method} ${fullUrl}`)

	next()
}

module.exports = requestLogger
