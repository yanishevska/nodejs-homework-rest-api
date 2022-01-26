import{ removeContact }from '../../repository/contactsRepository'
import { HttpCode } from '../../lib/constants' 
import MESSAGES from '../../lib/messages/messages'
import { CustomError } from '../../lib/errors'

const deleteRoutes = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const contact = await removeContact(userId, id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  }
  throw new CustomError(HttpCode.NOT_FOUND, MESSAGES.NOT_FOUND)
}

export default deleteRoutes
