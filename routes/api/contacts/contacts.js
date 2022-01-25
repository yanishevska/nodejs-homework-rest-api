import {Router} from 'express'
import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from '../../../middleware/validation/validationContacts'

import {
  getRoutes,
  getByIdRoutes,
  deleteRoutes,
  postRoutes,
  updateRoutes,
} from '../../../controllers/contacts'
import wrapperError from '../../../middleware/error/error-handler'
import guard from '../../../middleware/guard/guard'

const router = new Router()

router.get('/', [guard, validateQuery], wrapperError(getRoutes))

router.get('/:id',[guard, validateId], wrapperError(getByIdRoutes))

router.post('/',[guard, validateCreate], wrapperError(postRoutes))

router.delete('/:id',[guard, validateId], wrapperError(deleteRoutes))

router.put('/:id',[guard, validateId, validateUpdate], wrapperError(updateRoutes))

router.patch('/:id/favorite',[guard, validateId, validateUpdateFavorite], wrapperError(updateRoutes))

export default router
