import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const KeyModel = sequelize.models.Key

class KeyService {
  constructor(){}

  async create(data) {
    const newKey = await KeyModel.create(data)
    return newKey
  }

  async find() {
    const response = await KeyModel.findAll()
    return response
  }

  async findOne(id) {
    const key = await KeyModel.findByPk(id)
    if (!key){
      throw boom.notFound('Key no encontrada')
    }
    return key
  }

  async update(id, changes) {
    const key = await this.findOne(id)
    const response = await key.update(changes)
    return response
  }

  async delete(id) {
    const key = await this.findOne(id)
    await key.destroy()
    return { id }
  }
}

export { KeyService }