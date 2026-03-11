const {getDB} = require("../config/database")

function favorite_series_collection(){
    const database = getDB()
    return database.collection("favorite_series")
}

module.exports = favorite_series_collection