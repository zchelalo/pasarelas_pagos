import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const TiposUsuarioModel = sequelize.models.TiposUsuario

class TiposUsuarioService {
  constructor(){}

  async create(data) {
    const newTipoUsuario = await TiposUsuarioModel.create(data)
    return newTipoUsuario
  }

  async find() {
    const response = await TiposUsuarioModel.findAll()
    return response
  }

  async findOne(id) {
    const tipoUsuario = await TiposUsuarioModel.findByPk(id)
    if (!tipoUsuario){
      throw boom.notFound('Tipo usuario no encontrado')
    }
    return tipoUsuario
  }

  async update(id, changes) {
    const tipoUsuario = await this.findOne(id)
    const response = await tipoUsuario.update(changes)
    return response
  }

  async delete(id) {
    const tipoUsuario = await this.findOne(id)
    await tipoUsuario.destroy()
    return { id }
  }
}

export { TiposUsuarioService }