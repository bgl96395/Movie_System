const {getDB} = require("../config/database")

function favorite_movies_collection(){
    const database = getDB()
    return database.collection("favorite_movies")
}

module.exports = favorite_movies_collection