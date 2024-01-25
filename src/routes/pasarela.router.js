import express from 'express'

import { PasarelaService } from '../services/pasarela.service.js'
import { checkRoles } from '../middlewares/auth.handler.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updatePasarelaSchema, createPasarelaSchema, getPasarelaSchema } from '../schemas/pasarela.schema.js'

const router = express.Router()
const service = new PasarelaService()

router.get('/', checkRoles('admin', 'cliente'), async (req, res, next) => {
  try {
    const pasarelas = await service.find()
    res.json(pasarelas)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkRoles('admin', 'cliente'), validatorHandler(getPasarelaSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const pasarela = await service.findOne(id)
    res.json(pasarela)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkRoles('admin'), validatorHandler(createPasarelaSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newPasarela = await service.create(body)
    res.status(201).json(newPasarela)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', checkRoles('admin'), validatorHandler(getPasarelaSchema, 'params'), validatorHandler(updatePasarelaSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const pasarela = await service.update(id, body)
    res.json(pasarela)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', checkRoles('admin'), validatorHandler(getPasarelaSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }