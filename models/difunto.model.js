module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Difunto', {
    id_difunto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ape_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ape_materno: {
      type: DataTypes.STRING(100)
    },
    fecha_fallecimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_ingreso_cementerio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'Difunto',
    timestamps: false
  });
};