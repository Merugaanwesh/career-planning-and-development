const joi = require("joi")
const login_joi = new joi.object({
    "Email_id":joi.string().required(),
    "Password":joi.string().required().min(8).max(16),
})
module.exports={login_joi}

