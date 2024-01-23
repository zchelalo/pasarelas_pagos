import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const KeyModel = sequelize.models.Key
const UsuarioModel = sequelize.models.Usuario

class KeyService {
  constructor(){}

  async create(data) {
    let key = await this.findKeyByUsuarioAndPasarela(data.usuarioId, data.pasarelaId)
    if (key !== null){
      throw boom.conflict('El usuario ingresado ya tiene una key de la pasarela de pago seleccionada')
    }
    
    const newKey = await KeyModel.create(data)
    delete newKey.dataValues.key
    return newKey
  }

  async find() {
    const response = await KeyModel.findAll({
      attributes: { exclude: ['key'] }
    })
    return response
  }

  async findOne(id) {
    const key = await KeyModel.findByPk(id, {
      attributes: { exclude: ['key'] }
    })
    if (!key){
      throw boom.notFound('Key no encontrada')
    }
    return key
  }

  async findUsuarioByKeyByClave(clave) {
    const key = await KeyModel.findOne({
      where: {
        clave
      },
      attributes: { exclude: ['key'] },
      include: [
        {
          model: UsuarioModel,
          as: 'usuario',
          attributes: ['id', 'nombre']
        },
      ]
    })
    if (!key){
      throw boom.notFound('Key no encontrada')
    }
    return key
  }

  async findByClaveWithKey(clave) {
    const key = await KeyModel.findOne({
      where: {
        clave
      }
    })
    if (!key){
      throw boom.notFound('Key no encontrada')
    }
    return key
  }

  async findKeyByUsuarioAndPasarela(usuarioId, pasarelaId) {
    const key = await KeyModel.findOne({
      where: {
        usuarioId,
        pasarelaId
      },
      attributes: { exclude: ['key'] }
    })
    return key
  }

  async update(id) {
    const key = await this.findOne(id)
    const response = await key.update()
    delete response.dataValues.key
    return response
  }

  async delete(id) {
    const key = await this.findOne(id)
    await key.destroy()
    return { id }
  }
}

export { KeyService }