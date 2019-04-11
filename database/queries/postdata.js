const selectquery = require('./insertquery');

const addReview = (args,cb) => selectquery('INSERT INTO review (place_id,comment,rating) VALUE($1,$2,$3)',arg, cb)

module.exports = {addReview}
