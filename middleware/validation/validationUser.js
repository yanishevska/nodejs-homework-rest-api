import Joi from "joi"
import { HttpCode } from "../../lib/constants"

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const validateSignup = async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body)
    } catch (error) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json({ message: `Field ${error.message.replace(/"/g, '')}` })
    
    }
    next()
}

const validateLogin = async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body)
    } catch (error) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json({ message: `Field ${error.message.replace(/"/g, '')}` })
    
    }
    next()
}

export {
    validateLogin,
    validateSignup
}