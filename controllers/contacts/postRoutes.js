import {addContact} from '../../repository/contactsRepository'
import { HttpCode } from '../../lib/constants' 

const postRoutes = async (req, res, next) => {
  const newContact = await addContact(req.body)
  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contact: newContact }
  }
    )
}

export default postRoutes
