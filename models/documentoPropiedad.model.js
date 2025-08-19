module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Documento_Propiedad', {
    id_documento_propiedad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    documento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Documento',
        key: 'id_documento'
      }
    },
    espacio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'EspacioFunerario',
        key: 'id_espacio'
      }
    },
    responsable_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Responsable',
        key: 'id_responsable'
      }
    }
  }, {
    tableName: 'Documento_Propiedad',
    timestamps: false
  });
};