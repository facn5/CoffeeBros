const databaseConnection = require('../../database/db_connection.js');

const postPlaces = (name, location, cb) => {
  databaseConnection.query(
    'INSERT INTO places (name, location) VALUES ($1, $2)',
    [name, location],
    (error, response) => {
      if(error) {
        return cb(error);
      } else {
        cb(null, response);
      }
    }
  );
};

module.exports = postPlaces;
