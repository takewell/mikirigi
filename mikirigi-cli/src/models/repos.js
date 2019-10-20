const { Sequelize, database } = require('../lib/databaseLoader')
const { STRING, JSONB } = Sequelize;

module.exports = database.define(
  "repo",
  {
    name: {
      type: STRING,
      allowNULL: false,
      primaryKey: true,
    },
    ownerName: {
      type: STRING,
      allowNULL: false,
      primaryKey: true
    },
    stars: {
      type: JSONB,
      allowNULL: true
    },
    downloads: {
      type: JSONB,
      allowNULL: true
    }
  },
  {
    freezeTableName: false,
    timestamps: true,
    indexes: [
      {
        fields: ["name"]
      },
      {
        fields: ["ownerName"]
      }
    ]
  }
);
