const {ObjectId} = require("mongodb")
const tv_collection = require("../models/tv-channel_model")

exports.get_channel = async (req,res) => {
    try {
        const {
            page = 1,
            limit = 3,
            category,
            country,
            status
        } = req.query

        const filter = {}

        if(category){
            filter.category = category
        }
        if(country){
            filter.country = country
        }
        if(status){
            filter.status = status
        }

        const limit_num = Number(limit) || 3
        const skip = (page - 1) * limit_num

        const channels = await tv_collection().find(filter).skip(skip).limit(limit_num).toArray()
        const total = await tv_collection().countDocuments(filter)
        const total_pages = Math.ceil(total/limit_num)

        res.status(200).json({channels, total_pages})
    } catch(err){
        res.status(500).json({ error:"Database Error" })
    }
}

exports.get_channel_by_id = async (req,res)=>{
    try{
        const channel_id = req.params.id
        if(!ObjectId.isValid(channel_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const channel = await tv_collection().findOne({_id: new ObjectId(channel_id)})
        if (!channel){
            return res.status(404).json({
                error: "Channel Not Found"
            })
        }

        res.status(200).json(channel)
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.create_channel = async (req,res)=>{
    try{
        const {title,description,launch_year,country,category,status,owner,website,image} = req.body
        if(!title || !description || !launch_year || !country || !category || !status || !owner || !website || !image){
            return res.status(400).json({
                error:"Missed Field(s)"
            })
        }

        await tv_collection().insertOne({title,description,launch_year,category,country,status,owner,website,image})
        res.status(201).json({
            message:"Created Successfully"
        })
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.update_channel = async (req,res)=>{
    try{
        const channel_id = req.params.id
        const {title,description,launch_year,category,country,status,owner,website,image} = req.body

        if(!ObjectId.isValid(channel_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        if(!title && !description && !launch_year && !category && !country && !status && !owner && !website && !image){
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
        if(launch_year){
            updating_fileds.launch_year = launch_year
        }
        if(country){
            updating_fileds.country = country
        }
        if(category){
            updating_fileds.category = category
        }
        if(owner){
            updating_fileds.owner = owner
        }
        if(website){
            updating_fileds.website = website
        }
        if(status){
            updating_fileds.status = status
        }
        if(image){
            updating_fileds.image = image
        }
        
        const channel = await tv_collection().updateOne({_id: new ObjectId(channel_id)}, {$set: updating_fileds})
        if(channel.matchedCount === 0){
            return res.status(404).json({
                error:"Channel Not Found"
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

exports.delete_channel = async (req,res) =>{
    try{
        const channe_id = req.params.id
        if(!ObjectId.isValid(channe_id)){
            return res.status(200).json({
                error:"Invalid ID"
            })
        }

        const channel = await tv_collection().deleteOne({_id: new ObjectId(channe_id)})
        if(channel.deletedCount === 0){
            return res.status(404).json({
                error:"Channel Not Found"
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