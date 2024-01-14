import express from 'express'

import { KeyService } from '../services/key.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updateKeySchema, createKeySchema, getKeySchema } from '../schemas/key.schema.js'

const router = express.Router()
const service = new KeyService()

router.get('/', async (req, res, next) => {
  try {
    const keyes = await service.find()
    res.json(keyes)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getKeySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const key = await service.findOne(id)
    res.json(key)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createKeySchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newKey = await service.create(body)
    res.status(201).json(newKey)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getKeySchema, 'params'), validatorHandler(updateKeySchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const key = await service.update(id, body)
    res.json(key)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(getKeySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }