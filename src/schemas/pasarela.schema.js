import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()

const createPasarelaSchema = Joi.object({
  nombre: nombre.required()
})

const updatePasarelaSchema = Joi.object({
  nombre
})

const getPasarelaSchema = Joi.object({
  id: id.required()
})

export { createPasarelaSchema, updatePasarelaSchema, getPasarelaSchema }