import rateLimit from 'express-rate-limit' 
import { HttpCode } from "../../lib/constants";
import MESSAGES from '../../lib/messages/messages';

const limiter = (duration, limit) => {
    return rateLimit({
        windowMs: duration,
        max: limit,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            return res
                .status(HttpCode.TOO_MANY_REQUEST)
                .json({
                    status: 'error',
                    code: HttpCode.TOO_MANY_REQUEST,
                    message: MESSAGES.TOO_MANY,
                })
        }
    })
}

export default limiter