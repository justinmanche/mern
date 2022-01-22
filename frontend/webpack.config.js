const { merge } = require('webpack-merge')

module.exports = ({ project }) => {
	if (!project) {
		throw 'No matching project was found, please specify "--project [admin, customer]"'
	}

	const common = require('./webpack.common.js')(project)

	const configExtension = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
	const envConfig = require(`./webpack.${configExtension}.js`)(project)

	return merge(common, envConfig)
}
