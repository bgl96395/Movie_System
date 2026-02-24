const {ObjectId} = require("mongodb")
const movie_collection = require("../models/movie_model")

exports.get_movies = async (req,res) =>{
    try{
        const movie = await movie_collection().find().toArray()
        res.status(200).json(movie)
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.get_movie_by_id = async (req,res)=>{
    try{
        const movie_id = req.params.id
        if(!ObjectId.isValid(movie_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const movie = await movie_collection().findOne({_id: new ObjectId(movie_id)})
        if (!movie){
            return res.status(404).json({
                error: "Movie Not Found"
            })
        }

        res.status(200).json(movie)
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.create_movies = async (req,res)=>{
    try{
        const {title,description,release_date,duration,country,genre,raiting} = req.body
        if(!title || !description || !release_date || !duration || !country || !genre || !raiting){
            return res.status(400).json({
                error:"Missed Field(s)"
            })
        }

        await movie_collection().insertOne({title,description,release_date,duration,country,genre,raiting})
        res.status(201).json({
            message:"Created Successfully"
        })
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.update_movie = async (req,res)=>{
    try{
        const movie_id = req.params.id
        const {title,description,release_date,duration,country,genre,raiting} = req.body

        if(!ObjectId.isValid(movie_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        if(!title && !description && !release_date && !duration && !country && !genre && !raiting){
            return res.status(400).json({
                error:"No Fileds To Update"
            })
        }

        let updating_fileds = {}
        if(title){
            updating_fileds.title = title
        }
        if(description){
            updating_fileds.description = description
        }
        if(duration){
            updating_fileds.duration = duration
        }
        if(country){
            updating_fileds.country = country
        }
        if(genre){
            updating_fileds.genre = genre
        }
        if(raiting){
            updating_fileds.raiting = raiting
        }
        if(release_date){
            updating_fileds.release_date = release_date
        }
        
        const movie = await movie_collection().updateOne({_id: new ObjectId(movie_id)}, {$set: updating_fileds})
        if(movie.matchedCount === 0){
            return res.status(404).json({
                error:"Movie Not Found"
            })
        }

        res.status(200).json({
            message:"Updated Successfully"
        })
    }catch{
        res.status(500).json({
            error:"Database error"
        })
    }
}

exports.delete_movie = async (req,res) =>{
    try{
        const movie_id = req.params.id
        if(!ObjectId.isValid(movie_id)){
            return res.status(200).json({
                error:"Invalid ID"
            })
        }

        const movie = await movie_collection().deleteOne({_id: new ObjectId(movie_id)})
        if(movie.deletedCount === 0){
            return res.status(404).json({
                error:"Movie Not Found"
            })
        }

        res.status(200).json({
            message:"Deleted Successfully"
        })
    }catch{
        res.status(500).json({
            error:"Database error"
        })
    }
}