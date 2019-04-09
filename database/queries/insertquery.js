const databaseConnection = require('../database/db_connection.js');

const insertquery = sql,args,cb => {
  databaseConnection.query(
    s,
    args,
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = insertquery;
