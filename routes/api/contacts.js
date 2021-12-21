const express = require('express')
const {validateCreate,validateUpdate,validateId} = require('./validation')
const router = express.Router()
const {
  getRoutes,
  getByIdRoutes,
  deleteRoutes,
  postRoutes,
  putRoutes,
} = require('../../controllers/contacts')

router.get('/', getRoutes)

router.get('/:id',validateId, getByIdRoutes)

router.post('/',validateCreate,postRoutes)

router.delete('/:id',validateId, deleteRoutes)

router.put('/:id',validateUpdate,validateId,putRoutes)

module.exports = router
