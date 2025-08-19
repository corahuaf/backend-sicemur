module.exports = (sequelize, DataTypes) => {
  return sequelize.define('PlantillaReporte', {
    id_plantilla: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    definicion: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    tableName: 'PlantillaReporte',
    timestamps: false
  });
};