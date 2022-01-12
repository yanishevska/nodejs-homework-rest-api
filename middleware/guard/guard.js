import jwt from 'jsonwebtoken'
import usersRepository from '../../repository/usersRepository/createUser'
import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
const SECRET_KEY = process.env.JWT_SECRET_KEY

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, SECRET_KEY)
        return !!verify
    } catch (error) {
        return false
    }
}

const guard = async (req, res, next) => {
    const token = req.get('authorization')?.split(' ')[1]
    const isValidToken = verifyToken(token)
    if (!isValidToken) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: MESSAGES.UNAUTHORIZED,
            })
    }

    const payload = jwt.decode(token)
    const user = await usersRepository.findById(payload.id)
    if (!user || user.token !== token) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: MESSAGES.UNAUTHORIZED,
            })
    }
    req.user = user
    next()
}
    
export default guard