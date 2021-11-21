const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./config/environment')
require('./database')

const routes = require('./routes/index')
const configPassport = require('./passport/passport-config')

const assetFolder = path.resolve(__dirname, 'frontend/dist/')
const port = process.env.PORT
const app = express()

const corsOptions = {
	origin: 'http://localhost:8080',
	credentials: true,
	headers: 'Origin, X-Requested-With, Content-Type, Accept',
	optionSuccessStatus: 200
}
app.use((req, res, next) => {
	const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081']
	const origin = req.headers.origin
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin)
	}
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Credentials', true)
	return next()
})

app.use(express.static(assetFolder))
app.use(bodyParser.json())

configPassport(app, express)

app.use('/', routes)

app.listen(port, () => console.log(`Server is listening on port ${port}`))
