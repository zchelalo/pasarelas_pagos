import express from 'express'

import { UsuarioService } from '../services/usuario.service.js'
import { checkRoles } from '../middlewares/auth.handler.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updateUsuarioSchema, createUsuarioSchema, getUsuarioSchema } from '../schemas/usuario.schema.js'

const router = express.Router()
const service = new UsuarioService()

router.get('/', checkRoles('admin'), async (req, res, next) => {
  try {
    const usuarios = await service.find()
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkRoles('admin'), validatorHandler(getUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const usuario = await service.findOne(id)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkRoles('admin'), validatorHandler(createUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUsuario = await service.create(body)
    res.status(201).json(newUsuario)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', checkRoles('admin'), validatorHandler(getUsuarioSchema, 'params'), validatorHandler(updateUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const usuario = await service.update(id, body)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', checkRoles('admin'), validatorHandler(getUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }