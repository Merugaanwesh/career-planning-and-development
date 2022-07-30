const mongoose =require("mongoose");
let posted_jobs = new mongoose.Schema({
    "job_title":{
        type:String,
    },
    "company_name":{
        type:String,
    },
    "Location":{
        type:String,
    },
    "Skills":{
        "Primary_skills":{
            type:String,
        },
        "Add_on_advantages":{
            type:String,
        }

    },
    "Job_description":{
        type:String,
    },
    "Salary":{
        type:String,
    },
    "Contact_information":{
          "Email":{
            type:String,
          },
          "Address":{
             type:String,
          }
    }

})

module.exports=mongoose.model("Job_description",posted_jobs)