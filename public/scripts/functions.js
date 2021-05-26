const queries = require('./db/queries');

const moveToInProgress = async (data) => {
    console.log('Functions');
    await queries.moveToInProgress(data)
}