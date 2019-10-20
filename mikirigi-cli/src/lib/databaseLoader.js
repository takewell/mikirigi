const Sequelize = require('sequelize');

const seqeulize = new Sequelize(process.env.OSS_CONTAINER_NAME, process.env.USER, '', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
  database: seqeulize,
  Sequelize: Sequelize
};
