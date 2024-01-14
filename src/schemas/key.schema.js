import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()

const createKeySchema = Joi.object({
  nombre: nombre.required()
})

const updateKeySchema = Joi.object({
  nombre
})

const getKeySchema = Joi.object({
  id: id.required()
})

export { createKeySchema, updateKeySchema, getKeySchema }