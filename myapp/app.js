var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/init', function (req, res) {
  res.send('Hello World init')
})

app.listen(3000, () => {console.log('started at 3000 port')})
