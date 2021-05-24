const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    column:{
        type: String,
        default: 'todo'
    },
    text:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card