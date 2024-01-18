import Joi from 'joi'

const id = Joi.number().integer()
const key = Joi.string()
const usuarioId = Joi.number().integer()
const pasarelaId = Joi.number().integer()

const createKeySchema = Joi.object({
  key: key.required(),
  usuarioId: usuarioId.required(),
  pasarelaId: pasarelaId.required()
})

const updateKeySchema = Joi.object({
  key
})

const getKeySchema = Joi.object({
  id: id.required()
})

export { createKeySchema, updateKeySchema, getKeySchema }