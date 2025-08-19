module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AtributosTumba', {
        espacio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        profundidad: {
            type: DataTypes.DECIMAL(5, 2)
        },
        material_lapida: {
            type: DataTypes.STRING(100)
        }
    });
};
