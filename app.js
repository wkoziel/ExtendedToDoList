require('./db/mongoose')
const User = require('./db/models/user');

const createUser = async (data) => {
    try{
        const user = new User(data)
        await user.save()
        console.log(`Created ${user}.`)
    } catch (error) {
        console.log(error);
    }
}

const findUser = async (data) => {
    try{
        const user = User.find({data})
    } catch (error) {
        console.log(error);
    }
}

createUser({
    name: 'Wojtek',
    password: '1234'
})