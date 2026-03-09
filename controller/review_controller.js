const user_review_collection = require("../models/review_model")
const {ObjectId} = require("mongodb")

exports.show_review = async (req,res) =>{
    try{
        const {
            page = 1,
            limit = 6,
        } = req.query

        const limit_num = Number(limit) || 6
        const skip = (page - 1) * limit_num

        const review = await user_review_collection().find().skip(skip).limit(limit_num).toArray()
        const total = await movie_collection().countDocuments()
        const total_pages = Math.ceil(total/limit_num)
        res.status(200).json({review,total_pages})
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.show_review_by_id = async (req,res)=>{
    try{
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            res.status(400).json({
                error:"Invalid Id"
            })
        }

        const review = await user_review_collection().findOne({_id: new ObjectId(id)})
        if(!review){
            return res.status(404).json({
                error: "Review Not Found"
            })
        }

        res.status(200).json(review)
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Server Internal Error"
        })
    }
}

exports.leave_review = async (req,res)=>{
    try{
        const {comment} = req.body
        const user = req.session.user

        if(!comment){
            return res.status("400").json({
                error:"No comments"
            })
        }

        const review_fields = {
            user_id: user.id,
            user_name: user.username,
            comment: comment,
            created_at: new Date(),
            updated_at: null
        }

        const review = await user_review_collection()
        await review.insertOne(review_fields)
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
        const id = req.params.id
        const {comment} = req.body

        if(!ObjectId.isValid(id)){
            return res.status(400).json({
                error: "Invalid Id"
            })
        }

        if(!comment){
            return res.status(400).json({
                error: "No updating"
            })
        }

        const update = {}
        update.comment = comment

        const review = await user_review_collection().updateOne({_id: new ObjectId(id)},{$set: update})
        if(review.matchedCount === 0){
            return res.status(404).json({
                error:"Review Not Found"
            })
        }

        res.status(200).json({
            message: "Updated Successfully"
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
        const id = req.params.id
        if(!ObjectId.isValid(id)){
            return res.status(400).json({
                error:"Invalid Id"
            })
        }

        const review = await user_review_collection().deleteOne({_id: new ObjectId(id)})
        if(review.deletedCount === 0){
            return res.status(404).json({
                error:"Review Not Found"
            })
        }

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