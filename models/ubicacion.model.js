module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Ubicacion', {
    id_ubicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sector: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    manzana: {
      type: DataTypes.STRING(50)
    },
    lote: {
      type: DataTypes.STRING(50)
    }
  }, {
    tableName: 'Ubicacion',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['sector', 'manzana', 'lote']
      }
    ]
  });
};