module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AtributosPabellon', {
        espacio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero_pisos: {
            type: DataTypes.INTEGER
        }
    });
};
