const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'takewell', '', {
  host: 'localhost',
  dialect: 'postgres'
});

test("Connection Postgres", done => {
  sequelize
  .authenticate()
  .then(() => {
    done()
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
})
