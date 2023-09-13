const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_pwd, {
  host: process.env.db_host, 
  dialect: process.env.db_dialect, 
  dialectOptions: {
    timezone: 'America/Bogota',
  },
});

module.exports = sequelize;
