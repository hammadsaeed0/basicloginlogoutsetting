const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const LoginFrom = require("./model/registration");
const bcrypt = require('bcryptjs');
const app = express();
require("./db/conn");

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "hbs");
app.use(express.json());
app.use(urlencoded({extended : false}))
app.get("/",(req , res)=>{
    res.render("index")
})
app.post("/register", async(req , res )=>{
    try {
        
        const saveData = LoginFrom({
            account : req.body.account,
            email : req.body.email,
            name : req.body.firstname,
            password : req.body.password,
            gender : req.body.gender,
           

        });
        const addToken = saveData.generateToken();
       
       
       const savingData = await saveData.save();
        res.status(201).render("index")
    } catch (error) {
        console.log(`${error}`);
        res.status(404).render("index")
        
    }
})

app.get("/login",(req , res)=>{
    res.render("login")
})
app.post("/login", async(req , res )=>{
   
   try {
       const email = req.body.checkemail;
       const password = req.body.checkpassword;
       const checkmail  = await LoginFrom.findOne({email: email});
       const passMatch = bcrypt.compare(password , checkmail.password);
       if (passMatch) {
       res.render("index")
       }else{
       res.status(201).send("Invalid Information")
       }
       
       } catch (error) {
       res.status(404).send("Invalid Login Information")
       } 
       
})

app.listen(port , ()=>{
    console.log(`Listing Form ${port}`);
})

