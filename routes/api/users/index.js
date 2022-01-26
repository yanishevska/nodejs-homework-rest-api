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
    verifyUser,
    repeatEmailForVerifyUser,
} from '../../../controllers/users'
import guard from '../../../middleware/guard/guard'
import upload from '../../../middleware/upload'
import limiter from '../../../middleware/limit/rateLimit'
import wrapperError from '../../../middleware/error/error-handler'
const router = new Router()

router.post('/signup', limiter(15 * 60 * 1000, 2), validateSignup, wrapperError(signup))
router.post('/login', validateLogin, wrapperError(login))
router.post('/logout', guard, wrapperError(logout))
router.get('/current', guard, wrapperError(getCurrentUser))
router.patch('/avatars', guard, upload.single('avatar'), wrapperError(uploadAvatar))
router.get('/verify/:token', wrapperError(verifyUser))
router.post('/verify', wrapperError(repeatEmailForVerifyUser))


export default router
