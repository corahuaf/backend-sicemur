module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AtributosMausoleo', {
        espacio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        niveles: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        material_fachada: {
            type: DataTypes.STRING(100)
        },
        fecha_construccion: {
            type: DataTypes.DATE
        }
    });
};