const {getDB} = require("../config/database")

function review_series_collection(){
    const database = getDB()
    return database.collection("review_series")
}

module.exports = review_series_collection