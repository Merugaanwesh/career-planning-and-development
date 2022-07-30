const joi = require("joi")
let recruiter_registration_joi = new joi.object({
    "Full_name":joi.string().required(),
    "Contact_number":joi.number().required(),
    "Company_name":joi.string().required(),
    "Designation":joi.string().required(),
    "Email_id":joi.string().email().required(),
    "Password":joi.string().required().min(8).max(16),
    "City":joi.string().required()

})

module.exports= {recruiter_registration_joi}