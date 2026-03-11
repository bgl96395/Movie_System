const {getDB} = require("../config/database")

function favorite_cartoons_collection(){
    const database = getDB()
    return database.collection("favorite_cartoons")
}

module.exports = favorite_cartoons_collection