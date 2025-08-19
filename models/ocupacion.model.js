module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Ocupacion', {
    espacio_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'EspacioFunerario',
        key: 'id_espacio'
      }
    },
    difunto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Difunto',
        key: 'id_difunto'
      }
    },
    fecha_ocupacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'Ocupacion',
    timestamps: false,
    paranoid: true // Habilitar borrado suave para historial
  });
};