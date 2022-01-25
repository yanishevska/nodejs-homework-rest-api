import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
import authService from '../../service/auth/userAuth'
import {
    EmailService,
    SenderSendGrid,
} from '../../service/email'
import { CustomError } from '../../lib/errors'
const signup = async (req, res, next) => {
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)

    if (isUserExist) {
        throw new CustomError(HttpCode.CONFLICT, MESSAGES.EMAIL_EXIST)
    }

    const userData = await authService.create(req.body)
    const emailService = new EmailService(process.env.NODE_ENV,
        new SenderSendGrid(),
    )

    const isSend = await emailService.sendVerifyEmail(
        email,
        userData.name,
        userData.verificationToken,
    )

    delete userData.verificationToken
        
    res
        .status(HttpCode.CREATED)
        .json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                ...userData,
                isSendEmailVerify: isSend
            },
        }) 
}

export default signup