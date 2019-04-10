var citySelector = document.getElementById('citySelector');
var searchField = document.getElementById('searchField');
var submitButton = document.getElementById('submitButton');
// let ratedChoice = document.getElementsByClassName('ratedGrid');
var reviewSubmit = document.getElementById('reviewSubmit');

//autocomplete
// searchField.addEventListener("keydown")

function getRestaurant (city, place, callback) {
  // console.log("in function");
  // console.log(city);
  // console.log(place);
  fetch('/Search?place=' + place + '&city=' + city)
  .then(function(response) {
    return response.json;
  })
  .then(function(data) {
    console.log(data);
    // console.log(place);
    // console.log(city);
    return(callback(data))
  })
  .catch(function(error) {
    return(error);
  })
}

//send name.  search for restaurant in database, populate .localPick div with it, and scroll there
submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  getRestaurant(searchField.value, citySelector.options[citySelector.selectedIndex].value);
})

//add user rating and review to database.
// reviewSubmit.addEventListener("click")
