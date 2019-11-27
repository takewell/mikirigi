const { Sequelize, database } = require('../lib/databaseLoader')
const { STRING } = Sequelize;

module.exports = database.define(
  "repo",
  {
    nameWithOwner: {
      type: STRING,
      allowNULL: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
    indexes: [
      {
        fields: ["nameWithOwner"]
      }
    ]
  }
);
