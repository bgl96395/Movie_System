const {getDB} = require("../config/database")

function cartoons_collection(){
    const database = getDB()
    return database.collection("cartoons")
}

module.exports = cartoons_collection