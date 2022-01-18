import { HttpCode } from "../../lib/constants"
import MESSAGES from "../../lib/messages/messages"
import authService from "../../service/auth/userAuth"

const getCurrentUser = async (req, res, next) => {
    const id = req.user.id
    const user = await authService.getCurrentUser(id)
    if (!req.user.token || !req.user.id) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: MESSAGES.UNAUTHORIZED,
        })
    }
    res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
            user
        }
    })
}

export default getCurrentUser