import boom from '@hapi/boom'
import currency from 'currency.js'

import { PasarelaService } from '../services/pasarela.service.js'
import { EstadoPagoService } from '../services/estado_pago.service.js'
import { KeyService } from '../services/key.service.js'

import { sequelize } from '../libs/sequelize.js'
import { stripe } from '../libs/stripe.js'

const pasarelaService = new PasarelaService()
const estadoPagoService = new EstadoPagoService()
const keyService = new KeyService()

const PagoModel = sequelize.models.Pago

class PagoService {
  constructor(){}

  async createPagoStripe(data, claveKey) {
    const productos = data.productos.map(producto => {
      let p = {
        price_data: {
          product_data: {
            name: producto.nombre,
            description: producto.descripcion
          },
          currency: producto.moneda,
          unit_amount: currency(producto.precio).multiply(100).value
        },
        quantity: producto.cantidad
      }
      return p
    })

    const pasarela = await pasarelaService.findByNombreWithoutApiKey('Stripe')
    const key = await keyService.findUsuarioByKeyByClave(claveKey)
    const usuario = key.usuario

    await this.create(data.productos, pasarela.id, usuario.id)

    const session = await stripe.checkout.sessions.create({
      line_items: productos,
      mode: 'payment',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl
    })

    return session
  }

  async create(productos, pasarelaId, usuarioId) {
    const total = productos.reduce((total, producto) => {
      let totalProducto = currency(producto.precio).multiply(producto.cantidad)
      return total.add(totalProducto)
    }, currency(0))

    const estadoPago = await estadoPagoService.findByNombre('Pendiente')

    const data = {
      productos,
      total,
      estadoPagoId: estadoPago.id,
      pasarelaId,
      usuarioId
    }

    const newPago = await PagoModel.create(data)

    return newPago
  }

  async find() {
    const response = await PagoModel.findAll({
      include: ['estadoPago', 'pasarela', 'usuario']
    })
    return response
  }

  async findOne(id) {
    const pago = await PagoModel.findByPk(id)
    if (!pago){
      throw boom.notFound('Pago no encontrado')
    }
    return pago
  }

}

export { PagoService }