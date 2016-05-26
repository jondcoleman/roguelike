const express = require('express')
const app = express()
const path = require('path')

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.use('/css', express.static(__dirname + '/css'))
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/img', express.static(__dirname + '/img'))
app.use('/resources', express.static(__dirname + '/resources'))

const port = process.env.PORT || 3000

app.listen(port)
