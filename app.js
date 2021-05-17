const mongoClient = require('mongodb').MongoClient
const idObject = require('mongodb').ObjectID

const url = 'mongodb://127.0.0.1:27017'
const dbname = 'mongo-test'

mongoClient.connect(url, {}, (error, client) => {
    if (error)  console.log('Connection faild!')

    const db = client.db(dbname)

    const id = new ObjectID()

    db.collection('users').insertOne({
        _id: id,
        name: 'Wojtek',
        age: 24
    }, (error, result) => {
        if (error)  console.log('Adding user error', error)

        console.log(result.ops)
    })

    // db.collection('users').find({
    //     name: 'Wojtek'
    // }).toArray((error, result) => {
    //     console.log(result)
    // })

    // db.collection('users').updateOne({
    //     age: 24
    // }, {
    //     $set: {
    //         age: 23
    //     }
    // })

    console.log("Database connection is ok")
})