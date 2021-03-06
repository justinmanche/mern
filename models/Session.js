const mongoose = require('mongoose')

const { Schema } = mongoose

const sessionSchema = new Schema({
	session: String,
	session_id: String,
	expire: Date,
})

module.exports = mongoose.model('session', sessionSchema)
