const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const { stripDefaultFields } = require('./shared')

const userSchema = new Schema({
	username: String,
	password: { type: String, select: false },
	firstName: String,
	surname: String,
	type: { type: String, required: true, enum: ['customer', 'admin'] }
})

userSchema.set('toJSON', {
	virtuals: true,
	transform: (doc, record, options) => {
		stripDefaultFields(record)
	}
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)
