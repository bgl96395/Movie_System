const {ObjectId} = require("mongodb")
const review_series_collection = require("../models/review_series_model")
const series_collection = require("../models/series_model")

exports.show_review = async (req,res) =>{
    try{
        const {series_id} = req.params
        const review_series = await review_series_collection().find({series_id}).toArray()
        res.status(200).json(review_series)
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
        const {series_id} = req.params
        const user = req.session.user

        if(!comment){
            return res.status(400).json({
                error:"Field must be filled"
            })
        }

        const review = {
            user_id:user.id,
            series_id: series_id,
            firstname: user.firstname,
            lastname: user.lastname,
            comment: comment,
            created_at: new Date()
        }

        const series = await series_collection().findOne({_id: new ObjectId(series_id)})
        if(!series){
            return res.status(404).json({
                error:"Movie not found"
            })
        }
        await review_series_collection().insertOne(review)
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
        const {id, series_id} = req.params
        const user_id = req.session.user.id

        if(!comment){
            return res.status(400).json({
                error:"Nothing to update"
            })
        }

        const exist = await series_collection().findOne({_id: new ObjectId(series_id)})
        if(!exist){
            return res.status(404).json({
                error:"Series not found"
            })
        }

        const review = await review_series_collection().findOne({_id:new ObjectId(id)})
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

        await review_series_collection().updateOne({_id:new ObjectId(id)},{$set:{comment}})
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
        const {id, series_id} = req.params
        const user_id = req.session.user.id

        const exist = await series_collection().findOne({_id: new ObjectId(series_id)})
        if(!exist){
            return res.status(404).json({
                error:"Series not found"
            })
        }

        const review = await review_series_collection().findOne({_id:new ObjectId(id)})
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

        await review_series_collection().deleteOne({_id: new ObjectId(id)})
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