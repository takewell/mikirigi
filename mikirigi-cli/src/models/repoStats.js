const { Sequelize, database } = require('../lib/databaseLoader')
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = database.define(
  "repo_stat",
  {
    nameWithOwner: {
      type: STRING,
      allowNULL: false,
      primaryKey: true,
    },
    updated: {
      type: DATE,
      allowNULL: false,
    },
    created: {
      type: DATE,
      allowNULL: false
    },
    issueCount: {
      type: INTEGER,
      allowNULL: false
    },
    forkCount: {
      type: INTEGER,
      allowNULL: false
    }
  },
  {
    freezeTableName: false,
    timestamps: false,
    indexes: [
      {
        fields: ["nameWithOwner"]
      }
    ]
  }
);
