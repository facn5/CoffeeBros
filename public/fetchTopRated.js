function getTopRatedPlaces(num, cb) {

  fetch('/toprated?' + num)
    .then(function(response) {
      return response.json;
    })
    .then(function(data) {
      // console.log(data);
      cb(data);
    })
    .catch(function(error) {
      return error;
    })
}
