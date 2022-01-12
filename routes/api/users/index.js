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
} from '../../../controllers/users'
import guard from '../../../middleware/guard/guard'
import limiter from '../../../middleware/limit/rateLimit'

const router = new Router()

router.post('/signup', limiter(15 * 60 * 1000, 2), validateSignup, signup)
router.post('/login', validateLogin, login)
router.post('/logout', guard, logout)
router.get('/current', guard, getCurrentUser)

export default router
