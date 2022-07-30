const mongoose = require("mongoose")

let registration_schema = new mongoose.Schema({
    "Frist_name":{
        type:String,
        
    },
    "Last_name":{
        type:String
    },
    "Email_id":{
        type:String,
        
    },
    "Password":{
        type:String,
        
    },
    "Contact_number":{
        type:Number,
    },
    "Fresher":{
        "Education":{
            type:String,
        },
        "Start_year":{
            type:Number,
        },
        "Passout_year":{
            type:Number,
        },
        "University":{
            type:String,
        }
       
    },
    "Experience":{
        "Total_year_of_experience":{
            type:Number,
        },
    "Current_ctc":{
        type:Number,
    },
    "Expecting_ctc":{
        type:Number,
    },
    "Notice_period":{
        type:String,
    }
    }
})

module.exports=mongoose.model("User_Information",registration_schema)