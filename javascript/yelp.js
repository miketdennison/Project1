function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
getLocation();

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // var name = "torchys";
    var queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&latitude=${latitude}&longitude=${longitude}&limit=10`

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

            console.log(res);
        

            var rating = res.businesses[0].rating;

            var name = res.businesses[0].name;

            var price = res.businesses[0].price;

            var typeOfFood = res.businesses[0].categories[0].title;
            var restImage = res.businesses[0].image_url;

            var locations = res.businesses.slice();

            for (i=0; i<locations.length; i++) {
                console.log(locations[i])
            }

        console.log(rating);


        $("#facts").text(price);
        $("#restName").text(name);

        $("#rating").text("Rating: " + rating);

        $("#foodType").text("Food Type: " + typeOfFood);  

        

        $("#description").attr("src", restImage);


    });
}

var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=32.8387374&longitude=-96.78583139999999&limit=10"


// var queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&latitude=&longitude=${longitude}&limit=10`

// var api_key = "";

// $.getJSON({
//     url: queryURL,
//     method: "GET",
//     headers: {
//         "accept": "application/json",
//         "x-requested-with": "xmlhttprequestJ",
//         "Access-Control-Allow-Origin": "*",
//         "Authorization": "Bearer Rr_V5iu9DjxsH7md3UZvyf_trptrOfVlFe2HQGLHEJJc4w9Kx2ppzSM8S9kLWe-EpcI66qKE7LwZ9cwseiKfo9fRtSQyChZmUB1j1lSLWdkpxEyI78GzlRI6A9cLXXYx"
//     }
// }).then(function(res) {

//         console.log(res);
    
// })