function getTopRatedPlaces(num, cb) {

  fetch('/toprated?' + num)
    .then(function(response) {
      return response.json;
    })
    .then(funciton(data) {
      cb(data);
    })
    .catch(function(error) {
      return error;
    })
}
