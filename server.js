const express = require("express")
const app = express();
const router =require("./registration_login_logot/router")
const bodyparser = require("body-parser")
app.use(bodyparser.json())
const mongoose = require("mongoose")
const mongooseurl = "mongodb://localhost:27017/JSA"
mongoose.connect(mongooseurl)
const registration_schema = require("./database_schema/registration_schema")
app.use("/Registration_login_logout",router)
app.listen(3000,console.log("server is runing"))