module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AtributosLote', {
        espacio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        area: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        tipo_suelo: {
            type: DataTypes.STRING(20)
        },
        ubicacion_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};
