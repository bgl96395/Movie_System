const bcrypt = require("bcryptjs")
const user_collection = require("../models/user_model")

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.redirect("/login?error=Invalid%20credentials")
        }

        const users = user_collection()

        const user= await users.findOne({email})
        if(!user){
            return res.redirect("/login?error=Invalid%20credentials")
        }

        const is_match = await bcrypt.compare(password, user.password)

        if(!is_match){
            return res.redirect("/login?error=Invalid%20credentials")
        }

        req.session.user = {
            id: user._id.toString(),
            username: user.username,
            role: user.role
        }

        res.redirect("/movies")
    }catch(err){
        console.log(err)
        res.status(500).send("Server Internal Error")
    }
}

exports.register = async (req,res) =>{
    try{
        const {firstname,lastname,email,username,password} = req.body

        if(!firstname || !lastname || !email || !username || !password){
            return res.redirect("/register?error=Invalid%20credentials")
        }

        const users = user_collection()

        let user = await users.findOne({username: username})
        let email_of = await users.findOne({email: email})
        if(user || email_of){
            return res.redirect("/register?error=Invalid%20credentials")
        }

        const hashed_password = await bcrypt.hash(password,12)

        await users.insertOne({firstname,lastname,email,username,password:hashed_password,role:"user"})
        res.redirect("/login?success=Registration%20successfully%20done")
    }catch(err){
        console.log(err)
        res.status(500).send("Server Internal Error")
    }
}

exports.logout = async (req,res)=>{
    try{
        req.session.destroy((err)=>{
            if(err) throw err
            res.redirect("/login")
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Internal Error")
    }
}