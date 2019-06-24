

var food = ["American", "Italian", "Mexican", "Barbeque", "Breakfast & Brunch", "Chicken Wings"]
var carryout = ["Dine-in", "Carry Out", "Delivery", "Drive-thru"]

// I think we just add "touchstart" to the click in order to make it touch compatible, though it may already be mobile ready

function empty() {
    $("#surveyAnswer").empty();
    $("#surveyQuestion").empty();
}

function type() {
    for (var i = 0; i < food.length; i++) {
        // creating the checkbox
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-food", food[i])
        check.addClass("check");
        // putting the question, answers, and checkbox on the page
        $("#surveyQuestion").text("What type of food would you like to eat?")
        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + food[i] + "</li>")
    }
    // creating submit button
    var btn = $("<button>")
    btn.text("Submit");
    btn.addClass("submit");
    $("#survey").append(btn)
    // click to go to the next question
    $(document).on("click", ".submit", function () {
        carry();
    })
}


function carry() {
    empty();
    // creating the checkbox
    for (var i = 0; i < carryout.length; i++) {
        var check = $("<img>");
        check.attr("src", "assets/images/checkbox.png")
        check.attr("data-state", "box");
        check.attr("data-false", "assets/images/checkbox.png");
        check.attr("data-true", "assets/images/checkmark.png");
        check.attr("data-carryout", carryout[i])
        check.addClass("check");

        // putting the question, answers, and checkbox on the page
        $("#surveyQuestion").text("What type of restaurant do you want?")
        $("#surveyAnswer").append("<li>")
        $("#surveyAnswer").append(check);
        $("#surveyAnswer").append(" " + carryout[i] + "</li>")
    }


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