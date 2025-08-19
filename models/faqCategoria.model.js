module.exports = (sequelize, DataTypes) => {
  return sequelize.define('FAQCategoria', {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    orden: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    tableName: 'FAQCategoria',
    timestamps: false
  });
};