const {getDB} = require("../config/database")

function user_review_collection(){
    const database = getDB()
    return database.collection("review")
}

module.exports = user_review_collection