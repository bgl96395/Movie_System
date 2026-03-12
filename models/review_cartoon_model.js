const {getDB} = require("../config/database")

function review_cartoon_collection(){
    const database = getDB()
    return database.collection("review_cartoons")
}

module.exports = review_cartoon_collection