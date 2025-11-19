import Joi from 'joi'

//sign_up validation
export const sign_up = Joi.object(
    {
        name : Joi.string().required(),
        age  : Joi.number().integer().min(18).required(),
        email_id : Joi.string().email().required(),
        pass : Joi.string().pattern(new RegExp("")).required(),
        conf_pass : Joi.ref("pass"),
    }
)

//login validation
export const login = Joi.object(
    {
        email_id : Joi.string().email().required(),
        pass : Joi.string().min(5).required(),
    }
)