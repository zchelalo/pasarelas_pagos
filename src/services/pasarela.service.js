import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const PasarelaModel = sequelize.models.Pasarela

class PasarelaService {
  constructor(){}

  async create(data) {
    const newPasarela = await PasarelaModel.create(data)
    delete newPasarela.dataValues.apiKey
    return newPasarela
  }

  async find() {
    const response = await PasarelaModel.findAll({
      attributes: { exclude: ['apiKey'] }
    })
    return response
  }

  async findOne(id) {
    const pasarela = await PasarelaModel.findByPk(id, {
      attributes: { exclude: ['apiKey'] }
    })
    if (!pasarela){
      throw boom.notFound('Pasarela no encontrado')
    }
    return pasarela
  }

  async update(id, changes) {
    const pasarela = await this.findOne(id)
    const response = await pasarela.update(changes)
    delete response.dataValues.apiKey
    return response
  }

  async delete(id) {
    const pasarela = await this.findOne(id)
    await pasarela.destroy()
    return { id }
  }
}

export { PasarelaService }