const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/login-form", {useCreateIndex: true , useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log(`Here is Some Error ${e}`);
});