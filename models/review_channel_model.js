const {getDB} = require("../config/database")

function review_channel_collection(){
    const database = getDB()
    return database.collection("review_channels")
}

module.exports = review_channel_collection