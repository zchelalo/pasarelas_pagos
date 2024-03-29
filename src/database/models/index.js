import { TiposUsuario, TiposUsuarioSchema } from './tipos_usuario.model.js'
import { Usuario, UsuarioSchema } from './usuario.model.js'
import { Pasarela, PasarelaSchema } from './pasarela.model.js'
import { Key, KeySchema } from './key.model.js'
import { EstadoPago, EstadoPagoSchema } from './estado_pago.model.js'
import { Pago, PagoSchema } from './pago.model.js'

function setupModels(sequelize){
  TiposUsuario.init(TiposUsuarioSchema, TiposUsuario.config(sequelize))
  Usuario.init(UsuarioSchema, Usuario.config(sequelize))
  Pasarela.init(PasarelaSchema, Pasarela.config(sequelize))
  Key.init(KeySchema, Key.config(sequelize))
  EstadoPago.init(EstadoPagoSchema, EstadoPago.config(sequelize))
  Pago.init(PagoSchema, Pago.config(sequelize))

  TiposUsuario.associate(sequelize.models)
  Usuario.associate(sequelize.models)
  Pasarela.associate(sequelize.models)
  Key.associate(sequelize.models)
  EstadoPago.associate(sequelize.models)
  Pago.associate(sequelize.models)
}

export { setupModels }