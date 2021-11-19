const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')

module.exports = {
	localStrategy: new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) { return done(err) }
			if (!user) {
				return done(null, false, { message: 'Username doesn\'t exist' })
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect username or password' })
			}
			return done(null, user)
		})
	})
}
