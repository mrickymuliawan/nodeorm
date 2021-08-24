const express = require('express')
const app = express()

const db = require('./sequlizeconfig')
db.sequelizeConnection.sync()

app.use(express.json())

const routes = require('./routes')
app.use(routes)

app.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  })
})

app.listen(3000, () => {
  console.log('server is listening')
})