const { Factory } = require('fishery')
const userFactory = require('./user')
const Item = require('../../models/Item')

module.exports = Factory.define(async ({ onCreate, params }) => {
	onCreate(async item => Item.create(await item))

	const user = params.user || await userFactory.create({ type: 'admin' })

	return {
		user: user.id,
		name: 'Item',
		content: 'Some item content'
	}
})
