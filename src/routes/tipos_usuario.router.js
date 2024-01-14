import express from 'express'

import { Tipos_usuarioService } from '../services/tipos_usuario.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updateTipos_usuarioSchema, createTipos_usuarioSchema, getTipos_usuarioSchema } from '../schemas/tipos_usuario.schema.js'

const router = express.Router()
const service = new Tipos_usuarioService()

router.get('/', async (req, res, next) => {
  try {
    const tipos_usuarios = await service.find()
    res.json(tipos_usuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getTipos_usuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const tipos_usuario = await service.findOne(id)
    res.json(tipos_usuario)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createTipos_usuarioSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newTipos_usuario = await service.create(body)
    res.status(201).json(newTipos_usuario)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getTipos_usuarioSchema, 'params'), validatorHandler(updateTipos_usuarioSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const tipos_usuario = await service.update(id, body)
    res.json(tipos_usuario)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(getTipos_usuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }