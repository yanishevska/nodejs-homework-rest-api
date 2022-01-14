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

import guard from '../../../middleware/guard/guard'

const router = new Router()

router.get('/', [guard, validateQuery], getRoutes)

router.get('/:id',[guard, validateId], getByIdRoutes)

router.post('/',[guard, validateCreate], postRoutes)

router.delete('/:id',[guard, validateId], deleteRoutes)

router.put('/:id',[guard, validateId, validateUpdate], updateRoutes)

router.patch('/:id/favorite',[guard, validateId, validateUpdateFavorite], updateRoutes)

export default router
