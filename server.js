const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/index')
const configPassport = require('./passport-config')
const assetFolder = path.resolve(__dirname, 'frontend/dist/')
const requestLogger = require('./lib/requestLogger')
require('./config/environment')
require('./database')

const corsOptions = {
	origin: function (origin, callback) {
		callback(null, ['http://localhost:8080', 'http://localhost:8081'])
	},
	credentials: true,
	headers: 'Origin, X-Requested-With, Content-Type, Accept',
	optionSuccessStatus: 200
}

const app = express()

app.use(requestLogger)

app.use(cors(corsOptions))
app.use(express.static(assetFolder))
app.use(bodyParser.json())

configPassport(app, express)

app.use('/', routes)

module.exports = app
