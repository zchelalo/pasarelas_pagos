import express from 'express'
import passport from 'passport'

import { PagoService } from '../services/pago.service.js'
import { checkRoles, checkApiKey } from '../middlewares/auth.handler.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { createPagoStripeSchema, getPagoSchema } from '../schemas/pago.schema.js'

const router = express.Router()
const service = new PagoService()

router.get('/', passport.authenticate('jwt', { session: false }), checkRoles('admin'), async (req, res, next) => {
  try {
    const pagos = await service.find()
    res.json(pagos)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', passport.authenticate('jwt', { session: false }), checkRoles('admin'), validatorHandler(getPagoSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const pago = await service.findOne(id)
    res.json(pago)
  } catch (error) {
    next(error)
  }
})

router.post('/stripe/', checkApiKey, validatorHandler(createPagoStripeSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const claveKey = req.headers.clave
    const newPago = await service.createPagoStripe(body, claveKey)
    res.status(201).json(newPago)
  } catch (error) {
    next(error)
  }
})

export { router }