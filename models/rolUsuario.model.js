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
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      defaultValue: []
    }
  }, {
    tableName: 'RolUsuario',
    timestamps: false
  });
};