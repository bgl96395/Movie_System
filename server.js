require("dotenv").config()
const express = require("express")
const path = require("path")
const session = require("express-session")

const {connectDB} = require("./config/database")
const session_config = require("./config/session")

const auth_middleware = require("./middleware/authentification_middleware")
const logger = require("./middleware/logger_middleware")

const movie_route = require("./routes/movie_route")
const series_route = require("./routes/series_route")
const cartoon_route = require("./routes/cartoon_route")
const channel_route = require("./routes/tv-channel_route")
const authentification_route = require("./routes/authentification_route")
const review_route = require("./routes/review_route")
const fav_movies = require("./routes/favorite_movies_route")
const fav_series = require("./routes/favorite_series_route")
const fav_cartoons = require("./routes/favorite_cartoons_route")
const fav_channels = require("./routes/favorite_channels_route")
const review_movie = require("./routes/review_movie_route")
const review_series = require("./routes/review_series_route")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(session(session_config))
app.use(logger)

app.use(movie_route)
app.use(series_route)
app.use(cartoon_route)
app.use(channel_route)
app.use(authentification_route)
app.use(review_route)
app.use(fav_movies)
app.use(fav_series)
app.use(fav_cartoons)
app.use(fav_channels)
app.use(review_movie)
app.use(review_series)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
})
app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/register.html"))
})

app.get("/movies",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/movies.html"))
})
app.get("/series",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/series.html"))
})
app.get("/cartoons",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/cartoons.html"))
})
app.get("/channels",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/channels.html"))
})

app.get("/for_movies",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_movies.html"))
})
app.get("/for_series",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_series.html"))
})
app.get("/for_cartoons",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_cartoons.html"))
})
app.get("/for_channels",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/for_channels.html"))
})

app.get("/about",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/about.html"))
})
app.get("/review",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/review.html"))
})

app.get("/favorites",auth_middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/favorites.html"))
})

app.get("/api/user",(req,res)=>{
    if(req.session.user && req.session.user.role){
        res.json({
            id: req.session.user.id,
            role: req.session.user.role,
            username: req.session.user.username,
            firstname: req.session.user.firstname,
            lastname: req.session.user.lastname
        })
    }
    else{
        res.json({
            id:null,
            role:null,
            username:null,
            firstname: null,
            lastname: null
        })
    }
})

app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"/views/404.html"))
})

PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.error("Failed to connect MongoDB: ",err)
})