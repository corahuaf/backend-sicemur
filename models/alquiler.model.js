module.exports = (sequelize, DataTypes) => {
    const Alquiler = sequelize.define('Alquiler', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        espacio_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        responsable_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_final: {
            type: DataTypes.DATE,
            allowNull: false
        },
        monto_total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        observacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        deuda_actual: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        condicion: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        creado_por: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        modificado_por: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE, // Corregido a DATE
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fecha_modificacion: {
            type: DataTypes.DATE, // Corregido a DATE
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'alquiler',
        timestamps: true
    });

    return Alquiler;
};