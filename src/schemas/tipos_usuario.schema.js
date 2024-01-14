import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()

const createTipos_usuarioSchema = Joi.object({
  nombre: nombre.required()
})

const updateTipos_usuarioSchema = Joi.object({
  nombre
})

const getTipos_usuarioSchema = Joi.object({
  id: id.required()
})

export { createTipos_usuarioSchema, updateTipos_usuarioSchema, getTipos_usuarioSchema }