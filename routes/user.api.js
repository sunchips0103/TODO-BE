const express = require("express");
const router = express.Router();
const userController = require('../controllers/user_controller');
const authController = require("../controllers/auth.controller");

//1.회원가입 endpoint
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);//이메일, 패스워드 읽어오려고 post사용 //get은 req.body 사용 x
//토큰을 통해 유저 id뺴내고 => 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me",authController.authenticate,userController.getUser );//함수 여러개 가능, authenticate 성공시 getUser로 감
module.exports=router;