import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
import AuthService from '../../service/auth/userAuth'

const authService = new AuthService()

const signup = async (req, res, next) => {
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
    res.status(HttpCode.OK)
        .json({
            status: 'success',
            code: HttpCode.OK,
            data
        })
}

export default signup