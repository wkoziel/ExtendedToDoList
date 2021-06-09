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

//CHANGE PASSWORD
app.get('/changePassword', (req, res) =>{
    res.render('changePassword', {message: undefined, nick: user})
})

app.post('/changePassword', async (req, res) =>{
    try {
        if(req.body.password === req.body.password2){
            await queries.changePassword({
                user: user,
                password: req.body.password})
            res.render('changePassword', {message: 'Zmiana hasła powiodła się!', nick: user})
        }
        else{
            res.render('changePassword', {message: 'Hasła nie są takie same!', nick: user})
        }
    } catch (error) {
        console.log(error);
        res.render('changePassword', {message: 'Zmiana hasła nie powiodła się!', nick: user})
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
        if (req.body.password === req.body.password2){
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
        }
        else{
            res.render('register', {message: "Hasła nie są takie same!"})
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

// UPDATE CARDS
app.get('/toToDo/:id', async (req, res) => {
    try {
        await queries.moveToToDo(req.params.id)
        res.redirect('/cards')
    } catch (error) {
        console.log(error)
    }
})

app.get('/toInProgress/:id', async (req, res) => {
    try {
        await queries.moveToInProgress(req.params.id)
        res.redirect('/cards')
    } catch (error) {
        console.log(error)
    }
})

app.get('/toDone/:id', async (req, res) => {
    try {
        await queries.moveToDone(req.params.id)
        res.redirect('/cards')
    } catch (error) {
        console.log(error)
    }
})

//DELETE CARD
app.get('/delete/:id', async (req, res) => {
    try {
        await queries.deleteCard(req.params.id)
        res.redirect('/cards')
    } catch (error) {
        console.log(error)
    }
})

app.listen(port)