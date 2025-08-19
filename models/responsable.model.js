module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Responsable', {
    id_responsable: {
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
    dni: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255)
    },
    telefono: {
      type: DataTypes.STRING(20)
    }
  }, {
    tableName: 'Responsable',
    timestamps: false
  });
};