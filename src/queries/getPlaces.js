const databaseConnection = require('../../database/db_connection.js');

const getPlaces = cb => {
  databaseConnection.query('SELECT * FROM places', (error, response) => {
    if (error) {
      cb(error);
    } else {
      cb(null, response.rows);
    }
  });
};

module.exports = getPlaces;
