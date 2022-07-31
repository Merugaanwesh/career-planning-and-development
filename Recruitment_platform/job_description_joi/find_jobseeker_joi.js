const joi = require("joi");
let find_jobseeker_joi = new joi.object({
    "Email_id":joi.string().email(),
    "session_token":joi.string(),
    "Skils":joi.string().required(),
    "Experience_or_fresher":joi.string().required()
})

module.exports={find_jobseeker_joi}