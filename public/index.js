

var citySelector = document.getElementById('citySelector');
var searchField = document.getElementById('searchField');
var submitButton = document.getElementById('submitButton');
// let ratedChoice = document.getElementsByClassName('ratedGrid');

var pickName = document.getElementById('pickName');
var nameLocal = document.getElementById('name');
var ratingLocal = document.getElementById('rating');
var addressLocal = document.getElementById('address');
var contactLocal = document.getElementById('contact');
var localPicture = document.getElementById('templocalPic')

var reviewLegendName = document.getElementById('reviewLegendName');
var userRating = document.getElementById('userRating');
var userReview = document.getElementById('userReview');
var reviewSubmit = document.getElementById('reviewSubmit');
//autocomplete
// searchField.addEventListener("keydown")

function getRestaurant (city, place, callback) {
  fetch('/search?place=' + place + '&city=' + city)
  .then(function(response) {
    // console.log(response);
    return (response.json());
  })
  .then(function(data) {
    console.log(data);
    return callback(data);
  })
  .catch(function(error) {
    return(error);
  })
}

//send name.  search for restaurant in database, populate #localPick div with it, and scroll there
submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  getRestaurant( citySelector.options[citySelector.selectedIndex].value,searchField.value,function(d){
    console.log(d.name);
    reviewLegendName.textContent = d.name;
    nameLocal.textContent = d.name;
    ratingLocal.textContent = "Rating:" + d.rating + " stars";
    addressLocal.textContent = d.street + ", " + d.city;
    // contactLocal.textContent = d[contact];
    // templocalPic.innerHTML = d[google_mapid];
  })
});

// function sendReview (place, userRating, userReview) {
//
// }

//add user rating and review to database.
reviewSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("working")
  console.log(reviewLegendName.textContent, userRating.options[userRating.selectedIndex].value, userReview.value)
  // sendReview(place, userRating, userReview)

})

function getTopRated(num){
  getTopRatedPlaces(num,function(d){

  })
}
getTopRated(5);
