const mongoose = require("mongoose")
let recruiter_registration = new mongoose.Schema({
    "Full_name":{
        type:String
    },
    "Contact_number":{
        type:Number
    },
    "Company_name":{
        type:String
    },
    "Designation":{
        type:String

    },
    "Email_id":{
        type:String,
    },
    "Password":{
        type:String,
    },
    "City":{
        type:String
    },
    "session_token":{
        type:String
    }
})

module.exports=mongoose.model("Employer",recruiter_registration)