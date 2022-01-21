import { HttpCode } from '../../lib/constants' 
import authService from '../../service/auth/userAuth'

const logout = async (req, res, next) => {
  try {
    await authService.setToken(req.user.id, null)
    res
      .status(HttpCode.NO_CONTENT)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: {}
      })
    
  } catch (error) {
    next(error)
  }
}
export default logout