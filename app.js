const { ObjectID } = require('bson')
const express = require('express')
const findCards = require('./db/queries')
const queries = require('./db/queries')

const port = 3000
let user = ''
const app = express()

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
            res.render('login', {message: "Rejestracja powiodła się!"})
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


app.listen(port)