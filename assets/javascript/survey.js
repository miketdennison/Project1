

var food = ["American", "Italian", "Mexican", "Barbeque", "Breakfast", "Wings"]
// var carryout = ["Dine-in", "Carry Out", "Delivery", "Drive-thru"]
var distance = ["One", "Ten", "Five", "Twenty-five"]
var price = ["Inexpensive", "Pricey", "Moderate", "High-end"]
var importance = ["Type", "Distance", "Price"]

// I think we just add "touchstart" to the click in order to make it touch compatible, though it may already be mobile ready

$("#surveyAnswer").on("click", "#Type", function () {

    // checking checkbox to checkmark and vice-versa

    // making the data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and changing it to the opposite
    if (state === "box") {
        // turn into a checkmark if a checkbox
        $(this).attr("src", $(this).attr("data-true"));
        $(this).attr("data-state", "mark");
        $("#Price").attr("src", $("#Price").attr("data-false"))
        $("#Price").attr("data-state", "box");
        $("#Distance").attr("src", $("#Distance").attr("data-false"))
        $("#Distance").attr("data-state", "box");
    } else {
        // turn into a checkbox if a checkmark
        $(this).attr("src", $(this).attr("data-false"));
        $(this).attr("data-state", "box");
    }
})
// making it so they can only choose one option

$("#surveyAnswer").on("click", "#Price", function () {

    // checking checkbox to checkmark and vice-versa

    // making the data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and changing it to the opposite
    if (state === "box") {
        // turn into a checkmark if a checkbox
        $(this).attr("src", $(this).attr("data-true"));
        $(this).attr("data-state", "mark");
        $("#Type").attr("src", $("#Type").attr("data-false"))
        $("#Type").attr("data-state", "box");
        $("#Distance").attr("src", $("#Distance").attr("data-false"))
        $("#Distance").attr("data-state", "box");
    } else {
        // turn into a checkbox if a checkmark
        $(this).attr("src", $(this).attr("data-false"));
        $(this).attr("data-state", "box");
    }
})
$("#surveyAnswer").on("click", "#Distance", function () {

    // checking checkbox to checkmark and vice-versa

    // making the data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and changing it to the opposite
    if (state === "box") {
        // turn into a checkmark if a checkbox
        $(this).attr("src", $(this).attr("data-true"));
        $(this).attr("data-state", "mark");
        $("#Price").attr("src", $("#Price").attr("data-false"))
        $("#Price").attr("data-state", "box");
        $("#Type").attr("src", $("#Type").attr("data-false"))
        $("#Type").attr("data-state", "box");
    } else {
        // turn into a checkbox if a checkmark
        $(this).attr("src", $(this).attr("data-false"));
        $(this).attr("data-state", "box");
    }
})
function empty() {
    $("#surveyAnswer").empty();
    $("#surveyQuestion").empty();
    $("#submit").empty()
}

function firstQuestion() {
    $("#surveyQuestion").text("What is most important for you in your restaurant choice?")
    for (var i = 0; i < importance.length; i++) {
        // creating the checkbox
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-importance", importance[i])
        check.attr("id", importance[i])
        // putting the answers and checkbox on the page
        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + importance[i] + "</li>")
    }

    // creating submit button
    var btn = $("<button>")
    btn.text("Submit");
    btn.addClass("submit");
    $("#submit").append(btn)
    // click to go to the next question
    $(document).on("click", ".submit", function () {

        if ($("#Price").attr("data-state") === "mark") {
            pricepoint();
            goBack();
        } else if ($("#Type").attr("data-state") === "mark") {
            type();
            goBack();
        } else if ($("#Distance").attr("data-state") === "mark") {
            far();
            goBack();
        }
    })
}



firstQuestion();

function type() {
    empty();
    $("#surveyQuestion").text("What type of food would you like to eat?")
    for (var i = 0; i < food.length; i++) {
        // creating the checkbox
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-food", food[i]);
        check.attr("id", food[i]);
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
    btn.attr("id", "completed");
    $("#submit").append(btn)
    // click to go to next page
    $(document).on("click", "#completed", function () {
        window.location.href = "restaurantswipes.html";
    })
}


// function carry() {
//     empty();
//     $("#surveyQuestion").text("What type of restaurant do you want?")
//     // creating the checkbox
//     for (var i = 0; i < carryout.length; i++) {
//         var check = $("<img>");
//         check.attr("src", "assets/images/checkbox.png")
//         check.attr("data-state", "box");
//         check.attr("data-false", "assets/images/checkbox.png");
//         check.attr("data-true", "assets/images/checkmark.png");
//         check.attr("data-carryout", carryout[i])
//         check.addClass("check");

//         // putting the answers and checkbox on the page

//         $("#surveyAnswer").append("<li>")
//         $("#surveyAnswer").append(check);
//         $("#surveyAnswer").append(" " + carryout[i] + "</li>")
//     }

//     // click to go to the next question
//     $(document).on("click", ".submit", function () {
//         far();
//     })

// }

function far() {
    empty();
    $("#surveyQuestion").text("How far away do you want to eat (in miles)?")
    // creating the checkbox
    for (var i = 0; i < distance.length; i++) {
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-distance", distance[i])
        check.attr("id", distance[i]);
        check.addClass("check");

        // putting the answers and checkbox on the page

        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + distance[i] + "</li>")
    }

    // creating submit button
    var btn = $("<button>")
    btn.text("Submit");
    btn.addClass("submit");
    btn.attr("id", "completed");
    $("#submit").append(btn)
    // click to go to next page
    $(document).on("click", "#completed", function () {
        window.location.href = "restaurantswipes.html";
    })
}

function pricepoint() {
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
        check.attr("id", price[i]);
        check.addClass("check");

        // putting the answers and checkbox on the page

        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + price[i] + "</li>")
    }

    // creating submit button
    var btn = $("<button>")
    btn.text("Submit");
    btn.addClass("submit");
    btn.attr("id", "completed");
    $("#submit").append(btn)
    // click to go to next page
    $(document).on("click", "#completed", function () {
        window.location.href = "restaurantswipes.html";
    })
}


// checking checkbox to checkmark and vice-versa
$(document).on("click", ".check", function () {
    // making everything into a box instead of check mark

    // making the data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and changing it to the opposite
    if (state === "box") {
        // making everything into a box instead of check mark
        $(".check").click(function () {
            $(".check").attr("data-state", "box");
            $(".check").attr("src", $(this).attr("data-false"))
        })
        // turn into a checkmark if a checkbox
        $(this).attr("src", $(this).attr("data-true"));
        $(this).attr("data-state", "mark");
    }
    else if (state === "mark") {
        // turn into a checkbox if a checkmark
        $(this).attr("src", $(this).attr("data-false"));
        $(this).attr("data-state", "box");
    }
})


function goBack() {
    var btn = $("<button>");
    btn.text("Go Back");
    btn.addClass("return");
    $("#submit").append(btn);

    // click to start over
    $(document).on("click", ".return", function () {
        event.preventDefault()
        empty();
        firstQuestion();
    })
}