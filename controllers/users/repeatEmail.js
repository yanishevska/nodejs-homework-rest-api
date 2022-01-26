import { HttpCode } from "../../lib/constants"
import MESSAGES from "../../lib/messages/messages"
import { CustomError } from '../../lib/errors'
import { findByEmail } from "../../repository/usersRepository"
import {
    EmailService,
    SenderSendGrid,
} from "../../service/email"

const repeatEmailForVerifyUser = async (req, res, next) => {
    const { email } = req.body
    const user = await findByEmail(email)
    if (user) {
        const {
            email,
            name,
            verificationToken
        } = user
    
        const emailService = new EmailService(
            process.env.NODE_ENV,
            new SenderSendGrid(),
        )

        const isSend = await emailService.sendVerifyEmail(
            email,
            name,
            verificationToken,
        )
        
        if (isSend) {
            return res
                .status(HttpCode.OK)
                .json({
                    status: 'success',
                    code: HttpCode.OK,
                    data: { message: MESSAGES.EMAIL_SENT },
                })
        }
        throw new CustomError(HttpCode.SU, MESSAGES.SERVICE_UNAVAILABLE)
    }
    throw new CustomError(HttpCode.NOT_FOUND, MESSAGES.NOT_FOUND_USER)
}



export default repeatEmailForVerifyUser