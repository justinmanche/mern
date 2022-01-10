const { merge } = require('webpack-merge')

module.exports = ({ project }) => {
	if (!project) {
		throw 'No matching project was found, please specify "--project [admin, customer]"'
	}

	const common = require('./webpack.common.js')(project)
	const prod = require('./webpack.prod.js')(project)
	const dev = require('./webpack.dev.js')(project)

	return merge(common, process.env.NODE_ENV === 'production' ? prod : dev)
}
