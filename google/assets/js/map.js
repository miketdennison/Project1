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
            zoom: 13,
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
        businessName = locations[0].name;
        businessLatitude = locations[0].coordinates.latitude;
        businessLongitude = locations[0].coordinates.longitude;
        console.log(locations);
        showMapPosition();
        cycleChoices();
    });
}

function cycleChoices() {
    var rating;
    var name;
    var price;
    var typeOfFood;
    var restImage;
    var distance;
    var i = 0;

    // Max of 10 selections, iterate through them until user selects green check
    while (!greenCheckSelected && i < 10) {
        // Load information for next restaraunt
        price = locations[i].price;
        name = locations[i].name;
        rating = locations[i].rating;
        typeOfFood = locations[i].categories[0].title;
        restImage = locations[i].image_url;
        distance = metersToMiles(locations[i].distance);

        // Load Text Info to Page
        $("#facts").text(price);
        $("#restName").text(name);
        $("#rating").text("Rating: " + rating);
        if (typeOfFood !== "" && typeOfFood != null)
            $("#foodType").text("Food Type: " + typeOfFood);
        else
            $("#foodType").text("");
        if (restImage !== "" && restImage != null)
            $("#description").attr("src", restImage);
        else
            $("#foodType").html("");

        $("#distance").text(distance + " mi");

        // Increment i, only if green check wasn't pressed so that we can use i to load results page
        if (!greenCheckSelected)
            i++;
        else
            break;

    }

    // Load selected object with necessary info for results page
    if (greenCheckSelected) {
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
    // load next page
    else {
        // Load a card telling them to try back later
        alert("No more options! :(");
    }
    // load card that indicates out of choices
}

function metersToMiles(meters) {
    return meters * 0.00062137;
}


getLocation();
