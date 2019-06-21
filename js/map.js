var map;
var service;
var infowindow;
var sydney = new google.maps.LatLng(-33.867, 151.195); // Stating Coords for testing
var request; // Filtering for types, location, radius, etc.
var markers = []; // Array to keep track of markers on the map

// Initializes Map
function initMap() {
    // Used for name of each serch above location
    infowindow = new google.maps.InfoWindow();

    // Create map and place it html
    map = new google.maps.Map(
        document.getElementById("map"), {
            center: sydney,
            zoom: 15
        });

    // Google needs formatted requests
    request = {
        location: sydney,
        radius: 8047, // Meters -- 5miles
        types: ["cafe"] // Looking for cafes, can be anything
    };

    // Searches for what we're looking for
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

/**  Called from service object, ensures good results/no errors on server
 *   Gets location of all searches, then creates marker for each location
 **/
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
        }
    }
}

// Created from callback
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // ACtion listeners for each marker
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
    return marker;
}

// Clears each time a new search happens
function clearResults(markers) {
    for (var m in markers) {
        markers[m].setMap(null);
    }
    markers = [];
}

// Wait for page to load to initialize map
google.maps.event.addDomListener(window, "load", initMap);