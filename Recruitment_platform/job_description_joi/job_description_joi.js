const joi = require("joi");
let job_description_joi = new joi.object({
    "Email_id":joi.string(),
    "session_token":joi.string(),
    "job_title":joi.string().required(),
    "company_name":joi.string().required(),
    "Location":joi.string().required(),
    "Skills":joi.object({
        "Primary_skills":joi.string().required(),
        "Add_on_advantages":joi.string()
    }).required(),
    "Job_description":joi.string().required(),
    "Salary":joi.string(),
    "Contact_information":joi.object({
        "Email":joi.string(),
        "Address":joi.string()
    })

})

module.exports={job_description_joi}