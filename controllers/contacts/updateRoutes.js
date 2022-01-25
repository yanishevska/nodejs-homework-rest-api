import {updateContact} from '../../repository/contactsRepository'
import { HttpCode } from '../../lib/constants' 
import { CustomError } from '../../lib/errors'
import MESSAGES from '../../lib/messages/messages'
 
const updateRoutes = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const contact = await updateContact(userId, id, req.body)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  }
  throw new CustomError(HttpCode.NOT_FOUND, MESSAGES.NOT_FOUND)
}

export default updateRoutes