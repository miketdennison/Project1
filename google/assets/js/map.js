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
            zoom: 15,
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

function showChoicePosition() {
    var contentString = businessName;

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





//////
/////////
////
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
        businessName = locations[0].name;
        businessLatitude = locations[0].coordinates.latitude;
        businessLongitude = locations[0].coordinates.longitude;
        console.log(businessName);
        showMapPosition();
    });
}

getLocation();
