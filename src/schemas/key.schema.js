import Joi from 'joi'

const id = Joi.number().integer()
const clave = Joi.string()
const usuarioId = Joi.number().integer()
const pasarelaId = Joi.number().integer()

const createKeySchema = Joi.object({
  usuarioId: usuarioId.required(),
  pasarelaId: pasarelaId.required()
})

const getKeySchema = Joi.object({
  id: id.required()
})

const getKeysSchema = Joi.object({
  clave,
  usuarioId,
  pasarelaId
})

export { createKeySchema, getKeySchema, getKeysSchema }