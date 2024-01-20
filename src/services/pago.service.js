import boom from '@hapi/boom'
import currency from 'currency.js'

import { sequelize } from '../libs/sequelize.js'
import { stripe } from '../libs/stripe.js'

const PagoModel = sequelize.models.Pago

class PagoService {
  constructor(){}

  async create(data) {
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

    const session = await stripe.checkout.sessions.create({
      line_items: productos,
      mode: 'payment',
      success_url: data.success_url,
      cancel_url: data.cancel_url
    })

    return session
  }

  async find() {
    const response = await PagoModel.findAll()
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