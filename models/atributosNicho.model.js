module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AtributosNicho', {
        espacio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nivel: {
            type: DataTypes.INTEGER
        },
        fila: {
            type: DataTypes.INTEGER
        },
        columna: {
            type: DataTypes.INTEGER
        },
        material: {
            type: DataTypes.STRING(100)
        },
        orientacion: {
            type: DataTypes.STRING(20)
        }
    });
};
