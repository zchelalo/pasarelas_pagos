import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { config } from '../config/config.js'
import { UsuarioService } from './usuario.service.js'
import { TiposUsuarioService } from './tipos_usuario.service.js'

const service = new UsuarioService()
const tipoUsuarioService = new TiposUsuarioService()

class AuthService {
  constructor(){}

  async getUsuario(correo, password) {
    const usuario = await service.findByCorreo(correo)

    if (!usuario){
      throw boom.unauthorized()
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida){
      throw boom.unauthorized()
    }

    delete usuario.dataValues.password
    return usuario
  }

  async signToken(usuario){
    const tipoUsuario = await tipoUsuarioService.findOne(usuario.tiposUsuarioId)
    const payload = {
      sub: usuario.id,
      rol: tipoUsuario.nombre
    }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' })
    return token
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.JWT_RECOVERY_SECRET)
      const usuario = await service.findOneWithRecovery(payload.sub)
      if (usuario.recoveryToken !== token){
        throw boom.unauthorized()
      }
      const usuarioUpdated = await service.update(usuario.id, { recoveryToken: null, password: newPassword })
      return { message: 'Contraseña actualizada correctamente' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }

}

export { AuthService }