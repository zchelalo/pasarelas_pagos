import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const EstadoPagoModel = sequelize.models.EstadoPago

class EstadoPagoService {
  constructor(){}

  async create(data) {
    const newEstadoPago = await EstadoPagoModel.create(data)
    return newEstadoPago
  }

  async find() {
    const response = await EstadoPagoModel.findAll()
    return response
  }

  async findOne(id) {
    const estadoPago = await EstadoPagoModel.findByPk(id)
    if (!estadoPago){
      throw boom.notFound('Estado de pago no encontrado')
    }
    return estadoPago
  }

  async findByNombre(nombre) {
    const estadoPago = await EstadoPagoModel.findOne({
      where: {
        nombre
      }
    })
    if (!estadoPago){
      throw boom.notFound('Estado de pago no encontrado')
    }
    return estadoPago
  }

  async update(id, changes) {
    const estadoPago = await this.findOne(id)
    const response = await estadoPago.update(changes)
    return response
  }

  async delete(id) {
    const estadoPago = await this.findOne(id)
    await estadoPago.destroy()
    return { id }
  }
}

export { EstadoPagoService }