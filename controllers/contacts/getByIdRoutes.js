import {getContactById} from '../../repository/contactsRepository'
import { HttpCode } from '../../lib/constants'  
import { CustomError } from '../../lib/errors'
import MESSAGES from '../../lib/messages/messages'

const getByIdRoutes = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await getContactById(userId, id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  }
  throw new CustomError(HttpCode.NOT_FOUND, MESSAGES.NOT_FOUND)
}

export default getByIdRoutes