const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BDD_Proyecto', 'sa', 'Lluvia27@', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;
