import express from 'express'

import { KeyService } from '../services/key.service.js'
import { checkRoles } from '../middlewares/auth.handler.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { createKeySchema, getKeySchema } from '../schemas/key.schema.js'

const router = express.Router()
const service = new KeyService()

router.get('/', checkRoles('admin', 'cliente'), async (req, res, next) => {
  try {
    const keys = await service.find()
    res.json(keys)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkRoles('admin', 'cliente'), validatorHandler(getKeySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const key = await service.findOne(id)
    res.json(key)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkRoles('admin', 'cliente'), validatorHandler(createKeySchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newKey = await service.create(body)
    res.status(201).json(newKey)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', checkRoles('admin', 'cliente'), validatorHandler(getKeySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const key = await service.update(id)
    res.json(key)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', checkRoles('admin', 'cliente'), validatorHandler(getKeySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }