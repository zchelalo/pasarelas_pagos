import Stripe from 'stripe'
import { PasarelaService } from '../services/pasarela.service.js'

const service = new PasarelaService()

const pasarelaStripe = await service.findByNombre('Stripe')
const stripe = new Stripe(pasarelaStripe.apiKey)

export { stripe }