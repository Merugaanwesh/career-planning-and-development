const express = require("express");
const employer_router = express.Router();
const recruiter_registration_joi = require("../joi_validation/recruiter_registration_joi")
const recruiter_registration = require("../database_schema/recruiter_registration")
const bcrypt =require("bcrypt")
const login_joi = require("../joi_validation/login_joi")
const date = new Date();

employer_router.post("/recruiter/registration", async (req,res)=>{
    let {error, value} = await recruiter_registration_joi.recruiter_registration_joi.validate(req.body)
    if(error){
        res.send({
            message:error.message
        }) 
    }
    else{
        let salt = await bcrypt.genSalt()
        let haspassword = await bcrypt.hash(req.body.Password,salt)
        let bcrypt_data ={
            Full_name:req.body.Full_name,
            Contact_number:req.body.Contact_number,
            Company_name:req.body.Company_name,
            Password:haspassword,
            Designation:req.body.Designation,
            Email_id:req.body.Email_id,
            City:req.body.City

}
      let data_insert = new recruiter_registration(bcrypt_data)
        data_insert.save().then(response=>{
            res.json(response)
        }).catch(error=>{
            res.json(error.message)
        })

    }
})



employer_router.post("/recruiter/login", async (req,res)=>{
let {error,value} = await login_joi.login_joi.validate(req.body)
   if(error){
    res.send({message:error.message})
   }
   else{
     let Email_id= await recruiter_registration.find({"Email_id":req.body.Email_id})
    
     if(Email_id == null){
       return req.status(401).send("cannot find Email")
     }
     else{
    try{
        if(await bcrypt.compare(req.body.Password, Email_id[0].Password)){
            let session_token = await recruiter_registration.find({session_token:{$exists:true}, "Email_id":req.body.Email_id})
             
             if(session_token != 0){
                res.json({"message":"This user already logged in another device"})
            }
            else {
                let seconds = date.getSeconds();
                let session_token_creation=req.body.Email_id.concat(seconds)
                const seesion = await recruiter_registration.updateOne({"Email_id":req.body.Email_id},{$set:{"session_token":session_token_creation}})
                console.log(seesion);
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


employer_router.post("/recruiter/logout",async (req,res)=>{
    let Email_id= await recruiter_registration.find({"Email_id":req.body.Email_id})
    if(Email_id == null){
       return req.status(401).send("cannot find Email")
     }
     else{
        try{
           if(await bcrypt.compare(req.body.Password, Email_id[0].Password)){
             let session_token = await recruiter_registration.find({session_token:{$exists:true}, "Email_id":req.body.Email_id})
             console.log(session_token);
             if(session_token  != 0){
                const seesion= await recruiter_registration.updateOne({"Email_id":req.body.Email_id},{$unset:{"session_token":""}})
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







module.exports=employer_router