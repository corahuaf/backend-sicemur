module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reporte', {
    id_reporte: {
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
      allowNull: false
    },
    parametros: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    fecha_generacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    generado_por: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id_usuario'
      }
    },
    archivo_ruta: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'Reporte',
    timestamps: false
  });
};