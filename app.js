const express = require('express')
const findCards = require('./db/queries')
const queries = require('./db/queries')

const port = 3000

const app = express()
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const data = await findCards({user: 'Wojtek'})
    res.render('login', {result: data})
})

app.get('/board', (req, res) => {
    res.render('board')
})

app.listen(port)