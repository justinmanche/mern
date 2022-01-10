const mongoose = require('mongoose')
const { Schema } = mongoose
const { stripDefaultFields } = require('./shared')

const itemSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user', select: false },
	name: String,
	content: String,
	created_at: { type: Date, default: Date.now, immutable: true },
	updated_at: { type: Date },
})

itemSchema.set('toJSON', {
	virtuals: true,
	transform: (doc, record, options) => {
		stripDefaultFields(record)
	}
})

itemSchema.static('admin', function() {
	return this.populate('user')
})

itemSchema.static('findByName', function(name) {
	return this.find({ name })
})

module.exports = mongoose.model('item', itemSchema)
