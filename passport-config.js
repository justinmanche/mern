const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const uuid = require('uuid')
const mongoose = require('mongoose')
const { User } = require('./models')
const { sessionSecret } = require('./config')

module.exports = app => {
	const sessionConfig = {
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			collectionName: 'sessions',
		}),
		genid: () => uuid.v4(),
		secret: sessionSecret,
		resave: false,
		saveUninitialized: true,
	}

	app.use(session(sessionConfig))
	app.use(passport.initialize())
	app.use(passport.session())

	passport.use(User.createStrategy())
	passport.serializeUser(User.serializeUser())
	passport.deserializeUser(User.deserializeUser())
}
