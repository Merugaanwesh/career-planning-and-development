const express = require("express");
const job_description_router = express.Router();
const posted_jobs =require("./Schema/posted_jobs");
const job_description_joi =require("./job_description_joi/job_description_joi")
const recruiter_registration = require("../database_schema/recruiter_registration");
const { response } = require("express");

job_description_router.post("/job_description",async (req,res)=>{
   let {error,value}= await job_description_joi.job_description_joi.validate(req.body)
    if(error){
        res.send({
            message:error.message
        })
    }
    else{
     
         let login_checking = await recruiter_registration.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
         if(login_checking != 0){
            let date_insert = new posted_jobs(req.body)
            date_insert.save().then(response=>{
                  res.json(response)
            }).catch(error=>{
                res.json(error.message)
            })
          }
          else{
            res.json({"message":"not allowed"})
          }
        }
    })

module.exports=job_description_router