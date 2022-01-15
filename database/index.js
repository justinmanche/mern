const mongoose = require('mongoose')
const { mongo } = require('../config')

mongoose.Promise = global.Promise

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

console.log('Mongo:', mongo)

mongoose.connect(mongo, options)
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database:', err.message))
