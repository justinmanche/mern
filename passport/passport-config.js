const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const uuid = require('uuid')
const mongoose = require('mongoose')
const { User } = require('../database/schemas')

module.exports = app => {
	const sessionConfig = {
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			collectionName: 'sessions',
		}),
		genid: () => uuid.v4(),
		secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#', //process.env.SESSION_SECRET,
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
