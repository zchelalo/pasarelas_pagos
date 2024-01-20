import express from 'express'

import { PagoService } from '../services/pago.service.js'
import { checkRoles } from '../middlewares/auth.handler.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { createPagoStripeSchema, getPagoSchema } from '../schemas/pago.schema.js'

const router = express.Router()
const service = new PagoService()

router.get('/stripe/', async (req, res, next) => {
  try {
    const pagos = await service.find()
    res.json(pagos)
  } catch (error) {
    next(error)
  }
})

router.get('/stripe/:id', validatorHandler(getPagoSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const pago = await service.findOne(id)
    res.json(pago)
  } catch (error) {
    next(error)
  }
})

router.post('/stripe/', checkRoles('admin'), validatorHandler(createPagoStripeSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newPago = await service.create(body)
    res.status(201).json(newPago)
  } catch (error) {
    next(error)
  }
})

router.get('/stripe/success', async (req, res, next) => {
  res.send('Success')
})

router.get('/stripe/cancel', async (req, res, next) => {
  res.send('Cancel')
})

export { router }