import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const Tipos_usuarioModel = sequelize.models.Tipos_usuario

class Tipos_usuarioService {
  constructor(){}

  async create(data) {
    const newTipos_usuario = await Tipos_usuarioModel.create(data)
    return newTipos_usuario
  }

  async find() {
    const response = await Tipos_usuarioModel.findAll()
    return response
  }

  async findOne(id) {
    const tipos_usuario = await Tipos_usuarioModel.findByPk(id)
    if (!tipos_usuario){
      throw boom.notFound('Tipos_usuario no encontrado')
    }
    return tipos_usuario
  }

  async update(id, changes) {
    const tipos_usuario = await this.findOne(id)
    const response = await tipos_usuario.update(changes)
    return response
  }

  async delete(id) {
    const tipos_usuario = await this.findOne(id)
    await tipos_usuario.destroy()
    return { id }
  }
}

export { Tipos_usuarioService }