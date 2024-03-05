const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BDD_Proyecto', 'usr_usuario', 'usr_usuario', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;
