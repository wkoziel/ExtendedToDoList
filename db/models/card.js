const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    column:{
        type: Number,
        min: 0,
        max: 3,
        default: 0,
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