module.exports = (sequelize, DataTypes) => {
  return sequelize.define('RolUsuario', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    permisos: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    tableName: 'RolUsuario',
    timestamps: false
  });
};