require("dotenv").config()
const express = require("express")
const path = require("path")

const {connectDB} = require("./config/database")

const logger = require("./middleware/logger_middleware")

const movie_route = require("./routes/movie_route")
const series_route = require("./routes/series_route")
const cartoon_route = require("./routes/cartoon_route")
const channel_route = require("./routes/tv-channel_route")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(logger)

app.use(movie_route)
app.use(series_route)
app.use(cartoon_route)
app.use(channel_route)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.error("Failed to connect MongoDB: ",err)
})