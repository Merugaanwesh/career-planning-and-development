const mongoose = require("mongoose");

const login_schema = new mongoose.Schema({
    "Email_id":{
        type:String,
    },
    "Password":{
        type:String,
        
    }
})
module.exports=login_schema