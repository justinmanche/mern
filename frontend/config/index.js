module.exports = {
	apiHost: process.env.NODE_ENV === 'production' ? process.env.API_DOMAIN : 'http://localhost:3000'
}
