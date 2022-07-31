const joi = require("joi");
let seeker_joi = new joi.object({
    "Skils":joi.string().required(),
    "Experience_or_fresher":joi.string().required(),
    "Total_experience":joi.number(),
    "Profile_description":joi.string(),
    "Contact_information":joi.object({
           "Email":joi.string().email().required(),
           "contact_number":joi.number().required()
}).required(),
"Email_id":joi.string().email(),
"session_token":joi.string(),

})

module.exports={seeker_joi}