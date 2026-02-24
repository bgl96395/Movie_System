const {getDB} = require("../config/database")

function movie_collection(){
    const database = getDB()
    return database.collection("movies")
}

module.exports = movie_collection