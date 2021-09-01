const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dataSetting = new mongoose.Schema({
    account:{
        type : String,
        require : true
    }, 
    email:{
        type : String,
        require : true,
        unique : true
    },
    name:{
        type : String,
        require : true
    },
    password:{
        type : String,
        require : true
    },
    gender: {
        type : String,
        require : true
    }, 
    tokens : [
        {
           token:{
            type : String,
            require : true 
           } 
        }
    ]
});

dataSetting.methods.generateToken = async function () {
    try {
        
        const token = jwt.sign({_id: this._id.toString()}, "mynameishammadsaeeditrytolearnmernstackdevelopment");
        
        this.tokens = this.tokens.concat({token : token})
        await this.save();
        console.log(`${this.tokens}`);
        return token
    } catch (error) {
        console.log(`${error}`);
    }
}

dataSetting.pre("save" , async function (next) {
 
   if (this.isModified("password")) {
       this.password = await bcrypt.hash(this.password, 10)
   }
    next(); 
})
const LoginFrom = new mongoose.model("LoginFrom", dataSetting);
module.exports = LoginFrom;