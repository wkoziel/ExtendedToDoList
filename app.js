//REQUIRE
const express = require('express')
const queries = require('./db/queries')

//VARIABLES
const port = 3000
let user = 'wojtek'
const app = express()

//SETUP
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))

//REDIRECT
app.get('/', (req, res) => {
    res.redirect('/login')
})

// LOGIN
app.get('/login', (req, res) => {
    res.render('login', {message: ""})
})

app.post('/login', async (req, res) => {
    try {
        const login = await queries.findUser({
            name: req.body.name,
            password: req.body.password
        })

        if (login){
            user = req.body.name
            res.redirect('/cards')
        } 
        else
            res.render('login', {message: "Logowanie nie powiodło się"})

    } catch (error) {
        console.error(error)
        res.render('login', {message: "Logowanie nie powiodło się"})
    }
})

//LOGOUT
app.get('/logout', (req, res) =>{
    user = ''
    res.redirect('/login')
})

// REGISTER
app.get('/register', (req, res) => {
    res.render('register', {message: undefined} )
})

app.post('/register', async (req, res) =>{
    try {
        const newUser = await queries.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        if (newUser) {
            res.render('login', {message: "Zarejestrowano pomyślnie!"})
        } else {
            res.render('register', {message: "Rejestracja nie powiodła się!"})
        }
        
    } catch (error) {
        console.log(error)
        res.render('register', {message: "Rejestracja nie powiodła się!"})
    }
})

//CARDS
app.get('/cards', async (req, res) => {
    if (user === '') res.redirect('/login')
    const cards = await queries.findCards({name: user})
    res.render('cards', {cards: cards, user: user})
})

//ADD CARD
app.get('/addCard', async (req, res) =>{
    res.render('addCard', {message: undefined})
})

app.post('/addCard', async (req, res) =>{
    if (user === '') res.redirect('/login')
    try {
        const card = await queries.createCard({
            name: user,
            text: req.body.text,
            date: req.body.date
        })
        if (card){
            res.render('addCard', {message: 'Zdanie zostało dodane'})
        } else {
            res.render('addCard', {message: 'Nie udało się utworzyć zadania'})
        }
    } catch (e) {
        console.error(e)
        res.render('addCard', {message: 'Nie udało się utworzyć zadania'})
    }
})


app.listen(port)