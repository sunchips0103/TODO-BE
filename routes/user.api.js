const express = require("express");
const router = express.Router();
const userController = require('../controllers/user_controller');

//1.회원가입 endpoint
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);//이메일, 패스워드 읽어오려고 post사용 //get은 req.body 사용 x
module.exports=router;