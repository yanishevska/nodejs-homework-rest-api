import Joi from 'joi'
import pkg from 'mongoose'
import MESSAGES from '../lib/messages/messages'

const { Types } = pkg

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool().optional(),
})

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone')


const updateFavoriteSchema = Joi.object({
     favorite: Joi.bool().required(),
})
const regLimit = /\d+/

const querySchema = Joi.object({
    limit: Joi.string().pattern(regLimit).optional(),
    skip: Joi.number().min(0).optional(),
    sortBy: Joi.string().valid('name', 'email', 'phone', 'favorite').optional(),
    sortByDesc: Joi.string().valid('name', 'email', 'phone', 'favorite').optional(),
    filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp('(name|email|age|phone|favorite)\\|?(name|email|phone|favorite)+'))
        .optional(),
})


const validateCreate = async (req, res, next) => {
    try {
      await createSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
    }
    next()
}

const validateUpdate = async (req, res, next) => {
    try {
   await updateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === "object.missing") {
            return res.status(400).json({ message: `${MESSAGES.MISSING}` })
        }
        return res.status(400).json({ message: err.message.replace(/"/g, '')})
    }
    next()
}

const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `${MESSAGES.INVALID}`}) 
    }
    next()
}

const validateUpdateFavorite =async (req, res, next) => {
    try {
   await updateFavoriteSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === "object.unknown") {
            return res.status(400).json({ message: `${MESSAGES.MISSING_FAVORITE}` })
        }
        return res.status(400).json({ message: err.message.replace(/"/g, '')})
    }
    next()
}

const validateQuery = async (req, res, next) => {
    try {
        await querySchema.validateAsync(req.query)
    } catch (err) {
        return res
            .status(400)
            .json({ message: `Field ${err.message.replace(/"/g, '')}` })
    }
    next()
}
export {validateCreate, validateUpdate, validateId, validateUpdateFavorite, validateQuery}