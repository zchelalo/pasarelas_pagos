import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()
const apiKey = Joi.string()

const createPasarelaSchema = Joi.object({
  nombre: nombre.required(),
  apiKey: apiKey.required()
})

const updatePasarelaSchema = Joi.object({
  nombre,
  apiKey
})

const getPasarelaSchema = Joi.object({
  id: id.required()
})

export { createPasarelaSchema, updatePasarelaSchema, getPasarelaSchema }