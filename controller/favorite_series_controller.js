const {ObjectId} = require("mongodb")
const fav_series_collection = require("../models/favorite_series_model")
const series_collection = require("../models/series_model")

exports.add_favorite = async (req,res)=>{
    try{
        const {series_id} = req.body
        const user_id = req.session.user.id
        
        if(!ObjectId.isValid(series_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const favorite_seires = await fav_series_collection().findOne({user_id,series_id})
        if(favorite_seires){
            return res.status(400).json({
                error:"Already in favorites"
            })
        }

        await fav_series_collection().insertOne({user_id,series_id})
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

        const favorite_series = await fav_series_collection().find({user_id}).toArray()
        const series_ids = await favorite_series.map(f => new ObjectId(f.series_id))

        const total = series_ids.length
        const total_pages = Math.ceil(total/limit_num)

        const series = await series_collection().find({_id: {$in: series_ids}}).skip(skip).limit(limit_num).toArray()
        res.status(200).json({series,total_pages})
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.remove_favorite = async (req,res) =>{
    try{
        const series_id = req.params.series_id
        const user_id = req.session.user.id

        await fav_series_collection().deleteOne({user_id,series_id})
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

exports.checking = async (req,res) =>{
    try{
        const user_id = req.session.user.id
        const series_id = req.params.series_id

        if(!ObjectId.isValid(series_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const favorite = await fav_series_collection().findOne({user_id,series_id})
        res.status(200).json({
            is_favorite: !!favorite
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}