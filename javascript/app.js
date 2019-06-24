$(document).ready(function() {


    // Setting click event for green check (slide right)
    $("#green-check").on("click", function () {
        $(".card").toggle("slide", {direction: "right"}, 400);
    });


    // Setting click event for red check (slide left)
    $("#red").on("click", function () {
        $(".card").toggle("slide", {direction: "left"}, 400);

        $(".card").show();
    })


    // Setting transition for "dinder" in header
    $("#dinder").fadeIn(2200);


    var rangePrice = $("#price").val();
        $("#price").text(rangePrice)

        $("#restaurant-form").on("submit", function (event) {
            event.preventDefault();
            var range1 = $("#range1").val();
              var range2 = $("#range2").val();


            var userInput = $("#restaurant-input").val().trim();

            console.log(userInput);

        })

        var price = $("#price");
        var distance = $("#distance");
        var ratings = $("#ratings");

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(showPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var name = "torchys";
            var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=torchys&latitude=32.8387374&longitude=-96.78583139999999"



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



                var rating = res.businesses[0].rating;

                var name = res.businesses[0].name;

                var price = res.businesses[0].price;

                var restImage = res.businesses[0].image_url;

                console.log(rating);

                var mainDiv = $("#inputInfo");

                var pOne = $("<p>").text("Rating: " + rating);

                mainDiv.append(pOne);

                var pThree = $("<p>").text("Price: " + price);

                mainDiv.append(pThree);

                var pTwo = $("<p>").text("Name: " + name);

                mainDiv.append(pTwo);

                var pThree = $("<img>").attr("src", restImage);
                mainDiv.append(pThree);


            });
        }

        getLocation()

})