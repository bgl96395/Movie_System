require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})