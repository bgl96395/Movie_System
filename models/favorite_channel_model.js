const {getDB} = require("../config/database")

function favorite_channels_collection(){
    const database = getDB()
    return database.collection("favorite_channels")
}

module.exports = favorite_channels_collection