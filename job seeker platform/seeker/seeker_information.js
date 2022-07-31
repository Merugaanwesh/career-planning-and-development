const mongoose = require("mongoose")
let seeker_information = new mongoose.Schema({
    "Skils":{
        type:String,
    },
    "Experience_or_fresher":{
        type:String,
    },
    "Total_experience":{
        type:Number,

    },
    "Profile_description":{
        type:String,

    },
    "Contact_information":{
        "Email":{
            type:String,
        },
        "contact_number":{
            type:Number,
        }

    }

})

module.exports=mongoose.model("seeker_information",seeker_information)