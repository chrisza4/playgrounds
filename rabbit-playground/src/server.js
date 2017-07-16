const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.post('/todos', async (req, res) => {

})

app.get('/todos', async (req, res) => {

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
