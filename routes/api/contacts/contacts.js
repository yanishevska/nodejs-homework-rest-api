import {Router} from 'express'
import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from '../../../middleware/validationContacts'

import {
  getRoutes,
  getByIdRoutes,
  deleteRoutes,
  postRoutes,
  updateRoutes,
} from '../../../controllers/contacts'

const router = new Router()

router.get('/', validateQuery, getRoutes)

router.get('/:id',validateId, getByIdRoutes)

router.post('/',validateCreate,postRoutes)

router.delete('/:id',validateId, deleteRoutes)

router.put('/:id', validateUpdate, validateId, updateRoutes)

router.patch('/:id/favorite',validateUpdateFavorite,validateId,updateRoutes)

export default router
