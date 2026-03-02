const {getDB} = require("../config/database")

function tv_collection(){
    const database = getDB()
    return database.collection("tv-channels")
}

module.exports = tv_collection