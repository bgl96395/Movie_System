const {ObjectId} = require("mongodb")
const review_movie_collection = require("../models/review_movie_model")
const movie_collection = require("../models/movie_model")

exports.show_review = async (req,res) =>{
    try{
        const {movie_id} = req.params
        const review_movies = await review_movie_collection().find({movie_id}).toArray()
        res.status(200).json(review_movies)
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.create_review = async (req,res)=>{
    try{
        const {comment} = req.body
        const {movie_id} = req.params
        const user = req.session.user

        if(!comment){
            return res.status(400).json({
                error:"Field must be filled"
            })
        }

        const review = {
            user_id:user.id,
            movie_id: movie_id,
            firstname: user.firstname,
            lastname: user.lastname,
            comment: comment,
            created_at: new Date()
        }

        const movie = await movie_collection().findOne({_id: new ObjectId(movie_id)})
        if(!movie){
            return res.status(404).json({
                error:"Movie not found"
            })
        }
        await review_movie_collection().insertOne(review)
        res.status(201).json({
            message:"Created Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.update_review = async (req,res) =>{
    try{
        const {comment} = req.body
        const {id, movie_id} = req.params
        const user_id = req.session.user.id

        if(!comment){
            return res.status(400).json({
                error:"Nothing to update"
            })
        }

        const exist = await movie_collection().findOne({_id: new ObjectId(movie_id)})
        if(!exist){
            return res.status(404).json({
                error:"Movie not found"
            })
        }

        const review = await review_movie_collection().findOne({_id:new ObjectId(id)})
        if(!review){
            return res.status(404).json({
                error:"Review not found"
            })
        }

        if(review.user_id !== user_id){
            return res.status(403).json({
                error:"Not allowed"
            })
        }

        await review_movie_collection().updateOne({_id:new ObjectId(id)},{$set:{comment}})
        res.status(200).json({
            message:"Updated Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.delete_review = async (req,res)=>{
    try{
        const {id, movie_id} = req.params
        const user_id = req.session.user.id

        const exist = await movie_collection().findOne({_id: new ObjectId(movie_id)})
        if(!exist){
            return res.status(404).json({
                error:"Movie not found"
            })
        }

        const review = await review_movie_collection().findOne({_id:new ObjectId(id)})
        if(!review){
            return res.status(404).json({
                error:"Review not found"
            })
        }

        if(review.user_id !== user_id && req.session.user.role !== "admin"){
            return res.status(403).json({
                error:"Not allowed"
            })
        }

        await review_movie_collection().deleteOne({_id: new ObjectId(id)})
        res.status(200).json({
            message:"Deleted Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}