const joi = require('joi')

//sign_up validation
export const sign_up = joi.object(
    {
        name : joi.string().required(),
        age : joi.number().integer().min(18).required(),
        email_id : joi.string().email().required(),
        pass : joi.string().pattern(new RegExp("")).required(),
        conf_pass : joi.ref(pass)
    }
)

//login
export const login = joi.object(
    {
        email_id : joi.string().email().required(),
        pass : joi.string().min(5).required(),
    }
)