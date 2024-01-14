import { Model, DataTypes, Sequelize } from 'sequelize'

const TIPOS_USUARIO_TABLE = 'tipos_usuarios'

const TiposUsuarioSchema = {
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

class TiposUsuario extends Model {
  static associate(models){
    this.hasMany(models.Usuario, { as: 'usuarios', foreignKey: 'tiposUsuarioId' })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: TIPOS_USUARIO_TABLE,
      modelName: 'TiposUsuario',
      timestamps: true
    }
  }
}

export { TIPOS_USUARIO_TABLE, TiposUsuarioSchema, TiposUsuario }