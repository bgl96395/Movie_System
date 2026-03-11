const {ObjectId} = require("mongodb")
const fav_channels_collection = require("../models/favorite_channel_model")
const channel_collection = require("../models/tv-channel_model")

exports.add_favorite = async (req,res)=>{
    try{
        const {channel_id} = req.body
        const user_id = req.session.user.id
        
        if(!ObjectId.isValid(channel_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const favorite_channel = await fav_channels_collection().findOne({user_id,channel_id})
        if(favorite_channel){
            return res.status(400).json({
                error:"Already in favorites"
            })
        }

        await fav_channels_collection().insertOne({user_id,channel_id})
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
            limit = 3,
        } = req.query

        const user_id =req.session.user.id
        const limit_num = Number(limit) || 3
        const skip = (page - 1) * limit_num

        const favorite_channels = await fav_channels_collection().find({user_id}).toArray()
        const channel_ids = await favorite_channels.map(f => new ObjectId(f.channel_id))

        const total = channel_ids.length
        const total_pages = Math.ceil(total/limit_num)

        const channels = await channel_collection().find({_id: {$in: channel_ids}}).skip(skip).limit(limit_num).toArray()
        res.status(200).json({channels,total_pages})
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.remove_favorite = async (req,res) =>{
    try{
        const channel_id = req.params.channel_id
        const user_id = req.session.user.id

        await fav_channels_collection().deleteOne({user_id,channel_id})
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
        const channel_id = req.params.channel_id

        if(!ObjectId.isValid(channel_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const favorite = await fav_channels_collection().findOne({user_id,channel_id})
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