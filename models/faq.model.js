module.exports = (sequelize, DataTypes) => {
  return sequelize.define('FAQ', {
    id_faq: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pregunta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    veces_vista: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ultima_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FAQCategoria',
        key: 'id_categoria'
      }
    },
    actualizado_por: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id_usuario'
      }
    },
    orden: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    }
  }, {
    tableName: 'FAQ',
    timestamps: false,
    updatedAt: 'ultima_actualizacion'
  });
};