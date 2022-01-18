import { Router } from 'express'
import {
    validateLogin,
    validateSignup,
} from '../../../middleware/validation/validationUser' 

import {
    signup,
    login,
    logout,
    getCurrentUser,
    uploadAvatar,
} from '../../../controllers/users'
import guard from '../../../middleware/guard/guard'
import upload from '../../../middleware/upload'
import limiter from '../../../middleware/limit/rateLimit'

const router = new Router()

router.post('/signup', limiter(15 * 60 * 1000, 2), validateSignup, signup)
router.post('/login', validateLogin, login)
router.post('/logout', guard, logout)
router.get('/current', guard, getCurrentUser)
router.patch('/avatars',guard, upload.single('avatar'), uploadAvatar)


export default router
