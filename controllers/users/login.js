import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
import authService from '../../service/auth/userAuth'
import { CustomError } from '../../lib/errors'

const login = async (req, res, next) => {
        const { email, password } = req.body
        const user = await authService.getUser(email, password)
    if (!user) {
           throw new CustomError(HttpCode.UNAUTHORIZED, MESSAGES.INVALID_LOG)  
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