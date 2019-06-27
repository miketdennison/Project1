
console.log(localStorage.getItem("values"))


var price = "";
$("#Inexpensive, #Moderate, #Pricey, #High-end").on("click", function () {
    price = $(this).val();

})
var distance = "";
$("#One, #Five, #Ten, #Twenty-five").on("click", function () {
    distance = parseInt($(this).val());

})
var currentFoodType = "";
$("#American, #Italian, #Mexican, #Barbeque, #Breakfast, #Wings").on("click", function () {
    currentFoodType = $(this).attr("id");


});
// var foodTypes = ["american", "italian", "mexican", "barbeque", "wings"];
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
// getLocation();
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var name = currentFoodType;
    var radius = distance;
    var cost = price;
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + name + "&radius=" + radius + "&price=" + cost + "&latitude=32.8387374&longitude=-96.78583139999999&limit=10"
    var api_key = "Rr_V5iu9DjxsH7md3UZvyf_trptrOfVlFe2HQGLHEJJc4w9Kx2ppzSM8S9kLWe-EpcI66qKE7LwZ9cwseiKfo9fRtSQyChZmUB1j1lSLWdkpxEyI78GzlRI6A9cLXXYx";
    $.getJSON({
        url: queryURL,
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${api_key}`
        }
    }).then(function (res) {
        console.log(res);
        var locations = res.businesses.slice();
        for (i = 0; i < locations.length; i++) {
            console.log(locations[i])
            var rating = res.businesses[i].rating;
            var name = res.businesses[i].name;
            var price = res.businesses[i].price;
            var typeOfFood = res.businesses[i].categories[0].title;
            var restImage = res.businesses[i].image_url;
            var lat = res.businesses[i]
        }
        $("#price").text(price);
        $(".card-title").text(name);
        $("#rating").text(rating);
        $("#foodType").text(typeOfFood);
        $("#restPic").attr("src", restImage);
    });
}
// Restaurant Swipe Page JS all below //
var googleURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXq6ff1ouG2wpgRglmYXqf1pwgOJ95OqQ";
var map;
var userLatitude;
var userLongitude;
var businessLatitude;
var businessLongitude;
var userLatLng;
var businessLatLng;
var locations = [];
var businessName;
var greenCheckSelected = false;
var userLikedRestInfo = {
    restarauntName: "",
    restarauntFoodType: "",
    restarauntPricePoint: "",
    restarauntTelephoneNum: "",
    restarauntAddress: "",
    restarauntRating: "",
    restarauntDistance: 0,
    restarauntPhoto: "",
    restarauntLatitude: 0,
    restarauntLongitude: 0
};
// Get location using HTML5
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            yelpRequest();
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
// Show user's home location on map
function showMapPosition() {
    $.ajax({
        url: googleURL,
        method: "GET",
        dataType: "jsonp"
    }).then(function () {
        userLatLng = new google.maps.LatLng(userLatitude, userLongitude);
        var myOptions = {
            zoom: 12,
            center: userLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'), myOptions);
        var contentString = "Current Location";
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: userLatLng,
            map: map,
            title: "Current Location",
            icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
        });
        marker.addListener("click", function () {
            infowindow.open(map, marker);
        });
        businessLatLng = new google.maps.LatLng(businessLatitude, businessLongitude);
        showChoicePosition();
    });
}
// Show users selection on the Google Maps
function showChoicePosition() {
    var contentString = businessName;
    console.log(contentString);
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: businessLatLng,
        map: map,
        title: businessName,
        icon: "http://maps.google.com/mapfiles/kml/shapes/dining.png"
    });
    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });
}
// Populate Array with Yelp Restaraunts based on user's preferances
function yelpRequest() {
    var queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&latitude=${userLatitude}&longitude=${userLongitude}&limit=10`
    var api_key = "Rr_V5iu9DjxsH7md3UZvyf_trptrOfVlFe2HQGLHEJJc4w9Kx2ppzSM8S9kLWe-EpcI66qKE7LwZ9cwseiKfo9fRtSQyChZmUB1j1lSLWdkpxEyI78GzlRI6A9cLXXYx";
    $.getJSON({
        url: queryURL,
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequestJ",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${api_key}`
        }
    }).then(function (res) {
        locations = res.businesses.slice();
        cycleChoices();
    });
}
var i = 0;
function cycleChoices() {
    var rating;
    var name;
    var phone;
    var price;
    var typeOfFood;
    var restImage;
    var distance;
    // Max of 10 selections, iterate through them until user selects green check
    //while (!greenCheckSelected && i < 10) {
    // Load information for next restaraunt
    price = locations[i].price;
    name = locations[i].name;
    rating = locations[i].rating;
    typeOfFood = locations[i].categories[0].title;
    restImage = locations[i].image_url;
    distance = metersToMiles(locations[i].distance);
    phone = locations[i].display_phone;
    // Load Text Info to Page
    $("#price").text(price);
    $(".card-title").text(name);
    $("#rating").text("Rating: " + rating);
    $("#phone").text(phone);
    if (typeOfFood !== "" && typeOfFood != null)
        $("#foodType").text(typeOfFood);
    else
        $("#foodType").text("");
    if (restImage !== "" && restImage != null)
        $("#restPic").attr("src", restImage);
    else
        $("#foodType").html("");
    $("#distance").text(distance + " mi");
    $(".card").show();
}
// load card that indicates out of choices
function metersToMiles(meters) {
    return (meters * 0.00062137).toPrecision(2);
}
function greenSelected() {
    userLikedRestInfo.restarauntName = locations[i].name;
    userLikedRestInfo.restarauntFoodType = locations[i].categories[0].title;
    userLikedRestInfo.restarauntPricePoint = locations[i].price;
    userLikedRestInfo.restarauntTelephoneNum = locations[i].display_phone;
    userLikedRestInfo.restarauntAddress = locations[i].address1;
    userLikedRestInfo.restarauntRating = locations[i].rating;
    userLikedRestInfo.restarauntDistance = metersToMiles(locations[i].distance);
    userLikedRestInfo.restarauntPhoto = locations[i].image_url;
    userLikedRestInfo.restarauntLatitude = locations[i].coordinates.latitude;
    userLikedRestInfo.restarauntLongitude = locations[i].coordinates.longitude;
}
// Load selected object with necessary info for results page
getLocation();
$(".card").hide();
$("#selected").hide();
// Setting click event for green check (slide right)
$("#green-check").on("click", function () {
    $(".card").toggle("slide", { direction: "right" }, 300);
    greenSelected();
    $("#selected").toggle("slide", 300);
    $("#selectedName").append(userLikedRestInfo.restarauntName = locations[i].name);
    $("#selectedFoodType").append(userLikedRestInfo.restarauntFoodType = locations[i].categories[0].title);
    $("#selectedPrice").append(userLikedRestInfo.restarauntPricePoint = locations[i].price);
    $("#selectedPhone").append(userLikedRestInfo.restarauntTelephoneNum = locations[i].display_phone);
    $("#selectedAddress").append(userLikedRestInfo.restarauntAddress = locations[i].address1);
    $("#selectedRating").append(userLikedRestInfo.restarauntRating = locations[i].rating);
    $("#selectedDitsance").append(userLikedRestInfo.restarauntDistance = metersToMiles(locations[i].distance));
    $("#selectedPic").attr("src", userLikedRestInfo.restarauntPhoto = locations[i].image_url);
    businessLatitude = userLikedRestInfo.restarauntLatitude;
    businessLongitude = userLikedRestInfo.restarauntLongitude;
    businessName = userLikedRestInfo.restarauntName;
    showMapPosition();
});
// Setting click event for red check (slide left)
$("#red").on("click", function () {
    // Increment i, only if green check wasn't pressed so that we can use i to load results page
    i++;
    $(".card").toggle("slide", { direction: "left" }, 300);
    var newCard = $(".card");
    newCard.toggle("slide", { direction: "left" }, 400);
    setTimeout(function () { newCard }, 500);
    setTimeout(function () {
        if (i < locations.length) {
            cycleChoices();
        } else {
            alert("You're out of choices for now");
        }
    }, 400);
});