const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	name: String,
	content: String,
	created_at: { type: Date, default: Date.now, immutable: true },
	updated_at: { type: Date },
})

const privateFields = ['user']

itemSchema.set('toJSON', { virtuals: true })

itemSchema.pre('find', function() {
	console.log(this)
	this.populate('user')
})

module.exports = mongoose.model('item', itemSchema)
