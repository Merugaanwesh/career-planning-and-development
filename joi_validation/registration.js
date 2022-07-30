const joi = require("joi");
const registration_valition = new joi.object({
    "Frist_name":joi.string().required(),
    "Last_name":joi.string(),
    "Email_id":joi.string().email().required(),
    "Password":joi.string().min(8).max(16).required(),
    "Contact_number":joi.number().required(),
    "Fresher":joi.object({
        "Education":joi.string().required(),
        "Start_year":joi.number().required(),
        "Passout_year":joi.number().required(),
        "University":joi.string().required()
    }),
    "Experience":joi.object({
        "Total_year_of_experience":joi.number().required(),
        "Current_ctc":joi.number().required(),
        "Expecting_ctc":joi.number().required(),
        "Notice_period":joi.string().required()
    }),
})
module.exports={registration_valition}