module.exports = (sequelize, DataTypes) => {
  return sequelize.define('TipoDocumento', {
    id_tipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'TipoDocumento',
    timestamps: false
  });
};