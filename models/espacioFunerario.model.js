module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EspacioFunerario', {
    id_espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(20),
      defaultValue: 'DISPONIBLE',
      allowNull: false
    }
  }, {
    tableName: 'EspacioFunerario',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: false
  });
};