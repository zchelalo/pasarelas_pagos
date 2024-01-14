import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string().min(1)
const correo = Joi.string().email()
const password = Joi.string().min(8)
const tiposUsuarioId = Joi.number().integer()

const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  correo: correo.required(),
  password: password.required(),
  tiposUsuarioId: tiposUsuarioId.required()
})

const updateUsuarioSchema = Joi.object({
  nombre,
  correo
})

const getUsuarioSchema = Joi.object({
  id: id.required()
})

export { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema }