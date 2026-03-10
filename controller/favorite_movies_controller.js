const {ObjectId} = require("mongodb")
const fav_movies_collection = require("../models/favorite_movie_model")
const movie_collection = require("../models/movie_model")

exports.add_favorite = async (req,res)=>{
    try{
        const {movie_id} = req.body
        const user_id = req.session.user.id
        
        if(!ObjectId.isValid(movie_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const favorite_movie = await fav_movies_collection().findOne({user_id,movie_id})
        if(favorite_movie){
            return res.status(400).json({
                error:"Already in favorites"
            })
        }

        await fav_movies_collection().insertOne({user_id,movie_id})
        res.status(201).json({
            message:"Added to favorites Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.get_favorites = async (req,res) =>{
    try{

        const {
            page = 1,
            limit = 6,
        } = req.query

        const user_id =req.session.user.id
        const limit_num = Number(limit) || 6
        const skip = (page - 1) * limit_num

        const favorite_movies = await fav_movies_collection().find({user_id}).toArray()
        const movie_ids = await favorite_movies.map(f => new ObjectId(f.movie_id))

        const total = movie_ids.length
        const total_pages = Math.ceil(total/limit_num)

        const movies = await movie_collection().find({_id: {$in: movie_ids}}).skip(skip).limit(limit_num).toArray()
        res.status(200).json({movies,total_pages})
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.remove_favorite = async (req,res) =>{
    try{
        const movie_id = req.params.movie_id
        const user_id = req.session.user.id

        await fav_movies_collection().deleteOne({user_id,movie_id})
        res.status(200).json({
            message:"Deleted from favorites Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}