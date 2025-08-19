module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Documento', {
    id_documento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    fecha_emision: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    ruta_archivo: {
      type: DataTypes.STRING(255)
    },
    nombre_archivo: {
      type: DataTypes.STRING(100)
    },
    tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoDocumento',
        key: 'id_tipo'
      }
    },
    creado_por: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id_usuario'
      }
    },
    modificado_por: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id_usuario'
      }
    }
  }, {
    tableName: 'Documento',
    timestamps: false
  });
};