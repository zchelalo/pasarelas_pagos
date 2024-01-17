import { Model, DataTypes, Sequelize } from 'sequelize'
import crypto from 'crypto'
import { config } from '../../config/config.js'
import { encriptar, desencriptar } from '../../utils/encriptar.js'

const PASARELA_TABLE = 'pasarelas'

const PasarelaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  apiKey: {
    allowNull: false,
    type: DataTypes.JSON,
    field: 'api_key'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }
}

class Pasarela extends Model {
  static associate(models){
    this.hasMany(models.Key, { as: 'keys', foreignKey: 'pasarelaId' })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PASARELA_TABLE,
      modelName: 'Pasarela',
      timestamps: true,
      hooks: {
        beforeCreate: async (pasarela, options) => {
          console.log(pasarela)
          const password = config.API_KEY_ENCRYPTION_PASSWORD // Obtener la contraseña desde una variable de entorno
          const claveCifrado = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32)
          const datosEncriptados = await encriptar(pasarela.apiKey, claveCifrado)
          
          pasarela.apiKey = datosEncriptados
        },
        beforeUpdate: async (pasarela, options) => {
          // Verifica si la apiKey ha sido modificada antes de hacer el encriptado nuevamente
          if (pasarela.changed('apiKey')) {
            const password = config.API_KEY_ENCRYPTION_PASSWORD // Obtener la contraseña desde una variable de entorno
            const claveCifrado = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32)
            const datosEncriptados = await encriptar(pasarela.apiKey, claveCifrado)

            pasarela.apiKey = datosEncriptados
          }
        },
        afterFind: async (result, options) => {
          const password = config.API_KEY_ENCRYPTION_PASSWORD // Obtener la contraseña desde una variable de entorno
          const claveCifrado = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32)

          // Desencriptar la apiKey después de una consulta SELECT
          if (Array.isArray(result)){
            // Si es un array (consulta múltiple)
            for (const pasarela of result) {
              pasarela.apiKey = await desencriptar(pasarela.apiKey.encryptedString, claveCifrado, pasarela.apiKey.iv)
            }
          } 
          else{
            // Si es un solo resultado (consulta única)
            result.apiKey = await desencriptar(result.apiKey.encryptedString, claveCifrado, pasarela.apiKey.iv)
          }
        }
      }
    }
  }
}

export { PASARELA_TABLE, PasarelaSchema, Pasarela }