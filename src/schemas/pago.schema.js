import Joi from 'joi'

const id = Joi.number().integer()
const productos = Joi.array()

const createPagoStripeSchema = Joi.object({
  productos: productos.required()
})

const getPagoSchema = Joi.object({
  id: id.required()
})

export { createPagoStripeSchema, getPagoSchema }