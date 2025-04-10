    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const indexRouter = require("./routes/index");
    const bodyParser = require("body-parser");
    require('dotenv').config();
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


/* 1.회원가입
 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
받은 정보를 저장함(DB 모델필요)
패스워드를 암호화 시켜서 저장해야함(해킹 방지)

1. 라우터
2. 모델 
3. 데이터를 저장(중복 유저 유무,패스워드 암호화)
4. 응답을 보낸다. */

/* 2. 로그인
    이메일 패스워드를 입력해서 보냄
    데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
    없으면 로그인 실패
    있다면 유저정보 + 토큰
    프론트엔드에서는 이 정보를 저장

    1. 라우터
    2. 이메일 패스워드 정보 읽어오기
    3. 이메일을 가지고 유저정보 가져오기
    4. 이 유저에 DB에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
    5. 토큰 발행
    6. 틀리면 에러메세지 
    7. 응답으로 유저정보 + 토큰 보냄 

 */
/*     토큰 : 세션토큰, JWT 토큰
        세션토큰 : 서버와 클라 둘다 티켓 정보 가짐 *사람이 많을수록 서버에서 저장 부담
        JWT토큰 : 서버에서 클라에게 토큰 발급 후 정보 저장x *토큰 해킹 문제 ->너무 많은 유저 정보 토큰에 넣지 않는다, 복잡한 시크릿키 사용, 자주 새로 발급 */