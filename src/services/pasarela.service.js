import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const PasarelaModel = sequelize.models.Pasarela

class PasarelaService {
  constructor(){}

  async create(data) {
    const newPasarela = await PasarelaModel.create(data)
    return newPasarela
  }

  async find() {
    const response = await PasarelaModel.findAll()
    return response
  }

  async findOne(id) {
    const pasarela = await PasarelaModel.findByPk(id)
    if (!pasarela){
      throw boom.notFound('Pasarela no encontrado')
    }
    return pasarela
  }

  async update(id, changes) {
    const pasarela = await this.findOne(id)
    const response = await pasarela.update(changes)
    return response
  }

  async delete(id) {
    const pasarela = await this.findOne(id)
    await pasarela.destroy()
    return { id }
  }
}

export { PasarelaService }