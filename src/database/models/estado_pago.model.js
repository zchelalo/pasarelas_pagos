import { Model, DataTypes, Sequelize } from 'sequelize'

const ESTADO_PAGO_TABLE = 'estado_pagos'

const EstadoPagoSchema = {
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

class EstadoPago extends Model {
  static associate(models){
    this.hasMany(models.Pago, { as: 'pagos', foreignKey: 'estadoPagoId' })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ESTADO_PAGO_TABLE,
      modelName: 'EstadoPago',
      timestamps: true
    }
  }
}

export { ESTADO_PAGO_TABLE, EstadoPagoSchema, EstadoPago }