import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()

const createTiposUsuarioSchema = Joi.object({
  nombre: nombre.required()
})

const updateTiposUsuarioSchema = Joi.object({
  nombre
})

const getTiposUsuarioSchema = Joi.object({
  id: id.required()
})

export { createTiposUsuarioSchema, updateTiposUsuarioSchema, getTiposUsuarioSchema }