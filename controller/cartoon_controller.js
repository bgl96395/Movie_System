const {ObjectId} = require("mongodb")
const cartoon_collection = require("../models/cartoon_model")

exports.get_cartoons = async (req,res) => {
    try {
        const {
            page = 1,
            limit = 6,
            genre,
            country,
            year,
            rating
        } = req.query

        const filter = {}

        if(genre){
            filter.genre = { $in:[genre] }
        }
        if(country){
            filter.country = { $in:[country] }
        }
        if(year){
            if(year === "before_1980"){
                filter.release_year = { $lte:1980 }
            } else {
                filter.release_year = Number(year)
            }
        }
        if(rating){
            const [min,max] = rating.split("-").map(Number) 
            filter.rating = {$gte:min,$lte:max}
        }

        const limit_num = Number(limit) || 6
        const skip = (page - 1) * limit_num

        const cartoons = await cartoon_collection().find(filter).skip(skip).limit(limit_num).toArray()
        const total = await cartoon_collection().countDocuments(filter)
        const total_pages = Math.ceil(total/limit_num)

        res.status(200).json({cartoons, total_pages})
    } catch(err){
        res.status(500).json({ error:"Database Error" })
    }
}

exports.get_cartoon_by_id = async (req,res)=>{
    try{
        const cartoon_id = req.params.id
        if(!ObjectId.isValid(cartoon_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const cartoon = await cartoon_collection().findOne({_id: new ObjectId(cartoon_id)})
        if (!cartoon){
            return res.status(404).json({
                error: "Cartoon Not Found"
            })
        }

        res.status(200).json(cartoon)
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.create_cartoon = async (req,res)=>{
    try{
        const {title,description,release_year,number_of_episods,country,genre,rating,main_characters,style,image} = req.body
        if(!title || !description || !release_year || !number_of_episods || !country || !genre || !rating || !main_characters || !style || !image){
            return res.status(400).json({
                error:"Missed Field(s)"
            })
        }

        await cartoon_collection().insertOne({title,description,release_year,number_of_episods,country,genre,rating,main_characters,style,image})
        res.status(201).json({
            message:"Created Successfully"
        })
    }catch{
        res.status(500).json({
            error:"Database Error"
        })
    }
}

exports.update_cartoon = async (req,res)=>{
    try{
        const cartoon_id = req.params.id
        const {title,description,release_year,number_of_episods,country,genre,rating,main_characters,style,image} = req.body

        if(!ObjectId.isValid(cartoon_id)){
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        if(!title && !description && !release_year && !number_of_episods && !country && !genre && !rating && !main_characters && !style && !image){
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
        if(rating){
            updating_fileds.rating = rating
        }
        if(release_year){
            updating_fileds.release_year = release_year
        }
        if(main_characters){
            updating_fileds.main_characters = main_characters
        }
        if(style){
            updating_fileds.style = style
        }
        if(image){
            updating_fileds.image = image
        }
        
        const cartoon = await cartoon_collection().updateOne({_id: new ObjectId(cartoon_id)}, {$set: updating_fileds})
        if(cartoon.matchedCount === 0){
            return res.status(404).json({
                error:"Cartoon Not Found"
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

exports.delete_cartoon = async (req,res) =>{
    try{
        const cartoon_id = req.params.id
        if(!ObjectId.isValid(cartoon_id)){
            return res.status(200).json({
                error:"Invalid ID"
            })
        }

        const cartoon = await cartoon_collection().deleteOne({_id: new ObjectId(cartoon_id)})
        if(cartoon.deletedCount === 0){
            return res.status(404).json({
                error:"Cartoon Not Found"
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