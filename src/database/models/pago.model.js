import { Model, DataTypes, Sequelize } from 'sequelize'

const PAGO_TABLE = 'pagos'

const PagoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productos: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.JSON)
  },
  total: {
    allowNull: false,
    type: DataTypes.DECIMAL(13, 6)
  },
  estadoPagoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estado_pago_id',
  },
  pasarelaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'pasarela_id',
  },
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id',
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

class Pago extends Model {
  static associate(models){
    this.belongsTo(models.EstadoPago, { as: 'estadoPago', foreignKey: 'estadoPagoId' })
    this.belongsTo(models.Pasarela, { as: 'pasarela', foreignKey: 'pasarelaId' })
    this.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'usuarioId' })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PAGO_TABLE,
      modelName: 'Pago',
      timestamps: true
    }
  }
}

export { PAGO_TABLE, PagoSchema, Pago }