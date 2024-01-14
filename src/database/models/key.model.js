import { Model, DataTypes, Sequelize } from 'sequelize'

const KEY_TABLE = 'keys'

const KeySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  key: {
    allowNull: false,
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
      timestamps: true
    }
  }
}

export { KEY_TABLE, KeySchema, Key }