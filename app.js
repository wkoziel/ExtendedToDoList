const express = require('express')
const port = 3000

const app = express()
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/board', (req, res) => {
    res.render('board')
})
app.listen(port)