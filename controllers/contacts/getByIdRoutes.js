import {getContactById} from '../../repository/contactsRepository'
import { HttpCode } from '../../lib/constants'  

const getByIdRoutes = async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    })
  }
  res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: "Not found", 
    })
}

export default getByIdRoutes