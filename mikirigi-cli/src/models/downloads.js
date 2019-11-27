const { Sequelize, database } = require('../lib/databaseLoader')
const { INTEGER, STRING, DATE, JSONB } = Sequelize;

module.exports = database.define(
  "download",
  {
    nameWithOwner: {
      type: STRING,
      allowNULL: false,
      primaryKey: true,
    },
    totalCount: {
      type: INTEGER,
      allowNULL: false
    },
    downloadsJSON: {
      type: JSONB,
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
