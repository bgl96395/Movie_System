const {getDB} = require("../config/database")

function series_collection(){
    const database = getDB()
    return database.collection("series")
}

module.exports = series_collection