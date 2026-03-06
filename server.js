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

app.get("/movies",(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/movies.html"))
})
app.get("/series",(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/series.html"))
})
app.get("/cartoons",(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/cartoons.html"))
})
app.get("/channels",(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/channels.html"))
})

app.get("/for_movies",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_movies.html"))
})
app.get("/for_series",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_series.html"))
})
app.get("/for_cartoons",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_cartoons.html"))
})
app.get("/for_channels",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_channels.html"))
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
})
app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/register.html"))
})

PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}/movies`)
    })
}).catch((err)=>{
    console.error("Failed to connect MongoDB: ",err)
})