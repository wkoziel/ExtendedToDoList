const express = require('express')
const findCards = require('./db/queries')
const queries = require('./db/queries')

const port = 3000

const app = express()
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    let cards = findCards({user: 'Wojtek'}).then((value) =>
    console.log(`App: ${value}`)) //Zobacz jak zrobił wyszukiwanie do tablicy ten koleś
    res.render('login', {results: cards})
})

app.get('/board', (req, res) => {
    res.render('board')
})
app.listen(port)