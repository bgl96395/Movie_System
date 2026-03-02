const {ObjectId} = require("mongodb")
const series_collection = require("../models/series_model")

exports.get_series = async (req,res) =>{
    try{
        const series = await series_collection().find().toArray()
        res.status(200).json(series)
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.get_series_by_id = async (req,res)=>{
    try{
        const series_id = req.params.id
        if(!ObjectId.isValid(series_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const series = await series_collection().findOne({_id: new ObjectId(series_id)})
        if (!series){
            return res.status(404).json({
                error: "Series Not Found"
            })
        }

        res.status(200).json(series)
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.create_series = async (req,res)=>{
    try{
        const {title,description,release_date,number_of_episods,country,genre,raiting} = req.body
        if(!title || !description || !release_date || !number_of_episods || !country || !genre || !raiting){
            return res.status(400).json({
                error:"Missed Field(s)"
            })
        }

        await series_collection().insertOne({title,description,release_date,number_of_episods,country,genre,raiting})
        res.status(201).json({
            message:"Created Successfully"
        })
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.update_series = async (req,res)=>{
    try{
        const series_id = req.params.id
        const {title,description,release_date,number_of_episods,country,genre,raiting} = req.body

        if(!ObjectId.isValid(series_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        if(!title && !description && !release_date && !number_of_episods && !country && !genre && !raiting){
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
        if(number_of_episods){
            updating_fileds.number_of_episods = number_of_episods
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
        
        const series = await series_collection().updateOne({_id: new ObjectId(series_id)}, {$set: updating_fileds})
        if(series.matchedCount === 0){
            return res.status(404).json({
                error:"Series Not Found"
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

exports.delete_series = async (req,res) =>{
    try{
        const series_id = req.params.id
        if(!ObjectId.isValid(series_id)){
            return res.status(200).json({
                error:"Invalid ID"
            })
        }

        const series = await series_collection().deleteOne({_id: new ObjectId(series_id)})
        if(series.deletedCount === 0){
            return res.status(404).json({
                error:"Series Not Found"
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