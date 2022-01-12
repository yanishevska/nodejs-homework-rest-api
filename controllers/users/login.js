import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
import AuthService from '../../service/auth/userAuth'
const authService = new AuthService()

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: MESSAGES.INVALID_LOG,
            })
    }
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)
    res
        .status(HttpCode.OK)
        .json({
            status: 'success',
            code: HttpCode.OK,
            data: { token },
        })
}

export default login