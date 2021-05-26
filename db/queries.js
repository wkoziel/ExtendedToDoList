require('./mongoose')
const obiectid = require('mongodb').ObjectID
const User = require('./models/user');
const Card = require('./models/card')


//USER
const createUser = async (data) => {
    try{
        const user = new User(data)
        await user.save()
        console.log(`Created ${user}`)
        return user
    } catch (error) {
        console.error(error);
    }
}

const findUser = async (data) => {
    try{
        const user = await User.findOne(data)
        return user
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async () => {
    try {
        const users = await User.find({}) 
        console.log(users);
        return users
    } catch (error) {
        console.log(error);
    }
}

//CARDS
const createCard = async (data) =>{
    try {
        const card = new Card(data)
        await card.save()
        console.log(`Created: ${card}`)
        return card
    } catch (error) {
        console.log(error)
    }
}

const findCards = async (data) => {
    try {
        const cards = await Card.find(data)
        cards.sort((a, b) => parseFloat(a.column) - parseFloat(b.column));
        return cards
    } catch (error) {
        console.log(error);
    }
}

const moveToToDo = async (data) => {
    try {
        id = obiectid.ObjectID(data)
        await Card.updateOne({_id: id}, {$set : {column: 1}})
    } catch (error) {
        console.log(error);
    }
}

const moveToInProgress = async (data) => {
    try {
        id = obiectid.ObjectID(data)
        await Card.updateOne({_id: id}, {$set : {column: 2}})
    } catch (error) {
        console.log(error);
    }
}

const moveToDone = async (data) => {
    try {
        id = obiectid.ObjectID(data)
        await Card.updateMany({_id: id}, {$set : {column: 3}})
    } catch (error) {
        console.log(error);
    }
}

const deleteCard = async (data) => {
    try {
        id = obiectid.ObjectID(data)
        await Card.deleteOne({_id: id})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {findCards,
    createUser,
    findUser,
    createCard,
    moveToInProgress,
    moveToToDo,
    moveToDone,
    deleteCard
    }
