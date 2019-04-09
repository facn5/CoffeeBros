const tape = require('tape');
const runDbBuild = require('../database/db_build.js');
const getData = require('../database/queries/readdata.js');
const postData = require('../database/queries/postdata.js');

tape('check that tape is working', (t) => {
  t.equals(1, 1, 'one equals one');
  t.end();
})

tape('testing get reviews', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getReviews((error, data) => {
      t.error(error, "getReviews successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 1, place_id: 1, comment: 'A very great', rating: 3 }, { id: 2, place_id: 2, comment: 'Expensive place but good quality', rating: 3 } ]);
      t.end();
    })
  })
})

// tape('testing postPlaces', (t) => {
//   runDbBuild((error, response) => {
//     t.error(err, "No errors in runDbBuild");
//     postData('Ibn Batuta Shawarma', 'Nazareth', (error, data) => {
//       t.error(error, "No errors in postPlaces");
//       getData((error, data) => {
//         t.error(error, "No errors in getPlaces");
//         console.log(data);
//         t.deepEquals(data, [{id: 1, name: 'Tishreen', location: 'Nazareth'}, {id: 2, name: 'Ibn Batuta Shawarma', location: "Nazareth"}]);
//         t.end();
//       })
//     })
//   })
// })
