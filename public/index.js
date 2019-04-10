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
var mapLocal = document.getElementById('mapFrame');

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
    mapLocal.innerHTML = d.googlemap;
  })
});


function sendReview (name, rating, review) {
  console.log(name, rating, review)
  //
  // function postData(url = '', data = {}) {
  // return fetch("/postReview", {
  //   method: "POST",
  //   headers: {'Content-Type': 'application/json'}
  //   body: JSON.stringify(data)
  // })
  // .catch
  // .then(response => response.json());
}

//add user rating and review to database.
reviewSubmit.addEventListener("click", function(e) {
  localName = reviewLegendName.textContent;
  localRating = userRating.options[userRating.selectedIndex].value;
  localReview = userReview.value;
  e.preventDefault();
  sendReview(localName, localRating, localReview)
})
