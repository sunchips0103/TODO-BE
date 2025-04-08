    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const indexRouter = require("./routes/index");
    const bodyParser = require("body-parser");
    require('dotenv').configDotenv();
    const app = express();
    const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

    app.use(bodyParser.json());
    app.use(cors()); // 모든 요청 허용
    app.use("/api",indexRouter);
    const mongoURI = MONGODB_URI_PROD;

mongoose
    .connect(mongoURI,{useNewUrlParser:true})
    .then(()=> console.log("mongoose connected"))
    .catch((err)=>console.log("DB connection fail",err));

app.listen(process.env.PORT || 5000,()=>{
    console.log("server on 5000");
});
//1.회원가입
// 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
//받은 정보를 저장함(DB 모델필요)
//패스워드를 암호화 시켜서 저장해야함(해킹 방지)

//1. 라우터
//2. 모델 
//3. 데이터를 저장(중복 유저 유무,패스워드 암호화)
//4. 응답을 보낸다.