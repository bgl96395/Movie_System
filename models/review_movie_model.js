const {getDB} = require("../config/database")

function review_movie_collection(){
    const database = getDB()
    return database.collection("review_movies")
}

module.exports = review_movie_collection