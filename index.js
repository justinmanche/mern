const app = require('./server')
const port = process.env.PORT
const host = process.env.HOST

app.listen(port, host, () => console.log(`Server is listening on port ${host}:${port}`))
