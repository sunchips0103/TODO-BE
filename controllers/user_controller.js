const User = require("../model/user");
const bcrypt = require("bcrypt");
const  saltRounds =10; // 암호화를 몇번 할 것인지

const userController = {}

userController.createUser = async (req,res)=>{
    try{
        const {email,name,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Error("이미 가입된 유저");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({email,name,password:hash})
        await newUser.save();
        res.status(200).json({status:"success"})
   
        
    }catch(error){
        res.status(400).json({status:"fail",error});
    }
};

module.exports = userController;