const tape = require('tape');
const runDbBuild = require('../database/db_build.sql');
const getData = require('../src/queries/getPlaces.js');
// const postData = require('../src/queries/postData.js');

tape('check that tape is working', (t) => {
  t.equals(1, 1, 'one equals one');
  t.end();
})

tape('testing getPlaces', (t) => {
  runDbBuild((error, response) => {
    t.error(err, "No errors in runDbBuild");
    getData((error, data) => {
      t.error(error, "No errors in getPlaces");
      console.log(data);
      t.deepEquals(data, [{id: 1, name: 'Tishreen', location: 'Nazareth'}]);
      t.end();
    })
  })
})

tape('testing postPlaces', (t) => {
  runDbBuild((error, response) => {
    t.error(err, "No errors in runDbBuild");
    postData('Ibn Batuta Shawarma', 'Nazareth', (error, data) => {
      t.error(error, "No errors in postPlaces");
      getData((error, data) => {
        t.error(error, "No errors in getPlaces");
        console.log(data);
        t.deepEquals(data, [{id: 1, name: 'Tishreen', location: 'Nazareth'}, {id: 2, name: 'Ibn Batuta Shawarma', location: "Nazareth"}]);
        t.end();
      })
    })
  })
})
