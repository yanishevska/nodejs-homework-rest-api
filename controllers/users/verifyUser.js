import { HttpCode } from "../../lib/constants"
import MESSAGES from "../../lib/messages/messages"
import { CustomError } from '../../lib/errors'
import  { findByVerifyToken, updateVerify } from '../../repository/usersRepository'

const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.token
    const userFromToken = await findByVerifyToken(verifyToken)
  
    if (userFromToken) {
        await updateVerify(userFromToken.id, true)
        return res
            .status(HttpCode.OK)
            .json({
                status: 'success',
                code: HttpCode.OK,
                data: { message: MESSAGES.SUCCESS }
            })
    }
    throw new CustomError(HttpCode.BAD_REQUEST, MESSAGES.INVALID_TOKEN)
}

export default verifyUser