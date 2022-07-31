const express = require("express");
const resume_router = express.Router();
const mongoose = require("mongoose");
const seeker_information = require("./seeker/seeker_information");
const registration_schema = require("../database_schema/registration_schema");
const seeker_joi  = require("./seeker/seeker_joi");
const { response } = require("express");
const { json } = require("body-parser");

resume_router.post("/resume",async (req,res)=>{
    let {error,value}= await seeker_joi.seeker_joi.validate(req.body)
    if(error){
        res.send({message:error.message})
    }else{
        let registration = await registration_schema.find({"session_token":req.body.session_token , "Email_id":req.body.Email_id})
        if(registration !=0){
            let skils_date = new seeker_information(req.body)
            skils_date.save().then(response=>{
                res.json(response)

            }).catch(error=>{
                res.send({message:error.message})
            })
        }
        else{
            res.json({"message":"plz log in"})
        }
    }

})
module.exports = resume_router
