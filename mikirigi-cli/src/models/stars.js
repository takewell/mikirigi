const { Sequelize, database } = require('../lib/databaseLoader')
const { INTEGER, STRING, JSONB } = Sequelize;

module.exports = database.define(
  "star",
  {
    nameWithOwner: {
      type: STRING,
      allowNULL: false,
      primaryKey: true,
    },
    totalCount: {
      type: INTEGER,
      allowNULL: false,
    },
    starAtsJSON: {
      type: JSONB,
      allowNULL: false
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
