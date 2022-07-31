const express =require("express");
const search_a_jobs = express.Router();
const registration_schema = require("../database_schema/registration_schema")
const posted_jobs = require("../Recruitment_platform/Schema/posted_jobs")


search_a_jobs.post("/search", async (req,res)=>{
    let registration = await registration_schema.find({"session_token":req.body.session_token , "Email_id":req.body.Email_id})
     if(registration != 0){
        let Filter_job_title = await posted_jobs.find({job_title:{$regex:(req.body.job_title), $options :"i" }})
         

       let Filter_Location = req.body.Location
       let Filter=[]
       for(var key in Filter_job_title ){
        
           if(Filter_job_title[key].Location.toLowerCase() == Filter_Location.toLowerCase()){
                Filter.push(Filter_job_title[key])
            }
        }
       if(Filter != 0){
         res.json(Filter)
       }
       else if(Filter == 0){
        res.json({"message":"not find"})
       }
      

    }
    else{
        res.json({"message":"plz login"})
    }
})

module.exports=search_a_jobs