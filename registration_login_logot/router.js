const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const joi = require("joi");
const registration_schema = require("../database_schema/registration_schema")
const registration_valition =require("../joi_validation/registration");
const { response } = require("express");
const bcrypt = require("bcrypt")
const login_schema = require("../database_schema/login_schema")
const login_joi = require("../joi_validation/login_joi")
const date = new Date();

router.post("/jobseeker/registration", async (req,res)=>{
    let {error, value} = await registration_valition.registration_valition.validate(req.body)
    if(error){
        res.send({
            message:error.message
        }) 
    }
    else{
        let salt = await bcrypt.genSalt()
        let haspassword = await bcrypt.hash(req.body.Password,salt)
        let bcrypt_data ={
            Frist_name:req.body.Frist_name,
            Last_name:req.body.Last_name,
            Email_id:req.body.Email_id,
            Password:haspassword,
            Contact_number:req.body.Contact_number,
            Fresher:{
                Education:req.body.Education,
                Start_year:req.body.Start_year,
                Passout_year:req.body.Passout_year,
                University:req.body.University,},
            Experience:{
                Total_year_of_experience:req.body.Total_year_of_experience,
                Current_ctc:req.body.Current_ctc,
                Expecting_ctc:req.body.Expecting_ctc,
                Notice_period:req.body.Notice_period
            }

}
        
        let data_insert = new registration_schema(bcrypt_data)
        data_insert.save().then(response=>{
            res.json(response)
        }).catch(error=>{
            res.json(error.message)
        })

    }
})

router.post("/jobseeker/login", async (req,res)=>{
let {error,value} = await login_joi.login_joi.validate(req.body)
   if(error){
    res.send({message:error.message})
   }
   else{
     let Email_id= await registration_schema.find({"Email_id":req.body.Email_id})
     
     if(Email_id == null){
       return req.status(401).send("cannot find Email")
     }
     else{
    try{
        if(await bcrypt.compare(req.body.Password, Email_id[0].Password)){
            let session_token = await registration_schema.find({session_token:{$exists:true}, "Email_id":req.body.Email_id})
             //console.log(sisson_token);
             if(session_token != 0){
                res.json({"message":"This user already logged in another device"})
            }
            else{
                 
                 let seconds = date.getSeconds();
                 let session_token_creation=req.body.Email_id.concat(seconds)
                 
                const seesion= await registration_schema.updateOne({"Email_id":req.body.Email_id},{$set:{"session_token":session_token_creation}})
                res.json({"message":"login successful"})
            }
        }else{
              res.send("not allowed")
        }
    }catch{
        res.status(500).send()
    }
}

   }
})


router.post("/jobseeker/logout",async (req,res)=>{
    let Email_id= await registration_schema.find({"Email_id":req.body.Email_id})
    if(Email_id == null){
       return req.status(401).send("cannot find Email")
     }
     else{
        try{
           if(await bcrypt.compare(req.body.Password, Email_id[0].Password)){
             let session_token = await registration_schema.find({session_token:{$exists:true}, "Email_id":req.body.Email_id})
             console.log(session_token);
             if(session_token  != 0){
                const seesion= await registration_schema.updateOne({"Email_id":req.body.Email_id},{$unset:{"session_token":""}})
                res.json({"message":"you logout successfully"})
             }
             else{
                res.json({"message":"Plz login"})
             }


           }
           else{
            res.json({"message":"not allowd"})
           }


        }catch{
            res.status(500).send()

        }
     }




})






module.exports=router