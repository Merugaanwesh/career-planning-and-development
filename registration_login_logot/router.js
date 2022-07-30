const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const joi = require("joi");
const registration_schema = require("../database_schema/registration_schema")
const registration_valition =require("../joi_validation/registration");
const { response } = require("express");
const bcrypt = require("bcrypt")

router.post("/registration", async (req,res)=>{
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
        
        let values_insert = new registration_schema(bcrypt_data)
        values_insert.save().then(response=>{
            res.json(response)
        }).catch(error=>{
            res.json(error.message)
        })

    }
})


module.exports=router