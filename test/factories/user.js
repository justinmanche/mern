const { Factory } = require('fishery')
const User = require('../../models/User')

module.exports = Factory.define(({ sequence, onCreate }) => {
	onCreate(user => User.create(user))

	return {
		username: `user_${sequence}@example.com`,
		firstName: 'Bob',
		surname: 'Squarepants',
		type: 'customer',
		password: 'password'
	}
})
