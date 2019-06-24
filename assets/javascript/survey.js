$("#surveyQuestion").text("What type of food would you like to eat?")

var food = ["American", "Italian", "Mexican", "Barbeque", "Breakfast & Brunch", "Chicken Wings"]

var checkbox = "assets/images/checkbox.png"

for(var i = 0; i < food.length; i+=2){
    $("#surveyAnswer").append("<tr>" + "<td>" + "<img src=" + checkbox + ">" + " " + food[i] + "</td>"  + "<td>" + "<img src=" + checkbox + ">" + " " + food[i+1] + "</td>" + "</tr>");
    }