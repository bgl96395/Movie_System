const {MongoClient} = require("mongodb")

const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL)

let database 
async function connectDB(){
    try{
        await client.connect()
        console.log("MongoDB connected")
        database = client.db("MovieSystem")
    }catch(err){
        console.error("Failed to connect MongoDB:",err)
    }
}

function getDB(){
    if(!database){
        throw new Error("Database Not connected")
    }
    return database
}

module.exports = {connectDB,getDB}