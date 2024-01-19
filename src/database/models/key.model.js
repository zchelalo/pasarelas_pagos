import { Model, DataTypes, Sequelize } from 'sequelize'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const KEY_TABLE = 'keys'

const KeySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  clave: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  key: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id'
  },
  pasarelaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'pasarela_id'
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
  },
  newKey: {
    type: DataTypes.VIRTUAL
  }
}

class Key extends Model {
  static associate(models){
    this.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'usuarioId' })
    this.belongsTo(models.Pasarela, { as: 'pasarela', foreignKey: 'pasarelaId' })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: KEY_TABLE,
      modelName: 'Key',
      timestamps: true,
      hooks: {
        beforeCreate: async (key, options) => {
          const newClave = crypto.randomBytes(32).toString('hex')
          key.clave = newClave

          const newKey = crypto.randomBytes(32).toString('hex')
          key.key = await bcrypt.hash(newKey, 10)

          // Agregar los valores generados como propiedades al modelo
          key.setDataValue('newKey', newKey)
        },
        beforeUpdate: async (key, options) => {
          const newKey = crypto.randomBytes(32).toString('hex')
          key.key = await bcrypt.hash(newKey, 10)

          key.setDataValue('newKey', newKey)
        }
      }
    }
  }
}

export { KEY_TABLE, KeySchema, Key }