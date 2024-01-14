import { Model, DataTypes, Sequelize } from 'sequelize'

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
    type: DataTypes.STRING
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
      timestamps: true
    }
  }
}

export { PASARELA_TABLE, PasarelaSchema, Pasarela }