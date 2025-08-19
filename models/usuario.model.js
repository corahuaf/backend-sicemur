module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_usuario: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ape_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ape_materno: DataTypes.STRING(100),
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'Usuario',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: false
  });
};