module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ContenidoEspacial', {
        contenedor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contenido_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'contenido_espacial',
        timestamps: false,
        primaryKey: ['contenedor_id', 'contenido_id']
    });
};