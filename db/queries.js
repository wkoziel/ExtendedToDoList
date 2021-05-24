require('./mongoose')
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

const sort_by = (field, reverse, primer) => {

    const key = primer ?
      function(x) {
        return primer(x[field])
      } :
      function(x) {
        return x[field]
      };
  
    reverse = !reverse ? 1 : -1;
  
    return function(a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
  }

const findCards = async (data) => {
    try {
        const cards = await Card.find(data)
        cards.sort(sort_by('column', false, (a) => a.toUpperCase()))
        console.log(cards)
        return cards
    } catch (error) {
        console.log(error);
    }
}


module.exports = {findCards,
    createUser,
    findUser,
    createCard
    }
