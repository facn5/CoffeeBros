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
      t.deepEquals(data, [ { id: 1, place_id: 1, comment: 'A very great', rating: 3 }, { id: 2, place_id: 2, comment: 'Expensive place but good quality', rating: 3 } ]);
      t.end();
    })
  })
})

tape('testing get places', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getPlaces((error, data) => {
      t.error(error, "getPlaces successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 1,name: 'Tishreen', rating: 3, address_id: 1, google_mapid: 1 },
      { id: 2, name: 'Giraffe', rating: 4, address_id: 2, google_mapid: 2 }]);
      t.end();
    })
  })
})

tape('testing getAddressByID', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getAddressByID(1,(error, data) => {
      t.error(error, "getAddressByID successfully executed");
      // console.log(data);
      t.deepEqual(data, [ { city: 'Nazareth', street: 'Kekar Ha\' Ma\'ain' }]);
      t.notDeepEqual(data, [ { city: 'London', street: 'Kekar Ha\' Ma\'ain' }]);
      t.notDeepEquals(data, [ { city: 'tamer', street: 'Kekar Ha\' Ma\'ain' }]);
    })
    getData.getAddressByID(2,(error, data) => {
      t.error(error, "getAddressByID successfully executed");
      // console.log(data);
      t.deepEqual(data, [ { city: 'Haifa', street: 'HaSolel Bonneh' }]);
      t.notDeepEqual(data, [ { city: 'Nazareth', street: 'HaSolel Bonneh' }]);
      t.notDeepEquals(data, [ { city: 'Haifa', street: 'wuuuttt' }])
    })
  })
  t.end();
})

tape('testing getPlacesByName', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getPlacesByName("Giraffe",(error, data) => {
      t.error(error, "getPlacesByName successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 2, name: 'Giraffe', rating: 4, address_id: 2, google_mapid: 2 } ]);
      t.end();
    })
  })
})

tape('testing getLatestReviews', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getLatestReviews(2,(error, data) => {
      t.error(error, "getLatestReviews successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 2, place_id: 2, comment: 'Expensive place but good quality', rating: 3 }, { id: 1, place_id: 1, comment: 'A very great', rating: 3 }  ]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, comment: 'Expensive place but good quality', rating: 3 } ]);
    })
    getData.getLatestReviews(1,(error, data) => {
      t.error(error, "getLatestReviews successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 2, place_id: 2, comment: 'Expensive place but good quality', rating: 3 } ]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, comment: 'Expensive place but good quality', rating: 3 }, { id: 1, place_id: 1, comment: 'A very great', rating: 3 }  ]);
    })
  })
    t.end();
})

tape('testing getReviewByPlaceID', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getReviewByPlaceID(2,(error, data) => {
      t.error(error, "getLatestReviews successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 2,
        place_id: 2,
        comment: 'Expensive place but good quality',
        rating: 3 } ]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, rating: 3 } ]);
    })
  })
    t.end();
})

tape('testing getPlaceDetailsByID', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getPlaceDetailsByID(1,(error, data) => {
      t.error(error, "getPlaceDetailsByID successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 1,
        name: 'Tishreen',
        rating: 3,
        address_id: 1,
        google_mapid: 1 } ]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, rating: 3 } ]);
    })
  })
    t.end();
})

tape('testing getPicturesByPlaceID', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getPicturesByPlaceID(1,(error, data) => {
      t.error(error, "getPicturesByPlaceID successfully executed");
      // console.log(data);
      t.deepEquals(data, [  { id: 1, place_id: 1, pictureurl: 'fattoush.jpg' }   ]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, rating: 3 } ]);
    })
  })
    t.end();
})

tape('testing getMapByPlaceID', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getMapByPlaceID(1,(error, data) => {
      t.error(error, "getMapByPlaceID successfully executed");
      // console.log(data);
      t.deepEquals(data, [{ googlemap: '<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=tishren%20israel&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a  href="https://www.emojilib.com">emojilib.com</a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas{overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>' }]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, rating: 3 } ]);
    })
  })
    t.end();
})

tape('testing getTopPlaces', (t) => {
  runDbBuild((error, response) => {
    t.error(error, "runDbBuild successfully executed");
    getData.getTopPlaces(2,(error, data) => {
      t.error(error, "getTopPlaces successfully executed");
      // console.log(data);
      t.deepEquals(data, [ { id: 1, name: 'Tishreen', rating: 3, address_id: 1, google_mapid: 1 }, { id: 2, name: 'Giraffe', rating: 4, address_id: 2, google_mapid: 2 } ]);
      t.notDeepEquals(data, [{ id: 2, place_id: 2, rating: 3 } ]);
    })
  })
    t.end();
})
