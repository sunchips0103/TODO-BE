    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const indexRouter = require("./routes/index");
    const bodyParser = require("body-parser");
    const app = express();

    app.use(bodyParser.json());
    app.use(cors()); // 모든 요청 허용
    app.use("/api",indexRouter);


const mongoURI = 'mongodb://localhost:27017/todo-demo'

mongoose.connect(mongoURI,{useNewUrlParser:true}).then(()=>{
    console.log("mongoose connected");
}).catch((err)=>{
    console.log("DB connection fail",err);
});

app.listen(5000,()=>{
    console.log("server on 5000");
});