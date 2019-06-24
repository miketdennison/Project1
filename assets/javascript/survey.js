

var food = ["American", "Italian", "Mexican", "Barbeque", "Breakfast & Brunch", "Chicken Wings"]
var carryout = ["Dine-in", "Carry Out", "Delivery", "Drive-thru"]
var distance = ["1 mile", "10 miles", "5 miles", "25 miles"]
var price = ["$", "$$$", "$$", "$$$$"]
// I think we just add "touchstart" to the click in order to make it touch compatible, though it may already be mobile ready

function empty() {
    $("#surveyAnswer").empty();
    $("#surveyQuestion").empty();
}

function type() {
    $("#surveyQuestion").text("What type of food would you like to eat?")
    for (var i = 0; i < food.length; i++) {
        // creating the checkbox
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-food", food[i])
        check.addClass("check");
        // putting the answers and checkbox on the page

        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + food[i] + "</li>")
    }
    // creating submit button
    var btn = $("<button>")
    btn.text("Submit");
    btn.addClass("submit");
    $("#submit").append(btn)
    // click to go to the next question
    $(document).on("click", ".submit", function () {
        carry();
    })
}


function carry() {
    empty();
    $("#surveyQuestion").text("What type of restaurant do you want?")
    // creating the checkbox
    for (var i = 0; i < carryout.length; i++) {
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-carryout", carryout[i])
        check.addClass("check");

        // putting the answers and checkbox on the page

        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + carryout[i] + "</li>")
    }
  
    // click to go to the next question
    $(document).on("click", ".submit", function () {
        far();
    })

}

function far() {
    empty();
    $("#surveyQuestion").text("How far away do you want to eat??")
    // creating the checkbox
    for (var i = 0; i < distance.length; i++) {
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-distance", distance[i])
        check.addClass("check");

        // putting the answers and checkbox on the page

        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + distance[i] + "</li>")
    }
   
    // click to go to the next question
    $(document).on("click", ".submit", function () {
        pricepoint();
})
}

function pricepoint(){
    empty();
    $("#surveyQuestion").text("How much money do you want to spend?")
    // creating the checkbox
    for (var i = 0; i < price.length; i++) {
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-price", price[i])
        check.addClass("check");

        // putting the answers and checkbox on the page

        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + price[i] + "</li>")
    }

    // click to go to the next question
    $(document).on("click", ".submit", function () {
        alert("You did it!");
    })
}


// checking checkbox to checkmark and vice-versa
$(document).on("click", ".check", function () {
    // making the data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and changing it to the opposite
    if (state === "box") {
        // turn into a checkmark if a checkbox
        $(this).attr("src", $(this).attr("data-true"));
        $(this).attr("data-state", "mark");
    } else {
        // turn into a checkbox if a checkmark
        $(this).attr("src", $(this).attr("data-false"));
        $(this).attr("data-state", "box");
    }
})


type();