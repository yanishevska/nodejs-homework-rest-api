import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
import authService from '../../service/auth/userAuth'

const signup = async (req, res, next) => {
    try {
        const { email } = req.body
        const isUserExist = await authService.isUserExist(email)
        if (isUserExist) {
            return res
                .status(HttpCode.CONFLICT)
                .json({
                    status: 'error',
                    code: HttpCode.CONFLICT,
                    message: MESSAGES.EMAIL_EXIST,
                })
        }
        const data = await authService.create(req.body)
        res.status(HttpCode.CREATED)
            .json({
                status: 'success',
                code: HttpCode.CREATED,
                data
            })
    } catch (error) {
        next(error)
    }
}

export default signup