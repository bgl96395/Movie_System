const {getDB} = require("../config/database")

function user_collection(){
    const database = getDB()
    return database.collection("users")
}

module.exports = user_collection