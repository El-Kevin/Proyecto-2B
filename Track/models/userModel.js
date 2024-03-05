const DataTypes  = require('sequelize');
const sequelize = require('../db/connection');
const User = sequelize.define('TBL_USER', {
    ID_USER: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },  
    USERNAME: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TOKEN_USER: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ROL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_name:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'TBL_USER', // Especifica el nombre de la tabla aquí
    timestamps: false // Evita la creación automática de createdAt y updatedAt
  });
  
  // Exportar el modelo
  module.exports = User;
  