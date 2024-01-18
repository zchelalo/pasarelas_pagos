import express from 'express'

import { TiposUsuarioService } from '../services/tipos_usuario.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updateTiposUsuarioSchema, createTiposUsuarioSchema, getTiposUsuarioSchema } from '../schemas/tipos_usuario.schema.js'

const router = express.Router()
const service = new TiposUsuarioService()

router.get('/', async (req, res, next) => {
  try {
    const tiposUsuarios = await service.find()
    res.json(tiposUsuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getTiposUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const tiposUsuario = await service.findOne(id)
    res.json(tiposUsuario)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createTiposUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newTiposUsuario = await service.create(body)
    res.status(201).json(newTiposUsuario)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getTiposUsuarioSchema, 'params'), validatorHandler(updateTiposUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const tiposUsuario = await service.update(id, body)
    res.json(tiposUsuario)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(getTiposUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }