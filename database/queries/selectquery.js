const databaseConnection = require('../db_connection.js');

const selectquery = (sql,cb) => {
  databaseConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = selectquery;
