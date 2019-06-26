

var food = ["American", "Italian", "Mexican", "Barbeque", "Breakfast & Brunch", "Chicken Wings"]
// var checkbox = "assets/images/checkbox.png"

function type(){
for(var i = 0; i < food.length; i++){
    // creating the checkbox
    var check = $("<img>");
    check.attr("src", "assets/images/checkbox.png")
    check.attr("data-state", "box");
    check.attr("data-false", "assets/images/checkbox.png");
    check.attr("data-true", "assets/images/checkmark.png");
    check.attr("food", food[i])
    check.addClass("check");
    // putting the question, answers, and checkbox on the page
    $("#surveyQuestion").text("What type of food would you like to eat?")
    $("#surveyAnswer").append("<li>")
    $("#surveyAnswer").append(check);
    $("#surveyAnswer").append(" "+food[i]+"</li>")
}
}

// checking checkbox to checkmark and vice-versa
$(document).on("click",".check", function(){
    // making the data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and changing it to the opposite
    if (state === "box"){
        // turn into a checkmark if a checkbox
        $(this).attr("src", $(this).attr("data-true"));
        $(this).attr("data-state", "mark");
    } else{
        // turn into a checkbox if a checkmark
        $(this).attr("src", $(this).attr("data-false"));
        $(this).attr("data-state", "box");
    }


})
type();