const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:q12w34ee@cluster0.ktllp.mongodb.net/ToDoApp?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})