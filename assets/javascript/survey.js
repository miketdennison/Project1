

var food = ["American", "Italian", "Mexican", "Barbeque", "Breakfast & Brunch", "Chicken Wings"]
// var checkbox = "assets/images/checkbox.png"

function type(){
for(var i = 0; i < food.length; i++){
    var check = $("<img>");
    check.attr("src", "assets/images/checkbox.png")
    check.attr("data-state",false);
    check.attr("food", food[i])
    check.addClass("check");
    $("#surveyQuestion").text("What type of food would you like to eat?")
    // $("#surveyAnswer").append("<li>"+check + " " + food[i]+"</li>")
    $("#surveyAnswer").append("<li>")
    $("#surveyAnswer").append(check);
    $("#surveyAnswer").append(" "+food[i]+"</li>")
}
}

type();