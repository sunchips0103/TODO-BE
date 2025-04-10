const User = require("../model/user");
const bcrypt = require("bcrypt");
const  saltRounds =10; // 암호화를 몇번 할 것인지

const userController = {}

userController.createUser = async (req,res)=>{
    try{
        const {email,name,password} = req.body;
        if(!email || !name || !password){
            throw new Error("필수 항목 빠짐");
        }
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
        res.status(400).json({status:"fail",error:error.message});
    }
};

userController.loginWithEmail=async(req,res)=>{
    try{
        const{email,password} =req.body;
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");
        if(user){
            const isMath= bcrypt.compareSync(password, user.password); 
            if(isMath){
                const token = user.generateToken();
                return res.status(200).json({status:"success", user, token});
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
    }
    catch(error){
        res.status(400).json({status :"fail",message:error.message});
    }
};

module.exports = userController;

