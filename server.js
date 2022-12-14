const express = require("express")
const app = express();
const router =require("./registration_login_logot/router")
const bodyparser = require("body-parser")
app.use(bodyparser.json())
const mongoose = require("mongoose")
const mongooseurl = "mongodb://localhost:27017/JSA"
mongoose.connect(mongooseurl)
const registration_schema = require("./database_schema/registration_schema")
const recruiter_registration = require("./database_schema/recruiter_registration")
const employer_router = require("./registration_login_logot/employer_router")
const posted_jobs =require("./Recruitment_platform/Schema/posted_jobs")
const job_description_router = require("./Recruitment_platform/Job_description_router")
const search_a_jobs = require("./job seeker platform/search_a_jobs") 
const seeker_information = require("./job seeker platform/seeker/seeker_information")
const resume_router = require("./job seeker platform/seeker_resume")
app.use("/Registration_login_logout",router)
app.use("/recruiter",employer_router)
app.use("/description",job_description_router)
app.use("/search",search_a_jobs)
app.use("/resume",resume_router)
app.listen(3000,console.log("server is runing"))