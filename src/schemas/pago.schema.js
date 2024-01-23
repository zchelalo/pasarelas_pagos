import Joi from 'joi'

const id = Joi.number().integer()
const producto = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string().required(),
  precio: Joi.number().required(),
  moneda: Joi.string().required(),
  cantidad: Joi.number().integer().required()
})
const productos = Joi.array().items(producto)
const successUrl = Joi.string().uri()
const cancelUrl = Joi.string().uri()

const createPagoStripeSchema = Joi.object({
  productos: productos.required(),
  successUrl: successUrl.required(),
  cancelUrl: cancelUrl.required()
})

const getPagoSchema = Joi.object({
  id: id.required()
})

export { createPagoStripeSchema, getPagoSchema }