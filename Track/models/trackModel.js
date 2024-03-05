const DataTypes = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./userModel'); // Asegúrate de importar el modelo User si no lo has hecho

const Route = sequelize.define('TBL_ROUTE', {
    ID_ROUTE: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ID_USER: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puedes cambiar esto a false si es necesario
        references: {
            model: User,
            key: 'ID_USER'
        }
    },
    NAME_ROUTE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    BEGIN_ROUTE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    END_ROUTE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DATE_ROUTE: {
        type: DataTypes.STRING,
        allowNull: true // Puedes cambiar esto según tus requisitos
    }
}, {
    tableName: 'TBL_ROUTE', // Especifica el nombre de la tabla aquí
    timestamps: false // Evita la creación automática de createdAt y updatedAt
});

// Exportar el modelo
module.exports = Route;
