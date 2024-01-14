import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const UsuarioModel = sequelize.models.Usuario
const TiposUsuarioModel = sequelize.models.TiposUsuario
const KeyModel = sequelize.models.Key
const PasarelaModel = sequelize.models.Pasarela

class UsuarioService {
  constructor(){}

  async create(data) {
    const newUsuario = await UsuarioModel.create(data)
    delete newUsuario.dataValues.password

    return newUsuario
  }

  async find() {
    const response = await UsuarioModel.findAll({
      // attributes: ['id', 'email', 'role', 'createdAt']
      attributes: { exclude: ['password', 'recoveryToken'] }
    })
    return response
  }

  async findOne(id) {
    const usuario = await UsuarioModel.findByPk(id, {
      include: [
        {
          model: TiposUsuarioModel,
          as: 'tipoUsuario',
          attributes: ['id', 'nombre']
        },
        {
          model: KeyModel,
          as: 'keys',
          attributes: ['id'],
          include: [
            {
              model: PasarelaModel,
              as: 'pasarela',
              attributes: ['id', 'nombre']
            }
          ]
        }
      ],
      attributes: { exclude: ['password', 'recoveryToken'] }
    })
    if (!usuario){
      throw boom.notFound('Usuario no encontrado')
    }
    return usuario
  }

  async findOneWithRecovery(id) {
    const usuario = await UsuarioModel.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
    if (!usuario){
      throw boom.notFound('Usuario no encontrado')
    }
    return usuario
  }

  async findByCorreo(correo) {
    const usuario = await UsuarioModel.findOne({
      where: { correo }
    })
    return usuario
  }

  async update(id, changes) {
    const usuario = await this.findOne(id)
    const response = await usuario.update(changes)
    return response
  }

  async delete(id) {
    const usuario = await this.findOne(id)
    await usuario.destroy()
    return { id }
  }
}

export { UsuarioService }