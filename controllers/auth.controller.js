const authController = {};
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").configDotenv();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
authController.authenticate =(req,res,next) =>{
    try{
        const tokenString = req.headers.authorization //토큰값 = Bearer ~sadffsad
        if(!tokenString){
            throw new Error("invalid token")
        }
        const token = tokenString.replace("Bearer ","");
        jwt.verify(token, JWT_SECRET_KEY, (error,payload)=>{
            if(error){
                throw new Error("invalid token");
            }
            req.userId = payload._id;
            next();

          //  res.status(200).json({status:"success",userId:payload._id}) //유저id 
        });

    }catch(error){
        res.status(400).json({status:"fail",message: error.message});
    }
}

module.exports = authController;

//미들웨어
