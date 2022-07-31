const express = require("express");
const job_description_router = express.Router();
const posted_jobs =require("./Schema/posted_jobs");
const job_description_joi =require("./job_description_joi/job_description_joi")
const recruiter_registration = require("../database_schema/recruiter_registration");
const seeker_information=require("../job seeker platform/seeker/seeker_information")
const { response } = require("express");
const find_jobseeker_joi = require("../Recruitment_platform/job_description_joi/find_jobseeker_joi")

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

job_description_router.post("/find_jobseeker", async(req,res)=>{
      let {error,value}= await find_jobseeker_joi.find_jobseeker_joi.validate(req.body)
    if(error){
        res.send({
            message:error.message
        })
      }
      else{
        let login_checking = await recruiter_registration.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
        if(login_checking != 0){
             let Filter_skils = await seeker_information.find({Skils:{$regex:(req.body.Skils) ,$options :"i"}})
             let Filter_experience= req.body.Experience_or_fresher
             let Filter=[]
             for(var key in Filter_skils){
        
           if(Filter_skils[key].Experience_or_fresher.toLowerCase() == Filter_experience.toLowerCase()){
                Filter.push(Filter_skils[key])
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
          res.json({"message":"plz log in"})
        }
      }

    })

module.exports=job_description_router